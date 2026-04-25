import { Link, linkVariants, Surface } from "@heroui/react";
import NextLink from "next/link";
import { ContactForm } from "./contact/ContactForm";

export const ContactSection = () => {
  const linkSlots = linkVariants();

  return (
    <section className="flex flex-col gap-4" id="contact">
      <div>
        <h2 className="text-xl">Contact</h2>
        <p className="text-base">
          If you have any questions or would like to get in touch, please feel
          free to send me an email at{" "}
          <NextLink
            className={linkSlots.base({
              className: "no-underline hover:underline",
            })}
            href="mailto:maxwill.kelly@gmail.com"
          >
            maxwill.kelly@gmail.com
            <Link.Icon className={linkSlots.icon()} />
          </NextLink>{" "}
          or use this form below to send me a message.
        </p>
      </div>
      <Surface className="rounded-3xl p-6" variant="default">
        <ContactForm />
      </Surface>
    </section>
  );
};
