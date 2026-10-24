import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

import { upstashDurationSchema } from "./schema";

export const env = createEnv({
  server: {
    PDF_BROWSER_CLOSE_TIMEOUT: z.coerce
      .number()
      .int()
      .positive()
      .default(3_000),
    PDF_RENDER_TIMEOUT_MS: z.coerce.number().int().positive().default(45_000),
    PDF_OPERATION_TIMEOUT_MS: z.coerce
      .number()
      .int()
      .positive()
      .default(15_000),
    PDF_CACHE_LIFETIME_SECONDS: z.coerce
      .number()
      .int()
      .positive()
      .default(14_400),
    PDF_MAXIMUM_SIZE_BYTES: z.coerce
      .number()
      .int()
      .positive()
      .default(4_000_000),
    PDF_RATE_LIMIT_REQUESTS: z.coerce.number().int().positive().default(5),
    PDF_RATE_LIMIT_WINDOW_DURATION: upstashDurationSchema.default("1 m"),
    PDF_RATE_LIMIT_TIMEOUT_MS: z.coerce
      .number()
      .int()
      .positive()
      .default(3_000),
    RESEND_API_KEY: z.string().min(1),
    SEND_EMAIL: z.email().min(1),
    UPSTASH_REDIS_REST_URL: z.url().min(1),
    UPSTASH_REDIS_REST_TOKEN: z.string().min(1),
  },
  client: {
    NEXT_PUBLIC_PDF_FILENAME: z
      .string()
      .regex(/^[a-zA-Z0-9][a-zA-Z0-9 ._-]*\.pdf$/i)
      .default("Max Kelly - CV.pdf"),
  },
  shared: {
    NODE_ENV: z.enum(["development", "test", "production"]),
  },
  experimental__runtimeEnv: {
    NEXT_PUBLIC_PDF_FILENAME: process.env.NEXT_PUBLIC_PDF_FILENAME,
    NODE_ENV: process.env.NODE_ENV,
  },
});
