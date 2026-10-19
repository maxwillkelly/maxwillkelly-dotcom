import Hero from "@/content/hero.md";
import { siteConfig } from "@/lib/site";

import { components } from "./mdx-components";

export const PrintHero = () => (
  <header className="flex items-start gap-[6mm] break-inside-avoid">
    <div className="flex-1">
      <h1>{siteConfig.name}</h1>
      <Hero components={components} />
      <p className="text-[9pt] text-[#444]">
        {siteConfig.location} ·{" "}
        <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
      </p>
      <p className="text-[9pt] text-[#444]">
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
