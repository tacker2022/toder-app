create table videos (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  youtube_url text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Set up Row Level Security (RLS)
alter table videos enable row level security;

-- Allow public read access
create policy "Public videos are viewable by everyone"
  on videos for select
  using (true);

-- Allow authenticated users to insert/update/delete
create policy "Authenticated users can insert videos"
  on videos for insert
  with check (auth.role() = 'authenticated');

create policy "Authenticated users can update videos"
  on videos for update
  using (auth.role() = 'authenticated');

create policy "Authenticated users can delete videos"
  on videos for delete
  using (auth.role() = 'authenticated');
