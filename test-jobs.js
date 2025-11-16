import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://gcprcghqfpjwpykpccxn.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdjcHJjZ2hxZnBqd3B5a3BjY3huIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI2ODU5NTYsImV4cCI6MjA3ODI2MTk1Nn0.fTmQca9ChBX4GszPNp8VJRLMzPuue7WXsul_WwpZyU4'

const supabase = createClient(supabaseUrl, supabaseAnonKey)

async function testJobs() {
  try {
    console.log('Testing job_announcements table...')
    
    // Count total jobs
    const { count, error: countError } = await supabase
      .from('job_announcements')
      .select('id', { count: 'exact', head: true })

    if (countError) {
      console.error('❌ Error counting jobs:', countError.message)
      return
    }

    console.log(`✅ Total jobs in database: ${count}`)

    // Get jobs by category
    const { data: categories, error: catError } = await supabase
      .from('job_announcements')
      .select('category')

    if (catError) {
      console.error('Error fetching categories:', catError.message)
      return
    }

    const categoryCount = {}
    categories.forEach(job => {
      categoryCount[job.category] = (categoryCount[job.category] || 0) + 1
    })

    console.log('\n📊 Jobs by category:')
    Object.entries(categoryCount).forEach(([cat, num]) => {
      console.log(`  ${cat}: ${num}`)
    })

    // Get a sample job
    const { data: sample, error: sampleError } = await supabase
      .from('job_announcements')
      .select('*')
      .limit(1)

    if (!sampleError && sample.length > 0) {
      console.log('\n📝 Sample job:')
      console.log(`  Title: ${sample[0].title}`)
      console.log(`  Category: ${sample[0].category}`)
      console.log(`  Location: ${sample[0].location}`)
      console.log(`  Price: ${sample[0].price}`)
    }

    if (count === 100) {
      console.log('\n✅ SUCCESS: All 100 jobs inserted correctly!')
      process.exit(0)
    } else {
      console.log(`\n⚠️  Only ${count} jobs found (expected 100)`)
      process.exit(1)
    }
  } catch (error) {
    console.error('❌ Test failed:', error.message)
    process.exit(1)
  }
}

testJobs()
