import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  emptyStringAsUndefined: true,
  client: {
    NEXT_PUBLIC_AUTH0_DOMAIN: z.string(),
    NEXT_PUBLIC_AUTH0_CLIENT_ID: z.string(),
    NEXT_PUBLIC_AUTH0_AUDIENCE: z.string(),
    NEXT_PUBLIC_AUTH0_SCOPE: z.string(),
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: z.string(),
  },
  experimental__runtimeEnv: {
    NEXT_PUBLIC_AUTH0_DOMAIN: process.env.NEXT_PUBLIC_AUTH0_DOMAIN,
    NEXT_PUBLIC_AUTH0_CLIENT_ID: process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID,
    NEXT_PUBLIC_AUTH0_AUDIENCE: process.env.NEXT_PUBLIC_AUTH0_AUDIENCE,
    NEXT_PUBLIC_AUTH0_SCOPE: process.env.NEXT_PUBLIC_AUTH0_SCOPE,
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY:
      process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
  },
});
