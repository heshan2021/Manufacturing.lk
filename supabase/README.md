# Supabase Setup for Manufacturing.lk

## 1. Create tables

In your [Supabase SQL Editor](https://supabase.com/dashboard/project/_/sql), run the migration:

1. Open **SQL Editor** → **New query**
2. Paste the contents of `supabase/migrations/001_create_factories.sql`
3. Click **Run**

## 2. Seed initial data (optional)

To load the sample factories:

1. Open **SQL Editor** → **New query**
2. Paste the contents of `supabase/seed.sql`
3. Click **Run**

## 3. Add env vars to your app

1. Copy `.env.local.example` to `.env.local` (or add to existing `.env.local`)
2. In [Supabase Dashboard](https://supabase.com/dashboard) → your project → **Settings** → **API**
3. Copy **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
4. Copy **anon public** key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

Example `.env.local`:

```
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

Restart the dev server after changing env vars.
