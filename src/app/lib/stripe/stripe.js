import "server-only";

import { env } from "@/data/env/server";
import { loadStripe } from "@stripe/stripe-js";

export const stripe = await loadStripe(env.STRIPE_SECRET_KEY);
