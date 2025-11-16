-- Adaugă coloana phone la tabela job_announcements
-- Rulează în Supabase SQL Editor

ALTER TABLE job_announcements 
ADD COLUMN IF NOT EXISTS phone TEXT;

-- Generează numere de telefon unice pentru toate anunțurile
UPDATE job_announcements 
SET phone = '07' || LPAD((RANDOM() * 100000000)::BIGINT::TEXT, 8, '0')
WHERE phone IS NULL;

-- Fă coloana obligatorie pentru viitor
ALTER TABLE job_announcements 
ALTER COLUMN phone SET NOT NULL;
