import { createClient } from '@supabase/supabase-js';

// Ces valeurs seront lues directement depuis ton tableau de bord Render en production
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://ltfgxyiybenhfotkjekg.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Les variables d'environnement Supabase sont manquantes dans le fichier .env ou sur Render !");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
