import { createClient } from '@supabase/supabase-js';
import type { Database } from '../types/database';

const DEFAULT_SUPABASE_URL = 'https://cemcvihaobrvkuxteepu.supabase.co';
const DEFAULT_SUPABASE_KEY = 'sb_publishable_sLFpaXWgf6cSpcB5QwSkRA_189jVTto';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || DEFAULT_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || DEFAULT_SUPABASE_KEY;

export const isSupabaseConfigured = Boolean(
  supabaseUrl && 
  supabaseKey && 
  !supabaseUrl.includes('placeholder')
);

export const supabase = createClient<Database>(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
});