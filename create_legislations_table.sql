-- Create Legislations table
CREATE TABLE IF NOT EXISTS legislations (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    category TEXT NOT NULL, -- 'Kanun', 'Yönetmelik', 'Genelge', 'Tebliğ'
    pdf_url TEXT,
    published_date DATE DEFAULT CURRENT_DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS
ALTER TABLE legislations ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Public Read Legislations" ON legislations FOR SELECT USING (true);
CREATE POLICY "Admin All Legislations" ON legislations FOR ALL USING (auth.role() = 'authenticated');
