import { NextResponse } from 'next/server';
import OpenAI from 'openai';

// Inicializamos OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req) {
  try {
    const body = await req.json();
    const { genero, edad, peso, objetivo } = body;

    // 🔥 EL SECRETO PREMIUM: Un prompt estructurado y estricto 🔥
    const promptSistema = `Eres Valentina Vega, una entrenadora personal de élite. Tu objetivo es crear planes de entrenamiento premium, empáticos y altamente estructurados.
    
    REGLAS ESTRICTAS DE FORMATO (Markdown):
    1. Usa Títulos (###) para separar los días de entrenamiento y los consejos.
    2. Usa negritas (**) para resaltar puntos clave, series y repeticiones.
    3. Usa viñetas (-) para listar cada ejercicio.
    4. NUNCA escribas todo en un solo párrafo. Separa todo con doble salto de línea.
    
    REGLA DE CATÁLOGO VISUAL (CRÍTICO):
    Para que nuestra plataforma pueda adjuntar los videos/fotos explicativos, DEBES elegir y nombrar los ejercicios usando EXACTAMENTE estas palabras (incluye al menos 4 de esta lista en tu rutina según el objetivo):
    "Sentadilla Búlgara", "Hip Thrust", "Dominadas", "Peso Muerto Rumano", "Prensa de Piernas", "Puente de Glúteo", "Zancadas", "Press de Banca", "Press Militar", "Jalón al Pecho", "Plancha Abdominal", "Burpees", "Curl de Bíceps con Barra", "Aperturas con Mancuernas", "Rueda Abdominal".

    Despídete siempre con un mensaje motivador.`;

    const promptUsuario = `Crea un plan de entrenamiento y consejos nutricionales para un perfil: ${genero}, ${edad} años, ${peso}kg. Su objetivo principal es: ${objetivo}.`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini", // o el modelo que estés usando
      messages: [
        { role: "system", content: promptSistema },
        { role: "user", content: promptUsuario }
      ],
      temperature: 0.7,
    });

    return NextResponse.json({ rutina: completion.choices[0].message.content });
  } catch (error) {
    console.error("Error en la API de OpenAI:", error);
    return NextResponse.json(
      { error: "Hubo un error al generar el plan. Verifica tu API Key." }, 
      { status: 500 }
    );
  }
}