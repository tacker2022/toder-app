-- Add display_order column to members table
ALTER TABLE members 
ADD COLUMN display_order integer DEFAULT 0;

-- Update existing members to have a default order (optional, but good practice)
-- This sets them to 0 by default. You can manually update them later.
