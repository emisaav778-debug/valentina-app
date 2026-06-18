'use client';

import { useState } from 'react';
import { supabase } from '../../lib/supabase';
import { useRouter } from 'next/navigation';

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [mensaje, setMensaje] = useState({ texto: '', tipo: '' });

  // Función para Iniciar Sesión con Google
  const handleGoogleLogin = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        // Redirige al panel después del login exitoso
        redirectTo: `${window.location.origin}/mi-panel`,
      },
    });

    if (error) {
      setMensaje({ texto: 'Error con Google: ' + error.message, tipo: 'error' });
      setLoading(false);
    }
  };

  // Función para Iniciar Sesión con Email
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMensaje({ texto: 'Conectando...', tipo: 'info' });

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setMensaje({ texto: 'Error: Correo o contraseña incorrectos.', tipo: 'error' });
      setLoading(false);
    } else {
      setMensaje({ texto: '¡Sesión iniciada con éxito!', tipo: 'exito' });
      setTimeout(() => router.push('/mi-panel'), 1500);
    }
  };

  // Función para Registrar Usuario
  const handleRegistro = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMensaje({ texto: 'Creando cuenta...', tipo: 'info' });

    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      setMensaje({ texto: `Error: ${error.message}`, tipo: 'error' });
      setLoading(false);
    } else {
      setMensaje({ texto: '¡Cuenta creada! Ya puedes iniciar sesión.', tipo: 'exito' });
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-[#111111] border border-gray-800 rounded-xl p-8 shadow-2xl">
        <h2 className="text-3xl font-bold text-center text-white mb-8">
          Acceso Premium
        </h2>

        {/* Botón de Google */}
        <button
          onClick={handleGoogleLogin}
          disabled={loading}
          className="w-full bg-white hover:bg-gray-100 text-black font-bold py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2 mb-6"
        >
          {/* Icono de Google simplificado */}
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path fill="currentColor" d="M21.35 11.1h-9.35v2.8h5.36c-.47 2.4-2.67 4.1-5.36 4.1-3.37 0-6.1-2.73-6.1-6.1s2.73-6.1 6.1-6.1c1.55 0 2.94.57 4.02 1.49l2.1-2.1c-1.63-1.51-3.83-2.45-6.12-2.45-5.08 0-9.2 4.12-9.2 9.2s4.12 9.2 9.2 9.2c4.78 0 8.78-3.33 9.77-7.79z" />
          </svg>
          Continuar con Google
        </button>

        <div className="relative flex items-center py-2 mb-6">
          <div className="flex-grow border-t border-gray-700"></div>
          <span className="flex-shrink mx-4 text-gray-400 text-sm uppercase tracking-wider">o</span>
          <div className="flex-grow border-t border-gray-700"></div>
        </div>

        <form className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Correo Electrónico</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#1a1a1a] text-white border border-gray-700 rounded-lg p-3 focus:outline-none focus:border-red-500 transition-colors"
              placeholder="tu@correo.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#1a1a1a] text-white border border-gray-700 rounded-lg p-3 focus:outline-none focus:border-red-500 transition-colors"
              placeholder="••••••••"
              required
            />
          </div>

          {mensaje.texto && (
            <div className={`p-3 rounded-lg text-sm text-center ${
              mensaje.tipo === 'error' ? 'bg-red-500/10 text-red-500' :
              mensaje.tipo === 'exito' ? 'bg-green-500/10 text-green-500' :
              'bg-blue-500/10 text-blue-500'
            }`}>
              {mensaje.texto}
            </div>
          )}

          <div className="flex gap-4 pt-4">
            <button
              onClick={handleLogin}
              disabled={loading}
              className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-4 rounded-lg transition-colors disabled:opacity-50"
            >
              Entrar
            </button>
            <button
              onClick={handleRegistro}
              disabled={loading}
              className="w-full bg-transparent border border-gray-600 hover:border-gray-400 text-white font-bold py-3 px-4 rounded-lg transition-colors disabled:opacity-50"
            >
              Registrarme
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
