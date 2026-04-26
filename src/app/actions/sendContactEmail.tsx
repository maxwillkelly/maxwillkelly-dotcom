"use server";

import { Resend } from "resend";

import ContactEmailTemplate from "@/emails/ContactEmailTemplate";
import { env } from "@/lib/env";
import {
  ContactMessage,
  contactMessageSchema,
} from "@/schemas/contact-message";

const resend = new Resend(env.RESEND_API_KEY);

export const sendContactEmail = async (variables: ContactMessage) => {
  const { data: contactMessage, success } =
    contactMessageSchema.safeParse(variables);

  if (!success) {
    return false;
  }

  const { firstName, lastName } = contactMessage;

  const response = await resend.emails.send({
    from: "Max Next <onboarding@resend.dev>",
    to: [env.SEND_EMAIL],
    subject: `You have received a message from ${firstName} ${lastName}`,
    react: (
      <ContactEmailTemplate
        contactMessage={contactMessage}
        nodeEnv={env.NODE_ENV}
      />
    ),
  });

  return true;
};
