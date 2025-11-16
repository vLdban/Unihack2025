// Copiază și lipește în Console (F12 -> Console) în browser
// când ești logat în aplicație

(async function setLevel() {
  const { createClient } = window.supabase || await import('https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm');
  
  const supabase = createClient(
    'https://wfbqslrqumakzbczypzx.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndmYnFzbHJxdW1ha3piY3p5cHp4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzEwODYxNjYsImV4cCI6MjA0NjY2MjE2Nn0.HlbKyTE_OTqHqFbXDUNl9uEQW4YczrIBxJDlKIeL6vo'
  );

  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    console.error('❌ Nu ești autentificat!');
    return;
  }

  const { error } = await supabase
    .from('profiles')
    .update({
      current_level: 10,
      total_points: 1000,
      completed_challenges: 20
    })
    .eq('id', user.id);

  if (error) {
    console.error('❌ Eroare:', error);
  } else {
    console.log('✅ Success! Level 10, 1000 puncte!');
    console.log('Dă refresh la pagină (F5)');
  }
})();
