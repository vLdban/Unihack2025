import fs from 'fs';
import https from 'https';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

const supabaseUrl = 'https://gcprcghqfpjwpykpccxn.supabase.co';
const anonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdjcHJjZ2hxZnBqd3B5a3BjY3huIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI2ODU5NTYsImV4cCI6MjA3ODI2MTk1Nn0.fTmQca9ChBX4GszPNp8VJRLMzPuue7WXsul_WwpZyU4';

// Read the migration file
const migrationSql = fs.readFileSync(__dirname + '/supabase/migrations/20251114_manual_insert_jobs.sql', 'utf8');

// Execute via Supabase RPC
const url = new URL(supabaseUrl);
const options = {
  hostname: url.hostname,
  path: '/rest/v1/rpc/sql',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${anonKey}`,
    'apikey': anonKey
  }
};

const req = https.request(options, (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    console.log('Status:', res.statusCode);
    console.log('Response:', data);
  });
});

req.on('error', (e) => {
  console.error('Error:', e);
});

// Note: Direct SQL execution via REST might not work with anon key
// Instead, let's just output the migration for manual execution
console.log('Migration file content:');
console.log('='.repeat(80));
console.log(migrationSql);
console.log('='.repeat(80));
console.log('\nTo execute this migration:');
console.log('1. Go to https://supabase.com/dashboard/projects');
console.log('2. Select your project "gcprcghqfpjwpykpccxn"');
console.log('3. Go to SQL Editor');
console.log('4. Create a new query');
console.log('5. Copy and paste the content above');
console.log('6. Click Run');
