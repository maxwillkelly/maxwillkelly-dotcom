import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

import { renderCv } from "@/lib/cv-renderer";
import { env } from "@/lib/env";
import { getIpAddress } from "@/lib/headers";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

const ratelimit = new Ratelimit({
  redis: new Redis({
    url: env.UPSTASH_REDIS_REST_URL,
    token: env.UPSTASH_REDIS_REST_TOKEN,
  }),
  limiter: Ratelimit.slidingWindow(5, "1 m"),
  prefix: "cv-download",
  timeout: 3_000,
});

// Local development should not require the hosted Redis service.
let localWindow = { requests: 0, reset: 0 };

async function limitDownloads() {
  if (process.env.NODE_ENV !== "development")
    return ratelimit.limit(await getIpAddress());
  const now = Date.now();
  if (now >= localWindow.reset)
    localWindow = { requests: 0, reset: now + 60_000 };
  localWindow.requests += 1;
  return {
    success: localWindow.requests <= 5,
    reset: localWindow.reset,
    reason: undefined,
  };
}

let rendering = false;
const headers = { "Cache-Control": "no-store", "X-Robots-Tag": "noindex" };

function unavailable(message: string, status: number, retryAfter = 10) {
  return Response.json(
    { message },
    { status, headers: { ...headers, "Retry-After": String(retryAfter) } },
  );
}

async function generateResponse() {
  const limit = await limitDownloads();
  if (limit.reason === "timeout")
    return unavailable(
      "CV generation is temporarily unavailable. Please retry.",
      503,
    );
  if (!limit.success)
    return unavailable(
      "Too many downloads. Please retry shortly.",
      429,
      Math.max(1, Math.ceil((limit.reset - Date.now()) / 1000)),
    );
  const pdf = await renderCv();
  if (pdf.byteLength > 4_000_000)
    throw new Error("CV exceeds the response size budget");
  return new Response(new Uint8Array(pdf), {
    headers: {
      ...headers,
      "Content-Type": "application/pdf",
      "Content-Disposition": 'attachment; filename="Max Kelly - CV.pdf"',
    },
  });
}

export async function GET() {
  if (rendering)
    return unavailable("CV generation is busy. Please retry shortly.", 503);
  rendering = true;
  try {
    return await generateResponse();
  } catch {
    console.error("CV generation failed");
    return unavailable("Could not generate the CV. Please retry shortly.", 503);
  } finally {
    rendering = false;
  }
}

export function HEAD() {
  return new Response(null, {
    status: 405,
    headers: { ...headers, Allow: "GET" },
  });
}
