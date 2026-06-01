import { Person, WithContext } from "schema-dts";
import { absoluteUrl } from "./utils";

export const siteConfig = {
  name: "Max Kelly",
  additionalName: "Maxwill Kelly",
  givenName: "Max",
  familyName: "Kelly",
  title: "Max Kelly | Software Engineer",
  description:
    "Max Kelly is a Bristol-based software engineer building interactive applications with an eye for small details.",
  url: "https://www.maxwillkelly.com",
  email: "maxwill.kelly@gmail.com",
  location: "Bristol, United Kingdom",
  jobTitle: "Software Engineer",
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
  image: absoluteUrl(siteConfig.image),
  email: `mailto:${siteConfig.email}`,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Bristol",
    addressCountry: "GB",
  },
} as const satisfies WithContext<Person>;
