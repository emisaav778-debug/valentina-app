'use client';

import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  const [estaLogueado, setEstaLogueado] = useState(false);
  const [procesandoPago, setProcesandoPago] = useState(false);

  useEffect(() => {
    const chequearSesion = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        setEstaLogueado(true);
      }
    };
    
    chequearSesion();
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans selection:bg-red-500 selection:text-white relative">
      
      {/* ==========================================
          🔥 BANNERS PUBLICITARIOS (LISTOS PARA ADSENSE) 🔥
          ========================================== */}
      {/* Banner Izquierdo */}
      <aside className="hidden 2xl:flex fixed left-8 top-1/2 transform -translate-y-1/2 flex-col items-center justify-center z-40 w-[160px] h-[600px] bg-[#111] border border-gray-800/50 rounded-xl overflow-hidden shadow-lg opacity-50 hover:opacity-100 transition-opacity">
        <div className="text-center p-4">
          <span className="text-[10px] font-bold text-gray-600 uppercase tracking-widest mb-2 block">Publicidad</span>
          {/* Aquí irá el script de Google AdSense */}
          <div className="w-full h-full flex items-center justify-center text-gray-700 text-xs text-center border border-dashed border-gray-700 rounded-lg p-2">
            Espacio reservado para Google AdSense (Vertical)
          </div>
        </div>
      </aside>

      {/* Banner Derecho */}
      <aside className="hidden 2xl:flex fixed right-8 top-1/2 transform -translate-y-1/2 flex-col items-center justify-center z-40 w-[160px] h-[600px] bg-[#111] border border-gray-800/50 rounded-xl overflow-hidden shadow-lg opacity-50 hover:opacity-100 transition-opacity">
        <div className="text-center p-4">
          <span className="text-[10px] font-bold text-gray-600 uppercase tracking-widest mb-2 block">Publicidad</span>
          {/* Aquí irá el script de Google AdSense */}
          <div className="w-full h-full flex items-center justify-center text-gray-700 text-xs text-center border border-dashed border-gray-700 rounded-lg p-2">
            Espacio reservado para Google AdSense (Vertical)
          </div>
        </div>
      </aside>

      {/* ==========================================
          1. BARRA DE NAVEGACIÓN
          ========================================== */}
      <nav className="fixed w-full bg-[#0a0a0a]/80 backdrop-blur-md border-b border-gray-800 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/">
                <span className="text-2xl font-black tracking-tighter text-white cursor-pointer hover:opacity-80 transition-opacity">
                  VALENTINA<span className="text-red-500">FIT</span>
                </span>
              </Link>
            </div>
            
            <div className="hidden md:flex space-x-8">
              <a href="#guias-pdf" className="text-gray-300 hover:text-red-500 transition-colors font-medium">Planes</a>
              <a href="#ejercicios" className="text-gray-300 hover:text-red-500 transition-colors font-medium">Metodología</a>
              <a href="#vip" className="text-gray-300 hover:text-red-500 transition-colors font-medium">VIP</a>
            </div>

            <div className="flex items-center">
              {estaLogueado ? (
                <Link href="/mi-panel" className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded-full transition-all duration-300 shadow-[0_0_15px_rgba(220,38,38,0.3)]">
                  Mi Bóveda ⚡
                </Link>
              ) : (
                <Link href="/login" className="bg-transparent border border-gray-600 hover:border-red-500 hover:text-red-500 text-white font-bold py-2 px-6 rounded-full transition-all duration-300">
                  Iniciar Sesión Gratis
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* ==========================================
          2. HERO
          ========================================== */}
      <section className="relative pt-32 pb-20 min-h-[90vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image src="/hero.png" alt="Fondo Marca de Agua" fill sizes="100vw" className="object-cover opacity-30" priority />
          <div className="absolute inset-0 bg-[#0a0a0a]/70"></div>
          <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#0a0a0a] to-transparent"></div>
        </div>

        <div className="relative z-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12 w-full">
          <div className="md:w-1/2 space-y-8">
            <h1 className="text-5xl md:text-7xl font-black leading-tight">
              FORJA TU MEJOR <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-800">
                VERSIÓN HOY.
              </span>
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed drop-shadow-md">
              Únete a la comunidad de Valentina. Entrena de forma inteligente con nuestra IA o descarga las guías detalladas paso a paso para transformar tu cuerpo.
            </p>
            <div className="flex gap-4">
              <Link href="/plan-personalizado" className="bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-8 rounded-full transition-all transform hover:scale-105 shadow-[0_0_20px_rgba(220,38,38,0.4)]">
                Generar Plan con IA
              </Link>
            </div>
          </div>

          <div className="md:w-1/2 w-full h-[500px] border border-gray-800 rounded-3xl relative overflow-hidden group shadow-[0_0_30px_rgba(220,38,38,0.1)]">
            <div className="absolute inset-0 bg-red-900/20 group-hover:bg-transparent transition-all duration-500 z-10"></div>
            <Image src="/hero-nueva.png" alt="Valentina Vega Entrenando" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover object-top hover:scale-[1.02] transition-transform duration-700" priority />
          </div>
        </div>
      </section>

      {/* ==========================================
          3. EJERCICIOS BIEN EXPLICADOS
          ========================================== */}
      <section id="ejercicios" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#111] border-y border-gray-900 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black mb-4">EJECUCIÓN <span className="text-red-500">PERFECTA</span></h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              No te dejamos solo con una lista de nombres. Cada uno de nuestros planes premium incluye el catálogo visual exclusivo de Valentina Vega explicando la técnica paso a paso.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[#0a0a0a] rounded-2xl overflow-hidden border border-gray-800 shadow-xl group hover:border-red-500/30 transition-colors">
              <div className="h-64 w-full relative bg-[#050505] p-4 flex items-center justify-center">
                <Image src="/ejercicios/sentadilla-bulgara.png" alt="Sentadilla bulgara" fill sizes="(max-width: 768px) 100vw, 33vw" className="object-contain p-2" />
              </div>
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold">Sentadilla Búlgara</h3>
                  <span className="text-xs font-bold text-red-500 bg-red-500/10 px-2 py-1 rounded">PIERNAS / GLÚTEOS</span>
                </div>
                <ul className="text-sm text-gray-400 space-y-2 list-disc list-inside">
                  <li>Apoya el empeine en un banco a la altura de tu rodilla.</li>
                  <li>Baja de forma controlada inclinando el torso levemente.</li>
                  <li>Mantén la rodilla alineada con la punta del pie.</li>
                  <li>Empuja con el talón de la pierna delantera al subir.</li>
                </ul>
              </div>
            </div>

            <div className="bg-[#0a0a0a] rounded-2xl overflow-hidden border border-gray-800 shadow-xl group hover:border-red-500/30 transition-colors">
              <div className="h-64 w-full relative bg-[#050505] p-4 flex items-center justify-center">
                <Image src="/ejercicios/hip-thrust.png" alt="Hip Thrust" fill sizes="(max-width: 768px) 100vw, 33vw" className="object-contain p-2" />
              </div>
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold">Hip Thrust</h3>
                  <span className="text-xs font-bold text-red-500 bg-red-500/10 px-2 py-1 rounded">GLÚTEOS PREMIUM</span>
                </div>
                <ul className="text-sm text-gray-400 space-y-2 list-disc list-inside">
                  <li>Apoya la zona baja de las escápulas en el banco.</li>
                  <li>Pies alineados al ancho de tus hombros.</li>
                  <li>Mirada siempre al frente para proteger las cervicales.</li>
                  <li>Contrae glúteos fuertemente 1 segundo arriba.</li>
                </ul>
              </div>
            </div>

            <div className="bg-[#0a0a0a] rounded-2xl overflow-hidden border border-gray-800 shadow-xl group hover:border-red-500/30 transition-colors">
              <div className="h-64 w-full relative bg-[#050505] p-4 flex items-center justify-center">
                <Image src="/ejercicios/dominadas.png" alt="Dominadas" fill sizes="(max-width: 768px) 100vw, 33vw" className="object-contain p-2" />
              </div>
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold">Dominadas</h3>
                  <span className="text-xs font-bold text-red-500 bg-red-500/10 px-2 py-1 rounded">ESPALDA / BÍCEPS</span>
                </div>
                <ul className="text-sm text-gray-400 space-y-2 list-disc list-inside">
                  <li>Agarre ligeramente más ancho que los hombros.</li>
                  <li>Inicia el movimiento juntando las escápulas.</li>
                  <li>Sube hasta que la barbilla pase la barra.</li>
                  <li>Baja de forma controlada sin dejarte caer de golpe.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
          4. SECCIÓN: RETOS DE 30 DÍAS
          ========================================== */}
      <section className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black mb-4">RETOS DE <span className="text-red-500">30 DÍAS</span></h2>
          <p className="text-gray-400">Programas de choque acelerados. Rutinas diarias enfocadas en un objetivo específico.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-[#0a0a0a] border border-red-900/40 rounded-2xl overflow-hidden hover:border-red-500 transition-colors shadow-lg flex flex-col">
            <div className="h-64 w-full relative border-b border-gray-800">
              <Image src="/reto1.png" alt="Reto Abdomen" fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover object-top" />
            </div>
            <div className="p-6 flex-1 flex flex-col">
              <span className="bg-red-900 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider w-max">RETO EXPRESS</span>
              <h3 className="text-xl font-bold mt-4 mb-2">Abdomen Plano en 30 Días</h3>
              <p className="text-gray-400 text-sm mb-6 flex-1">Circuito diario de alta densidad. Diseñado para activar el core y destapar la zona abdominal.</p>
              <Link 
                href="https://emisaav.gumroad.com/l/ujmryr" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full bg-white text-black text-center font-bold py-3 rounded-lg hover:bg-gray-200 transition-colors block"
              >
                Comprar Reto - $4.99
              </Link>
            </div>
          </div>

          <div className="bg-[#0a0a0a] border border-red-900/40 rounded-2xl overflow-hidden hover:border-red-500 transition-colors shadow-lg flex flex-col">
            <div className="h-64 w-full relative border-b border-gray-800">
              <Image src="/reto2.png" alt="Reto Tren Inferior" fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover object-top" />
            </div>
            <div className="p-6 flex-1 flex flex-col">
              <span className="bg-red-900 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider w-max">RETO EXPRESS</span>
              <h3 className="text-xl font-bold mt-4 mb-2">Desafío Tren Inferior</h3>
              <p className="text-gray-400 text-sm mb-6 flex-1">Enfoque masivo en piernas y glúteos. Ideal para aumentar tono muscular de manera rápida.</p>
              <Link 
                href="https://emisaav.gumroad.com/l/arxqv" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full bg-white text-black text-center font-bold py-3 rounded-lg hover:bg-gray-200 transition-colors block"
              >
                Comprar Reto - $5.99
              </Link>
            </div>
          </div>

          <div className="bg-[#0a0a0a] border border-red-900/40 rounded-2xl overflow-hidden hover:border-red-500 transition-colors shadow-lg flex flex-col">
            <div className="h-64 w-full relative border-b border-gray-800">
              <Image src="/reto3.png" alt="Reto Full Body HIIT" fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover object-top" />
            </div>
            <div className="p-6 flex-1 flex flex-col">
              <span className="bg-red-900 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider w-max">RETO EXPRESS</span>
              <h3 className="text-xl font-bold mt-4 mb-2">Full Body Quema-Grasa</h3>
              <p className="text-gray-400 text-sm mb-6 flex-1">Máximo gasto calórico en sesiones dinámicas. Rutinas híbridas de acondicionamiento metabólico.</p>
              <Link 
                href="https://emisaav.gumroad.com/l/jgwwcc" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full bg-white text-black text-center font-bold py-3 rounded-lg hover:bg-gray-200 transition-colors block"
              >
                Comprar Reto - $6.99
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
          5. GUÍAS PDF (ELLAS)
          ========================================== */}
      <section id="guias-pdf" className="pt-12 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10 border-t border-gray-900">
        <div className="text-center mb-16 pt-12">
          <h2 className="text-4xl font-black mb-4">PROGRAMAS COMPLETOS PARA <span className="text-red-500">ELLAS</span></h2>
          <p className="text-gray-400">Guías avanzadas estructuradas de 8 a 12 semanas para un cambio físico profundo.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-[#111] border border-gray-800 rounded-2xl overflow-hidden hover:border-red-500 transition-colors flex flex-col">
            <div className="h-64 w-full relative border-b border-gray-800">
              <Image src="/pdf1.png" alt="Plan Glúteos" fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover object-[center_30%]" />
            </div>
            <div className="p-6 flex-1 flex flex-col">
              <span className="bg-red-500/20 text-red-500 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider w-max">Principiante</span>
              <h3 className="text-xl font-bold mt-4 mb-2">Glúteos de Acero (En Casa)</h3>
              <p className="text-gray-400 text-sm mb-6 flex-1">4 semanas de entrenamiento enfocado en tren inferior sin equipamiento.</p>
              <Link 
                href="https://emisaav.gumroad.com/l/rbrkqv" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full bg-white text-black text-center font-bold py-3 rounded-lg hover:bg-gray-200 transition-colors block"
              >
                Comprar PDF - $6.99
              </Link>
            </div>
          </div>

          <div className="bg-[#111] border border-gray-800 rounded-2xl overflow-hidden hover:border-red-500 transition-colors flex flex-col">
            <div className="h-64 w-full relative border-b border-gray-800">
              <Image src="/pdf2.png" alt="Plan Hipertrofia" fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover object-top" />
            </div>
            <div className="p-6 flex-1 flex flex-col">
              <span className="bg-red-500/20 text-red-500 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider w-max">Intermedio</span>
              <h3 className="text-xl font-bold mt-4 mb-2">Hipertrofia Total (Gym)</h3>
              <p className="text-gray-400 text-sm mb-6 flex-1">Rutina de 8 semanas para ganar masa muscular con pesas.</p>
              <Link 
                href="https://emisaav.gumroad.com/l/savcbb" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full bg-white text-black text-center font-bold py-3 rounded-lg hover:bg-gray-200 transition-colors block"
              >
                Comprar PDF - $8.99
              </Link>
            </div>
          </div>

          <div className="bg-[#111] border border-gray-800 rounded-2xl overflow-hidden hover:border-red-500 transition-colors flex flex-col">
            <div className="h-64 w-full relative border-b border-gray-800">
              <Image src="/pdf3.png" alt="Plan Avanzado" fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover object-top" />
            </div>
            <div className="p-6 flex-1 flex flex-col">
              <span className="bg-red-500/20 text-red-500 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider w-max">Avanzado</span>
              <h3 className="text-xl font-bold mt-4 mb-2">Quema de Grasa Extrema</h3>
              <p className="text-gray-400 text-sm mb-6 flex-1">Circuito HIIT de alta intensidad para definir al máximo tu cuerpo.</p>
              <Link 
                href="https://emisaav.gumroad.com/l/qmkewg" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full bg-white text-black text-center font-bold py-3 rounded-lg hover:bg-gray-200 transition-colors block"
              >
                Comprar PDF - $12.99
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
          6. GUÍAS PDF (ELLOS)
          ========================================== */}
      <section className="pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16 border-t border-gray-900 pt-16">
          <h2 className="text-4xl font-black mb-4">PROGRAMAS COMPLETOS PARA <span className="text-gray-400">ELLOS</span></h2>
          <p className="text-gray-500">Rompe tus límites y construye masa muscular real.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-[#0a0a0a] border border-gray-800 rounded-2xl overflow-hidden hover:border-gray-500 transition-colors shadow-lg flex flex-col">
            <div className="h-64 w-full relative border-b border-gray-800 grayscale hover:grayscale-0 transition-all duration-500">
              <Image src="/pdf-hombre1.png" alt="Espartano en Casa" fill sizes="(max-width: 768px) 100vw, 33vw" className="object-contain p-2" />
            </div>
            <div className="p-6 flex-1 flex flex-col">
              <span className="bg-gray-800 text-gray-300 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider w-max">Peso Corporal</span>
              <h3 className="text-xl font-bold mt-4 mb-2">Espartano en Casa</h3>
              <p className="text-gray-400 text-sm mb-6 flex-1">Construye un físico atlético sin pesas. Dominadas, flexiones y core extremo.</p>
              <Link 
                href="https://emisaav.gumroad.com/l/qgopgu" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full bg-white text-black text-center font-bold py-3 rounded-lg hover:bg-gray-200 transition-colors block"
              >
                Comprar PDF - $4.99
              </Link>
            </div>
          </div>

          <div className="bg-[#0a0a0a] border border-gray-800 rounded-2xl overflow-hidden hover:border-gray-500 transition-colors shadow-lg flex flex-col">
            <div className="h-64 w-full relative border-b border-gray-800 grayscale hover:grayscale-0 transition-all duration-500">
              <Image src="/pdf-hombre2.png" alt="Volumen Titán" fill sizes="(max-width: 768px) 100vw, 33vw" className="object-contain p-2" />
            </div>
            <div className="p-6 flex-1 flex flex-col">
              <span className="bg-gray-800 text-gray-300 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider w-max">Hipertrofia</span>
              <h3 className="text-xl font-bold mt-4 mb-2">Volumen Titán (Gym)</h3>
              <p className="text-gray-400 text-sm mb-6 flex-1">Levanta pesado. Programa de 8 semanas para maximizar la ganancia muscular.</p>
              <Link 
                href="https://emisaav.gumroad.com/l/cmnvg" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full bg-white text-black text-center font-bold py-3 rounded-lg hover:bg-gray-200 transition-colors block"
              >
                Comprar PDF - $12.99
              </Link>
            </div>
          </div>

          <div className="bg-[#0a0a0a] border border-gray-800 rounded-2xl overflow-hidden hover:border-gray-500 transition-colors shadow-lg flex flex-col">
            <div className="h-64 w-full relative border-b border-gray-800 grayscale hover:grayscale-0 transition-all duration-500">
              <Image src="/pdf-hombre3.png" alt="Definición Extrema" fill sizes="(max-width: 768px) 100vw, 33vw" className="object-contain p-2" />
            </div>
            <div className="p-6 flex-1 flex flex-col">
              <span className="bg-gray-800 text-gray-300 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider w-max">Corte / Six Pack</span>
              <h3 className="text-xl font-bold mt-4 mb-2">Definición Extrema</h3>
              <p className="text-gray-400 text-sm mb-6 flex-1">Destruye la grasa abdominal y revela tus músculos con este híbrido HIIT+Pesas.</p>
              <Link 
                href="https://emisaav.gumroad.com/l/ysvcm" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full bg-white text-black text-center font-bold py-3 rounded-lg hover:bg-gray-200 transition-colors block"
              >
                Comprar PDF - $13.99
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
          7. LIBROS / MINDSET 
          ========================================== */}
      <section id="libros" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-gray-900 relative z-10">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2 h-[400px] w-full relative border border-gray-800 rounded-2xl overflow-hidden shadow-2xl bg-[#0a0a0a]">
             <Image src="/libro.png" alt="Recetario Oficial" fill sizes="(max-width: 768px) 100vw, 50vw" className="object-contain p-2 hover:scale-[1.02] transition-transform duration-700" />
          </div>
          <div className="md:w-1/2">
            <h2 className="text-4xl font-black mb-6">NUTRICIÓN & <span className="text-red-500">MINDSET</span></h2>
            <p className="text-gray-400 text-lg mb-8 leading-relaxed">
              El 70% de tus resultados ocurren en la cocina y en tu mente. Obtén mi recetario oficial con más de 50 comidas altas en proteína y mi guía de disciplina mental para no rendirte nunca.
            </p>
            <Link 
              href="https://emisaav.gumroad.com/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block bg-transparent border border-white hover:bg-white hover:text-black text-white text-center font-bold py-4 px-8 rounded-full transition-all"
            >
              Adquirir E-Book Oficial - $15.99
            </Link>
          </div>
        </div>
      </section>

      {/* ==========================================
          8. GALERÍA VIP 
          ========================================== */}
      <section id="vip" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-gray-900 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black mb-4">GALERÍA <span className="text-red-500">VIP</span> EXCLUSIVA</h2>
          <p className="text-gray-400">Acceso privado al contenido inédito de Valentina Vega. Solo para miembros premium.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-[#0a0a0a] border border-red-900/40 rounded-2xl overflow-hidden hover:border-red-500 transition-all duration-300 shadow-[0_0_15px_rgba(220,38,38,0.05)] hover:shadow-[0_0_25px_rgba(220,38,38,0.2)] group relative flex flex-col">
            <div className="absolute inset-0 bg-black/70 backdrop-blur-md z-10 flex flex-col items-center justify-center transition-all duration-500 group-hover:backdrop-blur-sm group-hover:bg-black/50 pointer-events-none">
               <span className="text-red-500 text-5xl mb-3 drop-shadow-lg">🔒</span>
               <span className="text-white font-bold tracking-widest text-sm border border-white/20 px-4 py-1 rounded-full bg-black/40">CONTENIDO BLOQUEADO</span>
            </div>
            <div className="h-80 w-full relative">
              <Image src="/vip1.png" alt="Contenido VIP 1" fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover object-top opacity-60" />
            </div>
            <div className="p-6 text-center border-t border-gray-800 relative z-20 bg-[#0a0a0a] flex-1 flex flex-col justify-end">
              <h3 className="text-xl font-bold mb-4">Pack "Backstage"</h3>
              <Link 
                href="https://emisaav.gumroad.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full bg-red-600/90 text-white text-center font-bold py-3 rounded-lg hover:bg-red-600 transition-colors shadow-lg block"
              >
                Desbloquear Galería - $9.99
              </Link>
            </div>
          </div>

          <div className="bg-[#0a0a0a] border border-red-900/40 rounded-2xl overflow-hidden hover:border-red-500 transition-all duration-300 shadow-[0_0_15px_rgba(220,38,38,0.05)] hover:shadow-[0_0_25px_rgba(220,38,38,0.2)] group relative flex flex-col">
            <div className="absolute inset-0 bg-black/70 backdrop-blur-md z-10 flex flex-col items-center justify-center transition-all duration-500 group-hover:backdrop-blur-sm group-hover:bg-black/50 pointer-events-none">
               <span className="text-red-500 text-5xl mb-3 drop-shadow-lg">🔒</span>
               <span className="text-white font-bold tracking-widest text-sm border border-white/20 px-4 py-1 rounded-full bg-black/40">CONTENIDO BLOQUEADO</span>
            </div>
            <div className="h-80 w-full relative">
              <Image src="/vip2.png" alt="Contenido VIP 2" fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover object-top opacity-60" />
            </div>
            <div className="p-6 text-center border-t border-gray-800 relative z-20 bg-[#0a0a0a] flex-1 flex flex-col justify-end">
              <h3 className="text-xl font-bold mb-4">Sesión "Fitness Model"</h3>
              <Link 
                href="https://emisaav.gumroad.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full bg-red-600/90 text-white text-center font-bold py-3 rounded-lg hover:bg-red-600 transition-colors shadow-lg block"
              >
                Desbloquear Galería - $14.99
              </Link>
            </div>
          </div>

          <div className="bg-[#0a0a0a] border border-red-900/40 rounded-2xl overflow-hidden hover:border-red-500 transition-all duration-300 shadow-[0_0_15px_rgba(220,38,38,0.05)] hover:shadow-[0_0_25px_rgba(220,38,38,0.2)] group relative flex flex-col">
            <div className="absolute inset-0 bg-black/70 backdrop-blur-md z-10 flex flex-col items-center justify-center transition-all duration-500 group-hover:backdrop-blur-sm group-hover:bg-black/50 pointer-events-none">
               <span className="text-red-500 text-5xl mb-3 drop-shadow-lg">🔒</span>
               <span className="text-white font-bold tracking-widest text-sm border border-white/20 px-4 py-1 rounded-full bg-black/40">CONTENIDO BLOQUEADO</span>
            </div>
            <div className="h-80 w-full relative">
              <Image src="/vip3.png" alt="Contenido VIP 3" fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover object-top opacity-60" />
            </div>
            <div className="p-6 text-center border-t border-gray-800 relative z-20 bg-[#0a0a0a] flex-1 flex flex-col justify-end">
              <h3 className="text-xl font-bold mb-4">Pack VIP "Premium"</h3>
              <Link 
                href="https://emisaav.gumroad.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full bg-red-600/90 text-white text-center font-bold py-3 rounded-lg hover:bg-red-600 transition-colors shadow-lg block"
              >
                Desbloquear Galería - $19.99
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
          9. FOOTER
          ========================================== */}
      <footer className="bg-[#050505] border-t border-gray-900 py-12 text-center relative z-10">
        <p className="text-gray-500 font-medium tracking-wider">
          © 2026 VALENTINA VEGA FITNESS. TODOS LOS DERECHOS RESERVADOS.
        </p>
      </footer>

    </div>
  );
}