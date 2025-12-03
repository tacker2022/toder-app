-- Enable RLS for all tables
ALTER TABLE members ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE associations ENABLE ROW LEVEL SECURITY;
ALTER TABLE applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery_images ENABLE ROW LEVEL SECURITY;

-- Members Policies
CREATE POLICY "Public Read Members" ON members FOR SELECT USING (true);
CREATE POLICY "Admin All Members" ON members FOR ALL USING (auth.role() = 'authenticated');

-- Events Policies
CREATE POLICY "Public Read Events" ON events FOR SELECT USING (true);
CREATE POLICY "Admin All Events" ON events FOR ALL USING (auth.role() = 'authenticated');

-- Associations Policies
CREATE POLICY "Public Read Associations" ON associations FOR SELECT USING (true);
CREATE POLICY "Admin All Associations" ON associations FOR ALL USING (auth.role() = 'authenticated');

-- Gallery Images Policies
CREATE POLICY "Public Read Gallery" ON gallery_images FOR SELECT USING (true);
CREATE POLICY "Admin All Gallery" ON gallery_images FOR ALL USING (auth.role() = 'authenticated');

-- Applications Policies (SENSITIVE DATA)
-- Public can only INSERT (submit application)
CREATE POLICY "Public Insert Applications" ON applications FOR INSERT WITH CHECK (true);
-- Only Admins can VIEW/EDIT/DELETE applications
CREATE POLICY "Admin All Applications" ON applications FOR ALL USING (auth.role() = 'authenticated');
