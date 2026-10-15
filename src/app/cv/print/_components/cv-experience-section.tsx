import { loadTimeline } from "@/lib/timeline";

import { CvTimeline } from "../../../../components/max/cv-timeline";

export const CvExperienceSection = async () => {
  const entries = await loadTimeline("experience");

  return <CvTimeline entries={entries} title="Experience" />;
};
