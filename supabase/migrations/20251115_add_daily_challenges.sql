-- Adaugă provocări zilnice pe categorii pentru următoarele 30 de zile
-- Rulează acest SQL în Supabase SQL Editor

-- Ștergem provocările vechi pentru a evita duplicate
DELETE FROM challenges WHERE date >= CURRENT_DATE;

-- RECICLARE (Recycling)
INSERT INTO challenges (title, description, category, points, icon, date)
VALUES 
  ('Folosește o sticlă reutilizabilă', 'Astăzi evită sticlele de plastic de unică folosință. Folosește propria ta sticlă reutilizabilă!', 'Reciclare', 50, '♻️', CURRENT_DATE),
  ('Sortează deșeurile corect', 'Sortează toate deșeurile tale de astăzi: plastic, hârtie, sticlă și metal în pubelele corespunzătoare.', 'Reciclare', 50, '♻️', CURRENT_DATE + INTERVAL '4 days'),
  ('Refolosește ceva vechi', 'Găsește un obiect vechi și transformă-l într-un lucru util în loc să-l arunci.', 'Reciclare', 50, '♻️', CURRENT_DATE + INTERVAL '8 days'),
  ('Colectează deșeuri electronice', 'Identifică și pregătește pentru reciclare orice deșeu electronic din casă.', 'Reciclare', 50, '♻️', CURRENT_DATE + INTERVAL '12 days'),
  ('Zero plastic astăzi', 'Evită orice plastic de unică folosință pentru toată ziua.', 'Reciclare', 50, '♻️', CURRENT_DATE + INTERVAL '16 days'),
  ('Donează haine vechi', 'Găsește haine pe care nu le mai porți și donează-le în loc să le arunci.', 'Reciclare', 50, '♻️', CURRENT_DATE + INTERVAL '20 days'),
  ('Compostează deșeuri organice', 'Începe să colectezi deșeuri organice pentru compost.', 'Reciclare', 50, '♻️', CURRENT_DATE + INTERVAL '24 days'),
  ('Reciclează baterii', 'Strânge bateriile uzate și du-le la un punct de colectare.', 'Reciclare', 50, '♻️', CURRENT_DATE + INTERVAL '28 days');

-- ENERGIE (Energy)
INSERT INTO challenges (title, description, category, points, icon, date)
VALUES 
  ('Economisește energie electrică', 'Închide toate aparatele din priză când nu le folosești. Stinge luminile în camerele goale.', 'Energie', 50, '⚡', CURRENT_DATE + INTERVAL '1 day'),
  ('Folosește lumina naturală', 'Nu folosi lumină artificială în timpul zilei. Deschide draperiile și storurile.', 'Energie', 50, '⚡', CURRENT_DATE + INTERVAL '5 days'),
  ('Duș rapid de 5 minute', 'Ia un duș de maxim 5 minute pentru a economisi apă și energie.', 'Energie', 50, '⚡', CURRENT_DATE + INTERVAL '9 days'),
  ('Transport verde', 'Mergi pe jos, cu bicicleta sau cu transportul în comun în loc să folosești mașina.', 'Energie', 50, '⚡', CURRENT_DATE + INTERVAL '13 days'),
  ('Scade temperatura cu 1 grad', 'Reduce temperatura la termostat cu 1 grad pentru a economisi energie.', 'Energie', 50, '⚡', CURRENT_DATE + INTERVAL '17 days'),
  ('Spală la temperatură scăzută', 'Spală rufele la 30°C în loc de 40-60°C.', 'Energie', 50, '⚡', CURRENT_DATE + INTERVAL '21 days'),
  ('Deconectează încărcătoarele', 'Scoate din priză toate încărcătoarele care nu sunt folosite.', 'Energie', 50, '⚡', CURRENT_DATE + INTERVAL '25 days'),
  ('Închide robinetul', 'Nu lăsa apa să curgă când te speli pe dinți sau te bărbierești.', 'Energie', 50, '⚡', CURRENT_DATE + INTERVAL '29 days');

-- COMUNITATE (Community)
INSERT INTO challenges (title, description, category, points, icon, date)
VALUES 
  ('Curăță un spațiu public', 'Strânge gunoaiele dintr-un parc sau de pe stradă din comunitatea ta.', 'Comunitate', 50, '👥', CURRENT_DATE + INTERVAL '2 days'),
  ('Educă pe cineva despre mediu', 'Împărtășește o informație despre sustenabilitate cu familia sau prietenii.', 'Comunitate', 50, '👥', CURRENT_DATE + INTERVAL '6 days'),
  ('Ajută un vecin', 'Oferă ajutor unui vecin sau unei persoane în nevoie din comunitate.', 'Comunitate', 50, '👥', CURRENT_DATE + INTERVAL '10 days'),
  ('Donează cărți vechi', 'Donează cărțile pe care nu le mai citești la o bibliotecă sau școală.', 'Comunitate', 50, '👥', CURRENT_DATE + INTERVAL '14 days'),
  ('Plantează ceva în comunitate', 'Plantează o floare sau un arbust într-un spațiu public.', 'Comunitate', 50, '👥', CURRENT_DATE + INTERVAL '18 days'),
  ('Susține un producător local', 'Cumpără produse de la producători locali în loc de supermarket.', 'Comunitate', 50, '👥', CURRENT_DATE + INTERVAL '22 days'),
  ('Organizează o curățenie', 'Invită prietenii la o sesiune de curățat parcul sau zona ta.', 'Comunitate', 50, '👥', CURRENT_DATE + INTERVAL '26 days'),
  ('Împărtășește resurse', 'Împrumută un obiect în loc să-l cumpere altcineva nou.', 'Comunitate', 50, '👥', CURRENT_DATE + INTERVAL '30 days');

-- ECHILIBRU PERSONAL (Personal Balance)
INSERT INTO challenges (title, description, category, points, icon, date)
VALUES 
  ('Meditație în natură', 'Petrece 15 minute în natură, meditând sau bucurându-te de liniște.', 'Echilibru Personal', 50, '💚', CURRENT_DATE + INTERVAL '3 days'),
  ('Masă vegetariană', 'Pregătește și consumă o masă complet vegetariană astăzi.', 'Echilibru Personal', 50, '💚', CURRENT_DATE + INTERVAL '7 days'),
  ('Plantează în ghiveci', 'Plantează o floare, ierburi aromatice sau semințe într-un ghiveci.', 'Echilibru Personal', 50, '💚', CURRENT_DATE + INTERVAL '11 days'),
  ('Citește despre natură', 'Citește un articol sau capitol despre mediu și sustenabilitate.', 'Echilibru Personal', 50, '💚', CURRENT_DATE + INTERVAL '15 days'),
  ('Gătește de acasă', 'Evită fast-food și gătește o masă sănătoasă acasă.', 'Echilibru Personal', 50, '💚', CURRENT_DATE + INTERVAL '19 days'),
  ('Zi fără ecrane', 'Petrece seara fără telefon, TV sau laptop. Citește sau socializează.', 'Echilibru Personal', 50, '💚', CURRENT_DATE + INTERVAL '23 days'),
  ('Respirații profunde', 'Fă 10 minute de exerciții de respirație în aer liber.', 'Echilibru Personal', 50, '💚', CURRENT_DATE + INTERVAL '27 days'),
  ('Jurnalul naturii', 'Scrie despre o experiență plăcută în natură pe care ai avut-o.', 'Echilibru Personal', 50, '💚', CURRENT_DATE + INTERVAL '31 days');
