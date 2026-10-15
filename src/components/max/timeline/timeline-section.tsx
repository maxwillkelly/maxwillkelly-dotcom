import { loadTimeline, type TimelineSection as Section } from "@/lib/timeline";

import { Timeline } from "../timeline";

type Props = { section: Section; title: string };

export const TimelineSection = async ({ section, title }: Props) => {
  const entries = (await loadTimeline(section)).map(
    ({ Content, ...entry }) => ({
      ...entry,
      content: (
        <div className="flex flex-col gap-4">
          <Content />
        </div>
      ),
    }),
  );
  return (
    <section id={section}>
      <h2 className="text-xl font-bold">{title}</h2>
      <Timeline entries={entries} />
    </section>
  );
};
