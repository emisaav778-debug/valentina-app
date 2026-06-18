'use client';

import { useState } from 'react';

export default function CalculadoraMacros() {
  const [datos, setDatos] = useState({
    genero: 'mujer', edad: '', peso: '', altura: '', actividad: '1.375', objetivo: 'perder'
  });
  const [resultados, setResultados] = useState(null);

  const calcular = (e) => {
    e.preventDefault();
    const { genero, edad, peso, altura, actividad, objetivo } = datos;
    
    if (!edad || !peso || !altura) return;

    // Fórmula científica de Mifflin-St Jeor
    let tdee = (10 * parseFloat(peso)) + (6.25 * parseFloat(altura)) - (5 * parseFloat(edad));
    tdee = genero === 'hombre' ? tdee + 5 : tdee - 161;
    
    // Multiplicador de actividad
    let caloriasMantenimiento = tdee * parseFloat(actividad);
    
    // Ajuste por objetivo
    let caloriasObjetivo = caloriasMantenimiento;
    if (objetivo === 'perder') caloriasObjetivo -= 500;
    if (objetivo === 'ganar') caloriasObjetivo += 300;

    // Cálculo de Macros (Nutrición Deportiva Estándar)
    const proteina = parseFloat(peso) * 2.2; // 2.2g por kg de peso
    const grasas = (caloriasObjetivo * 0.25) / 9; // 25% de las calorías en grasas
    const carbos = (caloriasObjetivo - (proteina * 4) - (grasas * 9)) / 4; // El resto

    setResultados({
      calorias: Math.round(caloriasObjetivo),
      proteina: Math.round(proteina),
      grasas: Math.round(grasas),
      carbos: Math.round(carbos)
    });
  };

  return (
    <div className="bg-white dark:bg-[#111] border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-lg transition-colors duration-300">
      <h2 className="text-2xl font-black mb-2 text-gray-900 dark:text-white flex items-center gap-2">
        <span className="text-red-500">⚡</span> CALCULADORA INTELIGENTE
      </h2>
      <p className="text-gray-500 dark:text-gray-400 mb-6 text-sm">Descubre tus calorías exactas y macronutrientes diarios para alcanzar tu objetivo.</p>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Formulario */}
        <form onSubmit={calcular} className="flex-1 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">Género</label>
              <select className="w-full bg-gray-50 dark:bg-[#050505] border border-gray-200 dark:border-gray-800 rounded-lg p-2 text-gray-900 dark:text-white"
                onChange={(e) => setDatos({...datos, genero: e.target.value})}>
                <option value="mujer">Mujer</option>
                <option value="hombre">Hombre</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">Edad</label>
              <input type="number" required placeholder="Ej: 28" className="w-full bg-gray-50 dark:bg-[#050505] border border-gray-200 dark:border-gray-800 rounded-lg p-2 text-gray-900 dark:text-white"
                onChange={(e) => setDatos({...datos, edad: e.target.value})} />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">Peso (kg)</label>
              <input type="number" required placeholder="Ej: 65" className="w-full bg-gray-50 dark:bg-[#050505] border border-gray-200 dark:border-gray-800 rounded-lg p-2 text-gray-900 dark:text-white"
                onChange={(e) => setDatos({...datos, peso: e.target.value})} />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">Altura (cm)</label>
              <input type="number" required placeholder="Ej: 165" className="w-full bg-gray-50 dark:bg-[#050505] border border-gray-200 dark:border-gray-800 rounded-lg p-2 text-gray-900 dark:text-white"
                onChange={(e) => setDatos({...datos, altura: e.target.value})} />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">Nivel de Actividad</label>
            <select className="w-full bg-gray-50 dark:bg-[#050505] border border-gray-200 dark:border-gray-800 rounded-lg p-2 text-gray-900 dark:text-white"
              onChange={(e) => setDatos({...datos, actividad: e.target.value})}>
              <option value="1.2">Sedentario (Poco o nulo ejercicio)</option>
              <option value="1.375">Ligero (Ejercicio 1-3 días/semana)</option>
              <option value="1.55">Moderado (Ejercicio 3-5 días/semana)</option>
              <option value="1.725">Activo (Ejercicio 6-7 días/semana)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1">Objetivo Físico</label>
            <select className="w-full bg-gray-50 dark:bg-[#050505] border border-gray-200 dark:border-gray-800 rounded-lg p-2 text-gray-900 dark:text-white"
              onChange={(e) => setDatos({...datos, objetivo: e.target.value})}>
              <option value="perder">🔥 Definición (Perder Grasa)</option>
              <option value="mantener">⚖️ Mantenimiento (Recomposición)</option>
              <option value="ganar">💪 Volumen (Ganar Músculo)</option>
            </select>
          </div>

          <button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-lg transition-colors shadow-lg">
            Calcular mis Macros
          </button>
        </form>

        {/* Panel de Resultados */}
        <div className="flex-1 bg-gray-50 dark:bg-[#050505] border border-gray-200 dark:border-gray-800 rounded-xl p-6 flex flex-col justify-center items-center text-center">
          {resultados ? (
            <div className="w-full animate-fade-in">
              <h3 className="text-gray-500 dark:text-gray-400 font-bold mb-2 uppercase tracking-widest text-xs">Tu Meta Diaria</h3>
              <div className="text-5xl font-black text-red-500 mb-6">{resultados.calorias} <span className="text-lg text-gray-900 dark:text-white">Kcal</span></div>
              
              <div className="grid grid-cols-3 gap-2">
                <div className="bg-white dark:bg-[#111] p-3 rounded-lg border border-gray-200 dark:border-gray-800">
                  <div className="text-xs text-gray-500 font-bold mb-1">Proteínas</div>
                  <div className="font-black text-gray-900 dark:text-white">{resultados.proteina}g</div>
                </div>
                <div className="bg-white dark:bg-[#111] p-3 rounded-lg border border-gray-200 dark:border-gray-800">
                  <div className="text-xs text-gray-500 font-bold mb-1">Carbos</div>
                  <div className="font-black text-gray-900 dark:text-white">{resultados.carbos}g</div>
                </div>
                <div className="bg-white dark:bg-[#111] p-3 rounded-lg border border-gray-200 dark:border-gray-800">
                  <div className="text-xs text-gray-500 font-bold mb-1">Grasas</div>
                  <div className="font-black text-gray-900 dark:text-white">{resultados.grasas}g</div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-gray-400 dark:text-gray-600 font-medium">
              Completa tus datos para ver tu plan nutricional exacto.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}