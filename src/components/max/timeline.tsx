import { parseISO } from "date-fns";
import type { ReactNode } from "react";
import { z } from "zod";

import {
  TechnologyChip,
  technologyIds,
} from "@/components/max/technology-chip";
import {
  formatDateRangeinYearsAndMonths,
  formatDurationinYearsAndMonths,
} from "@/lib/duration";

const text = z.string().min(1);
const date = z.iso.date().transform((value) => parseISO(value));

export const timelineMetadataSchema = z
  .object({
    organisation: text,
    position: text.optional(),
    location: text.optional(),
    type: z
      .enum(["Full-time", "Part-time", "Contractor", "Freelancer"])
      .optional(),
    start: date.optional(),
    end: date.optional(),
    chips: z.array(z.enum(technologyIds)).default([]),
  })
  .refine(
    ({ start, end }) => !end || (start !== undefined && end >= start),
    "End date requires a start date and cannot precede it",
  );

export type TimelineEntry = z.infer<typeof timelineMetadataSchema> & {
  content: ReactNode;
};

type TimelineProps = {
  entries: TimelineEntry[];
};

const TimelineMetadata = ({ location, start, end }: TimelineEntry) => {
  return (
    <div className="text-base text-foreground sm:text-right">
      {location && (
        <span>
          {location}
          {start && " · "}
        </span>
      )}
      {start && (
        <span>
          {formatDateRangeinYearsAndMonths(start, end)}
          <span className="text-muted">
            {" · "}
            {formatDurationinYearsAndMonths(start, end)}
          </span>
        </span>
      )}
    </div>
  );
};

const TimelineChips = ({ chips = [] }: Pick<TimelineEntry, "chips">) => {
  if (chips.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2">
      {chips.map((chip) => (
        <TechnologyChip key={chip} technology={chip} />
      ))}
    </div>
  );
};

const TimelineItem = ({ entry }: { entry: TimelineEntry }) => {
  const { organisation, position, type, content, chips } = entry;

  return (
    <div className="flex flex-col gap-4 py-2">
      <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
        <h3 className="text-lg font-semibold text-foreground">
          {organisation}
        </h3>
        <TimelineMetadata {...entry} />
      </div>
      {position && (
        <p className="text-base font-semibold text-foreground">
          {position}
          {type && ` · ${type}`}
        </p>
      )}
      <div>{content}</div>
      <TimelineChips chips={chips} />
    </div>
  );
};

export const Timeline = ({ entries }: TimelineProps) => {
  return (
    <div className="flex flex-col gap-4">
      {entries.map((entry) => (
        <TimelineItem
          key={`${entry.organisation}-${String(entry.position)}`}
          entry={entry}
        />
      ))}
    </div>
  );
};
