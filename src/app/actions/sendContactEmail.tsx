"use server";

import { Resend } from "resend";

import ContactEmailTemplate from "@/emails/ContactEmailTemplate";
import { env } from "@/lib/env";
import {
  ContactMessage,
  contactMessageSchema,
} from "@/schemas/contact-message";

const resend = new Resend(env.RESEND_API_KEY);

export type SendContactEmailResult =
  | { success: true }
  | { success: false; message: string };

export const sendContactEmail = async (
  variables: ContactMessage,
): Promise<SendContactEmailResult> => {
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
