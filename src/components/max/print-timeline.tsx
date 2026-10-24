import { components } from "@/app/print/_components/mdx-components";
import { PrintParagraph } from "@/app/print/_components/print-paragraph";
import { PrintSectionHeading } from "@/app/print/_components/print-section-heading";
import { PrintSubheading } from "@/app/print/_components/print-subheading";
import {
  formatDateRangeinYearsAndMonths,
  formatDurationinYearsAndMonths,
} from "@/lib/date";
import { getTechnology } from "@/lib/technologies";
import type { Timeline } from "@/lib/timeline";

const printDate = (
  entry: Omit<Timeline[number], "Content">,
  referenceDate: Date,
) => {
  if (!entry.start) {
    return undefined;
  }

  return `${formatDateRangeinYearsAndMonths(entry.start, entry.end)} · ${formatDurationinYearsAndMonths(entry.start, entry.end ?? referenceDate)}`;
};

const PrintTimelineItem = ({
  entry: { Content, ...entry },
  referenceDate,
}: {
  entry: Timeline[number];
  referenceDate: Date;
}) => (
  <article className="mb-[4mm]">
    <header className="break-after-avoid break-inside-avoid">
      <PrintSubheading>{entry.organisation}</PrintSubheading>
      {entry.position && (
        <PrintParagraph className="font-semibold">
          {entry.position}
          {entry.type && ` · ${entry.type}`}
        </PrintParagraph>
      )}
      <PrintParagraph className="text-[9pt] text-[#444]">
        {[entry.location, printDate(entry, referenceDate)]
          .filter(Boolean)
          .join(" · ")}
      </PrintParagraph>
    </header>
    <Content components={components} />
    {entry.chips.length > 0 && (
      <PrintParagraph className="break-before-avoid text-[9pt] text-[#444]">
        {entry.chips.map((id) => getTechnology(id).label).join(" · ")}
      </PrintParagraph>
    )}
  </article>
);

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
    {entries.map((entry) => (
      <PrintTimelineItem
        key={`${entry.organisation}-${entry.position}`}
        entry={entry}
        referenceDate={referenceDate}
      />
    ))}
  </section>
);
