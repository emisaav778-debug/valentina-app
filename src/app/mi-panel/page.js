'use client';

import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { analizarRutina } from '../../lib/diccionarioEjercicios';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
import ThemeToggle from '../../components/ThemeToggle';
import CalculadoraMacros from '../../components/CalculadoraMacros';
import DashboardProgreso from '../../components/DashboardProgreso';
import BotonModoDios from '../../components/BotonModoDios';
import MisEsenciales from '../../components/MisEsenciales';
import { Heart, MessageCircle } from 'lucide-react';

export default function MiPanel() {
  const router = useRouter();
  const [rutinas, setRutinas] = useState([]);
  const [compras, setCompras] = useState([]); 
  const [cargando, setCargando] = useState(true);
  const [imagenSeleccionada, setImagenSeleccionada] = useState(null);
  const [registros, setRegistros] = useState([]);
  const [nuevoPeso, setNuevoPeso] = useState('');
  
  // Estados para la gamificación
  const [racha, setRacha] = useState(0);
  const [entrenoHoy, setEntrenoHoy] = useState(false);

  // Estados para la Comunidad
  const [mensajesMuro, setMensajesMuro] = useState([]);

  useEffect(() => {
    const obtenerDatos = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        router.push('/login');
        return;
      }

      const { data: dataRutinas } = await supabase
        .from('rutinas').select('*').eq('user_id', session.user.id).order('created_at', { ascending: false });
      if (dataRutinas) setRutinas(dataRutinas);

      const { data: dataCompras } = await supabase
        .from('compras').select('*').eq('user_id', session.user.id).order('created_at', { ascending: false });
      if (dataCompras) setCompras(dataCompras);

      const { data: dataProgreso } = await supabase
        .from('progreso')
        .select('*')
        .eq('user_id', session.user.id)
        .order('fecha', { ascending: true }); 
      
      if (dataProgreso) setRegistros(dataProgreso);

      // Obtener mensajes del Muro (Los últimos 5)
      const { data: dataMuro } = await supabase
        .from('muro_victorias')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(5);
      if (dataMuro) setMensajesMuro(dataMuro);

      // Obtener Racha
      const hoy = new Date().toISOString().split('T')[0];
      const { data: dataActividad, error: errActividad } = await supabase
        .from('actividad').select('fecha').eq('user_id', session.user.id).order('fecha', { ascending: false });

      if (errActividad) {
        console.error("Error leyendo racha:", errActividad);
      }

      if (dataActividad) {
        const entreno = dataActividad.some(a => a.fecha === hoy);
        setEntrenoHoy(entreno);

        let currentRacha = 0;
        let checkDate = new Date();
        if (!entreno) checkDate.setDate(checkDate.getDate() - 1);

        for (const record of dataActividad) {
          if (record.fecha === checkDate.toISOString().split('T')[0]) {
            currentRacha++;
            checkDate.setDate(checkDate.getDate() - 1);
          } else {
            break; 
          }
        }
        setRacha(currentRacha);
      }

      setCargando(false);
    };
    
    obtenerDatos();
  }, [router]);

  const registrarEntrenamiento = async () => {
    try {
      const hoy = new Date().toISOString().split('T')[0];
      const { data: { session } } = await supabase.auth.getSession();
      
      const { error } = await supabase
        .from('actividad')
        .insert([{ user_id: session.user.id, fecha: hoy }]);
        
      if (error && error.code !== '23505') { 
        alert(`Error en Base de Datos: ${error.message}`);
        console.error("Detalle del error:", error);
        return;
      }
      
      setEntrenoHoy(true);
      setRacha(prev => prev + 1);
    } catch (err) {
      alert("Error de conexión al registrar entrenamiento.");
      console.error(err);
    }
  };

  const cerrarSesion = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  const darLike = async (id, likesActuales) => {
    const { error } = await supabase
      .from('muro_victorias')
      .update({ likes: likesActuales + 1 })
      .eq('id', id);
      
    if (!error) {
       setMensajesMuro(mensajesMuro.map(msg => msg.id === id ? {...msg, likes: msg.likes + 1} : msg));
    }
  };

  const formatoUsuario = (email) => {
    return "@" + email.split('@')[0];
  };

  const obtenerDetallesPremium = (nombre) => {
    if (nombre.includes('Abdomen Plano')) return { img: '/reto1.png', link: '/pdf/abdomen_plano_30_dias.pdf' };
    if (nombre.includes('Tren Inferior')) return { img: '/reto2.png', link: '/pdf/desafio-tren-inferior.pdf' };
    if (nombre.includes('Full Body') || nombre.includes('Quema-Grasa')) return { img: '/reto3.png', link: '/pdf/full-body-quema-grasa.pdf' };
    if (nombre.includes('Glúteos de Acero')) return { img: '/pdf1.png', link: '/pdf/gluteos-de-acero.pdf' };
    if (nombre.includes('Hipertrofia Total')) return { img: '/pdf2.png', link: '/pdf/hipertrofia-total.pdf' };
    if (nombre.includes('Quema de Grasa Extrema')) return { img: '/pdf3.png', link: '/pdf/quema-grasa-extrema.pdf' };
    if (nombre.includes('Espartano en Casa')) return { img: '/pdf-hombre1.png', link: '/pdf/espartano-en-casa.pdf' };
    if (nombre.includes('Volumen Titán')) return { img: '/pdf-hombre2.png', link: '/pdf/volumen-titan.pdf' };
    if (nombre.includes('Definición Extrema')) return { img: '/pdf-hombre3.png', link: '/pdf/definicion-extrema.pdf' };
    if (nombre.includes('Recetario')) return { img: '/libro.png', link: '/pdf/recetario-y-mindset.pdf' };
    return { img: '/hero-nueva.png', link: '#' };
  };

  if (cargando) return <div className="min-h-screen bg-gray-50 dark:bg-[#0a0a0a]" />;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0a0a0a] text-gray-900 dark:text-white transition-colors duration-300 selection:bg-red-500 selection:text-white">
      
      <nav className="fixed top-0 w-full bg-white/90 dark:bg-[#0a0a0a]/90 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 z-50 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            <Link href="/" className="flex-shrink-0 flex items-center hover:opacity-80 transition-opacity cursor-pointer">
              <span className="text-2xl font-black tracking-tighter text-gray-900 dark:text-white">
                VALENTINA<span className="text-red-500">FIT</span>
              </span>
            </Link>
            
            <div className="flex items-center gap-4">
              <ThemeToggle />
              <button onClick={cerrarSesion} className="text-sm font-bold text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-500 transition-colors">
                Cerrar Sesión
              </button>
            </div>
          </div>
        </div>
      </nav>

      <BotonModoDios />

      {imagenSeleccionada && (
        <div className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4" onClick={() => setImagenSeleccionada(null)}>
          <button className="absolute top-6 right-8 text-5xl text-gray-400 hover:text-red-500">&times;</button>
          <div className="relative w-full max-w-4xl h-[80vh]" onClick={(e) => e.stopPropagation()}>
            <Image src={imagenSeleccionada.imagen} alt={imagenSeleccionada.nombre} fill className="object-contain" />
            <div className="absolute -bottom-10 left-0 right-0 text-center text-red-500 text-2xl font-black">{imagenSeleccionada.nombre}</div>
          </div>
        </div>
      )}

      <div className="max-w-4xl mx-auto p-4 md:p-8 pt-28 md:pt-32">
        
        {/* ==========================================
            1. BANNER DE RACHA
            ========================================== */}
        <div className="bg-white dark:bg-[#111] border border-gray-200 dark:border-red-500/30 rounded-2xl p-6 mb-8 shadow-lg flex flex-col md:flex-row items-center justify-between transition-colors duration-300">
           <div className="text-center md:text-left mb-4 md:mb-0">
              <h2 className="text-3xl font-black mb-1">Racha Actual: <span className="text-red-500">{racha} 🔥</span></h2>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Entrena todos los días para no perder tu progreso.</p>
           </div>
           <button
              onClick={registrarEntrenamiento}
              disabled={entrenoHoy}
              className={`px-8 py-4 rounded-xl font-black text-lg transition-all transform ${
                entrenoHoy 
                ? 'bg-gray-200 dark:bg-gray-800 text-gray-400 dark:text-gray-500 cursor-not-allowed' 
                : 'bg-red-600 hover:bg-red-700 text-white shadow-[0_0_20px_rgba(220,38,38,0.4)] hover:scale-105 active:scale-95'
              }`}
           >
              {entrenoHoy ? '¡DÍA COMPLETADO! ✅' : 'MARCAR ENTRENAMIENTO 🔥'}
           </button>
        </div>

        {/* ==========================================
            2. CALCULADORA METABÓLICA 
            ========================================== */}
        <div className="mb-12">
          <CalculadoraMacros />
        </div>

        {/* ==========================================
            3. PANEL DE EVOLUCIÓN
            ========================================== */}
        <div className="mb-12 bg-white dark:bg-[#111] p-6 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-lg transition-colors duration-300">
          <h2 className="text-2xl font-black mb-4">MI EVOLUCIÓN</h2>
          <div className="flex gap-2 mb-6">
            <input 
              type="number" 
              placeholder="Peso actual (kg)" 
              className="w-full bg-gray-50 dark:bg-[#050505] border border-gray-200 dark:border-gray-800 rounded-lg p-2 text-gray-900 dark:text-white" 
              onChange={(e) => setNuevoPeso(e.target.value)} 
            />
            <button 
              onClick={async () => {
                if (!nuevoPeso) return;
                const { data: { session } } = await supabase.auth.getSession();
                const { error } = await supabase.from('progreso').insert([{ user_id: session.user.id, peso: nuevoPeso }]);
                if (error) {
                    alert("Error al guardar: " + error.message);
                } else {
                    window.location.reload(); 
                }
              }} 
              className="bg-red-600 px-6 py-2 rounded-lg font-bold text-white hover:bg-red-700 transition-colors"
            >
              Registrar
            </button>
          </div>
          <DashboardProgreso datos={registros} />
        </div>

        {/* ==========================================
            4. MI BÓVEDA (PDFs)
            ========================================== */}
        <div className="flex justify-between items-center mb-8 border-b border-gray-200 dark:border-gray-800 pb-6 transition-colors duration-300">
          <h1 className="text-4xl font-black">MI <span className="text-red-500">BÓVEDA</span></h1>
          <Link href="/plan-personalizado" className="bg-red-600 px-6 py-2 rounded-full font-bold text-white shadow-[0_0_15px_rgba(220,38,38,0.3)] hover:bg-red-700 transition-colors">
            + Nuevo Plan
          </Link>
        </div>

        {compras.length > 0 && (
          <div className="mb-16">
            <h2 className="text-2xl font-black mb-6 flex items-center gap-2">
              <span className="text-red-500">★</span> CONTENIDO PREMIUM
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {compras.map((compra) => {
                const detalles = obtenerDetallesPremium(compra.producto_nombre);
                return (
                  <div key={compra.id} className="bg-white dark:bg-[#111] border border-gray-200 dark:border-red-900/40 rounded-2xl overflow-hidden shadow-lg hover:border-red-500 dark:hover:border-red-500 transition-colors flex flex-col">
                    <div className="h-48 w-full relative border-b border-gray-200 dark:border-gray-800 bg-gray-100 dark:bg-[#050505]">
                      <Image src={detalles.img} alt={compra.producto_nombre} fill className="object-cover opacity-90" />
                    </div>
                    <div className="p-6 flex-1 flex flex-col justify-between">
                      <h3 className="text-xl font-bold mb-4">{compra.producto_nombre}</h3>
                      {detalles.link !== '#' ? (
                        <a href={detalles.link} target="_blank" rel="noopener noreferrer" className="w-full text-center bg-gray-900 dark:bg-white text-white dark:text-black font-bold py-3 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors">
                          Descargar PDF ↓
                        </a>
                      ) : (
                        <button disabled className="w-full text-center bg-gray-200 dark:bg-gray-800 text-gray-500 font-bold py-3 rounded-lg">Archivo no disponible</button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ==========================================
            🔥 NUEVO: MURO DE VICTORIAS
            ========================================== */}
        <div className="mb-16 border-t border-gray-200 dark:border-gray-800 pt-10">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-black flex items-center gap-2">
              <MessageCircle className="text-red-500" /> MURO DE VICTORIAS
            </h2>
            <Link href="/comunidad" className="text-sm font-bold text-red-500 hover:text-red-600 transition-colors">
              Ver todo o publicar &rarr;
            </Link>
          </div>
          
          <div className="grid gap-4">
            {mensajesMuro.length === 0 ? (
              <div className="bg-white dark:bg-[#111] p-6 rounded-2xl text-center border border-gray-200 dark:border-gray-800">
                <p className="text-gray-500">El muro está vacío. ¡Ve a la comunidad y sé la primera en publicar!</p>
              </div>
            ) : (
              mensajesMuro.map((msg) => (
                <div key={msg.id} className="bg-white dark:bg-[#111] p-5 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-500 rounded-full flex items-center justify-center font-bold text-sm">
                      {msg.user_email.charAt(0).toUpperCase()}
                    </div>
                    <span className="font-bold text-sm">{formatoUsuario(msg.user_email)}</span>
                    <span className="text-xs text-gray-400">• Hace poco</span>
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 mb-3 ml-11">{msg.mensaje}</p>
                  <div className="flex gap-4 ml-11">
                    <button onClick={() => darLike(msg.id, msg.likes)} className="flex items-center gap-1 text-sm text-gray-500 hover:text-red-500 transition-colors group">
                       <Heart size={16} className={msg.likes > 0 ? "fill-red-500 text-red-500" : ""} />
                       <span className="font-bold group-hover:text-red-500">{msg.likes}</span>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* ==========================================
            🔥 NUEVO: MIS ESENCIALES (MONETIZACIÓN)
            ========================================== */}
        <MisEsenciales />

        {/* ==========================================
            6. PLANES PERSONALIZADOS (IA)
            ========================================== */}
        {rutinas.length > 0 && (
          <div>
            <h2 className="text-2xl font-black mb-6 text-gray-500 dark:text-gray-400 border-b border-gray-200 dark:border-gray-800 pb-2">RUTINAS (MODO DIOS)</h2>
            {rutinas.map((rutina) => {
              const fotosEjercicios = analizarRutina(rutina.rutina_texto);
              return (
                <div key={rutina.id} className="bg-white dark:bg-[#111] border border-gray-200 dark:border-gray-800 shadow-lg rounded-2xl mb-8 overflow-hidden transition-colors duration-300">
                  <div className="p-6 md:p-10">
                    <ReactMarkdown
                      components={{
                        h1: ({node, ...props}) => <h1 className="text-3xl font-black text-gray-900 dark:text-white mt-8 mb-4" {...props} />,
                        h2: ({node, ...props}) => <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4 border-b border-gray-200 dark:border-gray-800 pb-2" {...props} />,
                        h3: ({node, ...props}) => <h3 className="text-xl font-bold text-red-600 dark:text-red-400 mt-6 mb-3 uppercase tracking-wide" {...props} />,
                        p: ({node, ...props}) => <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-5 text-[1.05rem]" {...props} />,
                        ul: ({node, ...props}) => <ul className="list-disc list-inside bg-gray-50 dark:bg-[#0a0a0a] p-4 rounded-lg mb-6 text-gray-700 dark:text-gray-300 border border-gray-100 dark:border-gray-900" {...props} />,
                        li: ({node, ...props}) => <li className="text-gray-700 dark:text-gray-300" {...props} />,
                        strong: ({node, ...props}) => <strong className="text-gray-900 dark:text-white font-bold" {...props} />,
                      }}
                    >
                      {rutina.rutina_texto}
                    </ReactMarkdown>
                  </div>

                  {fotosEjercicios.length > 0 && (
                    <div className="bg-gray-50 dark:bg-[#050505] p-6 border-t border-gray-200 dark:border-gray-800 transition-colors duration-300">
                      <h3 className="text-lg font-black mb-4 flex items-center gap-2 text-gray-900 dark:text-white">
                        <span className="text-red-500">►</span> Catálogo Visual
                      </h3>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                        {fotosEjercicios.map((foto, i) => (
                          <div key={i} onClick={() => setImagenSeleccionada(foto)} className="bg-white dark:bg-[#111] border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden shadow-sm hover:shadow-md p-3 cursor-pointer hover:border-red-500 dark:hover:border-red-500 transition-all group">
                            <div className="h-48 w-full relative bg-gray-50 dark:bg-[#050505] rounded-lg overflow-hidden mb-3 group-hover:scale-[1.03] transition-transform">
                              <Image src={foto.imagen} alt={foto.nombre} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-contain p-2" />
                            </div>
                            <p className="text-sm text-center font-bold text-gray-600 dark:text-gray-200 truncate px-1 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
                              {foto.nombre}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}