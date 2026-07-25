import type { ReactNode } from "react";
import type { TimelineChip } from "../../timeline";

export type Project = {
  title: string;
  summary: string;
  content: ReactNode;
  chips: TimelineChip[];
  icon: ReactNode;
  href?: string;
  hrefLabel?: string;
  colSpan?: string;
};
