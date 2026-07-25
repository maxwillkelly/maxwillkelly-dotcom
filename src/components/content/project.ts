import type { ReactNode } from "react";

import type { TechnologyItem } from "./technology-list";

export type Project = {
  colSpan?: string;
  content: ReactNode;
  href?: string;
  hrefLabel?: string;
  icon: ReactNode;
  summary: string;
  technologies: TechnologyItem[];
  title: string;
};
