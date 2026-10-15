import {
  formatDateRangeinYearsAndMonths,
  formatDurationinYearsAndMonths,
} from "@/lib/duration";
import type { TimelineMetadata } from "@/lib/timeline-metadata";

export const CvMetadata = ({ location, start, end }: TimelineMetadata) => {
  const date = start
    ? `${formatDateRangeinYearsAndMonths(start, end)} · ${formatDurationinYearsAndMonths(start, end)}`
    : undefined;
  return (
    <p className="cv-meta">{[location, date].filter(Boolean).join(" · ")}</p>
  );
};
