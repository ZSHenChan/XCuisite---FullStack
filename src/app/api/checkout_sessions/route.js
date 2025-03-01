// import { NextResponse } from "next/server";
// import { headers } from "next/headers";

// import { stripe } from "@/lib/stripe/stripe";

// export async function POST(request) {
//   try {
//     // const headersList = await headers();
//     const { priceId } = await request.json();
//     const origin = request.headers.get("origin");

//     // Create Checkout Sessions from body params.
//     const session = await stripe.checkout.sessions.create({
//       // ui_mode: "embedded",
//       line_items: [
//         {
//           // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
//           price: priceId,
//         },
//       ],
//       mode: "payment",
//       return_url: `${origin}/return?session_id={CHECKOUT_SESSION_ID}`,
//     });
//     return NextResponse.redirect({
//       id: session.id,
//       client_secret: session.client_secret,
//     });
//   } catch (err) {
//     return NextResponse.json(
//       { error: err.message },
//       { status: err.statusCode || 500 }
//     );
//   }
// }

import { NextResponse } from "next/server";
import { headers } from "next/headers";

import { stripe } from "@/lib/stripe/stripe";

export async function POST() {
  try {
    const headersList = await headers();
    const origin = headersList.get("origin");

    // Create Checkout Sessions from body params.
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
          price: "price_1Qvde44CcIdSwh5u0fcvcdao",
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${origin}/checkout?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/checkout?canceled=true`,
    });
    return NextResponse.redirect(session.url, 303);
  } catch (err) {
    return NextResponse.json(
      { error: err.message },
      { status: err.statusCode || 500 }
    );
  }
}
