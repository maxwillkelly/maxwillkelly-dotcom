import Hero from "@/content/hero.md";
import { siteConfig } from "@/lib/site";

import { components, PrintLink, PrintParagraph } from "./mdx-components";

export const PrintHero = () => (
  <header className="flex items-start gap-[6mm] break-inside-avoid">
    <div className="flex-1">
      <h1 className="mb-[3mm] text-[27pt] font-bold leading-[1.1]">
        {siteConfig.name}
      </h1>
      <Hero components={components} />
      <PrintParagraph className="text-[9pt] text-[#444]">
        {siteConfig.location} ·{" "}
        <PrintLink href={`mailto:${siteConfig.email}`}>
          {siteConfig.email}
        </PrintLink>
      </PrintParagraph>
      <PrintParagraph className="text-[9pt] text-[#444]">
        {[siteConfig.url, ...siteConfig.sameAs].map((url, index) => (
          <span key={url}>
            {index > 0 && " · "}
            <PrintLink href={url}>
              {url.replace("https://", "").replace("www.", "")}
            </PrintLink>
          </span>
        ))}
      </PrintParagraph>
    </div>
  </header>
);
