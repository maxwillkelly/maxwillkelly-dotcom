import type { Person, WithContext } from "schema-dts";

import { frontmatter } from "@/content/hero.md";
import { heroMetadataSchema } from "@/schemas/content";

import { absoluteUrl } from "./utils";

export const heroMetadata = heroMetadataSchema.parse(frontmatter);
const {
  socialLinks: _socialLinks,
  addressLocality,
  addressCountry,
  ...site
} = heroMetadata;
export const siteConfig = site;

export const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  ...siteConfig,
  image: absoluteUrl(siteConfig.image, siteConfig.url),
  email: `mailto:${siteConfig.email}`,
  address: {
    "@type": "PostalAddress",
    addressLocality,
    addressCountry,
  },
} as const satisfies WithContext<Person>;
