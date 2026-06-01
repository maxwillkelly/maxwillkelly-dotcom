export const siteConfig = {
  name: "Max Kelly",
  title: "Max Kelly | Software Engineer",
  description:
    "Max Kelly is a Bristol-based software engineer building interactive applications with an eye for small details.",
  url: "https://maxwillkelly.com",
  email: "maxwill.kelly@gmail.com",
  location: "Bristol, United Kingdom",
  image: "/profile.jpg",
  sameAs: [
    "https://github.com/maxwillkelly",
    "https://www.linkedin.com/in/maxwillkelly",
  ],
} as const;

export const absoluteUrl = (path = "") => {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;

  return new URL(normalizedPath, siteConfig.url).toString();
};

export const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: siteConfig.name,
  url: siteConfig.url,
  image: absoluteUrl(siteConfig.image),
  email: `mailto:${siteConfig.email}`,
  jobTitle: "Software Engineer",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Bristol",
    addressCountry: "GB",
  },
  sameAs: siteConfig.sameAs,
} as const;
