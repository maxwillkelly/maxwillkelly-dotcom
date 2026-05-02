import { Chip } from "@heroui/react";
import type { ReactNode } from "react";

import {
  formatDateRangeinYearsAndMonths,
  formatDurationinYearsAndMonths,
} from "@/lib/duration";

export type TimelineChip = {
  label: string;
  icon?: ReactNode;
};

export type TimelineEntry = {
  title: string;
  start?: Date;
  end?: Date;
  content: ReactNode;
  chips?: TimelineChip[];
};

type TimelineProps = {
  entries: TimelineEntry[];
};

export const Timeline = ({ entries }: TimelineProps) => {
  return (
    <div className="flex flex-col gap-4">
      {entries.map(({ title, start, end, content, chips }) => (
        <div className="flex flex-col py-2 gap-4" key={title}>
          <h3 className="text-lg text-foreground">{title}</h3>
          {start && (
            <h4 className="text-base text-foreground">
              {formatDateRangeinYearsAndMonths(start, end)}
              <span className="text-muted">
                {" · "}
                {formatDurationinYearsAndMonths(start, end)}
              </span>
            </h4>
          )}
          <p>{content}</p>
          {chips && chips.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {chips.map(({ label, icon }) => (
                <Chip variant="primary" key={label}>
                  {icon}
                  <Chip.Label>{label}</Chip.Label>
                </Chip>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
