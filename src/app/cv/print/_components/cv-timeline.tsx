import { getTechnology } from "@/lib/technologies";
import type { loadTimeline } from "@/lib/timeline";

import { CvMetadata } from "./cv-metadata";
import { components } from "./mdx-components";

export const CvTimeline = ({
  entries,
  title,
}: {
  entries: Awaited<ReturnType<typeof loadTimeline>>;
  title: string;
}) => {
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
              {entry.chips.map((id) => getTechnology(id).label).join(" · ")}
            </p>
          )}
        </article>
      ))}
    </section>
  );
};
