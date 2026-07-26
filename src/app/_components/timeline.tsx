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
  company: string;
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

export const Timeline = ({ entries }: TimelineProps) => {
  return (
    <div className="flex flex-col gap-4">
      {entries.map(
        ({
          company,
          position,
          location,
          type,
          start,
          end,
          description,
          content,
          chips,
        }) => (
          <div className="flex flex-col gap-4 py-2" key={company}>
            <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
              <h3 className="text-lg font-semibold text-foreground">
                {company}
              </h3>
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
            </div>
            {description && description}
            {position && (
              <p className="text-base font-semibold text-foreground">
                {position}
                {type && ` · ${type}`}
              </p>
            )}
            <div>{content}</div>
            {chips && chips.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {chips.map((chip) => (
                  <LinkableChip key={chip.label} {...chip} />
                ))}
              </div>
            )}
          </div>
        ),
      )}
    </div>
  );
};
