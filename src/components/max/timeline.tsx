import type { ReactNode } from "react";

import { TechnologyChip } from "@/components/max/technology-chip";
import {
  formatDateRangeinYearsAndMonths,
  formatDurationinYearsAndMonths,
} from "@/lib/date";
import type { TimelineOrganisation, TimelinePosition } from "@/lib/schema";

type TimelineEntry = TimelinePosition & { id: string; content: ReactNode };

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

const TimelineChips = ({ chips = [] }: Pick<TimelineOrganisation, "chips">) => {
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

const TimelinePositionHeading = ({ position, type }: TimelineEntry) =>
  position && (
    <h4 className="text-base font-semibold text-foreground">
      {position}
      {type && ` · ${type}`}
    </h4>
  );

const TimelineItem = ({
  entry,
  showMetadata,
}: {
  entry: TimelineEntry;
  showMetadata: boolean;
}) => {
  const { position, content } = entry;

  return (
    <div className="flex flex-col gap-4 py-4">
      {(position || showMetadata) && (
        <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
          <TimelinePositionHeading {...entry} />
          {showMetadata && <TimelineMetadata {...entry} />}
        </div>
      )}
      <div>{content}</div>
    </div>
  );
};

type TimelineProps = {
  organisations: (TimelineOrganisation & {
    id: string;
    content: ReactNode;
    positions: TimelineEntry[];
  })[];
};

export const Timeline = ({ organisations }: TimelineProps) => {
  return (
    <div className="flex flex-col gap-8">
      {organisations.map(({ id, organisation, chips, content, positions }) => (
        <div key={id} className="flex flex-col gap-2">
          <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
            <h3 className="text-lg font-semibold text-foreground">
              {organisation}
            </h3>
            {positions.length === 1 && <TimelineMetadata {...positions[0]} />}
          </div>
          {content}
          {positions.map((entry) => (
            <TimelineItem
              key={entry.id}
              entry={entry}
              showMetadata={positions.length !== 1}
            />
          ))}
          <TimelineChips chips={chips} />
        </div>
      ))}
    </div>
  );
};
