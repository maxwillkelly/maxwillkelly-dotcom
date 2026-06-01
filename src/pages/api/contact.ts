import type { APIRoute } from "astro";

import { sendContactEmail } from "@/lib/contact-message-service";
import { contactMessageSchema } from "@/schemas/contact-message";

export const POST: APIRoute = async ({ request }) => {
  const body = await request.json().catch(() => null);
  const parsed = contactMessageSchema.safeParse(body);

  if (!parsed.success) {
    return Response.json(
      { status: "error", message: "Invalid form data" },
      { status: 400 },
    );
  }

  const result = await sendContactEmail(parsed.data, request.headers);

  if (!result.success) {
    return Response.json(
      { status: "error", message: result.message },
      { status: 400 },
    );
  }

  return Response.json({ status: "success" });
};
