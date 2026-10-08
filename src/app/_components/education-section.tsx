import Heading, { frontmatter } from "@/content/education.md";

import { TimelineSection } from "./timeline-section";

export const EducationSection = () => (
  <TimelineSection
    section="education"
    Heading={Heading}
    metadata={frontmatter}
  />
);
