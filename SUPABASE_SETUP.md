# Supabase Setup

## Database Schema

Run the following SQL in your Supabase SQL Editor:

```sql
create table conversations (
  id uuid primary key default gen_random_uuid(),
  session_id text not null,
  consented boolean not null default true,
  created_at timestamptz not null default now()
);

create table messages (
  id uuid primary key default gen_random_uuid(),
  conversation_id uuid references conversations(id) on delete cascade,
  role text not null check (role in ('user', 'assistant')),
  content text not null,
  turn_index int not null,
  created_at timestamptz not null default now()
);

-- Enable RLS
alter table conversations enable row level security;
alter table messages enable row level security;

-- Policies for server-side (service_role) access
-- Since the Edge Function uses the service role key, it bypasses RLS by default.
-- However, for completeness and safety if you ever use anon key:
create policy "Service role can do everything on conversations"
  on conversations for all
  using (true)
  with check (true);

create policy "Service role can do everything on messages"
  on messages for all
  using (true)
  with check (true);
```

## Edge Function Secrets

Set the following secrets for your Supabase Edge Function:

```bash
supabase secrets set DEEPSEEK_API_KEY=your_deepseek_key
supabase secrets set SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

## Environment Variables (.env.local)

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key (only for offline scripts)
```

## Running Scripts

To run the cleaning and export scripts, you'll need `ts-node` or similar:

```bash
npx ts-node scripts/clean_logs.ts
npx ts-node scripts/export_instruct.ts
```
