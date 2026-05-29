import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

export const isSupabaseConfigured = Boolean(
  supabaseUrl?.trim() && supabaseKey?.trim()
);

export const supabaseConfigError = isSupabaseConfigured
  ? null
  : "Falta configurar Supabase. Copia .env.example a .env y completa VITE_SUPABASE_URL y VITE_SUPABASE_PUBLISHABLE_KEY.";

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
      },
    })
  : null;