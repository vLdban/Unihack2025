-- Create job_announcements table
CREATE TABLE IF NOT EXISTS public.job_announcements (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL,
  price TEXT NOT NULL,
  location TEXT NOT NULL,
  is_promoted BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.job_announcements ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Job announcements are viewable by everyone" ON public.job_announcements;
DROP POLICY IF EXISTS "Users can create their own announcements" ON public.job_announcements;
DROP POLICY IF EXISTS "Users can update their own announcements" ON public.job_announcements;
DROP POLICY IF EXISTS "Users can delete their own announcements" ON public.job_announcements;

-- Create permissive policies for seeding
CREATE POLICY "Job announcements are viewable by everyone" 
ON public.job_announcements 
FOR SELECT 
USING (true);

CREATE POLICY "Allow all inserts to job announcements" 
ON public.job_announcements 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Users can update their own announcements" 
ON public.job_announcements 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own announcements" 
ON public.job_announcements 
FOR DELETE 
USING (auth.uid() = user_id);

-- Create trigger for automatic timestamp updates if not exists
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

DROP TRIGGER IF EXISTS update_job_announcements_updated_at ON public.job_announcements;

CREATE TRIGGER update_job_announcements_updated_at
BEFORE UPDATE ON public.job_announcements
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert 100 job announcements
INSERT INTO public.job_announcements (user_id, title, description, category, price, location, is_promoted, created_at)
VALUES
-- Construcții (17 jobs)
('00000000-0000-0000-0000-000000000001', 'Muncitor Construcții Generalist', 'Lucrări generale de construcție și demolări', 'Construcții', '2500 - 3500 RON', 'București', false, NOW()),
('00000000-0000-0000-0000-000000000001', 'Șef de Șantier Construcții', 'Supraveghere și coordonare șantier', 'Construcții', '3500 - 4500 RON', 'Cluj-Napoca', false, NOW()),
('00000000-0000-0000-0000-000000000001', 'Muncitor Zidărie Calificat', 'Zidărie și construcții în cărămidă', 'Construcții', '2200 - 3200 RON', 'Timișoara', false, NOW()),
('00000000-0000-0000-0000-000000000001', 'Operator Excavator', 'Manevrare excavator și mașini de construcție', 'Construcții', '2800 - 3800 RON', 'Constanța', false, NOW()),
('00000000-0000-0000-0000-000000000001', 'Installer Ferestrelor și Ușilor', 'Instalare ferestrelor și ușilor PVC', 'Construcții', '2000 - 2800 RON', 'Iași', false, NOW()),
('00000000-0000-0000-0000-000000000001', 'Muncitor Săpături și Terasament', 'Săpături și lucrări de terasament', 'Construcții', '2200 - 3000 RON', 'Brașov', false, NOW()),
('00000000-0000-0000-0000-000000000001', 'Specialist Acoperiș și Etanșări', 'Lucrări de acoperiș și etanșări', 'Construcții', '2400 - 3400 RON', 'Galați', false, NOW()),
('00000000-0000-0000-0000-000000000001', 'Installer Schelă Metalică', 'Montare și demontare schele metalice', 'Construcții', '2100 - 2900 RON', 'Craiova', false, NOW()),
('00000000-0000-0000-0000-000000000001', 'Muncitor Beton Armat', 'Lucrări de beton armat și precast', 'Construcții', '2300 - 3300 RON', 'Ploiești', false, NOW()),
('00000000-0000-0000-0000-000000000001', 'Inginer de Șantier', 'Coordonare tehnică și control calitate', 'Construcții', '4000 - 5500 RON', 'București', true, NOW()),
('00000000-0000-0000-0000-000000000001', 'Zidar Master Calificat', 'Zidărie avansată și reparații', 'Construcții', '2600 - 3600 RON', 'Cluj-Napoca', false, NOW()),
('00000000-0000-0000-0000-000000000001', 'Operator Mașini de Construcție', 'Manevrare utilaje grele de construcție', 'Construcții', '2700 - 3700 RON', 'Timișoara', false, NOW()),
('00000000-0000-0000-0000-000000000001', 'Specialist Hidroizolații', 'Hidroizolații și impermeabilizări', 'Construcții', '2500 - 3500 RON', 'Constanța', false, NOW()),
('00000000-0000-0000-0000-000000000001', 'Montor Gips și Materiale Ușoare', 'Montare gips carton și izolații', 'Construcții', '1900 - 2700 RON', 'Iași', false, NOW()),
('00000000-0000-0000-0000-000000000001', 'Muncitor Demolări Controlate', 'Demolări și dezafectare construcții', 'Construcții', '2400 - 3400 RON', 'Brașov', false, NOW()),
('00000000-0000-0000-0000-000000000001', 'Specialist Pali și Încastrări', 'Lucrări de pali și fundații', 'Construcții', '2800 - 3800 RON', 'Galați', false, NOW()),
('00000000-0000-0000-0000-000000000001', 'Muncitor Construcții Experiență', 'Diverse lucrări de construcție', 'Construcții', '2300 - 3200 RON', 'Craiova', false, NOW()),

-- Grădinărit (17 jobs)
('00000000-0000-0000-0000-000000000001', 'Grădinar Profesionist', 'Întreținere grădini și spații verzi', 'Grădinărit', '2000 - 2800 RON', 'București', false, NOW()),
('00000000-0000-0000-0000-000000000001', 'Specialist Peisaj și Amenajări', 'Design și amenajare peisaj', 'Grădinărit', '2500 - 3500 RON', 'Cluj-Napoca', false, NOW()),
('00000000-0000-0000-0000-000000000001', 'Tehnician Irigații Automate', 'Instalare și reparare sisteme irigații', 'Grădinărit', '2200 - 3200 RON', 'Timișoara', false, NOW()),
('00000000-0000-0000-0000-000000000001', 'Operator Tăiere și Spălare Copaci', 'Spălare copaci și îngrijire', 'Grădinărit', '2100 - 2900 RON', 'Constanța', false, NOW()),
('00000000-0000-0000-0000-000000000001', 'Specialist Plantări și Semănături', 'Plantare și îngrijire plante', 'Grădinărit', '1800 - 2600 RON', 'Iași', false, NOW()),
('00000000-0000-0000-0000-000000000001', 'Grădinar Specialist Flori și Arbuști', 'Îngrijire flori și arbuști ornamentali', 'Grădinărit', '1900 - 2700 RON', 'Brașov', false, NOW()),
('00000000-0000-0000-0000-000000000001', 'Tehnician Îngrășăminte și Tratamente', 'Tratamente phitosanitare și îngrășare', 'Grădinărit', '2000 - 2800 RON', 'Galați', false, NOW()),
('00000000-0000-0000-0000-000000000001', 'Operator Echipamente Grădinărit', 'Manevrare utilaje de grădinărit', 'Grădinărit', '2200 - 3000 RON', 'Craiova', false, NOW()),
('00000000-0000-0000-0000-000000000001', 'Specialist Terenuri Amenajate', 'Amenajare terenuri și spații verzi', 'Grădinărit', '2300 - 3200 RON', 'Ploiești', false, NOW()),
('00000000-0000-0000-0000-000000000001', 'Inginer Grădinărit și Peisaj', 'Proiectare și supervizare lucrări', 'Grădinărit', '3500 - 4500 RON', 'București', true, NOW()),
('00000000-0000-0000-0000-000000000001', 'Grădinar Master Experiență', 'Îngrijire avansată grădini', 'Grădinărit', '2400 - 3400 RON', 'Cluj-Napoca', false, NOW()),
('00000000-0000-0000-0000-000000000001', 'Specialist Gazon și Ierburi', 'Stabilire și întreținere gazon', 'Grădinărit', '1900 - 2700 RON', 'Timișoara', false, NOW()),
('00000000-0000-0000-0000-000000000001', 'Operator Curățare și Compost', 'Curățare deșeuri și preparare compost', 'Grădinărit', '1700 - 2500 RON', 'Constanța', false, NOW()),
('00000000-0000-0000-0000-000000000001', 'Specialist Pomi Fructiferi', 'Îngrijire și recoltare fructe', 'Grădinărit', '2000 - 2800 RON', 'Iași', false, NOW()),
('00000000-0000-0000-0000-000000000001', 'Tehnician Irigații Manuale', 'Irigare și înmulțire prin plante', 'Grădinărit', '1800 - 2600 RON', 'Brașov', false, NOW()),
('00000000-0000-0000-0000-000000000001', 'Grădinar pentru Spații Verzi Publice', 'Întreținere spații verzi publice', 'Grădinărit', '1900 - 2700 RON', 'Galați', false, NOW()),
('00000000-0000-0000-0000-000000000001', 'Specialist Aranjamente Florale', 'Aranjamente și decorații florale', 'Grădinărit', '2100 - 2900 RON', 'Craiova', false, NOW()),

-- Curățenie (17 jobs)
('00000000-0000-0000-0000-000000000001', 'Agent Curățenie Generalist', 'Curățenie generală spații', 'Curățenie', '1800 - 2400 RON', 'București', false, NOW()),
('00000000-0000-0000-0000-000000000001', 'Specialist Curățenie Birou și Comercial', 'Curățenie spații birou și magazine', 'Curățenie', '2000 - 2800 RON', 'Cluj-Napoca', false, NOW()),
('00000000-0000-0000-0000-000000000001', 'Tehnician Curățenie Industrial', 'Curățenie facilitati industriale', 'Curățenie', '2200 - 3000 RON', 'Timișoara', false, NOW()),
('00000000-0000-0000-0000-000000000001', 'Agent Curățenie Rezidențial', 'Curățenie apartamente și case', 'Curățenie', '1600 - 2400 RON', 'Constanța', false, NOW()),
('00000000-0000-0000-0000-000000000001', 'Specialist Spălare Geamuri și Fațade', 'Spălare geamuri și curățenie fațade', 'Curățenie', '1900 - 2700 RON', 'Iași', false, NOW()),
('00000000-0000-0000-0000-000000000001', 'Operator Mașini de Curățenie', 'Operare mașini curățenie profesionale', 'Curățenie', '2000 - 2800 RON', 'Brașov', false, NOW()),
('00000000-0000-0000-0000-000000000001', 'Agent Dezinfecție și Dezinsecție', 'Dezinfecții și servicii anti-dăunători', 'Curățenie', '2100 - 2900 RON', 'Galați', false, NOW()),
('00000000-0000-0000-0000-000000000001', 'Specialist Curățenie Medicală', 'Curățenie spații medicale steril', 'Curățenie', '2300 - 3200 RON', 'Craiova', false, NOW()),
('00000000-0000-0000-0000-000000000001', 'Agent Curățenie Monumente și Patrimoniu', 'Curățenie restaurare monumente', 'Curățenie', '2200 - 3000 RON', 'Ploiești', false, NOW()),
('00000000-0000-0000-0000-000000000001', 'Supraveghetor Curățenie și Igienă', 'Supervizare servicii de curățenie', 'Curățenie', '2500 - 3500 RON', 'București', true, NOW()),
('00000000-0000-0000-0000-000000000001', 'Agent Curățenie Experiență', 'Curățenie avan și ecran profesional', 'Curățenie', '2100 - 2900 RON', 'Cluj-Napoca', false, NOW()),
('00000000-0000-0000-0000-000000000001', 'Specialist Curățenie Ferestre și Spații Înalte', 'Curățenie geamuri la înălțime', 'Curățenie', '2200 - 3000 RON', 'Timișoara', false, NOW()),
('00000000-0000-0000-0000-000000000001', 'Tehnician Curățenie Apă Sub Presiune', 'Hidrocurățare și jet presiune', 'Curățenie', '2000 - 2800 RON', 'Constanța', false, NOW()),
('00000000-0000-0000-0000-000000000001', 'Agent Spălare Automobile', 'Spălare și detailing automobile', 'Curățenie', '1700 - 2500 RON', 'Iași', false, NOW()),
('00000000-0000-0000-0000-000000000001', 'Specialist Curățenie Mochete și Tapițerie', 'Curățenie textile și tapițerie', 'Curățenie', '1900 - 2700 RON', 'Brașov', false, NOW()),
('00000000-0000-0000-0000-000000000001', 'Agent Curățenie Restaurante și Bucătării', 'Curățenie speciale bucătării', 'Curățenie', '2000 - 2800 RON', 'Galați', false, NOW()),
('00000000-0000-0000-0000-000000000001', 'Operator Depozite și Spații Amplu', 'Curățenie depozite și hale', 'Curățenie', '1800 - 2600 RON', 'Craiova', false, NOW()),

-- Instalații (17 jobs)
('00000000-0000-0000-0000-000000000001', 'Instalator Apă și Gaze', 'Instalare și reparare conducte apă-gaze', 'Instalații', '2400 - 3400 RON', 'București', false, NOW()),
('00000000-0000-0000-0000-000000000001', 'Electrician Orizont Complet', 'Instalații electrice și iluminat', 'Instalații', '2500 - 3500 RON', 'Cluj-Napoca', false, NOW()),
('00000000-0000-0000-0000-000000000001', 'Instalator Încălzire și Climatizare', 'Instalare sisteme HVAC', 'Instalații', '2800 - 3800 RON', 'Timișoara', false, NOW()),
('00000000-0000-0000-0000-000000000001', 'Technician Panouri Solare și Renewable', 'Instalare panouri solare și energii verzi', 'Instalații', '2700 - 3700 RON', 'Constanța', false, NOW()),
('00000000-0000-0000-0000-000000000001', 'Instalator Canalizare și Scurgeri', 'Instalare și reparare canalizare', 'Instalații', '2200 - 3200 RON', 'Iași', false, NOW()),
('00000000-0000-0000-0000-000000000001', 'Instalator Sisteme Securitate', 'Instalare alarme și sisteme video', 'Instalații', '2400 - 3400 RON', 'Brașov', false, NOW()),
('00000000-0000-0000-0000-000000000001', 'Specialist Instalații Ascensor', 'Reparare și întreținere ascensoare', 'Instalații', '3000 - 4000 RON', 'Galați', false, NOW()),
('00000000-0000-0000-0000-000000000001', 'Electrician Tablouri și Panouri', 'Instalare tablouri și panou electric', 'Instalații', '2300 - 3300 RON', 'Craiova', false, NOW()),
('00000000-0000-0000-0000-000000000001', 'Instalator Fotoelectric și Domotică', 'Instalare sisteme domotice', 'Instalații', '2600 - 3600 RON', 'Ploiești', false, NOW()),
('00000000-0000-0000-0000-000000000001', 'Inginer Instalații și Utilități', 'Proiectare instalații tehnice', 'Instalații', '4000 - 5000 RON', 'București', true, NOW()),
('00000000-0000-0000-0000-000000000001', 'Instalator Apă Fierbinte Sanitar', 'Instalare boilere și sisteme sanitar', 'Instalații', '2400 - 3400 RON', 'Cluj-Napoca', false, NOW()),
('00000000-0000-0000-0000-000000000001', 'Technician Pompe și Compresoare', 'Instalare și reparare pompe', 'Instalații', '2500 - 3500 RON', 'Timișoara', false, NOW()),
('00000000-0000-0000-0000-000000000001', 'Electrician Iluminat Industrial', 'Iluminat și instalații industriale', 'Instalații', '2400 - 3400 RON', 'Constanța', false, NOW()),
('00000000-0000-0000-0000-000000000001', 'Instalator Sisteme Ventilare', 'Instalare canaluri ventilare', 'Instalații', '2300 - 3300 RON', 'Iași', false, NOW()),
('00000000-0000-0000-0000-000000000001', 'Specialist Rețele Internet și Comunicații', 'Instalare rețele de date', 'Instalații', '2400 - 3400 RON', 'Brașov', false, NOW()),
('00000000-0000-0000-0000-000000000001', 'Technician Reparare și Mentenanță', 'Reparare și mentenanță sisteme', 'Instalații', '2200 - 3200 RON', 'Galați', false, NOW()),
('00000000-0000-0000-0000-000000000001', 'Instalator Conducte Industriale', 'Instalare conducte oțel și inox', 'Instalații', '2600 - 3600 RON', 'Craiova', false, NOW()),

-- Pictură (17 jobs)
('00000000-0000-0000-0000-000000000001', 'Zugrav Profesionist', 'Zugravit interior și exterior', 'Pictură', '1800 - 2600 RON', 'București', false, NOW()),
('00000000-0000-0000-0000-000000000001', 'Specialist Vopsire Fațade', 'Vopsire și protecție fațade', 'Pictură', '2200 - 3000 RON', 'Cluj-Napoca', false, NOW()),
('00000000-0000-0000-0000-000000000001', 'Pictor Decorative și Finisaje', 'Finisaje decorative și stucuri', 'Pictură', '2100 - 2900 RON', 'Timișoara', false, NOW()),
('00000000-0000-0000-0000-000000000001', 'Specialist Vopsire Industrială', 'Vopsire metal și echipamente', 'Pictură', '2300 - 3200 RON', 'Constanța', false, NOW()),
('00000000-0000-0000-0000-000000000001', 'Zugrav Restaurare Monumente', 'Restaurare vopsire monumente', 'Pictură', '2400 - 3400 RON', 'Iași', false, NOW()),
('00000000-0000-0000-0000-000000000001', 'Pictor Designer Interior', 'Design și soluții pictură interior', 'Pictură', '2500 - 3500 RON', 'Brașov', false, NOW()),
('00000000-0000-0000-0000-000000000001', 'Specialist Tapete și Finisuri', 'Aplicare tapete și finisuri decorative', 'Pictură', '1900 - 2700 RON', 'Galați', false, NOW()),
('00000000-0000-0000-0000-000000000001', 'Zugrav Spații Comerciale', 'Zugravit magazine și spații publice', 'Pictură', '2000 - 2800 RON', 'Craiova', false, NOW()),
('00000000-0000-0000-0000-000000000001', 'Pictor Mural și Street Art', 'Realizare murali și picturi perete', 'Pictură', '2400 - 3400 RON', 'Ploiești', false, NOW()),
('00000000-0000-0000-0000-000000000001', 'Master Pictor Experiență', 'Pictură avansată și specială', 'Pictură', '2700 - 3700 RON', 'București', true, NOW()),
('00000000-0000-0000-0000-000000000001', 'Specialist Vopsire Metale Prețioase', 'Vopsire și protecție metale', 'Pictură', '2500 - 3500 RON', 'Cluj-Napoca', false, NOW()),
('00000000-0000-0000-0000-000000000001', 'Zugrav Spații Medicale', 'Vopsire camere sterile medicale', 'Pictură', '2300 - 3200 RON', 'Timișoara', false, NOW()),
('00000000-0000-0000-0000-000000000001', 'Pictor Efecte și Tehnici Speciale', 'Efecte speciale și texturi', 'Pictură', '2200 - 3000 RON', 'Constanța', false, NOW()),
('00000000-0000-0000-0000-000000000001', 'Specialist Prelucrare Lemn Vopsit', 'Vopsire și finisare lemn', 'Pictură', '2000 - 2800 RON', 'Iași', false, NOW()),
('00000000-0000-0000-0000-000000000001', 'Zugrav pentru Restaurări', 'Restaurare și reparare pictură veche', 'Pictură', '2400 - 3400 RON', 'Brașov', false, NOW()),
('00000000-0000-0000-0000-000000000001', 'Pictor Apartamente și Case', 'Zugravit și vopsire rezidențial', 'Pictură', '1900 - 2700 RON', 'Galați', false, NOW()),
('00000000-0000-0000-0000-000000000001', 'Specialist Vopsire Rapid și Premium', 'Vopsire expresă cu garantie', 'Pictură', '2100 - 2900 RON', 'Craiova', false, NOW()),

-- Altele (15 jobs)
('00000000-0000-0000-0000-000000000001', 'Instalator Mobilier și Elemente', 'Asamblare și instalare mobilier', 'Altele', '1800 - 2600 RON', 'București', false, NOW()),
('00000000-0000-0000-0000-000000000001', 'Reparator Obiecte și Mobilă', 'Reparare mobilier și obiecte', 'Altele', '1900 - 2700 RON', 'Cluj-Napoca', false, NOW()),
('00000000-0000-0000-0000-000000000001', 'Specialist Transport și Mutări', 'Transport și organizare mutări', 'Altele', '2200 - 3000 RON', 'Timișoara', false, NOW()),
('00000000-0000-0000-0000-000000000001', 'Muncitor Diverse și Mentenanță', 'Lucrări diverse și mentenanță', 'Altele', '1700 - 2500 RON', 'Constanța', false, NOW()),
('00000000-0000-0000-0000-000000000001', 'Specialist Reparare Electrocasnice', 'Reparare aparate electrice', 'Altele', '2000 - 2800 RON', 'Iași', false, NOW()),
('00000000-0000-0000-0000-000000000001', 'Tehnician Reparare Usi și Ferestre', 'Reparare usi și ferestre', 'Altele', '1900 - 2700 RON', 'Brașov', false, NOW()),
('00000000-0000-0000-0000-000000000001', 'Specialist Îngrijire și Curățenie Profundă', 'Curățenie profundă spații', 'Altele', '2100 - 2900 RON', 'Galați', false, NOW()),
('00000000-0000-0000-0000-000000000001', 'Muncitor Lemn și Tâmplărie', 'Lucrări lemn și tâmplărie', 'Altele', '2100 - 2900 RON', 'Craiova', false, NOW()),
('00000000-0000-0000-0000-000000000001', 'Reparator Diverse Spații Publice', 'Reparare infrastructură publică', 'Altele', '2200 - 3000 RON', 'Ploiești', false, NOW()),
('00000000-0000-0000-0000-000000000001', 'Operator Deșeuri și Reciclare', 'Gestionare deșeuri și reciclare', 'Altele', '1900 - 2700 RON', 'București', false, NOW()),
('00000000-0000-0000-0000-000000000001', 'Specialist Depozitare și Organizare', 'Organizare și optimizare spații', 'Altele', '1800 - 2600 RON', 'Cluj-Napoca', false, NOW()),
('00000000-0000-0000-0000-000000000001', 'Muncitor Diverse Construire Mobilă', 'Construire și asamblare mobile', 'Altele', '1900 - 2700 RON', 'Timișoara', false, NOW()),
('00000000-0000-0000-0000-000000000001', 'Reparator Usi Metalice și Grile', 'Reparare usi și sisteme de siguranță', 'Altele', '2000 - 2800 RON', 'Constanța', false, NOW()),
('00000000-0000-0000-0000-000000000001', 'Specialist Lucrări Diverse și Mecanică', 'Reparare și mentenanță mecanică', 'Altele', '2100 - 2900 RON', 'Iași', false, NOW()),
('00000000-0000-0000-0000-000000000001', 'Muncitor Diverse Generalist', 'Diverse lucrări și mentenanță', 'Altele', '1800 - 2600 RON', 'Brașov', false, NOW());
