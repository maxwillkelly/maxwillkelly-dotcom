import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

import { generatePdf } from "@/lib/cv-renderer";
import { env } from "@/lib/env";
import { getIpAddress } from "@/lib/headers";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

const PDF_MAXIMUM_SIZE_MEGABYTES = (
  env.PDF_MAXIMUM_SIZE_BYTES / 1_000_000
).toFixed(2);

const redis = new Redis({
  url: env.UPSTASH_REDIS_REST_URL,
  token: env.UPSTASH_REDIS_REST_TOKEN,
});

const ratelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(5, "1 m"),
  prefix: "cv-download",
  timeout: 3_000,
});

const headers = { "Cache-Control": "no-store", "X-Robots-Tag": "noindex" };

const pendingRenders = new Map<string, Promise<Uint8Array<ArrayBuffer>>>();

const unavailableResponse = (
  message: string,
  status: number,
  retryAfter = 10,
) => {
  console.error(message);

  return Response.json(
    { message },
    { status, headers: { ...headers, "Retry-After": String(retryAfter) } },
  );
};

const rateLimitResponse = async () => {
  if (process.env.NODE_ENV === "development") {
    return;
  }

  const limit = await getIpAddress()
    .then((ip) => ratelimit.limit(ip))
    .catch((error) => {
      console.error("CV generation failed", { stage: "rate-limit" });

      throw error;
    });

  if (limit.reason === "timeout") {
    return unavailableResponse(
      "CV generation is temporarily unavailable. Please retry.",
      503,
    );
  }

  if (!limit.success) {
    return unavailableResponse(
      "Too many downloads. Please retry shortly.",
      429,
      Math.max(1, Math.ceil((limit.reset - Date.now()) / 1000)),
    );
  }
};

const renderPdf = async (requestUrl: string, cacheKey: string) => {
  const useCache = process.env.NODE_ENV !== "development";

  const cached = useCache
    ? await redis.get<string>(cacheKey).catch(() => {
        console.error("CV generation failed", { stage: "cache-read" });
      })
    : undefined;

  if (cached) {
    return new Uint8Array(Buffer.from(cached, "base64"));
  }

  return generateAndCachePdf(requestUrl, cacheKey, useCache);
};

const generateAndCachePdf = async (
  requestUrl: string,
  cacheKey: string,
  useCache: boolean,
) => {
  const pdf = await generatePdf(requestUrl);

  if (pdf.byteLength > env.PDF_MAXIMUM_SIZE_BYTES) {
    const pdfSizeMegaBytes = (pdf.byteLength / 1_000_000).toFixed(2);

    throw new Error(
      `The PDF size of ${pdfSizeMegaBytes} MB exceeds the response size limit of ${PDF_MAXIMUM_SIZE_MEGABYTES} MB`,
    );
  }

  if (useCache) {
    await redis
      .set(cacheKey, Buffer.from(pdf).toString("base64"), {
        ex: env.PDF_CACHE_LIFETIME_SECONDS,
      })
      .catch(() => {
        console.error("CV generation failed", { stage: "cache-write" });
      });
  }

  return new Uint8Array(pdf);
};

const startRenderingPdf = (requestUrl: string, cacheKey: string) => {
  const render = renderPdf(requestUrl, cacheKey).finally(() => {
    pendingRenders.delete(cacheKey);
  });

  pendingRenders.set(cacheKey, render);

  return render;
};

const fetchOrGeneratePdf = async (request: Request) => {
  const deployment = process.env.VERCEL_URL ?? new URL(request.url).origin;

  const cacheKey = `pdf:${deployment}`;

  const pendingRender = pendingRenders.get(cacheKey);

  if (pendingRender) {
    return pendingRender;
  }

  return startRenderingPdf(request.url, cacheKey);
};

const generateResponse = async (request: Request) => {
  const rateLimitedResponse = await rateLimitResponse();

  if (rateLimitedResponse) {
    return rateLimitedResponse;
  }

  const pdf = await fetchOrGeneratePdf(request);

  return new Response(pdf, {
    headers: {
      ...headers,
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${env.PDF_FILENAME}"`,
    },
  });
};

export const GET = async (request: Request) => {
  try {
    return await generateResponse(request);
  } catch {
    return unavailableResponse(
      "Could not generate the CV. Please retry shortly.",
      503,
    );
  }
};

export const HEAD = () => {
  return new Response(null, {
    status: 405,
    headers: { ...headers, Allow: "GET" },
  });
};
