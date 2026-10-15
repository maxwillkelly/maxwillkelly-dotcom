import { loadTimeline } from "@/lib/timeline";

import { CvTimeline } from "../../../../components/max/cv-timeline";

export const CvEducationSection = async () => {
  const entries = await loadTimeline("education");

  return <CvTimeline entries={entries} title="Education" />;
};
