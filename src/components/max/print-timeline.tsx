import { components } from "@/app/print/_components/mdx-components";
import { PrintParagraph } from "@/app/print/_components/print-paragraph";
import { PrintSectionHeading } from "@/app/print/_components/print-section-heading";
import { PrintSubheading } from "@/app/print/_components/print-subheading";
import {
  formatDateRangeinYearsAndMonths,
  formatDurationinYearsAndMonths,
} from "@/lib/date";
import type { TimelinePosition } from "@/lib/schema";
import { getTechnology } from "@/lib/technologies";
import type { LoadedTimelinePosition, Timeline } from "@/lib/timeline";

const printDate = (entry: TimelinePosition, referenceDate: Date) => {
  const { start, end } = entry;

  if (!start) {
    return undefined;
  }

  const dateRange = formatDateRangeinYearsAndMonths(start, end);

  const duration = formatDurationinYearsAndMonths(start, end ?? referenceDate);

  return `${dateRange} · ${duration}`;
};

const PrintTimelineMetadata = ({
  entry,
  referenceDate,
}: {
  entry: TimelinePosition;
  referenceDate: Date;
}) => (
  <PrintParagraph className="text-[9pt] text-[#444]">
    {[entry.location, printDate(entry, referenceDate)]
      .filter(Boolean)
      .join(" · ")}
  </PrintParagraph>
);

const PrintTimelineItem = ({
  entry,
  referenceDate,
  showMetadata,
}: {
  entry: LoadedTimelinePosition;
  referenceDate: Date;
  showMetadata: boolean;
}) => {
  const { Content, position, type } = entry;

  return (
    <article className="mb-[4mm]">
      <header className="break-after-avoid break-inside-avoid">
        {position && (
          <PrintParagraph className="font-semibold">
            {position}
            {type && ` · ${type}`}
          </PrintParagraph>
        )}
        {showMetadata && (
          <PrintTimelineMetadata entry={entry} referenceDate={referenceDate} />
        )}
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
        <header className="flex items-baseline justify-between gap-4 break-after-avoid break-inside-avoid">
          <PrintSubheading>{organisation}</PrintSubheading>
          {positions.length === 1 && positions[0] && (
            <PrintTimelineMetadata
              entry={positions[0]}
              referenceDate={referenceDate}
            />
          )}
        </header>
        <Content components={components} />
        {positions.map((entry) => (
          <PrintTimelineItem
            key={entry.id}
            entry={entry}
            referenceDate={referenceDate}
            showMetadata={positions.length !== 1}
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
