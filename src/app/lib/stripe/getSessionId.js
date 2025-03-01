import { stripe } from "./stripe";

export async function getStripeSession(sessionId) {
  const session = await stripe.checkout.sessions.retrieve(sessionId);
  return session;
}
