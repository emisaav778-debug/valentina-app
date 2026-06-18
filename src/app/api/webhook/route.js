import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Usamos la llave SERVICE_ROLE de Supabase para tener permisos de administrador en el backend
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export async function POST(req) {
  const payload = await req.text();
  const sig = req.headers.get('stripe-signature');

  let event;

  try {
    // Verificamos criptográficamente que el mensaje viene realmente de Stripe y no de un hacker
    event = stripe.webhooks.constructEvent(payload, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error('Error de firma del Webhook:', err.message);
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
  }

  // Si el evento es un pago completado exitosamente...
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;

    // Extraemos los metadatos ocultos que enviamos en el Paso 1
    const userId = session.metadata.user_id;
    let productoNombre = session.metadata.producto_nombre;

    if (userId && productoNombre) {
      console.log(`🛎️ Procesando compra entrante de Stripe: "${productoNombre}" para usuario: ${userId}`);

      // Escribimos en nuestro "Libro Contable" de Supabase
      const { error } = await supabase
        .from('compras')
        .insert([
          { 
            user_id: userId, 
            producto_nombre: productoNombre 
          }
        ]);

      if (error) {
        console.error('❌ Error al guardar compra en Supabase:', error);
        return NextResponse.json({ error: 'Error guardando en Base de Datos' }, { status: 500 });
      }
      
      console.log(`✅ EXITO WEBHOOK: Compra de "${productoNombre}" registrada correctamente en Supabase.`);
    } else {
      console.error('⚠️ Webhook recibido pero faltan metadatos esenciales (userId o productoNombre).');
    }
  }

  // Le respondemos a Stripe con un 200 OK para que sepa que recibimos el mensaje
  return NextResponse.json({ received: true }, { status: 200 });
}