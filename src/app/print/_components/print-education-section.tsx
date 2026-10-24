import { PrintTimeline } from "@/components/max/print-timeline";
import { loadTimeline } from "@/lib/timeline";

export const PrintEducationSection = async ({
  referenceDate,
}: {
  referenceDate: Date;
}) => {
  const entries = await loadTimeline("education");

  return (
    <PrintTimeline
      entries={entries}
      referenceDate={referenceDate}
      title="Education"
    />
  );
};
