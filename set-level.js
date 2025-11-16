// Script pentru setarea nivelului utilizatorului
// Rulează cu: node set-level.js

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://wfbqslrqumakzbczypzx.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndmYnFzbHJxdW1ha3piY3p5cHp4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzEwODYxNjYsImV4cCI6MjA0NjY2MjE2Nn0.HlbKyTE_OTqHqFbXDUNl9uEQW4YczrIBxJDlKIeL6vo';

const supabase = createClient(supabaseUrl, supabaseKey);

async function setUserLevel() {
  try {
    // Get current user
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      console.error('Nu ești autentificat. Loghează-te în aplicație mai întâi!');
      return;
    }

    console.log('User găsit:', user.email);
    console.log('User ID:', user.id);

    // Update profile
    const { data, error } = await supabase
      .from('profiles')
      .update({
        current_level: 10,
        total_points: 1050,
        completed_challenges: 20
      })
      .eq('id', user.id)
      .select();

    if (error) {
      console.error('Eroare la actualizare:', error);
    } else {
      console.log('✅ Success! Nivelul a fost setat:');
      console.log('Level:', 10);
      console.log('Points:', 1050);
      console.log('Challenges:', 20);
      console.log('\nDă refresh la pagină pentru a vedea schimbările!');
    }
  } catch (err) {
    console.error('Eroare:', err);
  }
}

setUserLevel();
