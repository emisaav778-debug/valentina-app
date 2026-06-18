'use client';

import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { analizarRutina } from '../../lib/diccionarioEjercicios';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import ReactMarkdown from 'react-markdown';

export default function GeneradorDePlanes() {
  const router = useRouter();

  // ==========================================
  // 1. ESTADOS DE CONTROL Y SEGURIDAD
  // ==========================================
  const [autenticado, setAutenticado] = useState(false);
  const [genero, setGenero] = useState('');
  const [edad, setEdad] = useState('');
  const [peso, setPeso] = useState('');
  const [objetivo, setObjetivo] = useState('');
  const [rutina, setRutina] = useState('');
  const [loading, setLoading] = useState(false);
  const [imagenSeleccionada, setImagenSeleccionada] = useState(null);

  // ==========================================
  // 2. VERIFICACIÓN DE SESIÓN DE USUARIO
  // ==========================================
  useEffect(() => {
    const verificarSesion = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        router.push('/login');
      } else {
        setAutenticado(true);
      }
    };

    verificarSesion();
  }, [router]);

  const cerrarSesion = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  // ==========================================
  // 3. GENERACIÓN CON INTELIGENCIA ARTIFICIAL
  // ==========================================
  const generarRutina = async (e) => {
    e.preventDefault();
    setLoading(true);
    setRutina('');

    try {
      const response = await fetch('/api/generar-rutina', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ genero, edad, peso, objetivo }),
      });

      const data = await response.json();
      const planGenerado = data.rutina || data.resultado || data.mensaje || "Plan generado con éxito."; 
      
      setRutina(planGenerado); 

      // Guardado automático en la Bóveda de Supabase
      const { data: { user } } = await supabase.auth.getUser();

      if (user) {
        const { error } = await supabase
          .from('rutinas')
          .insert([
            {
              user_id: user.id,
              genero: genero,
              edad: edad,
              peso: peso,
              objetivo: objetivo,
              rutina_texto: planGenerado
            }
          ]);

        if (error) {
          console.error("Error al guardar en la base de datos:", error);
        }
      }

    } catch (error) {
      console.error("Error al conectar con la IA:", error);
      setRutina("Hubo un error al generar el plan. Intenta de nuevo.");
    }

    setLoading(false);
  };

  if (!autenticado) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="text-white text-xl animate-pulse font-bold tracking-widest">
          VERIFICANDO ACCESO PREMIUM...
        </div>
      </div>
    );
  }

  // Analizamos el texto generado para extraer el catálogo de fotos
  const fotosEjercicios = analizarRutina(rutina);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white p-4 md:p-8 relative">
      
      {/* ==========================================
          🔥 MODAL (ZOOM DE IMÁGENES) 🔥
          ========================================== */}
      {imagenSeleccionada && (
        <div 
          className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex items-center justify-center p-4 cursor-pointer animate-fade-in"
          onClick={() => setImagenSeleccionada(null)}
        >
          <button 
            className="absolute top-6 right-8 text-gray-400 hover:text-red-500 text-5xl font-black transition-colors z-50"
            onClick={() => setImagenSeleccionada(null)}
          >
            &times;
          </button>
          
          <div className="relative w-full max-w-4xl h-[70vh] md:h-[85vh] flex flex-col items-center justify-center cursor-default" onClick={(e) => e.stopPropagation()}>
            <Image 
              src={imagenSeleccionada.imagen} 
              alt={imagenSeleccionada.nombre} 
              fill 
              className="object-contain drop-shadow-[0_0_30px_rgba(220,38,38,0.2)]" 
            />
            <div className="absolute -bottom-6 md:-bottom-12 bg-[#050505] border border-red-900 text-red-500 text-xl md:text-3xl font-black px-8 py-3 rounded-full shadow-2xl">
              {imagenSeleccionada.nombre}
            </div>
          </div>
        </div>
      )}

      {/* CONTENIDO PRINCIPAL */}
      <div className="max-w-3xl mx-auto">
        
        {/* Cabecera */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 border-b border-gray-800 pb-4">
          <div className="flex items-center gap-4">
            <Link href="/mi-panel" className="text-gray-400 hover:text-white transition-colors text-sm font-bold border border-gray-800 px-3 py-1 rounded-lg bg-[#111]">
              ← Volver al Panel
            </Link>
            <h1 className="text-3xl font-black text-red-500">
              Generador Premium
            </h1>
          </div>
          <button 
            onClick={cerrarSesion}
            className="bg-transparent border border-gray-600 hover:border-red-500 hover:text-red-500 text-gray-300 font-bold py-2 px-4 rounded transition-colors mt-4 md:mt-0"
          >
            Cerrar Sesión
          </button>
        </div>

        {/* Formulario */}
        <div className="bg-[#111111] border border-gray-800 rounded-xl p-6 shadow-2xl mb-8">
          <form onSubmit={generarRutina} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1">Género</label>
                <select value={genero} onChange={(e) => setGenero(e.target.value)} className="w-full bg-[#1a1a1a] border border-gray-700 rounded-lg p-3 text-white focus:outline-none focus:border-red-500 font-medium" required>
                  <option value="">Selecciona...</option>
                  <option value="Masculino">Masculino</option>
                  <option value="Femenino">Femenino</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Edad</label>
                <input type="number" value={edad} onChange={(e) => setEdad(e.target.value)} className="w-full bg-[#1a1a1a] border border-gray-700 rounded-lg p-3 text-white focus:outline-none focus:border-red-500 font-medium" required />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Peso (kg)</label>
                <input type="number" value={peso} onChange={(e) => setPeso(e.target.value)} className="w-full bg-[#1a1a1a] border border-gray-700 rounded-lg p-3 text-white focus:outline-none focus:border-red-500 font-medium" required />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Objetivo</label>
                <select value={objetivo} onChange={(e) => setObjetivo(e.target.value)} className="w-full bg-[#1a1a1a] border border-gray-700 rounded-lg p-3 text-white focus:outline-none focus:border-red-500 font-medium" required>
                  <option value="">Selecciona...</option>
                  <option value="Perder Peso">Perder Peso</option>
                  <option value="Ganar Masa Muscular">Ganar Masa Muscular</option>
                  <option value="Mantenimiento">Mantenimiento</option>
                </select>
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-red-600 hover:bg-red-700 text-white font-black py-4 rounded-lg mt-6 disabled:opacity-50 transition-colors shadow-lg tracking-wide text-lg"
            >
              {loading ? 'Analizando con IA...' : 'Generar Plan Personalizado'}
            </button>
          </form>
        </div>

        {/* ==========================================
            🔥 RESULTADOS PREMIUM (TEXTO + FOTOS) 🔥
            ========================================== */}
        {rutina && (
          <div className="bg-[#111111] border border-gray-800 rounded-xl overflow-hidden shadow-2xl animate-fade-in space-y-0">
            
            {/* Texto de la rutina Formateado con Markdown */}
            <div className="p-6 md:p-10">
              <h2 className="text-2xl md:text-3xl font-black mb-6 text-red-500 border-b border-gray-800 pb-4 flex justify-between items-center">
                <span>TU PLAN PREMIUM</span>
                <Link href="/mi-panel" className="text-xs font-bold text-gray-400 hover:text-white underline tracking-widest hidden md:block uppercase">Ver en Bóveda →</Link>
              </h2>
              
              <div className="font-sans">
                <ReactMarkdown
                  components={{
                    h1: ({node, ...props}) => <h1 className="text-3xl font-black text-white mt-8 mb-4" {...props} />,
                    h2: ({node, ...props}) => <h2 className="text-2xl font-bold text-white mt-8 mb-4 border-b border-gray-800 pb-2" {...props} />,
                    h3: ({node, ...props}) => <h3 className="text-xl font-bold text-red-400 mt-6 mb-3 uppercase tracking-wide" {...props} />,
                    p: ({node, ...props}) => <p className="text-gray-300 leading-relaxed mb-5 text-[1.05rem]" {...props} />,
                    ul: ({node, ...props}) => <ul className="list-disc list-inside text-gray-300 mb-6 space-y-2 bg-[#0a0a0a] p-6 rounded-xl border border-gray-800 shadow-inner" {...props} />,
                    li: ({node, ...props}) => <li className="text-gray-300" {...props} />,
                    strong: ({node, ...props}) => <strong className="text-white font-bold" {...props} />,
                  }}
                >
                  {rutina}
                </ReactMarkdown>
              </div>
            </div>

            {/* Catálogo Visual Dinámico - TAMAÑO h-48 IMPLEMENTADO */}
            {fotosEjercicios.length > 0 && (
              <div className="bg-[#050505] border-t border-gray-800 p-6 md:p-10">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg md:text-xl font-black text-white flex items-center gap-2">
                    <span className="text-red-500">►</span> Catálogo Visual Explicativo
                  </h3>
                  <span className="text-xs text-gray-500 uppercase tracking-widest hidden md:block">Clic para ampliar</span>
                </div>
                
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
                  {fotosEjercicios.map((foto, index) => (
                    <div 
                      key={index} 
                      onClick={() => setImagenSeleccionada(foto)}
                      className="bg-[#111] border border-gray-800 rounded-xl overflow-hidden shadow-lg p-3 cursor-pointer hover:border-red-500 transition-colors group"
                    >
                      <div className="h-48 w-full relative bg-[#050505] rounded-lg overflow-hidden mb-3 group-hover:scale-[1.03] transition-transform">
                        <Image 
                          src={foto.imagen} 
                          alt={foto.nombre} 
                          fill 
                          sizes="(max-width: 768px) 100vw, 33vw"
                          className="object-contain p-2" 
                        />
                      </div>
                      <p className="text-sm text-center font-bold text-gray-200 truncate px-1 group-hover:text-white transition-colors">
                        {foto.nombre}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        )}

      </div>
    </div>
  );
}