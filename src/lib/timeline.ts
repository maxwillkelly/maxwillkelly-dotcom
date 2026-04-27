import type { ReactNode } from "react";

export type TimelineChip = {
  label: string;
  icon?: ReactNode;
};

export type TimelineEntry = {
  title: string;
  start: Date;
  end?: Date;
  chips?: TimelineChip[];
};
