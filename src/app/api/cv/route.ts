import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

import { atCvStage, CvGenerationError } from "@/lib/cv-error";
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
const localDownloads: number[] = [];

function limitLocalDownloads() {
  const now = Date.now();
  const expired = localDownloads.filter((time) => time <= now - 60_000).length;
  localDownloads.splice(0, expired);
  const success = localDownloads.length < 5;
  if (success) localDownloads.push(now);
  return {
    success,
    reset: (localDownloads[0] ?? now) + 60_000,
    reason: undefined,
  };
}

async function limitDownloads() {
  if (process.env.NODE_ENV !== "development")
    return ratelimit.limit(await getIpAddress());
  return limitLocalDownloads();
}

// One active render per process; production rate limits remain shared in Redis.
const activeRenders = new Set<symbol>();
const headers = { "Cache-Control": "no-store", "X-Robots-Tag": "noindex" };

function unavailable(message: string, status: number, retryAfter = 10) {
  return Response.json(
    { message },
    { status, headers: { ...headers, "Retry-After": String(retryAfter) } },
  );
}

async function generateResponse() {
  const limit = await atCvStage("rate-limit", limitDownloads);
  if (limit.reason === "timeout") {
    console.error("CV generation failed", {
      stage: "rate-limit",
      reason: "timeout",
    });
    return unavailable(
      "CV generation is temporarily unavailable. Please retry.",
      503,
    );
  }
  if (!limit.success)
    return unavailable(
      "Too many downloads. Please retry shortly.",
      429,
      Math.max(1, Math.ceil((limit.reset - Date.now()) / 1000)),
    );
  const pdf = await renderCv();
  if (pdf.byteLength > 4_000_000) throw new CvGenerationError("response-size");
  return new Response(new Uint8Array(pdf), {
    headers: {
      ...headers,
      "Content-Type": "application/pdf",
      "Content-Disposition": 'attachment; filename="Max Kelly - CV.pdf"',
    },
  });
}

export async function GET() {
  if (activeRenders.size > 0)
    return unavailable("CV generation is busy. Please retry shortly.", 503);
  const render = Symbol("cv-render");
  activeRenders.add(render);
  try {
    return await generateResponse();
  } catch (error) {
    console.error("CV generation failed", {
      stage: error instanceof CvGenerationError ? error.stage : "unknown",
    });
    return unavailable("Could not generate the CV. Please retry shortly.", 503);
  } finally {
    activeRenders.delete(render);
  }
}

export function HEAD() {
  return new Response(null, {
    status: 405,
    headers: { ...headers, Allow: "GET" },
  });
}
