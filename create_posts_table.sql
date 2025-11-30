-- 1. Tabloyu oluştur
create table if not exists posts (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  slug text not null unique,
  content text not null,
  image_url text,
  published boolean default true,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. Güvenlik ayarlarını aç (RLS)
alter table posts enable row level security;

-- 3. Herkesin okumasına izin ver
create policy "Public posts are viewable by everyone" on posts
  for select using (true);

-- 4. Sadece giriş yapmış adminlerin yazmasına izin ver
create policy "Admins can manage posts" on posts
  for all using (auth.role() = 'authenticated');
