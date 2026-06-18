'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import { Users, Activity, CreditCard, Star, Search, LogOut } from 'lucide-react';

export default function AdminPanel() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [adminUserId, setAdminUserId] = useState(null);
  
  const [selectedPlan, setSelectedPlan] = useState('Reto Glúteos de Acero - Tren Inferior');
  const [enviando, setEnviando] = useState(false);
  const [mensajeExito, setMensajeExito] = useState('');

  const router = useRouter();
  const CORREO_ADMIN = "emisaav778@gmail.com"; 

  useEffect(() => {
    const verificarPermisos = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        router.push('/login');
        return;
      }
      
      if (session.user.email.toLowerCase().trim() !== CORREO_ADMIN.toLowerCase().trim()) {
        router.push('/mi-panel');
        return;
      }

      setIsAdmin(true);
      setAdminUserId(session.user.id);
      setLoading(false);
    };

    verificarPermisos();
  }, [router]);

  const inyectarPlan = async () => {
    if (!adminUserId) return;
    
    setEnviando(true);
    setMensajeExito('');

    // 🧠 EL CEREBRO DE LAS RUTINAS: Genera textos largos según lo que elijas
    let textoDeLaRutina = "";

    switch (selectedPlan) {
      case 'Reto Glúteos de Acero - Tren Inferior':
        textoDeLaRutina = `¡Hola, Campeona! 🔥 Bienvenida al Reto Glúteos de Acero. Hoy nos enfocamos en construir volumen y fuerza en el tren inferior.\n\nTu rutina de hoy:\n1. Calentamiento activo (5 min).\n2. Sentadilla Libre: 4 series de 10-12 repeticiones (baja profundo).\n3. Hip Thrust: 4 series de 8-10 repeticiones (sostén 2 seg arriba).\n4. Peso Muerto Rumano: 4 series de 10 reps (siente el estiramiento).\n5. Prensa de Piernas: 3 series de 15 reps.\n6. Finisher: Sentadilla Búlgara, 3 series de 10 reps por pierna.\n\n¡Fuego en esas piernas, a darlo todo!`;
        break;
      
      case 'Hipertrofia Tren Superior (Pecho y Brazos)':
        textoDeLaRutina = `¡Hola! 💪 Hoy toca esculpir ese tren superior. Brazos tonificados y espalda fuerte.\n\nTu rutina de hoy:\n1. Press de Banca: 4 series de 10 repeticiones.\n2. Dominadas (o jalón al pecho): 4 series al fallo.\n3. Press Militar con mancuernas: 3 series de 12 reps.\n4. Biseries de brazos: Curl de Bíceps alterno + Extensiones de Tríceps (Polea) - 3 vueltas de 15 reps.\n5. Elevaciones Laterales para hombros 3D: 4 series de 15 reps.\n\n¡Mantén la postura y controla el peso!`;
        break;

      case 'Definición Full Body - Avanzado':
        textoDeLaRutina = `¡Atención, modo bestia activado! 🌪️ Hoy vamos a quemar calorías y tonificar todo el cuerpo.\n\nCircuito (Repite 4 veces, descansa 1 min entre vueltas):\n1. Burpees: 15 repeticiones.\n2. Zancadas / Estocadas: 20 pasos caminados.\n3. Flexiones o Press de Banca ligero: 15 reps.\n4. Kettlebell Swings (o sentadilla con salto si no tienes pesa): 20 reps.\n5. Escaladores (Mountain Climbers): 40 segundos sin parar.\n\n¡Mantén las pulsaciones altas, tú puedes!`;
        break;

      case 'Core y Abdominales de Hierro':
        textoDeLaRutina = `¡A esculpir ese abdomen! 🍫 Una rutina corta pero letal para fortalecer el core y afinar la cintura.\n\nRealiza este bloque 3 veces:\n1. Plancha Abdominal: 60 segundos (aprieta el glúteo).\n2. Crunch Bicicleta: 30 repeticiones en total.\n3. Elevación de Piernas recostada: 15 reps (baja lento).\n4. Plancha Lateral: 30 segundos por lado.\n5. Rueda Abdominal (si tienes) o Extensiones Lumbares (Superman): 12 reps.\n\n¡Respira y mantén el abdomen contraído en todo momento!`;
        break;

      default:
        textoDeLaRutina = `¡Vamos a entrenar duro hoy! Concéntrate en la técnica y disfruta el proceso.`;
    }

    try {
      const { error } = await supabase
        .from('rutinas')
        .insert([
          { user_id: adminUserId, rutina_texto: textoDeLaRutina }
        ]);

      if (error) throw error;

      setMensajeExito('¡Plan inyectado con éxito en la Bóveda!');
      setTimeout(() => setMensajeExito(''), 5000);
    } catch (err) {
      console.error(err);
      alert("Error de base de datos: " + err.message);
    } finally {
      setEnviando(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center text-pink-500 font-bold animate-pulse text-xl">
        <Activity size={48} className="mb-4" />
        <p>Verificando credenciales de Alta Seguridad...</p>
      </div>
    );
  }

  if (!isAdmin) return null;

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white p-6 md:p-12">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10 border-b border-gray-900 pb-6">
        <div>
          <h1 className="text-4xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-violet-500 flex items-center gap-3">
            MODO DIOS <Star className="text-yellow-500 fill-yellow-500" size={32} />
          </h1>
          <p className="text-gray-400 mt-1">Centro de Control de Alumnas • VALENTINAFIT</p>
        </div>
        <button 
          onClick={() => router.push('/mi-panel')}
          className="flex items-center gap-2 bg-gray-900 hover:bg-gray-800 border border-gray-800 px-5 py-2.5 rounded-xl text-sm font-bold transition-all text-gray-300"
        >
          <LogOut size={18} />
          Volver a mi Bóveda
        </button>
      </div>

      {/* TARJETAS DE MÉTRICAS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <div className="bg-[#111111] border border-gray-800/80 p-6 rounded-2xl flex items-center gap-4">
          <div className="bg-pink-500/20 p-4 rounded-xl text-pink-500"><Users size={28} /></div>
          <div>
            <p className="text-gray-500 text-xs font-bold uppercase tracking-wider">Total Alumnas</p>
            <p className="text-3xl font-black mt-1 text-white">1</p>
          </div>
        </div>
        <div className="bg-[#111111] border border-gray-800/80 p-6 rounded-2xl flex items-center gap-4">
          <div className="bg-violet-500/20 p-4 rounded-xl text-violet-500"><Activity size={28} /></div>
          <div>
            <p className="text-gray-500 text-xs font-bold uppercase tracking-wider">Entrenamientos</p>
            <p className="text-3xl font-black mt-1 text-white">0</p>
          </div>
        </div>
        <div className="bg-[#111111] border border-gray-800/80 p-6 rounded-2xl flex items-center gap-4">
          <div className="bg-emerald-500/20 p-4 rounded-xl text-emerald-500"><CreditCard size={28} /></div>
          <div>
            <p className="text-gray-500 text-xs font-bold uppercase tracking-wider">Ingresos (Mes)</p>
            <p className="text-3xl font-black mt-1 text-white">$0</p>
          </div>
        </div>
        <div className="bg-[#111111] border border-gray-800/80 p-6 rounded-2xl flex items-center gap-4">
          <div className="bg-amber-500/20 p-4 rounded-xl text-amber-500"><Star size={28} /></div>
          <div>
            <p className="text-gray-500 text-xs font-bold uppercase tracking-wider">Servidor</p>
            <p className="text-3xl font-black mt-1 text-white">Live</p>
          </div>
        </div>
      </div>

      {/* SECCIÓN PRINCIPAL: GESTIÓN */}
      <div className="bg-[#111111] border border-gray-800/80 rounded-2xl p-8">
        <h2 className="text-2xl font-black mb-2 text-white">Asignador de Planes Especiales</h2>
        <p className="text-sm text-gray-400 mb-8">
          Selecciona una alumna para inyectarle un plan de entrenamiento directo a su Bóveda. Esta acción impacta directamente en su panel en tiempo real.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <label className="block text-xs font-bold uppercase text-gray-400 mb-2">Seleccionar Alumna</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={18} />
                <select className="w-full bg-black border border-gray-800 rounded-xl pl-10 pr-4 py-3 text-sm text-white focus:outline-none focus:border-pink-500 appearance-none">
                  {/* El value lo asociamos a tu cuenta actual para la prueba */}
                  <option value={adminUserId}>Emi Saavedra (emisaav778@gmail.com) - Activa</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-gray-400 mb-2">Asignar Rutina / Plan VIP</label>
              <select 
                value={selectedPlan}
                onChange={(e) => setSelectedPlan(e.target.value)}
                className="w-full bg-black border border-gray-800 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-pink-500"
              >
                {/* 🚀 AQUÍ ESTÁN LAS NUEVAS OPCIONES DE RUTINAS COMPLETAS */}
                <option value="Reto Glúteos de Acero - Tren Inferior">🔥 Reto Glúteos de Acero - Tren Inferior</option>
                <option value="Hipertrofia Tren Superior (Pecho y Brazos)">💪 Hipertrofia Tren Superior (Pecho y Brazos)</option>
                <option value="Definición Full Body - Avanzado">🌪️ Definición Full Body - Avanzado</option>
                <option value="Core y Abdominales de Hierro">🍫 Core y Abdominales de Hierro</option>
              </select>
            </div>

            <button 
              onClick={inyectarPlan}
              disabled={enviando}
              className={`w-full font-black p-4 rounded-xl text-sm transition-all shadow-lg ${
                enviando 
                ? 'bg-gray-800 text-gray-500 cursor-not-allowed' 
                : 'bg-gradient-to-r from-pink-500 to-violet-500 hover:from-pink-600 hover:to-violet-600 text-white shadow-pink-500/20'
              }`}
            >
              {enviando ? 'Inyectando datos...' : 'Enviar Plan Personalizado 🚀'}
            </button>
            
            {mensajeExito && (
              <div className="mt-4 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 p-4 rounded-xl text-sm font-bold text-center animate-pulse">
                {mensajeExito}
              </div>
            )}
          </div>
          
          <div className="bg-black/50 border border-gray-800/50 rounded-xl p-6 flex flex-col justify-center items-center text-center">
             <div className="bg-gray-900 p-4 rounded-full mb-4 relative">
               <Activity size={32} className="text-pink-500" />
               <span className="absolute top-0 right-0 w-3 h-3 bg-emerald-500 rounded-full animate-ping"></span>
               <span className="absolute top-0 right-0 w-3 h-3 bg-emerald-500 rounded-full"></span>
             </div>
             <h3 className="font-bold text-lg text-white mb-2">Conexión a Base de Datos: Estable</h3>
             <p className="text-xs text-gray-500 mb-4">El motor de IA analizará el texto enviado y mostrará automáticamente las infografías correspondientes en el panel de la alumna.</p>
             <span className="bg-pink-500/10 text-pink-500 px-3 py-1 rounded-full text-xs font-bold">Catálogo Sincronizado</span>
          </div>
        </div>
      </div>
    </div>
  );
}