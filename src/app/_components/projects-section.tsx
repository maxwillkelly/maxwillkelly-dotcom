import Heading, { frontmatter } from "@/content/projects.md";

import { TimelineSection } from "./timeline-section";

export const ProjectsSection = () => (
  <TimelineSection
    section="projects"
    Heading={Heading}
    metadata={frontmatter}
  />
);
