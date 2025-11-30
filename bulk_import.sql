-- 1. Add board_type column (if not exists)
alter table members add column if not exists board_type text;

-- 2. Insert Data
insert into members (name, company, role, board_type, image_url) values
('Selami Balcı', 'PARKEXPERT', 'Başkan', 'Asil', ''),
('Nafiz Muzaffer Eğilmez', 'EMPARK', 'Başkan Yardımcısı', 'Asil', ''),
('Murat Tekeli', 'METCOM', 'Genel Sekreter', 'Asil', ''),
('Remzi Kösem', 'PRESTON İNŞAAT', 'Sayman', 'Asil', ''),
('Muhammed Alyürük', 'İNTETRA', 'Üye', 'Asil', ''),
('Veysel Bakırtaş', 'OTOVINN', 'Üye', 'Asil', ''),
('Sezgin Demirtaş', 'PARKJET', 'Üye', 'Asil', ''),
('Cenk Dizener', 'ERBEN', 'Üye', 'Yedek', ''),
('Müştak Ağrikli', 'PARKOLAY', 'Üye', 'Yedek', ''),
('Cüneyt Şener', 'ŞANMAK', 'Üye', 'Yedek', ''),
('Çağatay Özen', 'POLİPARK', 'Üye', 'Yedek', ''),
('Acun Murat Tekin', 'Kuşdili Otopark', 'Üye', 'Yedek', ''),
('Hasan Ustaosmanoğlu', 'ANTASET YAZILIM TEKNOLOJİ A.Ş.', 'Üye', 'Yedek', ''),
('Erkan Doğan', 'EKSERA', 'Üye', 'Yedek', '');
