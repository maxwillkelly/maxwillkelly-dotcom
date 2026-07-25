import type { ReactNode } from "react";

import {
  formatDateRangeinYearsAndMonths,
  formatDurationinYearsAndMonths,
} from "@/lib/duration";
import { TechnologyList, type TechnologyItem } from "./technology-list";

type TimelineProps = {
  children: ReactNode;
};

type TimelineEntryProps = {
  children: ReactNode;
  end?: string;
  start?: string;
  technologies?: TechnologyItem[];
  title: string;
};

const parseDate = (value?: string) =>
  value ? new Date(`${value}T00:00:00`) : undefined;

const TimelineEntry = ({
  children,
  end,
  start,
  technologies,
  title,
}: TimelineEntryProps) => {
  const startDate = parseDate(start);
  const endDate = parseDate(end);

  return (
    <div className="flex flex-col gap-4 py-2">
      <h3 className="text-lg text-foreground">{title}</h3>
      {startDate && (
        <h4 className="text-base text-foreground">
          {formatDateRangeinYearsAndMonths(startDate, endDate)}
          <span className="text-muted">
            {" · "}
            {formatDurationinYearsAndMonths(startDate, endDate)}
          </span>
        </h4>
      )}
      <div className="flex flex-col gap-4">
        {children}
        {technologies && technologies.length > 0 && (
          <TechnologyList items={technologies} />
        )}
      </div>
    </div>
  );
};

export const Timeline = Object.assign(
  ({ children }: TimelineProps) => (
    <div className="flex flex-col gap-4">{children}</div>
  ),
  { Entry: TimelineEntry },
);
