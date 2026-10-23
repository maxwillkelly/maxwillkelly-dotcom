import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

import { generatePdf } from "@/lib/cv-renderer";
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

const headers = { "Cache-Control": "no-store", "X-Robots-Tag": "noindex" };

let renderActive = false;

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

const pdfResponse = async (request: Request) => {
  const pdf = await generatePdf(request.url);

  if (pdf.byteLength > 4_000_000) {
    return unavailableResponse(
      "Could not generate the CV. Please retry shortly.",
      503,
    );
  }

  return new Response(new Uint8Array(pdf), {
    headers: {
      ...headers,
      "Content-Type": "application/pdf",
      "Content-Disposition": 'attachment; filename="Max Kelly - CV.pdf"',
    },
  });
};

const generateResponse = async (request: Request) => {
  const rateLimitedResponse = await rateLimitResponse();

  if (rateLimitedResponse) {
    return rateLimitedResponse;
  }

  if (renderActive) {
    return unavailableResponse(
      "CV generation is temporarily unavailable. Please retry.",
      503,
    );
  }

  renderActive = true;

  try {
    return await pdfResponse(request);
  } finally {
    renderActive = false;
  }
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
