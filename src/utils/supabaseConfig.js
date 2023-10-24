import 'react-native-url-polyfill/auto'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://xabxodjmghkvxvgzdres.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhhYnhvZGptZ2hrdnh2Z3pkcmVzIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTY1Nzk0OTIsImV4cCI6MjAxMjE1NTQ5Mn0.mVy7HPgmC2G9NnOdLj5orl9VXj7IQVJakB_YpdME9UA'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)