import "@/styles/globals.css";

import { Link, linkVariants, Surface } from "@heroui/react";
import { ContactForm } from "./contact/contact-form";

export const ContactSection = () => {
  const linkSlots = linkVariants();

  return (
    <section className="flex flex-col gap-4" id="contact">
      <Surface
        className="flex flex-col gap-6 rounded-3xl p-6 bg-background border border-border"
        variant="default"
      >
        <div>
          <h2 className="text-xl font-bold">Contact</h2>
          <p className="text-base">
            If you have any questions or would like to get in touch, please feel
            free to send me an email at{" "}
            <a
              className={linkSlots.base({
                className: "text-base no-underline hover:underline",
              })}
              href="mailto:maxwill.kelly@gmail.com"
            >
              maxwill.kelly@gmail.com
              <Link.Icon className={linkSlots.icon()} />
            </a>{" "}
            or use this form below to send me a message.
          </p>
        </div>
        <ContactForm />
      </Surface>
    </section>
  );
};
