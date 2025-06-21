import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://wmvqrygulpbjalupxrdy.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndtdnFyeWd1bHBiamFsdXB4cmR5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA0ODIyODUsImV4cCI6MjA2NjA1ODI4NX0.ueSnApO_ufJRweoZIhqXEZChtRVsPr_9o7q6yKNvdmY";


export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);