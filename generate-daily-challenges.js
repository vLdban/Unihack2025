// Script pentru generarea provocărilor zilnice distribuite pe categorii
// Rulează cu: node generate-daily-challenges.js

const challenges = [
  // RECYCLING - Reciclare
  {
    title: "Reciclează deșeurile de astăzi",
    description: "Sortează corect toate deșeurile tale de astăzi: plastic, hârtie, sticlă și metal în pubelele corespunzătoare.",
    category: "Recycling",
    points: 50,
    icon: "♻️"
  },
  {
    title: "Refolosește ceva vechi",
    description: "Găsește un obiect vechi și transformă-l într-un lucru util în loc să-l arunci.",
    category: "Recycling",
    points: 50,
    icon: "♻️"
  },
  {
    title: "Colectează deșeuri electronice",
    description: "Identifică și pregătește pentru reciclare orice deșeu electronic din casă (baterii, telefoane vechi, etc.).",
    category: "Recycling",
    points: 50,
    icon: "♻️"
  },
  {
    title: "Compostează deșeuri organice",
    description: "Începe să colectezi deșeuri organice pentru compost sau du-le la un punct de colectare.",
    category: "Recycling",
    points: 50,
    icon: "♻️"
  },

  // ENERGY - Energie
  {
    title: "Economisește energie electrică",
    description: "Închide toate aparatele electrice din priză când nu le folosești. Stinge luminile în camerele goale.",
    category: "Energy",
    points: 50,
    icon: "⚡"
  },
  {
    title: "Folosește lumina naturală",
    description: "Încearcă să nu folosești lumină artificială în timpul zilei. Deschide draperiile și storurile.",
    category: "Energy",
    points: 50,
    icon: "⚡"
  },
  {
    title: "Duș de maxim 5 minute",
    description: "Ia un duș rapid de maxim 5 minute pentru a economisi apă și energie.",
    category: "Energy",
    points: 50,
    icon: "⚡"
  },
  {
    title: "Transportul verde",
    description: "Mergi pe jos, cu bicicleta sau cu transportul în comun în loc să folosești mașina.",
    category: "Energy",
    points: 50,
    icon: "⚡"
  },

  // COMMUNITY - Comunitate
  {
    title: "Curăță un spațiu public",
    description: "Strânge gunoaiele dintr-un parc, de pe stradă sau dintr-o zonă publică din comunitatea ta.",
    category: "Community",
    points: 50,
    icon: "👥"
  },
  {
    title: "Educă pe cineva despre mediu",
    description: "Împărtășește o informație despre sustenabilitate cu familia sau prietenii.",
    category: "Community",
    points: 50,
    icon: "👥"
  },
  {
    title: "Participă la o acțiune de voluntariat",
    description: "Alătură-te unei inițiative locale de protejare a mediului sau organizează una.",
    category: "Community",
    points: 50,
    icon: "👥"
  },
  {
    title: "Donează lucruri neutilizate",
    description: "Găsește lucruri pe care nu le mai folosești și donează-le în loc să le arunci.",
    category: "Community",
    points: 50,
    icon: "👥"
  },

  // PERSONAL BALANCE - Echilibru Personal
  {
    title: "Meditație în natură",
    description: "Petrece 15 minute în natură, meditând sau pur și simplu bucurându-te de liniște.",
    category: "Personal Balance",
    points: 50,
    icon: "💚"
  },
  {
    title: "Gătește o masă vegetariană",
    description: "Pregătește și consumă o masă complet vegetariană astăzi.",
    category: "Personal Balance",
    points: 50,
    icon: "💚"
  },
  {
    title: "Plantează ceva",
    description: "Plantează o floare, un arbust sau chiar și semințe într-un ghiveci.",
    category: "Personal Balance",
    points: 50,
    icon: "💚"
  },
  {
    title: "Zi fără plastic",
    description: "Evită să folosești orice plastic de unică folosință astăzi.",
    category: "Personal Balance",
    points: 50,
    icon: "💚"
  }
];

// Funcție pentru a genera date pentru următoarele 60 de zile, distribuite pe categorii
function generateChallengesForDays(startDate, numberOfDays) {
  const result = [];
  const categories = ["Recycling", "Energy", "Community", "Personal Balance"];
  
  for (let i = 0; i < numberOfDays; i++) {
    const date = new Date(startDate);
    date.setDate(date.getDate() + i);
    const dateStr = date.toISOString().split('T')[0];
    
    // Rotăm prin categorii pentru distribuție uniformă
    const categoryIndex = i % categories.length;
    const category = categories[categoryIndex];
    
    // Găsim provocările pentru categoria respectivă
    const categoryAChallenges = challenges.filter(c => c.category === category);
    
    // Selectăm o provocare random din categoria respectivă
    const challengeIndex = Math.floor(i / categories.length) % categoryAChallenges.length;
    const challenge = categoryAChallenges[challengeIndex];
    
    result.push({
      date: dateStr,
      ...challenge
    });
  }
  
  return result;
}

// Generează provocări începând de azi pentru următoarele 60 de zile
const startDate = new Date('2025-11-15'); // Data de astăzi
const dailyChallenges = generateChallengesForDays(startDate, 60);

// Afișează SQL pentru inserare
console.log('-- SQL pentru inserarea provocărilor zilnice');
console.log('-- Copiază și rulează în Supabase SQL Editor\n');

dailyChallenges.forEach(challenge => {
  const sql = `INSERT INTO challenges (date, title, description, category, points, icon)
VALUES ('${challenge.date}', '${challenge.title}', '${challenge.description}', '${challenge.category}', ${challenge.points}, '${challenge.icon}');`;
  console.log(sql);
});

console.log('\n-- Total provocări generate:', dailyChallenges.length);
console.log('-- Distribuție pe categorii:');
const distribution = dailyChallenges.reduce((acc, c) => {
  acc[c.category] = (acc[c.category] || 0) + 1;
  return acc;
}, {});
console.log(distribution);
