import Hero from "@/content/hero.md";
import { siteConfig } from "@/lib/site";

import { components } from "./mdx-components";

export const CvHero = () => (
  <header className="cv-hero">
    <div>
      <h1>{siteConfig.name}</h1>
      <Hero components={components} />
      <p className="cv-meta">
        {siteConfig.location} ·{" "}
        <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
      </p>
      <p className="cv-links">
        {[siteConfig.url, ...siteConfig.sameAs].map((url, index) => (
          <span key={url}>
            {index > 0 && " · "}
            <a href={url}>{url.replace("https://", "").replace("www.", "")}</a>
          </span>
        ))}
      </p>
    </div>
  </header>
);
