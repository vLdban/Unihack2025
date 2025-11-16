import { createClient } from '@supabase/supabase-js'
import fs from 'fs'

const supabaseUrl = 'https://gcprcghqfpjwpykpccxn.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdjcHJjZ2hxZnBqd3B5a3BjY3huIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI2ODU5NTYsImV4cCI6MjA3ODI2MTk1Nn0.fTmQca9ChBX4GszPNp8VJRLMzPuue7WXsul_WwpZyU4'

const supabase = createClient(supabaseUrl, supabaseKey)

// Data for 100 jobs
const jobs = [
  // Construcții (17 jobs)
  { user_id: '00000000-0000-0000-0000-000000000001', title: 'Muncitor Construcții Generalist', description: 'Lucrări generale de construcție și demolări', category: 'Construcții', price: '2500 - 3500 RON', location: 'București', is_promoted: false },
  { user_id: '00000000-0000-0000-0000-000000000001', title: 'Șef de Șantier Construcții', description: 'Supraveghere și coordonare șantier', category: 'Construcții', price: '3500 - 4500 RON', location: 'Cluj-Napoca', is_promoted: false },
  { user_id: '00000000-0000-0000-0000-000000000001', title: 'Muncitor Zidărie Calificat', description: 'Zidărie și construcții în cărămidă', category: 'Construcții', price: '2200 - 3200 RON', location: 'Timișoara', is_promoted: false },
  { user_id: '00000000-0000-0000-0000-000000000001', title: 'Operator Excavator', description: 'Manevrare excavator și mașini de construcție', category: 'Construcții', price: '2800 - 3800 RON', location: 'Constanța', is_promoted: false },
  { user_id: '00000000-0000-0000-0000-000000000001', title: 'Installer Ferestrelor și Ușilor', description: 'Instalare ferestrelor și ușilor PVC', category: 'Construcții', price: '2000 - 2800 RON', location: 'Iași', is_promoted: false },
  { user_id: '00000000-0000-0000-0000-000000000001', title: 'Muncitor Săpături și Terasament', description: 'Săpături și lucrări de terasament', category: 'Construcții', price: '2200 - 3000 RON', location: 'Brașov', is_promoted: false },
  { user_id: '00000000-0000-0000-0000-000000000001', title: 'Specialist Acoperiș și Etanșări', description: 'Lucrări de acoperiș și etanșări', category: 'Construcții', price: '2400 - 3400 RON', location: 'Galați', is_promoted: false },
  { user_id: '00000000-0000-0000-0000-000000000001', title: 'Installer Schelă Metalică', description: 'Montare și demontare schele metalice', category: 'Construcții', price: '2100 - 2900 RON', location: 'Craiova', is_promoted: false },
  { user_id: '00000000-0000-0000-0000-000000000001', title: 'Muncitor Beton Armat', description: 'Lucrări de beton armat și precast', category: 'Construcții', price: '2300 - 3300 RON', location: 'Ploiești', is_promoted: false },
  { user_id: '00000000-0000-0000-0000-000000000001', title: 'Inginer de Șantier', description: 'Coordonare tehnică și control calitate', category: 'Construcții', price: '4000 - 5500 RON', location: 'București', is_promoted: true },
  { user_id: '00000000-0000-0000-0000-000000000001', title: 'Zidar Master Calificat', description: 'Zidărie avansată și reparații', category: 'Construcții', price: '2600 - 3600 RON', location: 'Cluj-Napoca', is_promoted: false },
  { user_id: '00000000-0000-0000-0000-000000000001', title: 'Operator Mașini de Construcție', description: 'Manevrare utilaje grele de construcție', category: 'Construcții', price: '2700 - 3700 RON', location: 'Timișoara', is_promoted: false },
  { user_id: '00000000-0000-0000-0000-000000000001', title: 'Specialist Hidroizolații', description: 'Hidroizolații și impermeabilizări', category: 'Construcții', price: '2500 - 3500 RON', location: 'Constanța', is_promoted: false },
  { user_id: '00000000-0000-0000-0000-000000000001', title: 'Montor Gips și Materiale Ușoare', description: 'Montare gips carton și izolații', category: 'Construcții', price: '1900 - 2700 RON', location: 'Iași', is_promoted: false },
  { user_id: '00000000-0000-0000-0000-000000000001', title: 'Muncitor Demolări Controlate', description: 'Demolări și dezafectare construcții', category: 'Construcții', price: '2400 - 3400 RON', location: 'Brașov', is_promoted: false },
  { user_id: '00000000-0000-0000-0000-000000000001', title: 'Specialist Pali și Încastrări', description: 'Lucrări de pali și fundații', category: 'Construcții', price: '2800 - 3800 RON', location: 'Galați', is_promoted: false },
  { user_id: '00000000-0000-0000-0000-000000000001', title: 'Muncitor Construcții Experiență', description: 'Diverse lucrări de construcție', category: 'Construcții', price: '2300 - 3200 RON', location: 'Craiova', is_promoted: false },

  // Grădinărit (17 jobs)
  { user_id: '00000000-0000-0000-0000-000000000001', title: 'Grădinar Profesionist', description: 'Întreținere grădini și spații verzi', category: 'Grădinărit', price: '2000 - 2800 RON', location: 'București', is_promoted: false },
  { user_id: '00000000-0000-0000-0000-000000000001', title: 'Specialist Peisaj și Amenajări', description: 'Design și amenajare peisaj', category: 'Grădinărit', price: '2500 - 3500 RON', location: 'Cluj-Napoca', is_promoted: false },
  { user_id: '00000000-0000-0000-0000-000000000001', title: 'Tehnician Irigații Automate', description: 'Instalare și reparare sisteme irigații', category: 'Grădinărit', price: '2200 - 3200 RON', location: 'Timișoara', is_promoted: false },
  { user_id: '00000000-0000-0000-0000-000000000001', title: 'Operator Tăiere și Spălare Copaci', description: 'Spălare copaci și îngrijire', category: 'Grădinărit', price: '2100 - 2900 RON', location: 'Constanța', is_promoted: false },
  { user_id: '00000000-0000-0000-0000-000000000001', title: 'Specialist Plantări și Semănături', description: 'Plantare și îngrijire plante', category: 'Grădinărit', price: '1800 - 2600 RON', location: 'Iași', is_promoted: false },
  { user_id: '00000000-0000-0000-0000-000000000001', title: 'Grădinar Specialist Flori și Arbuști', description: 'Îngrijire flori și arbuști ornamentali', category: 'Grădinărit', price: '1900 - 2700 RON', location: 'Brașov', is_promoted: false },
  { user_id: '00000000-0000-0000-0000-000000000001', title: 'Tehnician Îngrășăminte și Tratamente', description: 'Tratamente phitosanitare și îngrășare', category: 'Grădinărit', price: '2000 - 2800 RON', location: 'Galați', is_promoted: false },
  { user_id: '00000000-0000-0000-0000-000000000001', title: 'Operator Echipamente Grădinărit', description: 'Manevrare utilaje de grădinărit', category: 'Grădinărit', price: '2200 - 3000 RON', location: 'Craiova', is_promoted: false },
  { user_id: '00000000-0000-0000-0000-000000000001', title: 'Specialist Terenuri Amenajate', description: 'Amenajare terenuri și spații verzi', category: 'Grădinărit', price: '2300 - 3200 RON', location: 'Ploiești', is_promoted: false },
  { user_id: '00000000-0000-0000-0000-000000000001', title: 'Inginer Grădinărit și Peisaj', description: 'Proiectare și supervizare lucrări', category: 'Grădinărit', price: '3500 - 4500 RON', location: 'București', is_promoted: true },
  { user_id: '00000000-0000-0000-0000-000000000001', title: 'Grădinar Master Experiență', description: 'Îngrijire avansată grădini', category: 'Grădinărit', price: '2400 - 3400 RON', location: 'Cluj-Napoca', is_promoted: false },
  { user_id: '00000000-0000-0000-0000-000000000001', title: 'Specialist Gazon și Ierburi', description: 'Stabilire și întreținere gazon', category: 'Grădinărit', price: '1900 - 2700 RON', location: 'Timișoara', is_promoted: false },
  { user_id: '00000000-0000-0000-0000-000000000001', title: 'Operator Curățare și Compost', description: 'Curățare deșeuri și preparare compost', category: 'Grădinărit', price: '1700 - 2500 RON', location: 'Constanța', is_promoted: false },
  { user_id: '00000000-0000-0000-0000-000000000001', title: 'Specialist Pomi Fructiferi', description: 'Îngrijire și recoltare fructe', category: 'Grădinărit', price: '2000 - 2800 RON', location: 'Iași', is_promoted: false },
  { user_id: '00000000-0000-0000-0000-000000000001', title: 'Tehnician Irigații Manuale', description: 'Irigare și înmulțire prin plante', category: 'Grădinărit', price: '1800 - 2600 RON', location: 'Brașov', is_promoted: false },
  { user_id: '00000000-0000-0000-0000-000000000001', title: 'Grădinar pentru Spații Verzi Publice', description: 'Întreținere spații verzi publice', category: 'Grădinărit', price: '1900 - 2700 RON', location: 'Galați', is_promoted: false },
  { user_id: '00000000-0000-0000-0000-000000000001', title: 'Specialist Aranjamente Florale', description: 'Aranjamente și decorații florale', category: 'Grădinărit', price: '2100 - 2900 RON', location: 'Craiova', is_promoted: false },

  // Curățenie (17 jobs)
  { user_id: '00000000-0000-0000-0000-000000000001', title: 'Agent Curățenie Generalist', description: 'Curățenie generală spații', category: 'Curățenie', price: '1800 - 2400 RON', location: 'București', is_promoted: false },
  { user_id: '00000000-0000-0000-0000-000000000001', title: 'Specialist Curățenie Birou și Comercial', description: 'Curățenie spații birou și magazine', category: 'Curățenie', price: '2000 - 2800 RON', location: 'Cluj-Napoca', is_promoted: false },
  { user_id: '00000000-0000-0000-0000-000000000001', title: 'Tehnician Curățenie Industrial', description: 'Curățenie facilitati industriale', category: 'Curățenie', price: '2200 - 3000 RON', location: 'Timișoara', is_promoted: false },
  { user_id: '00000000-0000-0000-0000-000000000001', title: 'Agent Curățenie Rezidențial', description: 'Curățenie apartamente și case', category: 'Curățenie', price: '1600 - 2400 RON', location: 'Constanța', is_promoted: false },
  { user_id: '00000000-0000-0000-0000-000000000001', title: 'Specialist Spălare Geamuri și Fațade', description: 'Spălare geamuri și curățenie fațade', category: 'Curățenie', price: '1900 - 2700 RON', location: 'Iași', is_promoted: false },
  { user_id: '00000000-0000-0000-0000-000000000001', title: 'Operator Mașini de Curățenie', description: 'Operare mașini curățenie profesionale', category: 'Curățenie', price: '2000 - 2800 RON', location: 'Brașov', is_promoted: false },
  { user_id: '00000000-0000-0000-0000-000000000001', title: 'Agent Dezinfecție și Dezinsecție', description: 'Dezinfecții și servicii anti-dăunători', category: 'Curățenie', price: '2100 - 2900 RON', location: 'Galați', is_promoted: false },
  { user_id: '00000000-0000-0000-0000-000000000001', title: 'Specialist Curățenie Medicală', description: 'Curățenie spații medicale steril', category: 'Curățenie', price: '2300 - 3200 RON', location: 'Craiova', is_promoted: false },
  { user_id: '00000000-0000-0000-0000-000000000001', title: 'Agent Curățenie Monumente și Patrimoniu', description: 'Curățenie restaurare monumente', category: 'Curățenie', price: '2200 - 3000 RON', location: 'Ploiești', is_promoted: false },
  { user_id: '00000000-0000-0000-0000-000000000001', title: 'Supraveghetor Curățenie și Igienă', description: 'Supervizare servicii de curățenie', category: 'Curățenie', price: '2500 - 3500 RON', location: 'București', is_promoted: true },
  { user_id: '00000000-0000-0000-0000-000000000001', title: 'Agent Curățenie Experiență', description: 'Curățenie avan și ecran profesional', category: 'Curățenie', price: '2100 - 2900 RON', location: 'Cluj-Napoca', is_promoted: false },
  { user_id: '00000000-0000-0000-0000-000000000001', title: 'Specialist Curățenie Ferestre și Spații Înalte', description: 'Curățenie geamuri la înălțime', category: 'Curățenie', price: '2200 - 3000 RON', location: 'Timișoara', is_promoted: false },
  { user_id: '00000000-0000-0000-0000-000000000001', title: 'Tehnician Curățenie Apă Sub Presiune', description: 'Hidrocurățare și jet presiune', category: 'Curățenie', price: '2000 - 2800 RON', location: 'Constanța', is_promoted: false },
  { user_id: '00000000-0000-0000-0000-000000000001', title: 'Agent Spălare Automobile', description: 'Spălare și detailing automobile', category: 'Curățenie', price: '1700 - 2500 RON', location: 'Iași', is_promoted: false },
  { user_id: '00000000-0000-0000-0000-000000000001', title: 'Specialist Curățenie Mochete și Tapițerie', description: 'Curățenie textile și tapițerie', category: 'Curățenie', price: '1900 - 2700 RON', location: 'Brașov', is_promoted: false },
  { user_id: '00000000-0000-0000-0000-000000000001', title: 'Agent Curățenie Restaurante și Bucătării', description: 'Curățenie speciale bucătării', category: 'Curățenie', price: '2000 - 2800 RON', location: 'Galați', is_promoted: false },
  { user_id: '00000000-0000-0000-0000-000000000001', title: 'Operator Depozite și Spații Amplu', description: 'Curățenie depozite și hale', category: 'Curățenie', price: '1800 - 2600 RON', location: 'Craiova', is_promoted: false },

  // Instalații (17 jobs)
  { user_id: '00000000-0000-0000-0000-000000000001', title: 'Instalator Apă și Gaze', description: 'Instalare și reparare conducte apă-gaze', category: 'Instalații', price: '2400 - 3400 RON', location: 'București', is_promoted: false },
  { user_id: '00000000-0000-0000-0000-000000000001', title: 'Electrician Orizont Complet', description: 'Instalații electrice și iluminat', category: 'Instalații', price: '2500 - 3500 RON', location: 'Cluj-Napoca', is_promoted: false },
  { user_id: '00000000-0000-0000-0000-000000000001', title: 'Instalator Încălzire și Climatizare', description: 'Instalare sisteme HVAC', category: 'Instalații', price: '2800 - 3800 RON', location: 'Timișoara', is_promoted: false },
  { user_id: '00000000-0000-0000-0000-000000000001', title: 'Technician Panouri Solare și Renewable', description: 'Instalare panouri solare și energii verzi', category: 'Instalații', price: '2700 - 3700 RON', location: 'Constanța', is_promoted: false },
  { user_id: '00000000-0000-0000-0000-000000000001', title: 'Instalator Canalizare și Scurgeri', description: 'Instalare și reparare canalizare', category: 'Instalații', price: '2200 - 3200 RON', location: 'Iași', is_promoted: false },
  { user_id: '00000000-0000-0000-0000-000000000001', title: 'Instalator Sisteme Securitate', description: 'Instalare alarme și sisteme video', category: 'Instalații', price: '2400 - 3400 RON', location: 'Brașov', is_promoted: false },
  { user_id: '00000000-0000-0000-0000-000000000001', title: 'Specialist Instalații Ascensor', description: 'Reparare și întreținere ascensoare', category: 'Instalații', price: '3000 - 4000 RON', location: 'Galați', is_promoted: false },
  { user_id: '00000000-0000-0000-0000-000000000001', title: 'Electrician Tablouri și Panouri', description: 'Instalare tablouri și panou electric', category: 'Instalații', price: '2300 - 3300 RON', location: 'Craiova', is_promoted: false },
  { user_id: '00000000-0000-0000-0000-000000000001', title: 'Instalator Fotoelectric și Domotică', description: 'Instalare sisteme domotice', category: 'Instalații', price: '2600 - 3600 RON', location: 'Ploiești', is_promoted: false },
  { user_id: '00000000-0000-0000-0000-000000000001', title: 'Inginer Instalații și Utilități', description: 'Proiectare instalații tehnice', category: 'Instalații', price: '4000 - 5000 RON', location: 'București', is_promoted: true },
  { user_id: '00000000-0000-0000-0000-000000000001', title: 'Instalator Apă Fierbinte Sanitar', description: 'Instalare boilere și sisteme sanitar', category: 'Instalații', price: '2400 - 3400 RON', location: 'Cluj-Napoca', is_promoted: false },
  { user_id: '00000000-0000-0000-0000-000000000001', title: 'Technician Pompe și Compresoare', description: 'Instalare și reparare pompe', category: 'Instalații', price: '2500 - 3500 RON', location: 'Timișoara', is_promoted: false },
  { user_id: '00000000-0000-0000-0000-000000000001', title: 'Electrician Iluminat Industrial', description: 'Iluminat și instalații industriale', category: 'Instalații', price: '2400 - 3400 RON', location: 'Constanța', is_promoted: false },
  { user_id: '00000000-0000-0000-0000-000000000001', title: 'Instalator Sisteme Ventilare', description: 'Instalare canaluri ventilare', category: 'Instalații', price: '2300 - 3300 RON', location: 'Iași', is_promoted: false },
  { user_id: '00000000-0000-0000-0000-000000000001', title: 'Specialist Rețele Internet și Comunicații', description: 'Instalare rețele de date', category: 'Instalații', price: '2400 - 3400 RON', location: 'Brașov', is_promoted: false },
  { user_id: '00000000-0000-0000-0000-000000000001', title: 'Technician Reparare și Mentenanță', description: 'Reparare și mentenanță sisteme', category: 'Instalații', price: '2200 - 3200 RON', location: 'Galați', is_promoted: false },
  { user_id: '00000000-0000-0000-0000-000000000001', title: 'Instalator Conducte Industriale', description: 'Instalare conducte oțel și inox', category: 'Instalații', price: '2600 - 3600 RON', location: 'Craiova', is_promoted: false },

  // Pictură (17 jobs)
  { user_id: '00000000-0000-0000-0000-000000000001', title: 'Zugrav Profesionist', description: 'Zugravit interior și exterior', category: 'Pictură', price: '1800 - 2600 RON', location: 'București', is_promoted: false },
  { user_id: '00000000-0000-0000-0000-000000000001', title: 'Specialist Vopsire Fațade', description: 'Vopsire și protecție fațade', category: 'Pictură', price: '2200 - 3000 RON', location: 'Cluj-Napoca', is_promoted: false },
  { user_id: '00000000-0000-0000-0000-000000000001', title: 'Pictor Decorative și Finisaje', description: 'Finisaje decorative și stucuri', category: 'Pictură', price: '2100 - 2900 RON', location: 'Timișoara', is_promoted: false },
  { user_id: '00000000-0000-0000-0000-000000000001', title: 'Specialist Vopsire Industrială', description: 'Vopsire metal și echipamente', category: 'Pictură', price: '2300 - 3200 RON', location: 'Constanța', is_promoted: false },
  { user_id: '00000000-0000-0000-0000-000000000001', title: 'Zugrav Restaurare Monumente', description: 'Restaurare vopsire monumente', category: 'Pictură', price: '2400 - 3400 RON', location: 'Iași', is_promoted: false },
  { user_id: '00000000-0000-0000-0000-000000000001', title: 'Pictor Designer Interior', description: 'Design și soluții pictură interior', category: 'Pictură', price: '2500 - 3500 RON', location: 'Brașov', is_promoted: false },
  { user_id: '00000000-0000-0000-0000-000000000001', title: 'Specialist Tapete și Finisuri', description: 'Aplicare tapete și finisuri decorative', category: 'Pictură', price: '1900 - 2700 RON', location: 'Galați', is_promoted: false },
  { user_id: '00000000-0000-0000-0000-000000000001', title: 'Zugrav Spații Comerciale', description: 'Zugravit magazine și spații publice', category: 'Pictură', price: '2000 - 2800 RON', location: 'Craiova', is_promoted: false },
  { user_id: '00000000-0000-0000-0000-000000000001', title: 'Pictor Mural și Street Art', description: 'Realizare murali și picturi perete', category: 'Pictură', price: '2400 - 3400 RON', location: 'Ploiești', is_promoted: false },
  { user_id: '00000000-0000-0000-0000-000000000001', title: 'Master Pictor Experiență', description: 'Pictură avansată și specială', category: 'Pictură', price: '2700 - 3700 RON', location: 'București', is_promoted: true },
  { user_id: '00000000-0000-0000-0000-000000000001', title: 'Specialist Vopsire Metale Prețioase', description: 'Vopsire și protecție metale', category: 'Pictură', price: '2500 - 3500 RON', location: 'Cluj-Napoca', is_promoted: false },
  { user_id: '00000000-0000-0000-0000-000000000001', title: 'Zugrav Spații Medicale', description: 'Vopsire camere sterile medicale', category: 'Pictură', price: '2300 - 3200 RON', location: 'Timișoara', is_promoted: false },
  { user_id: '00000000-0000-0000-0000-000000000001', title: 'Pictor Efecte și Tehnici Speciale', description: 'Efecte speciale și texturi', category: 'Pictură', price: '2200 - 3000 RON', location: 'Constanța', is_promoted: false },
  { user_id: '00000000-0000-0000-0000-000000000001', title: 'Specialist Prelucrare Lemn Vopsit', description: 'Vopsire și finisare lemn', category: 'Pictură', price: '2000 - 2800 RON', location: 'Iași', is_promoted: false },
  { user_id: '00000000-0000-0000-0000-000000000001', title: 'Zugrav pentru Restaurări', description: 'Restaurare și reparare pictură veche', category: 'Pictură', price: '2400 - 3400 RON', location: 'Brașov', is_promoted: false },
  { user_id: '00000000-0000-0000-0000-000000000001', title: 'Pictor Apartamente și Case', description: 'Zugravit și vopsire rezidențial', category: 'Pictură', price: '1900 - 2700 RON', location: 'Galați', is_promoted: false },
  { user_id: '00000000-0000-0000-0000-000000000001', title: 'Specialist Vopsire Rapid și Premium', description: 'Vopsire expresă cu garantie', category: 'Pictură', price: '2100 - 2900 RON', location: 'Craiova', is_promoted: false },

  // Altele (15 jobs)
  { user_id: '00000000-0000-0000-0000-000000000001', title: 'Instalator Mobilier și Elemente', description: 'Asamblare și instalare mobilier', category: 'Altele', price: '1800 - 2600 RON', location: 'București', is_promoted: false },
  { user_id: '00000000-0000-0000-0000-000000000001', title: 'Reparator Obiecte și Mobilă', description: 'Reparare mobilier și obiecte', category: 'Altele', price: '1900 - 2700 RON', location: 'Cluj-Napoca', is_promoted: false },
  { user_id: '00000000-0000-0000-0000-000000000001', title: 'Specialist Transport și Mutări', description: 'Transport și organizare mutări', category: 'Altele', price: '2200 - 3000 RON', location: 'Timișoara', is_promoted: false },
  { user_id: '00000000-0000-0000-0000-000000000001', title: 'Muncitor Diverse și Mentenanță', description: 'Lucrări diverse și mentenanță', category: 'Altele', price: '1700 - 2500 RON', location: 'Constanța', is_promoted: false },
  { user_id: '00000000-0000-0000-0000-000000000001', title: 'Specialist Reparare Electrocasnice', description: 'Reparare aparate electrice', category: 'Altele', price: '2000 - 2800 RON', location: 'Iași', is_promoted: false },
  { user_id: '00000000-0000-0000-0000-000000000001', title: 'Tehnician Reparare Usi și Ferestre', description: 'Reparare usi și ferestre', category: 'Altele', price: '1900 - 2700 RON', location: 'Brașov', is_promoted: false },
  { user_id: '00000000-0000-0000-0000-000000000001', title: 'Specialist Îngrijire și Curățenie Profundă', description: 'Curățenie profundă spații', category: 'Altele', price: '2100 - 2900 RON', location: 'Galați', is_promoted: false },
  { user_id: '00000000-0000-0000-0000-000000000001', title: 'Muncitor Lemn și Tâmplărie', description: 'Lucrări lemn și tâmplărie', category: 'Altele', price: '2100 - 2900 RON', location: 'Craiova', is_promoted: false },
  { user_id: '00000000-0000-0000-0000-000000000001', title: 'Reparator Diverse Spații Publice', description: 'Reparare infrastructură publică', category: 'Altele', price: '2200 - 3000 RON', location: 'Ploiești', is_promoted: false },
  { user_id: '00000000-0000-0000-0000-000000000001', title: 'Operator Deșeuri și Reciclare', description: 'Gestionare deșeuri și reciclare', category: 'Altele', price: '1900 - 2700 RON', location: 'București', is_promoted: false },
  { user_id: '00000000-0000-0000-0000-000000000001', title: 'Specialist Depozitare și Organizare', description: 'Organizare și optimizare spații', category: 'Altele', price: '1800 - 2600 RON', location: 'Cluj-Napoca', is_promoted: false },
  { user_id: '00000000-0000-0000-0000-000000000001', title: 'Muncitor Diverse Construire Mobilă', description: 'Construire și asamblare mobile', category: 'Altele', price: '1900 - 2700 RON', location: 'Timișoara', is_promoted: false },
  { user_id: '00000000-0000-0000-0000-000000000001', title: 'Reparator Usi Metalice și Grile', description: 'Reparare usi și sisteme de siguranță', category: 'Altele', price: '2000 - 2800 RON', location: 'Constanța', is_promoted: false },
  { user_id: '00000000-0000-0000-0000-000000000001', title: 'Specialist Lucrări Diverse și Mecanică', description: 'Reparare și mentenanță mecanică', category: 'Altele', price: '2100 - 2900 RON', location: 'Iași', is_promoted: false },
  { user_id: '00000000-0000-0000-0000-000000000001', title: 'Muncitor Diverse Generalist', description: 'Diverse lucrări și mentenanță', category: 'Altele', price: '1800 - 2600 RON', location: 'Brașov', is_promoted: false },
]

async function insertJobs() {
  try {
    console.log('Starting job insertion...')
    console.log(`Inserting ${jobs.length} jobs into job_announcements table`)

    // Insert jobs in batches of 10 to avoid overwhelming the database
    const batchSize = 10
    for (let i = 0; i < jobs.length; i += batchSize) {
      const batch = jobs.slice(i, i + batchSize)
      const { data, error } = await supabase
        .from('job_announcements')
        .insert(batch)

      if (error) {
        console.error(`Error inserting batch ${Math.floor(i / batchSize) + 1}:`, error)
        throw error
      }

      console.log(`✓ Inserted batch ${Math.floor(i / batchSize) + 1} (${batch.length} jobs)`)
    }

    console.log(`✓ Successfully inserted all ${jobs.length} jobs!`)

    // Verify insertion
    const { data, count } = await supabase
      .from('job_announcements')
      .select('id', { count: 'exact', head: true })

    console.log(`\nTotal jobs in database: ${count}`)
  } catch (error) {
    console.error('Failed to insert jobs:', error.message)
    process.exit(1)
  }
}

insertJobs()
