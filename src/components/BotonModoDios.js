'use client';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase'; // o '../../lib/supabase' si te da error
import { useRouter } from 'next/navigation';

export default function BotonModoDios() {
  const [isAdmin, setIsAdmin] = useState(false);
  const router = useRouter();
  
  // 🔒 El candado: Solo este correo verá la corona
  const CORREO_ADMIN = "emisaav778@gmail.com";

  useEffect(() => {
    const verificarAdmin = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session && session.user.email.toLowerCase().trim() === CORREO_ADMIN.toLowerCase().trim()) {
        setIsAdmin(true);
      }
    };
    
    verificarAdmin();
  }, []);

  // Si no eres tú, el botón se vuelve completamente invisible
  if (!isAdmin) return null; 

  return (
    <button
      onClick={() => router.push('/admin')}
      className="fixed bottom-6 right-6 bg-gradient-to-tr from-amber-400 to-yellow-600 p-4 rounded-full shadow-lg shadow-amber-500/30 hover:scale-110 transition-transform z-50 flex items-center justify-center border-2 border-yellow-300 group"
      title="Entrar al Centro de Control"
    >
      <span className="text-2xl group-hover:animate-bounce" aria-label="Modo Dios">👑</span>
    </button>
  );
}