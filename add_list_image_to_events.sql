-- Add list_image_url column to events table
alter table events 
add column if not exists list_image_url text;
