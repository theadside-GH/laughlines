# LaughLines

LaughLines is a comedy-services marketplace for hiring vetted comedians to write jokes or perform custom comedy videos.

## What is included

- Public marketplace homepage with sample videos, sample jokes, featured/new/most-used comedians.
- Comedian browse, profile, and request flow for `Make Me Funny` and `Make Me Laugh`.
- Civilian dashboard for orders, profile privacy, and review eligibility.
- Comedian dashboard for request acceptance, delivery, pricing, and payout status.
- Admin dashboard for approvals, disputes, reviews, discounts, and payout oversight.
- Stripe Checkout and webhook route scaffolding.
- Supabase schema for users, comedian profiles, services, orders, messages, deliverables, reviews, discounts, and payout ledger.
- Unit tests for pricing and order-state rules.

## Getting started

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Environment

Copy `.env.example` to `.env.local` and fill in the values before using live integrations.

```bash
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
STRIPE_CONNECT_CLIENT_ID=
EMAIL_FROM=hello@laughlines.com
```

## Database

Run `supabase/schema.sql` in Supabase SQL editor for the initial schema and row-level-security baseline.

## Verification

```bash
npm run test
npm run build
```

The current data is seeded in `src/lib/data.ts` so the marketplace can be reviewed before Supabase is connected to the UI.
