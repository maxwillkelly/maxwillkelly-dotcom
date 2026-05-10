"use server";

import { Resend } from "resend";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

import ContactEmailTemplate from "@/emails/ContactEmailTemplate";
import { env } from "@/lib/env";
import { getIpAddress } from "@/lib/headers";

import {
  ContactMessage,
  contactMessageSchema,
} from "@/schemas/contact-message";

const resend = new Resend(env.RESEND_API_KEY);

const redis = new Redis({
  url: env.UPSTASH_REDIS_REST_URL,
  token: env.UPSTASH_REDIS_REST_TOKEN,
});

const ratelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(3, "1 d"),
  analytics: true,
  enableProtection: true,
});

export type SendContactEmailResult =
  | { success: true }
  | { success: false; message: string };

export const sendContactEmail = async (
  variables: ContactMessage,
): Promise<SendContactEmailResult> => {
  const ipAddress = await getIpAddress();

  const { success: ratelimitSuccess } = await ratelimit.limit(ipAddress);

  if (!ratelimitSuccess) {
    return {
      success: false,
      message: "Rate limit exceeded. Please try again later.",
    };
  }

  const { data: contactMessage, success } =
    contactMessageSchema.safeParse(variables);

  if (!success) {
    return { success: false, message: "Invalid form data" };
  }

  const { firstName, lastName } = contactMessage;

  const response = await resend.emails.send({
    from: "maxwillkelly-dotcom <onboarding@resend.dev>",
    to: [env.SEND_EMAIL],
    subject: `You have received a message from ${firstName} ${lastName}`,
    react: (
      <ContactEmailTemplate
        contactMessage={contactMessage}
        nodeEnv={env.NODE_ENV}
      />
    ),
  });

  if (response.error) {
    return {
      success: false,
      message: "Failed to send message, click to retry",
    };
  }

  return { success: true };
};
