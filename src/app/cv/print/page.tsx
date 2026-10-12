import type { MDXComponents } from "mdx/types";
import type { Metadata } from "next";
import Image from "next/image";

import Hero from "@/content/hero.md";
import Profile from "@/content/profile.md";
import {
  formatDateRangeinYearsAndMonths,
  formatDurationinYearsAndMonths,
} from "@/lib/duration";
import { siteConfig } from "@/lib/site";
import { technologyLabels } from "@/lib/technologies";
import { loadTimeline, type TimelineSection } from "@/lib/timeline";
import type { TimelineMetadata } from "@/lib/timeline-metadata";

import "./print.css";

export const metadata: Metadata = {
  title: "CV",
  robots: { index: false, follow: false },
};

const components = {
  h1: ({ children }) => <h2>{children}</h2>,
  p: ({ children }) => <p>{children}</p>,
  a: ({ href, children }) => <a href={href}>{children}</a>,
} satisfies MDXComponents;

const CvMetadata = ({ location, start, end }: TimelineMetadata) => {
  const date = start
    ? `${formatDateRangeinYearsAndMonths(start, end)} · ${formatDurationinYearsAndMonths(start, end)}`
    : undefined;
  return (
    <p className="cv-meta">{[location, date].filter(Boolean).join(" · ")}</p>
  );
};

const CvTimeline = async ({
  section,
  title,
}: {
  section: TimelineSection;
  title: string;
}) => {
  const entries = await loadTimeline(section);
  return (
    <section>
      <h2>{title}</h2>
      {entries.map(({ Content, ...entry }) => (
        <article key={`${entry.organisation}-${entry.position}`}>
          <header>
            <h3>{entry.organisation}</h3>
            {entry.position && (
              <p className="cv-position">
                {entry.position}
                {entry.type && ` · ${entry.type}`}
              </p>
            )}
            <CvMetadata {...entry} />
          </header>
          <Content components={components} />
          {entry.chips.length > 0 && (
            <p className="cv-technologies">
              {entry.chips.map((id) => technologyLabels[id]).join(" · ")}
            </p>
          )}
        </article>
      ))}
    </section>
  );
};

export default async function CvPrintPage() {
  return (
    <main className="cv-document" data-cv-document>
      <header className="cv-hero">
        <div>
          <h1>{siteConfig.name}</h1>
          <Hero components={components} />
          <p className="cv-meta">
            {siteConfig.location} ·{" "}
            <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
          </p>
          <p className="cv-links">
            {[siteConfig.url, ...siteConfig.sameAs].map((url) => (
              <a key={url} href={url}>
                {url.replace("https://", "").replace("www.", "")}
              </a>
            ))}
          </p>
        </div>
        <Image
          src={siteConfig.image}
          alt={siteConfig.name}
          width={88}
          height={88}
          priority
          unoptimized
        />
      </header>
      <section>
        <Profile components={components} />
      </section>
      <CvTimeline section="experience" title="Experience" />
      <CvTimeline section="education" title="Education" />
      <span data-cv-ready />
    </main>
  );
}
