-- Create messages table
create table public.messages (
  id uuid not null default gen_random_uuid (),
  full_name text not null,
  email text not null,
  phone text null,
  subject text null,
  message text not null,
  is_read boolean not null default false,
  created_at timestamp with time zone not null default now(),
  constraint messages_pkey primary key (id)
) tablespace pg_default;

-- Enable RLS
alter table public.messages enable row level security;

-- Create policies
create policy "Enable insert for everyone" on public.messages
  for insert with check (true);

create policy "Enable read access for authenticated users only" on public.messages
  for select using (auth.role() = 'authenticated');

create policy "Enable update for authenticated users only" on public.messages
  for update using (auth.role() = 'authenticated');

create policy "Enable delete for authenticated users only" on public.messages
  for delete using (auth.role() = 'authenticated');
