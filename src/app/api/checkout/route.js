import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(request) {
  try {
    const body = await request.json();
    
    // 🔥 LA SOLUCIÓN DEFINITIVA: 
    // Le decimos al código que detecte automáticamente desde dónde está haciendo el usuario la compra.
    // Si estás probando en tu compu, será "http://localhost:3000". 
    // Si están en Vercel, será "https://valentina-app-habq.vercel.app".
    const origin = request.headers.get('origin') || 'https://valentina-app-habq.vercel.app';

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: body.priceId || body.precioId, 
          quantity: 1,
        },
      ],
      mode: 'payment',
      // 👇 Usamos el 'origin' automático. Siempre tendrá el "http://" o "https://" incluido.
      success_url: `${origin}/mi-panel?success=true`,
      cancel_url: `${origin}/#guias-pdf`,
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