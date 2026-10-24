import type { Duration } from "@upstash/ratelimit";
import { z } from "zod";

export const upstashDurationSchema = z.custom<Duration>(
  (value) =>
    typeof value === "string" &&
    /^(\d+(?:\.\d+)?) ?(ms|s|m|h|d|w)$/.test(value),
  'Expected an Upstash duration, such as "1 m" or "60s"',
);
