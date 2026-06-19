// Asegúrate de tener Link importado arriba
import Link from 'next/link';

// ... (resto de tu código o imports)

// En tu componente donde muestras los PDFs, haz esto:
export default function SeccionPDFs() {
  
  // Aquí mapeas tus PDFs con sus links directos de Gumroad
  const catalogoPDF = [
    {
      id: 1,
      titulo: 'Volumen Titán',
      precio: 12.99,
      linkGumroad: 'https://emisaav.gumroad.com/l/cmnvg',
      // ... otros datos como imagen, descripción, etc.
    },
    {
      id: 2,
      titulo: 'Quema Grasa Extrema',
      precio: 12.99,
      linkGumroad: 'https://emisaav.gumroad.com/l/qmkewg',
    },
    {
      id: 3,
      titulo: 'Full Body Quema Grasa',
      precio: 6.99,
      linkGumroad: 'https://emisaav.gumroad.com/l/jgwwcc',
    },
    {
      id: 4,
      titulo: 'Hipertrofia Total',
      precio: 8.99,
      linkGumroad: 'https://emisaav.gumroad.com/l/savcbb',
    },
    {
      id: 5,
      titulo: 'Glúteos de Acero',
      precio: 6.99,
      linkGumroad: 'https://emisaav.gumroad.com/l/rbrkqv',
    },
    {
      id: 6,
      titulo: 'Espartano en Casa',
      precio: 4.99,
      linkGumroad: 'https://emisaav.gumroad.com/l/qgopgu',
    },
    {
      id: 7,
      titulo: 'Desafío Tren Inferior',
      precio: 5.99,
      linkGumroad: 'https://emisaav.gumroad.com/l/arxqv',
    },
    {
      id: 8,
      titulo: 'Definición Extrema',
      precio: 13.99,
      linkGumroad: 'https://emisaav.gumroad.com/l/ysvcm',
    },
    {
      id: 9,
      titulo: 'Abdomen Plano 30 Días',
      precio: 4.99,
      linkGumroad: 'https://emisaav.gumroad.com/l/ujmryr',
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {catalogoPDF.map((pdf) => (
        <div key={pdf.id} className="tarjeta-pdf bg-gray-900 p-6 rounded-xl">
          {/* ... Aquí muestras tu imagen y título ... */}
          <h3 className="text-xl font-bold text-white mb-2">{pdf.titulo}</h3>
          <p className="text-red-500 font-bold mb-4">${pdf.precio} USD</p>
          
          {/* 🔥 EL BOTÓN MÁGICO: Redirige directamente a Gumroad */}
          <Link href={pdf.linkGumroad} target="_blank" rel="noopener noreferrer">
            <button className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-lg transition-colors">
              Comprar Ahora
            </button>
          </Link>
        </div>
      ))}
    </div>
  );
}