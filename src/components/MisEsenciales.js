'use client';
import { Watch, Flame, Dumbbell } from 'lucide-react';

export default function MisEsenciales() {
  // Aquí es donde en el futuro cambiarás el 'link' por tu link de afiliado de Amazon o MercadoLibre
  const esenciales = [
    {
      nombre: "Smartwatch Deportivo",
      link: "https://www.mercadolibre.com.ar", 
      icono: <Watch size={32} className="text-pink-500" />,
      desc: "El que uso para medir mis calorías y llevar el tiempo de mis sesiones de fuerza."
    },
    {
      nombre: "Proteína Whey Premium",
      link: "https://www.mercadolibre.com.ar",
      icono: <Flame size={32} className="text-amber-500" />,
      desc: "Mi favorita para la recuperación muscular después de entrenar duro."
    },
    {
      nombre: "Bandas Elásticas",
      link: "https://www.mercadolibre.com.ar",
      icono: <Dumbbell size={32} className="text-violet-500" />,
      desc: "Indispensables para activar el tren inferior y hacer rutinas en casa."
    },
  ];

  return (
    <div className="mb-16 border-t border-gray-200 dark:border-gray-800 pt-10 transition-colors duration-300">
      <h2 className="text-2xl font-black mb-2 flex items-center gap-2">
        <span className="text-red-500">💎</span> MIS ESENCIALES
      </h2>
      <p className="text-gray-500 dark:text-gray-400 mb-8 text-sm font-medium">
        Las herramientas y suplementos exactos que utilizo a diario para lograr mis resultados.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {esenciales.map((item, i) => (
          <a key={i} href={item.link} target="_blank" rel="noopener noreferrer" className="bg-white dark:bg-[#111] p-6 rounded-2xl border border-gray-200 dark:border-gray-800 hover:border-red-500 dark:hover:border-red-500 transition-all group shadow-sm hover:shadow-md">
            <div className="mb-5 bg-gray-50 dark:bg-gray-900 w-16 h-16 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
              {item.icono}
            </div>
            <h3 className="font-bold text-lg mb-2 text-gray-900 dark:text-white">{item.nombre}</h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm mb-4 leading-relaxed">{item.desc}</p>
            <span className="text-red-500 font-bold text-sm group-hover:underline flex items-center gap-1">
              Ver producto <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
            </span>
          </a>
        ))}
      </div>
    </div>
  );
}