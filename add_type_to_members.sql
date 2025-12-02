-- Add type column to members table
ALTER TABLE members ADD COLUMN IF NOT EXISTS type TEXT DEFAULT 'board'; -- 'board' or 'supervisory'
