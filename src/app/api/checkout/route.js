import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(request) {
  try {
    const body = await request.json();
    
    // 🔥 LA SOLUCIÓN: Escribimos tu URL oficial directamente aquí.
    // Así Stripe jamás se confundirá sobre a dónde enviar a la clienta.
    const URL_OFICIAL = 'https://valentina-app-habq.vercel.app';

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          // Asegúrate de que el frontend envíe este dato correctamente
          price: body.priceId || body.precioId, 
          quantity: 1,
        },
      ],
      mode: 'payment',
      // 👇 Usamos la URL oficial para el éxito y la cancelación
      success_url: `${URL_OFICIAL}/mi-panel?success=true`,
      cancel_url: `${URL_OFICIAL}/#guias-pdf`,
      customer_email: body.userEmail || body.email,
      metadata: {
        userId: body.userId,
        producto: body.productoNombre || body.producto,
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Error en checkout:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}