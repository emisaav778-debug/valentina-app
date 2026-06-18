'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../../lib/supabase';

export default function PagoExitoso() {
  const router = useRouter();
  const [cargando, setCargando] = useState(true);

  // Opcional: Verificamos si el usuario está logueado
  useEffect(() => {
    const verificarUsuario = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setCargando(false);
    };
    verificarUsuario();
  }, []);

  if (cargando) {
    return <div className="min-h-screen bg-[#0a0a0a]"></div>;
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center p-4 text-center">
      <div className="max-w-md w-full bg-[#111111] border border-gray-800 rounded-3xl p-8 md:p-12 shadow-[0_0_50px_rgba(220,38,38,0.1)]">
        
        {/* Icono animado de éxito */}
        <div className="w-24 h-24 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-8 border border-red-500/30">
          <svg className="w-12 h-12 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <h1 className="text-3xl font-black text-white mb-4">
          ¡PAGO <span className="text-red-500">EXITOSO</span>!
        </h1>
        
        <p className="text-gray-400 mb-8 leading-relaxed">
          Tu compra se ha procesado de manera segura. Tu contenido premium ya está siendo desbloqueado en tu cuenta.
        </p>

        <div className="space-y-4">
          <Link href="/mi-panel" className="block w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 rounded-xl transition-all shadow-lg">
            Ir a mi Bóveda VIP
          </Link>
          
          <Link href="/" className="block w-full bg-transparent border border-gray-700 hover:border-gray-500 text-gray-300 font-bold py-4 rounded-xl transition-all">
            Volver al Inicio
          </Link>
        </div>

      </div>

      <p className="text-xs text-gray-600 mt-12 font-medium tracking-widest uppercase">
        © 2026 VALENTINA VEGA FITNESS
      </p>
    </div>
  );
}