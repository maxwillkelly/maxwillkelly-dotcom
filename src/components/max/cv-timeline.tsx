import { components } from "@/app/cv/print/_components/mdx-components";
import {
  formatDateRangeinYearsAndMonths,
  formatDurationinYearsAndMonths,
} from "@/lib/duration";
import { getTechnology } from "@/lib/technologies";
import type { loadTimeline } from "@/lib/timeline";

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
      {entries.map(({ Content, ...entry }) => {
        const date = entry.start
          ? `${formatDateRangeinYearsAndMonths(entry.start, entry.end)} · ${formatDurationinYearsAndMonths(entry.start, entry.end)}`
          : undefined;

        return (
          <article key={`${entry.organisation}-${entry.position}`}>
            <header>
              <h3>{entry.organisation}</h3>
              {entry.position && (
                <p className="cv-position">
                  {entry.position}
                  {entry.type && ` · ${entry.type}`}
                </p>
              )}
              <p className="cv-meta">
                {[entry.location, date].filter(Boolean).join(" · ")}
              </p>
            </header>
            <Content components={components} />
            {entry.chips.length > 0 && (
              <p className="cv-technologies">
                {entry.chips.map((id) => getTechnology(id).label).join(" · ")}
              </p>
            )}
          </article>
        );
      })}
    </section>
  );
};
