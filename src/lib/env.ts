import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    RESEND_API_KEY: z.string().min(1),
    SEND_EMAIL: z.email().min(1),
    UPSTASH_REDIS_REST_URL: z.url().min(1),
    UPSTASH_REDIS_REST_TOKEN: z.string().min(1),
  },
  shared: {
    NODE_ENV: z.enum(["development", "test", "production"]),
  },
  experimental__runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
  },
});
