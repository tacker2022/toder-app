-- Add image_fit column to events table
alter table events 
add column if not exists image_fit text default 'cover';
