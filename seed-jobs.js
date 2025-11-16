import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = "https://gcprcghqfpjwpykpccxn.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdjcHJjZ2hxZnBqd3B5a3BjY3huIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI2ODU5NTYsImV4cCI6MjA3ODI2MTk1Nn0.fTmQca9ChBX4GszPNp8VJRLMzPuue7WXsul_WwpZyU4";

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const jobs = [
  // Reciclare (25 jobs)
  { title: 'Operator Centru Reciclare', description: 'Lucrează la sortarea și procesarea materialelor reciclabile', category: 'Reciclare', price: '2500 - 3000 RON', location: 'București', is_promoted: false },
  { title: 'Inginer Mediu Reciclare', description: 'Supervizează operații de reciclare și optimizează procese', category: 'Reciclare', price: '4000 - 5000 RON', location: 'Cluj-Napoca', is_promoted: true },
  { title: 'Colector Deșeuri Selecte', description: 'Colectare și transport de deșeuri reciclabile', category: 'Reciclare', price: '2200 - 2800 RON', location: 'Brașov', is_promoted: false },
  { title: 'Specialist Compostare', description: 'Gestionare a procesului de compostare și biodecompunere', category: 'Reciclare', price: '2700 - 3200 RON', location: 'Iași', is_promoted: false },
  { title: 'Operator Instalaţie Plastic', description: 'Prelucrare plastice reciclate pentru producția noilor articole', category: 'Reciclare', price: '2600 - 3100 RON', location: 'Timișoara', is_promoted: false },
  { title: 'Manager Proiect Reciclare', description: 'Coordonează proiecte de reciclare pe scară largă', category: 'Reciclare', price: '3500 - 4500 RON', location: 'București', is_promoted: true },
  { title: 'Tehnician Ambalaje Eco', description: 'Dezvoltare și testare ambalaje biodegradabile', category: 'Reciclare', price: '3000 - 3800 RON', location: 'Constanța', is_promoted: false },
  { title: 'Investigator Deșeuri', description: 'Audit și investigare procese de reciclare', category: 'Reciclare', price: '3200 - 4000 RON', location: 'Galați', is_promoted: false },
  { title: 'Operator Presă Reciclare', description: 'Operare echipamente de presare și compactare deșeuri', category: 'Reciclare', price: '2300 - 2900 RON', location: 'Pitești', is_promoted: false },
  { title: 'Specialist Marketing Eco', description: 'Promovare programe de reciclare și educație ecologică', category: 'Reciclare', price: '2800 - 3500 RON', location: 'București', is_promoted: false },
  { title: 'Chimist Tratament Apă', description: 'Tratarea apelor uzate din procese de reciclare', category: 'Reciclare', price: '3300 - 4200 RON', location: 'Craiova', is_promoted: false },
  { title: 'Conducător Vehicol Colectare', description: 'Transport deșeuri selecte cu mașini specializate', category: 'Reciclare', price: '2400 - 3000 RON', location: 'Sibiu', is_promoted: false },
  { title: 'Asistent Laborator Reciclare', description: 'Testare calitate materiale reciclate', category: 'Reciclare', price: '2000 - 2600 RON', location: 'Arad', is_promoted: false },
  { title: 'Designer Packaging Sustenabil', description: 'Creație ambalaje eco-friendly inovatoare', category: 'Reciclare', price: '3600 - 4500 RON', location: 'Cluj-Napoca', is_promoted: true },
  { title: 'Supervizor Instalație', description: 'Supravegheaza instalații de reciclare', category: 'Reciclare', price: '3100 - 3900 RON', location: 'Constanța', is_promoted: false },
  { title: 'Mecanic Echipamente Reciclare', description: 'Reparație și întreținere echipamente', category: 'Reciclare', price: '2900 - 3600 RON', location: 'Dolj', is_promoted: false },
  { title: 'Educatoare Programe Reciclare', description: 'Educație în comunități privind reciclarea', category: 'Reciclare', price: '2500 - 3200 RON', location: 'Bihor', is_promoted: false },
  { title: 'Vânzător Produse Reciclate', description: 'Vânzare produse fabricate din materiale reciclate', category: 'Reciclare', price: '2200 - 2800 RON', location: 'Satu Mare', is_promoted: false },
  { title: 'Specialist Logistică Reciclare', description: 'Optimizare rute transport și depozitare deșeuri', category: 'Reciclare', price: '3000 - 3800 RON', location: 'Bacău', is_promoted: false },
  { title: 'Operator Control Calitate', description: 'Verificare și evaluare materiale reciclate', category: 'Reciclare', price: '2600 - 3200 RON', location: 'Vaslui', is_promoted: false },
  { title: 'Director Program Reciclare', description: 'Conducere program reciclare integrat', category: 'Reciclare', price: '5000 - 6500 RON', location: 'București', is_promoted: true },
  { title: 'Inginer Proces Reciclare', description: 'Optimizare procese și flux de producție', category: 'Reciclare', price: '3800 - 4800 RON', location: 'Ploiești', is_promoted: false },
  { title: 'Operator Sortare Manuală', description: 'Sortare deșeuri conform standardelor', category: 'Reciclare', price: '2100 - 2700 RON', location: 'Buzău', is_promoted: false },
  { title: 'Tehnician Reparații', description: 'Reparare și restabilire echipamente', category: 'Reciclare', price: '2800 - 3400 RON', location: 'Hunedoara', is_promoted: false },
  { title: 'Auditor Mediu Reciclare', description: 'Audit conformitate și standarde mediu', category: 'Reciclare', price: '3400 - 4300 RON', location: 'Timiș', is_promoted: false },

  // Energie (25 jobs)
  { title: 'Installer Panouri Solare', description: 'Instalare sisteme fotovoltaice pe acoperișuri', category: 'Energie', price: '3000 - 3800 RON', location: 'București', is_promoted: false },
  { title: 'Inginer Energii Regenerabile', description: 'Proiectare sisteme energie verde', category: 'Energie', price: '4200 - 5500 RON', location: 'Cluj-Napoca', is_promoted: true },
  { title: 'Electrician Sistem Solar', description: 'Electricitate pentru instalații solare', category: 'Energie', price: '2800 - 3500 RON', location: 'Brașov', is_promoted: false },
  { title: 'Tehnician Turbine Vânt', description: 'Montaj și reparație turbine eoliene', category: 'Energie', price: '3500 - 4500 RON', location: 'Constanța', is_promoted: false },
  { title: 'Specialist Eficiență Energetică', description: 'Audit și optimizare consum energetic', category: 'Energie', price: '3200 - 4000 RON', location: 'Iași', is_promoted: false },
  { title: 'Manager Proiect Energie Verde', description: 'Coordonație proiecte energie regenerabilă', category: 'Energie', price: '4000 - 5200 RON', location: 'Timișoara', is_promoted: true },
  { title: 'Technician Baterie Stocare', description: 'Instalare sisteme baterii pentru stocare energie', category: 'Energie', price: '3100 - 3900 RON', location: 'București', is_promoted: false },
  { title: 'Inginer Hidro', description: 'Proiecte centrale hidroelectrice mici', category: 'Energie', price: '4300 - 5500 RON', location: 'Pitești', is_promoted: false },
  { title: 'Operator Centrală Biomasa', description: 'Operare instalații de încălzire cu biomasa', category: 'Energie', price: '2600 - 3300 RON', location: 'Sibiu', is_promoted: false },
  { title: 'Consultant Energie', description: 'Consultanță privind energia regenerabilă', category: 'Energie', price: '3500 - 4500 RON', location: 'Cluj-Napoca', is_promoted: false },
  { title: 'Electrician LED', description: 'Instalare sisteme iluminare LED eficiente', category: 'Energie', price: '2500 - 3200 RON', location: 'Constanța', is_promoted: false },
  { title: 'Operator Panouri Termice', description: 'Montaj și operare sisteme solare termice', category: 'Energie', price: '2700 - 3400 RON', location: 'Craiova', is_promoted: false },
  { title: 'Inginer Control Energie', description: 'Monitorizare și control sisteme energetice', category: 'Energie', price: '3300 - 4200 RON', location: 'București', is_promoted: false },
  { title: 'Tehnician Pompe Căldură', description: 'Instalare și servicii pompe căldură', category: 'Energie', price: '2900 - 3700 RON', location: 'Arad', is_promoted: false },
  { title: 'Sales Energy Systems', description: 'Vânzare sisteme energie regenerabilă', category: 'Energie', price: '2800 - 3600 RON', location: 'Brașov', is_promoted: false },
  { title: 'Inspector Calitate Instalații', description: 'Control calitate instalații energetice', category: 'Energie', price: '3000 - 3800 RON', location: 'Galați', is_promoted: false },
  { title: 'Proiectant CAD Energie', description: 'Proiectare asistate sisteme energetice', category: 'Energie', price: '3200 - 4100 RON', location: 'Cluj-Napoca', is_promoted: false },
  { title: 'Operator Microcentrală', description: 'Operare microcentrală hidroelectrică', category: 'Energie', price: '2400 - 3100 RON', location: 'Suceava', is_promoted: false },
  { title: 'Specialist Performanță Energetică', description: 'Certificare și audit performanță', category: 'Energie', price: '3400 - 4300 RON', location: 'Iași', is_promoted: false },
  { title: 'Manager Instalații Solare', description: 'Gestionare flote panouri solare', category: 'Energie', price: '3800 - 4800 RON', location: 'Timișoara', is_promoted: true },
  { title: 'Electrician Industrial Verde', description: 'Sisteme electrice pentru industriă eco', category: 'Energie', price: '3000 - 3800 RON', location: 'Constanța', is_promoted: false },
  { title: 'Inginer Sistem Stocare', description: 'Proiectare sisteme stocare energie', category: 'Energie', price: '4100 - 5300 RON', location: 'București', is_promoted: false },
  { title: 'Operator Stație Biogaz', description: 'Operare instalație producție biogaz', category: 'Energie', price: '2800 - 3500 RON', location: 'Dolj', is_promoted: false },
  { title: 'Inspecteur Siguranță Energetică', description: 'Inspecții de siguranță sisteme energetice', category: 'Energie', price: '3200 - 4100 RON', location: 'Cluj-Napoca', is_promoted: false },
  { title: 'Director Strategie Energie', description: 'Conducere strategie energie regenerabilă', category: 'Energie', price: '5200 - 6800 RON', location: 'București', is_promoted: true },

  // Comunitate (25 jobs)
  { title: 'Organizator Evenimente Eco', description: 'Organizare activități și workshopuri ecologice', category: 'Comunitate', price: '2400 - 3100 RON', location: 'București', is_promoted: false },
  { title: 'Coordonator Voluntari', description: 'Coordonare programe voluntariat ecologic', category: 'Comunitate', price: '2600 - 3400 RON', location: 'Cluj-Napoca', is_promoted: false },
  { title: 'Educator Ambiental', description: 'Educație și sensibilizare față de mediu', category: 'Comunitate', price: '2500 - 3200 RON', location: 'Brașov', is_promoted: true },
  { title: 'Manager Programe Comunitate', description: 'Conducere programe de implicare comunității', category: 'Comunitate', price: '3200 - 4200 RON', location: 'Iași', is_promoted: false },
  { title: 'Community Liaison Officer', description: 'Legătură între comunitate și organizații', category: 'Comunitate', price: '2700 - 3500 RON', location: 'Constanța', is_promoted: false },
  { title: 'Animator Cultural Eco', description: 'Animație și activități ecologice pentru copii', category: 'Comunitate', price: '2200 - 2900 RON', location: 'Timișoara', is_promoted: false },
  { title: 'Specialist Comunicare', description: 'Comunicare și advocacy pentru cauze eco', category: 'Comunitate', price: '2800 - 3600 RON', location: 'București', is_promoted: false },
  { title: 'Director Centru Comunitate', description: 'Conducere centru ecologic comunitar', category: 'Comunitate', price: '4000 - 5200 RON', location: 'Cluj-Napoca', is_promoted: true },
  { title: 'Asistent Social Eco', description: 'Suport social în programe de mediu', category: 'Comunitate', price: '2300 - 3000 RON', location: 'Craiova', is_promoted: false },
  { title: 'Facilitator Workshop', description: 'Facilitare ateliere și sesiuni educative', category: 'Comunitate', price: '2400 - 3100 RON', location: 'Galați', is_promoted: false },
  { title: 'Officer Parteneriate', description: 'Dezvoltare parteneriate cu ONG-uri', category: 'Comunitate', price: '2900 - 3700 RON', location: 'Sibiu', is_promoted: false },
  { title: 'Documentator Social', description: 'Documentare și raportare activități comunitate', category: 'Comunitate', price: '2500 - 3200 RON', location: 'Constanța', is_promoted: false },
  { title: 'Terapeut în Natură', description: 'Programe terapeutice în natură și comunitate', category: 'Comunitate', price: '2700 - 3500 RON', location: 'Buzău', is_promoted: false },
  { title: 'Recruiter Voluntari', description: 'Recrutare și selecție voluntari ecologici', category: 'Comunitate', price: '2600 - 3300 RON', location: 'Ploiești', is_promoted: false },
  { title: 'Officer Integrare', description: 'Integrare comunități în programe eco', category: 'Comunitate', price: '2800 - 3600 RON', location: 'Bacău', is_promoted: false },
  { title: 'Specialist Relații Publice', description: 'Relații publice și media pentru inițiative eco', category: 'Comunitate', price: '3000 - 3900 RON', location: 'Arad', is_promoted: false },
  { title: 'Coordonator Proiecte Locale', description: 'Coordonare proiecte de mediu local', category: 'Comunitate', price: '2900 - 3700 RON', location: 'Hunedoara', is_promoted: false },
  { title: 'Mentor Ecologic', description: 'Mentorat și coaching pentru activități eco', category: 'Comunitate', price: '2500 - 3200 RON', location: 'Satu Mare', is_promoted: false },
  { title: 'Vorbitor Public', description: 'Prezentări și conferințe pentru cauze ecologice', category: 'Comunitate', price: '2700 - 3500 RON', location: 'Timiș', is_promoted: false },
  { title: 'Administrator Forum Online', description: 'Gestionare comunități online ecologice', category: 'Comunitate', price: '2200 - 2900 RON', location: 'Vaslui', is_promoted: false },
  { title: 'Coordinator Sănătate Comunitate', description: 'Programe de sănătate legat de mediu', category: 'Comunitate', price: '2800 - 3600 RON', location: 'Dolj', is_promoted: false },
  { title: 'Manager Parteneriate', description: 'Gestionare parteneriate și colaborări', category: 'Comunitate', price: '3400 - 4400 RON', location: 'Cluj-Napoca', is_promoted: false },
  { title: 'Lead Dezvoltare Comunitate', description: 'Lider în dezvoltarea inițiativelor comunitare', category: 'Comunitate', price: '3800 - 4900 RON', location: 'București', is_promoted: true },
  { title: 'Specialist Inkluziune', description: 'Programe inkluzive pentru toți membrii comunității', category: 'Comunitate', price: '2700 - 3500 RON', location: 'Iași', is_promoted: false },
  { title: 'Chief Community Officer', description: 'Conducere officer comunitate', category: 'Comunitate', price: '4800 - 6300 RON', location: 'București', is_promoted: true },

  // Echilibru Personal (25 jobs)
  { title: 'Instructor Yoga Natură', description: 'Yoga și meditație în mediul natural', category: 'Echilibru Personal', price: '2300 - 3000 RON', location: 'București', is_promoted: false },
  { title: 'Wellness Coach Eco', description: 'Coaching pentru stil de viață sustenabil și sănătos', category: 'Echilibru Personal', price: '2800 - 3600 RON', location: 'Cluj-Napoca', is_promoted: true },
  { title: 'Nutriționist Bio', description: 'Consiliere nutriție cu produse bio și locale', category: 'Echilibru Personal', price: '3000 - 3900 RON', location: 'Brașov', is_promoted: false },
  { title: 'Terapeut Holistico', description: 'Terapii holistice cu focus pe mediu', category: 'Echilibru Personal', price: '3200 - 4100 RON', location: 'Constanța', is_promoted: false },
  { title: 'Instructor Fitnes Eco', description: 'Antrenamente în natură și outdoor', category: 'Echilibru Personal', price: '2500 - 3200 RON', location: 'Iași', is_promoted: false },
  { title: 'Gardener Terapeutic', description: 'Cultivare plante și terapie prin grădină', category: 'Echilibru Personal', price: '2400 - 3100 RON', location: 'Timișoara', is_promoted: false },
  { title: 'Counselor Stres Eco', description: 'Consiliere pentru gestionarea stresului prin natură', category: 'Echilibru Personal', price: '2900 - 3700 RON', location: 'București', is_promoted: false },
  { title: 'Chef Organic', description: 'Gătire cu ingrediente organice și locale', category: 'Echilibru Personal', price: '3300 - 4300 RON', location: 'Cluj-Napoca', is_promoted: true },
  { title: 'Sleep Consultant Bio', description: 'Consultanță somn cu produse naturale', category: 'Echilibru Personal', price: '2700 - 3500 RON', location: 'Craiova', is_promoted: false },
  { title: 'Psiholog Ambiental', description: 'Psihologie și relație cu mediul natural', category: 'Echilibru Personal', price: '3400 - 4400 RON', location: 'Sibiu', is_promoted: false },
  { title: 'Instructor Tai Chi Natură', description: 'Tai Chi și martial arts în aer liber', category: 'Echilibru Personal', price: '2400 - 3100 RON', location: 'Constanța', is_promoted: false },
  { title: 'Life Coach Sustenabil', description: 'Coaching pentru viață sustenabilă', category: 'Echilibru Personal', price: '3100 - 4000 RON', location: 'Galați', is_promoted: false },
  { title: 'Maseur Naturist', description: 'Masaj cu uleiuri naturale și ecologice', category: 'Echilibru Personal', price: '2600 - 3400 RON', location: 'Bacău', is_promoted: false },
  { title: 'Instructor Pilates Bio', description: 'Pilates cu focus pe echilibru natural', category: 'Echilibru Personal', price: '2500 - 3200 RON', location: 'Arad', is_promoted: false },
  { title: 'Consultant Somn Natural', description: 'Optimizare somn cu metode naturale', category: 'Echilibru Personal', price: '2800 - 3600 RON', location: 'Buzău', is_promoted: false },
  { title: 'Acupunctori Eco', description: 'Acupunctură și tratamente naturale', category: 'Echilibru Personal', price: '3200 - 4100 RON', location: 'Ploiești', is_promoted: false },
  { title: 'Instructor Meditație', description: 'Meditație și mindfulness în grup', category: 'Echilibru Personal', price: '2300 - 3000 RON', location: 'Cluj-Napoca', is_promoted: false },
  { title: 'Chef Vegan', description: 'Gătire vegan și plant-based cu ingrediente eco', category: 'Echilibru Personal', price: '3000 - 3900 RON', location: 'Suceava', is_promoted: false },
  { title: 'Herborist', description: 'Plante medicinale și remedii naturale', category: 'Echilibru Personal', price: '2700 - 3500 RON', location: 'Iași', is_promoted: false },
  { title: 'Fitness Trainer Natură', description: 'Antrenament personalizat în aer liber', category: 'Echilibru Personal', price: '2800 - 3600 RON', location: 'Constanța', is_promoted: false },
  { title: 'Specialist Wellness', description: 'Program wellness complet și integrat', category: 'Echilibru Personal', price: '3400 - 4400 RON', location: 'București', is_promoted: false },
  { title: 'Instructor Dancă Ecologică', description: 'Dansă cu mesaj ecologic și conectare natură', category: 'Echilibru Personal', price: '2500 - 3200 RON', location: 'Brașov', is_promoted: false },
  { title: 'Director Spa Eco', description: 'Conducere spa și centru wellness ecologic', category: 'Echilibru Personal', price: '4200 - 5400 RON', location: 'Cluj-Napoca', is_promoted: true },
  { title: 'Consultant Sănătate Holistică', description: 'Consultanță sănătate din perspective holistice', category: 'Echilibru Personal', price: '3600 - 4600 RON', location: 'Timișoara', is_promoted: false },
  { title: 'Chief Wellness Officer', description: 'Conducere strategie wellness și echilibru', category: 'Echilibru Personal', price: '5000 - 6500 RON', location: 'București', is_promoted: true }
];

async function insertJobs() {
  try {
    console.log(`Inserting ${jobs.length} job announcements...`);
    
    const { data, error } = await supabase
      .from('job_announcements')
      .insert(jobs);

    if (error) {
      console.error('Error inserting jobs:', error);
      process.exit(1);
    }

    console.log(`✓ Successfully inserted ${jobs.length} job announcements!`);
    process.exit(0);
  } catch (err) {
    console.error('Unexpected error:', err);
    process.exit(1);
  }
}

insertJobs();
