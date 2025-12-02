-- Add order_index column to associations table
ALTER TABLE associations ADD COLUMN IF NOT EXISTS order_index INTEGER DEFAULT 0;
