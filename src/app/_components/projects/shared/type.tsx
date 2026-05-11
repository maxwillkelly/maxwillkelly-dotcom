import { ReactNode } from "react";
import { TimelineChip } from "../../Timeline";

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
