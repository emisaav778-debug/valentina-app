'use client';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import { MessageCircle, Heart, Trophy, Flame, Send, ArrowLeft } from 'lucide-react';

export default function ComunidadPanel() {
  const [sesion, setSesion] = useState(null);
  const [posts, setPosts] = useState([]);
  const [nuevoMensaje, setNuevoMensaje] = useState('');
  const [enviando, setEnviando] = useState(false);
  const router = useRouter();

  // Cargar usuario y los mensajes al entrar
  useEffect(() => {
    const cargarDatos = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push('/login');
        return;
      }
      setSesion(session);
      obtenerMensajes();
    };
    cargarDatos();
  }, [router]);

  const obtenerMensajes = async () => {
    const { data, error } = await supabase
      .from('muro_victorias')
      .select('*')
      .order('created_at', { ascending: false }); // Los más nuevos arriba
    
    if (!error && data) {
      setPosts(data);
    }
  };

  const publicarMensaje = async (e) => {
    e.preventDefault();
    if (!nuevoMensaje.trim() || !sesion) return;

    setEnviando(true);
    
    const { error } = await supabase
      .from('muro_victorias')
      .insert([
        { 
          user_id: sesion.user.id, 
          user_email: sesion.user.email,
          mensaje: nuevoMensaje 
        }
      ]);

    if (!error) {
      setNuevoMensaje(''); // Limpiar la caja
      obtenerMensajes(); // Recargar la lista
    } else {
      alert("Error al publicar: " + error.message);
    }
    setEnviando(false);
  };

  const darLike = async (id, likesActuales) => {
    const { error } = await supabase
      .from('muro_victorias')
      .update({ likes: likesActuales + 1 })
      .eq('id', id);
      
    if (!error) obtenerMensajes();
  };

  // Extraemos el "usuario" del email (ej: maria@gmail.com -> @maria)
  const formatoUsuario = (email) => {
    return "@" + email.split('@')[0];
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white p-6 md:p-12 max-w-4xl mx-auto">
      
      {/* HEADER */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-violet-500 flex items-center gap-3">
            <Flame className="text-pink-500" size={32} />
            Muro de Victorias
          </h1>
          <p className="text-gray-400 mt-1">La tribu VALENTINAFIT. Comparte tus logros.</p>
        </div>
        <button 
          onClick={() => router.push('/mi-panel')}
          className="p-3 bg-gray-900 hover:bg-gray-800 rounded-full transition-colors"
        >
          <ArrowLeft size={24} className="text-gray-300" />
        </button>
      </div>

      {/* CAJA DE PUBLICACIÓN */}
      <div className="bg-[#111] border border-gray-800 p-6 rounded-3xl mb-10 shadow-lg shadow-pink-500/5">
        <form onSubmit={publicarMensaje}>
          <textarea
            value={nuevoMensaje}
            onChange={(e) => setNuevoMensaje(e.target.value)}
            placeholder="¿Qué lograste hoy, Campeona? ¡Cuéntale a la tribu!"
            className="w-full bg-black/50 border border-gray-800 rounded-2xl p-4 text-white focus:outline-none focus:border-pink-500 resize-none"
            rows="3"
          />
          <div className="flex justify-between items-center mt-4">
            <div className="flex gap-2 text-gray-500">
              <Trophy size={20} className="hover:text-amber-400 cursor-pointer transition-colors" />
              <Flame size={20} className="hover:text-pink-500 cursor-pointer transition-colors" />
            </div>
            <button 
              type="submit"
              disabled={enviando || !nuevoMensaje.trim()}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold transition-all ${
                nuevoMensaje.trim() 
                  ? 'bg-pink-600 hover:bg-pink-700 text-white shadow-lg shadow-pink-500/30' 
                  : 'bg-gray-800 text-gray-500 cursor-not-allowed'
              }`}
            >
              <Send size={18} />
              {enviando ? 'Publicando...' : 'Publicar'}
            </button>
          </div>
        </form>
      </div>

      {/* FEED DE MENSAJES */}
      <div className="space-y-6">
        {posts.length === 0 ? (
          <div className="text-center py-10 bg-[#111] rounded-3xl border border-gray-800">
            <MessageCircle size={48} className="mx-auto text-gray-700 mb-4" />
            <h3 className="text-xl font-bold text-gray-400">El muro está silencioso</h3>
            <p className="text-gray-500">¡Sé la primera en compartir una victoria hoy!</p>
          </div>
        ) : (
          posts.map((post) => (
            <div key={post.id} className="bg-[#111] border border-gray-800 p-6 rounded-3xl transition-transform hover:-translate-y-1 duration-300">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-tr from-pink-500 to-violet-500 rounded-full flex items-center justify-center font-bold">
                  {post.user_email.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="font-bold text-gray-200">{formatoUsuario(post.user_email)}</p>
                  <p className="text-xs text-gray-500">
                    {new Date(post.created_at).toLocaleDateString()} a las {new Date(post.created_at).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                  </p>
                </div>
              </div>
              
              <p className="text-gray-300 mb-6 text-lg leading-relaxed">
                {post.mensaje}
              </p>
              
              <div className="flex items-center gap-6 border-t border-gray-800/50 pt-4">
                <button 
                  onClick={() => darLike(post.id, post.likes)}
                  className="flex items-center gap-2 text-gray-500 hover:text-pink-500 transition-colors group"
                >
                  <Heart size={20} className={post.likes > 0 ? "fill-pink-500/20 text-pink-500" : ""} />
                  <span className="font-bold group-hover:text-pink-500">{post.likes}</span>
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}