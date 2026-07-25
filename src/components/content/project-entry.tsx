import { Zap } from "lucide-react";
import type { ReactNode } from "react";

import { ProjectCard } from "@/app/_components/projects/project-card";
import type { Project } from "./project";
import type { TechnologyItem } from "./technology-list";

type ProjectEntryProps = {
  children: ReactNode;
  colSpan?: string;
  href?: string;
  hrefLabel?: string;
  icon?: "zap";
  summary: string;
  technologies: TechnologyItem[];
  title: string;
};

const icons = {
  zap: <Zap className="size-5" />,
};

export const ProjectEntry = ({
  children,
  colSpan,
  href,
  hrefLabel,
  icon = "zap",
  summary,
  technologies,
  title,
}: ProjectEntryProps) => {
  const project: Project = {
    colSpan,
    content: children,
    href,
    hrefLabel,
    icon: icons[icon],
    summary,
    technologies,
    title,
  };

  return <ProjectCard project={project} />;
};
