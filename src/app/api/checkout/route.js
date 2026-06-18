import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  try {
    // 1. Recibimos los datos dinámicos que nos mandó el page.js
    const { title, price, userId } = await req.json();

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: title, // 🔥 AHORA ES DINÁMICO: Toma el título del producto real
            },
            // 🔥 AHORA ES DINÁMICO: Multiplicamos el precio real por 100 (Stripe usa centavos)
            unit_amount: Math.round(price * 100), 
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/pago-exitoso`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/`,
      metadata: {
        user_id: userId,
        producto_nombre: title, // 🔥 Guarda el nombre exacto en Supabase
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Error en checkout:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}