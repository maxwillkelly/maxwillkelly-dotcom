import { loadTimeline, type TimelineSection as Section } from "@/lib/timeline";

import { Timeline } from "../timeline";

type Props = { section: Section; title: string };

export const TimelineSection = async ({ section, title }: Props) => {
  const timeline = await loadTimeline(section);

  const entries = timeline.map(({ Content, positions, ...organisation }) => ({
    ...organisation,
    content: <Content />,
    positions: positions.map(({ Content: PositionContent, ...position }) => ({
      ...position,
      content: (
        <div className="flex flex-col gap-4">
          <PositionContent />
        </div>
      ),
    })),
  }));

  return (
    <section id={section}>
      <h2 className="text-xl font-bold">{title}</h2>
      <Timeline entries={entries} />
    </section>
  );
};
