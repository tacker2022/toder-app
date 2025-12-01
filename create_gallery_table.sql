create table if not exists gallery_images (
  id uuid default gen_random_uuid() primary key,
  post_id uuid references posts(id) on delete cascade,
  event_id uuid references events(id) on delete cascade,
  image_url text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  constraint one_parent_only check (
    (post_id is not null and event_id is null) or
    (post_id is null and event_id is not null)
  )
);

-- RLS Policies
alter table gallery_images enable row level security;

create policy "Public gallery images are viewable by everyone"
  on gallery_images for select
  using (true);

create policy "Authenticated users can insert gallery images"
  on gallery_images for insert
  with check (auth.role() = 'authenticated');

create policy "Authenticated users can delete gallery images"
  on gallery_images for delete
  using (auth.role() = 'authenticated');
