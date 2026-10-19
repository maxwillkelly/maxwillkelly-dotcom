import { components } from "@/app/cv/print/_components/mdx-components";
import {
  formatDateRangeinYearsAndMonths,
  formatDurationinYearsAndMonths,
} from "@/lib/duration";
import { getTechnology } from "@/lib/technologies";
import type { Timeline } from "@/lib/timeline";

function printDate(
  entry: Omit<Timeline[number], "Content">,
  referenceDate: Date,
) {
  if (!entry.start) {
    return undefined;
  }

  return `${formatDateRangeinYearsAndMonths(entry.start, entry.end)} · ${formatDurationinYearsAndMonths(entry.start, entry.end ?? referenceDate)}`;
}

const PrintTimelineItem = ({
  entry: { Content, ...entry },
  referenceDate,
}: {
  entry: Timeline[number];
  referenceDate: Date;
}) => (
  <article>
    <header>
      <h3>{entry.organisation}</h3>
      {entry.position && (
        <p className="font-semibold">
          {entry.position}
          {entry.type && ` · ${entry.type}`}
        </p>
      )}
      <p className="text-[9pt] text-[#444]">
        {[entry.location, printDate(entry, referenceDate)]
          .filter(Boolean)
          .join(" · ")}
      </p>
    </header>
    <Content components={components} />
    {entry.chips.length > 0 && (
      <p className="break-before-avoid text-[9pt] text-[#444]">
        {entry.chips.map((id) => getTechnology(id).label).join(" · ")}
      </p>
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
    <h2>{title}</h2>
    {entries.map((entry) => (
      <PrintTimelineItem
        key={`${entry.organisation}-${entry.position}`}
        entry={entry}
        referenceDate={referenceDate}
      />
    ))}
  </section>
);
