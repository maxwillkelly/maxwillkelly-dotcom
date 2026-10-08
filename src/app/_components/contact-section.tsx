import { Surface } from "@heroui/react";

import ContactContent, { frontmatter } from "@/content/contact.md";
import { contactMetadataSchema } from "@/schemas/content";

import { ContactForm } from "./contact/contact-form";

export const ContactSection = () => (
  <section className="flex flex-col gap-4" id="contact">
    <Surface
      className="flex flex-col gap-6 rounded-3xl p-6 bg-background border border-border"
      variant="default"
    >
      <div>
        <ContactContent />
      </div>
      <ContactForm copy={contactMetadataSchema.parse(frontmatter).form} />
    </Surface>
  </section>
);
