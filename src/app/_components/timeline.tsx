import type { ReactNode } from "react";
import {
  formatDateRangeinYearsAndMonths,
  formatDurationinYearsAndMonths,
} from "@/lib/duration";
import { LinkableChip } from "../../components/ui/linkable-chip";

export type TimelineChip = {
  label: string;
  icon?: ReactNode;
  href?: string;
};

export type TimelineEntry = {
  organisation: string;
  position?: string;
  location?: string;
  type?: "Full-time" | "Part-time" | "Contractor" | "Freelancer";
  start?: Date;
  end?: Date;
  description?: ReactNode;
  content: ReactNode;
  chips?: TimelineChip[];
};

type TimelineProps = {
  entries: TimelineEntry[];
};

function TimelineMetadata({ location, start, end }: TimelineEntry) {
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
}

function TimelineChips({ chips = [] }: Pick<TimelineEntry, "chips">) {
  if (chips.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2">
      {chips.map((chip) => (
        <LinkableChip key={chip.label} {...chip} />
      ))}
    </div>
  );
}

function TimelineItem({ entry }: { entry: TimelineEntry }) {
  const { organisation, description, position, type, content, chips } = entry;

  return (
    <div className="flex flex-col gap-4 py-2">
      <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
        <h3 className="text-lg font-semibold text-foreground">
          {organisation}
        </h3>
        <TimelineMetadata {...entry} />
      </div>
      {description && description}
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
}

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
