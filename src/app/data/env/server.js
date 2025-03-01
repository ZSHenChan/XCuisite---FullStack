import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  emptyStringUndefined: true,
  server: { STRIPE_SECRET_KEY: z.string() },
  experimental__runtimeEnv: {
    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
  },
});
