-- Runs after schema.sql. Creates the public.users row + the matching profile
-- (civilian or comedian) automatically whenever someone signs up through
-- Supabase Auth. The role + display name come from the sign-up metadata set by
-- the Join page (auth.signUp options.data).

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  v_role public.user_role;
  v_name text;
begin
  v_role := coalesce(
    nullif(new.raw_user_meta_data ->> 'role', '')::public.user_role,
    'civilian'
  );
  v_name := coalesce(
    nullif(new.raw_user_meta_data ->> 'display_name', ''),
    split_part(new.email, '@', 1)
  );

  insert into public.users (id, email, role, email_verified)
  values (new.id, new.email, v_role, new.email_confirmed_at is not null)
  on conflict (id) do nothing;

  if v_role = 'comedian' then
    insert into public.comedian_profiles (user_id, slug, name, approval_status)
    values (
      new.id,
      regexp_replace(lower(split_part(new.email, '@', 1)), '[^a-z0-9]+', '-', 'g')
        || '-' || substr(new.id::text, 1, 6),
      v_name,
      'pending'
    )
    on conflict do nothing;
  else
    insert into public.civilian_profiles (user_id, display_name)
    values (new.id, v_name)
    on conflict (user_id) do nothing;
  end if;

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;

create trigger on_auth_user_created
  after insert on auth.users
  for each row
  execute function public.handle_new_user();

-- Let signed-in users read their own account row (e.g. to know their role).
drop policy if exists "Users can read their own record" on public.users;
create policy "Users can read their own record"
  on public.users for select
  using (id = auth.uid());
