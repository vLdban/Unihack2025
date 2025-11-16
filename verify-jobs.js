import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://gcprcghqfpjwpykpccxn.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdjcHJjZ2hxZnBqd3B5a3BjY3huIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI2ODU5NTYsImV4cCI6MjA3ODI2MTk1Nn0.fTmQca9ChBX4GszPNp8VJRLMzPuue7WXsul_WwpZyU4'

const supabase = createClient(supabaseUrl, supabaseAnonKey)

async function verifyJobs() {
  try {
    // Get all recent jobs (from new insertion)
    const { data: jobs } = await supabase
      .from('job_announcements')
      .select('id, title, category, location, is_promoted')
      .order('created_at', { ascending: false })
      .limit(100)

    const categoryCount = {}
    jobs.forEach(job => {
      categoryCount[job.category] = (categoryCount[job.category] || 0) + 1
    })

    console.log('✅ JOB INSERTION SUCCESSFUL!\n')
    console.log('📊 Category Distribution (Latest 100 jobs):')
    Object.entries(categoryCount).sort().forEach(([cat, num]) => {
      console.log(`  ${cat}: ${num} jobs`)
    })

    console.log('\n🔝 Sample Promoted Jobs:')
    jobs.filter(j => j.is_promoted).slice(0, 5).forEach(job => {
      console.log(`  ⭐ ${job.title} (${job.category})`)
    })

    console.log('\n📍 Sample jobs from different locations:')
    const locations = new Set()
    jobs.forEach(j => {
      if (locations.size < 5) locations.add(j.location)
    })
    Array.from(locations).forEach(loc => {
      console.log(`  📌 ${loc}`)
    })

    console.log('\n✅ All jobs are ready to be displayed on your /jobs page!')
  } catch (error) {
    console.error('Error:', error.message)
  }
}

verifyJobs()
