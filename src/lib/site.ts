import type { Person, WithContext } from "schema-dts";

import { absoluteUrl } from "./utils";

export const siteConfig = {
  locale: "en-GB",
  name: "Max Kelly",
  additionalName: "Maxwill Kelly",
  givenName: "Max",
  familyName: "Kelly",
  title: "Max Kelly | Senior Software Engineer",
  description:
    "Max Kelly is a Bristol-based senior software engineer building interactive applications with an eye for small details.",
  url: "https://www.maxwillkelly.com",
  email: "maxwill.kelly@gmail.com",
  telephone: "+44 7397 932 640",
  location: "Bristol, United Kingdom",
  jobTitle: "Senior Software Engineer",
  image: "/profile.jpg",
  sameAs: [
    "https://github.com/maxwillkelly",
    "https://www.linkedin.com/in/maxwillkelly",
  ],
} as const;

export const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  ...siteConfig,
  image: absoluteUrl(siteConfig.image, siteConfig.url),
  email: `mailto:${siteConfig.email}`,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Bristol",
    addressCountry: "GB",
  },
} as const satisfies WithContext<Person>;
