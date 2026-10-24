import { components } from "@/app/print/_components/mdx-components";
import { PrintParagraph } from "@/app/print/_components/print-paragraph";
import { PrintSectionHeading } from "@/app/print/_components/print-section-heading";
import { PrintSubheading } from "@/app/print/_components/print-subheading";
import {
  formatDateRangeinYearsAndMonths,
  formatDurationinYearsAndMonths,
} from "@/lib/date";
import { getTechnology } from "@/lib/technologies";
import type { Timeline, TimelinePosition } from "@/lib/timeline";

const printDate = (entry: TimelinePosition, referenceDate: Date) => {
  const { start, end } = entry;

  if (!start) {
    return undefined;
  }

  const dateRange = formatDateRangeinYearsAndMonths(start, end);

  const duration = formatDurationinYearsAndMonths(start, end ?? referenceDate);

  return `${dateRange} · ${duration}`;
};

const PrintTimelineItem = ({
  entry,
  referenceDate,
}: {
  entry: TimelinePosition;
  referenceDate: Date;
}) => {
  const { Content, position, type, location } = entry;

  return (
    <article className="mb-[4mm]">
      <header className="break-after-avoid break-inside-avoid">
        {position && (
          <PrintParagraph className="font-semibold">
            {position}
            {type && ` · ${type}`}
          </PrintParagraph>
        )}
        <PrintParagraph className="text-[9pt] text-[#444]">
          {[location, printDate(entry, referenceDate)]
            .filter(Boolean)
            .join(" · ")}
        </PrintParagraph>
      </header>
      <Content components={components} />
    </article>
  );
};

export const PrintTimeline = ({
  entries,
  title,
  referenceDate,
}: {
  entries: Timeline;
  referenceDate: Date;
  title: string;
}) => (
  <section>
    <PrintSectionHeading>{title}</PrintSectionHeading>
    {entries.map(({ id, organisation, chips, Content, positions }) => (
      <div key={id}>
        <header className="break-after-avoid break-inside-avoid">
          <PrintSubheading>{organisation}</PrintSubheading>
        </header>
        <Content components={components} />
        {positions.map((entry) => (
          <PrintTimelineItem
            key={entry.id}
            entry={entry}
            referenceDate={referenceDate}
          />
        ))}
        {chips.length > 0 && (
          <PrintParagraph className="break-before-avoid text-[9pt] text-[#444]">
            {chips
              .map((technology) => getTechnology(technology).label)
              .join(" · ")}
          </PrintParagraph>
        )}
      </div>
    ))}
  </section>
);
