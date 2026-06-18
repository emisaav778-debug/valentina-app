// src/lib/supabase.js
import { createClient } from '@supabase/supabase-js'

// Traemos las llaves de nuestra bóveda (.env.local)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Exportamos el motor de la base de datos para usarlo en toda la app
export const supabase = createClient(supabaseUrl, supabaseAnonKey)