import { PrintTimeline } from "@/components/max/print-timeline";
import { loadTimeline } from "@/lib/timeline";

export const PrintExperienceSection = async ({
  referenceDate,
}: {
  referenceDate: Date;
}) => {
  const entries = await loadTimeline("experience");

  return (
    <PrintTimeline
      entries={entries}
      referenceDate={referenceDate}
      title="Experience"
    />
  );
};
