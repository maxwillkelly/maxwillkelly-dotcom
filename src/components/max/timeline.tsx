import type { ReactNode } from "react";

import { TechnologyChip } from "@/components/max/technology-chip";
import {
  formatDateRangeinYearsAndMonths,
  formatDurationinYearsAndMonths,
} from "@/lib/date";
import type { TimelineOrganisation, TimelinePosition } from "@/lib/timeline";

type TimelineEntry = Omit<TimelinePosition, "Content"> & { content: ReactNode };

type TimelineProps = {
  entries: (Omit<TimelineOrganisation, "Content" | "positions"> & {
    content: ReactNode;
    positions: TimelineEntry[];
  })[];
};

const TimelineMetadata = ({ start, end }: TimelineEntry) => {
  return (
    <div className="text-base text-foreground sm:text-right">
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
  if (chips.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-wrap gap-2">
      {chips.map((chip) => (
        <TechnologyChip key={chip} technology={chip} />
      ))}
    </div>
  );
};

const TimelineItem = ({ entry }: { entry: TimelineEntry }) => {
  const { position, type, content, chips } = entry;

  return (
    <div className="flex flex-col gap-4 py-2">
      <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
        {position && (
          <h4 className="text-base font-semibold text-foreground">
            {position}
            {type && ` · ${type}`}
          </h4>
        )}
        <TimelineMetadata {...entry} />
      </div>
      <div>{content}</div>
      <TimelineChips chips={chips} />
    </div>
  );
};

export const Timeline = ({ entries }: TimelineProps) => {
  return (
    <div className="flex flex-col gap-4">
      {entries.map(({ id, organisation, location, content, positions }) => (
        <div key={id} className="flex flex-col gap-2">
          <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
            <h3 className="text-lg font-semibold text-foreground">
              {organisation}
            </h3>
            {location && (
              <span className="text-base text-foreground">{location}</span>
            )}
          </div>
          {content}
          {positions.map((entry) => (
            <TimelineItem key={entry.id} entry={entry} />
          ))}
        </div>
      ))}
    </div>
  );
};
