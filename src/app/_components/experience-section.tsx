import Heading, { frontmatter } from "@/content/experience.md";

import { TimelineSection } from "./timeline-section";

export const ExperienceSection = () => (
  <TimelineSection
    section="experience"
    Heading={Heading}
    metadata={frontmatter}
  />
);
