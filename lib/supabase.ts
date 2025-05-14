
import { createClient } from '@supabase/supabase-js'


const SUPABASE_URL = 'https://runvmjaypjsizprdchxj.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ1bnZtamF5cGpzaXpwcmRjaHhqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDcxNDA3MzcsImV4cCI6MjA2MjcxNjczN30.klaMxTgWZQDTfxNFN1Xh9EAgDXyJoK5yo2L4K4HqbXs'

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);



