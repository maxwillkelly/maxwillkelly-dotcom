import Hero from "@/content/hero.md";
import { siteConfig } from "@/lib/site";

import { components } from "./mdx-components";
import { PrintLink } from "./print-link";
import { PrintParagraph } from "./print-paragraph";

export const PrintHero = () => {
  const { name, location, email, url, sameAs } = siteConfig;

  return (
    <header className="flex items-start gap-[6mm] break-inside-avoid">
      <div className="flex-1">
        <h1 className="mb-[3mm] text-[27pt] font-bold leading-[1.1]">{name}</h1>
        <Hero components={components} />
        <PrintParagraph className="text-[9pt] text-[#444]">
          {location} · <PrintLink href={`mailto:${email}`}>{email}</PrintLink>
        </PrintParagraph>
        <PrintParagraph className="text-[9pt] text-[#444]">
          {[url, ...sameAs].map((linkUrl, index) => (
            <span key={linkUrl}>
              {index > 0 && " · "}
              <PrintLink href={linkUrl}>
                {linkUrl.replace("https://", "").replace("www.", "")}
              </PrintLink>
            </span>
          ))}
        </PrintParagraph>
      </div>
    </header>
  );
};
