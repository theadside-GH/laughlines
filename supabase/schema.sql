create type public.user_role as enum ('civilian', 'comedian', 'admin');
create type public.service_type as enum ('MAKE_ME_FUNNY', 'MAKE_ME_LAUGH');
create type public.order_status as enum (
  'requested',
  'paid',
  'accepted',
  'declined',
  'in_progress',
  'delivered',
  'revision_requested',
  'approved',
  'auto_completed',
  'payout_scheduled',
  'refunded'
);
create type public.rush_preset as enum ('24h', '48h', '72h');

create table public.users (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null unique,
  role public.user_role not null default 'civilian',
  email_verified boolean not null default false,
  created_at timestamptz not null default now()
);

create table public.civilian_profiles (
  user_id uuid primary key references public.users(id) on delete cascade,
  display_name text,
  is_public boolean not null default false,
  usage_count integer not null default 0
);

create table public.comedian_profiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.users(id) on delete set null,
  slug text not null unique,
  name text not null,
  location text,
  approval_status text not null default 'pending',
  featured boolean not null default false,
  bio text,
  credits text[] not null default '{}',
  social_links jsonb not null default '{}',
  category_tags text[] not null default '{}',
  intro_video_url text,
  profile_image_url text,
  stripe_account_id text,
  stripe_charges_enabled boolean not null default false,
  rating numeric(3,2) not null default 0,
  review_count integer not null default 0,
  completed_orders integer not null default 0,
  created_at timestamptz not null default now()
);

create table public.comedian_services (
  id uuid primary key default gen_random_uuid(),
  comedian_id uuid not null references public.comedian_profiles(id) on delete cascade,
  service_type public.service_type not null,
  enabled boolean not null default true,
  base_price_cents integer not null check (base_price_cents >= 0),
  rush_options jsonb not null default '[]',
  standard_delivery_days integer not null default 7,
  unique (comedian_id, service_type)
);

create table public.orders (
  id uuid primary key default gen_random_uuid(),
  civilian_id uuid not null references public.users(id),
  comedian_id uuid not null references public.comedian_profiles(id),
  service_type public.service_type not null,
  status public.order_status not null default 'requested',
  request_data jsonb not null,
  deadline date,
  rush_preset public.rush_preset,
  revision_count integer not null default 0,
  base_cents integer not null,
  rush_cents integer not null default 0,
  tip_cents integer not null default 0,
  discount_cents integer not null default 0,
  total_cents integer not null,
  platform_fee_cents integer not null,
  comedian_gross_cents integer not null,
  stripe_checkout_session_id text unique,
  stripe_payment_intent_id text unique,
  accepted_at timestamptz,
  delivered_at timestamptz,
  completed_at timestamptz,
  created_at timestamptz not null default now()
);

create table public.order_messages (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  sender_id uuid references public.users(id),
  sender_role public.user_role not null,
  body text not null,
  attachment_urls text[] not null default '{}',
  created_at timestamptz not null default now()
);

create table public.deliverables (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  delivery_type public.service_type not null,
  text_body text,
  video_url text,
  created_at timestamptz not null default now()
);

create table public.reviews (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null unique references public.orders(id) on delete cascade,
  civilian_id uuid not null references public.users(id),
  comedian_id uuid not null references public.comedian_profiles(id),
  rating integer not null check (rating between 1 and 5),
  body text not null,
  is_public boolean not null default true,
  moderation_status text not null default 'published',
  created_at timestamptz not null default now()
);

create table public.discount_codes (
  id uuid primary key default gen_random_uuid(),
  code text not null unique,
  stripe_promotion_code_id text not null,
  percent_off numeric(5,2),
  active boolean not null default true,
  created_at timestamptz not null default now()
);

create table public.payout_ledger (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null unique references public.orders(id) on delete cascade,
  comedian_id uuid not null references public.comedian_profiles(id),
  comic_gross_cents integer not null,
  platform_fee_cents integer not null,
  stripe_fee_cents integer,
  payout_status text not null default 'pending_completion',
  stripe_transfer_id text unique,
  created_at timestamptz not null default now(),
  scheduled_at timestamptz
);

alter table public.users enable row level security;
alter table public.civilian_profiles enable row level security;
alter table public.comedian_profiles enable row level security;
alter table public.comedian_services enable row level security;
alter table public.orders enable row level security;
alter table public.order_messages enable row level security;
alter table public.deliverables enable row level security;
alter table public.reviews enable row level security;
alter table public.discount_codes enable row level security;
alter table public.payout_ledger enable row level security;

create policy "Approved comedians are public"
  on public.comedian_profiles for select
  using (approval_status = 'approved');

create policy "Enabled services are public for approved comedians"
  on public.comedian_services for select
  using (
    enabled = true and exists (
      select 1
      from public.comedian_profiles c
      where c.id = comedian_id
      and c.approval_status = 'approved'
    )
  );

create policy "Users can read their own orders"
  on public.orders for select
  using (
    civilian_id = auth.uid()
    or exists (
      select 1 from public.comedian_profiles c
      where c.id = comedian_id and c.user_id = auth.uid()
    )
  );

create policy "Order participants can read messages"
  on public.order_messages for select
  using (
    exists (
      select 1 from public.orders o
      left join public.comedian_profiles c on c.id = o.comedian_id
      where o.id = order_id
      and (o.civilian_id = auth.uid() or c.user_id = auth.uid())
    )
  );

create policy "Published public reviews are visible"
  on public.reviews for select
  using (is_public = true and moderation_status = 'published');
