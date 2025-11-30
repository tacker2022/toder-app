-- Create Events Table
create table events (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  date date not null,
  description text not null,
  image_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create Members Table
create table members (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  role text not null,
  image_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create Storage Bucket for Images
insert into storage.buckets (id, name, public) values ('images', 'images', true);

-- Set up storage policies (Allow public read, allow anon upload for demo)
create policy "Public Access"
  on storage.objects for select
  using ( bucket_id = 'images' );

create policy "Anon Upload"
  on storage.objects for insert
  with check ( bucket_id = 'images' );
