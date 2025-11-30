-- Create Associations Table
create table associations (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  image_url text not null,
  website_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Set up storage policies for associations (using the existing 'images' bucket)
-- (Assuming 'images' bucket is already public readable)
