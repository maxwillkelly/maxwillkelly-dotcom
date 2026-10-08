import { technologies } from "@/lib/technologies";
import { timelineDate, timelineMetadataSchema } from "@/schemas/content";

import { Timeline, type TimelineEntry } from "./timeline";

type Props = {
  section: "experience" | "education" | "projects";
  title: string;
  entries: string[];
};

export const TimelineSection = async ({
  section,
  title,
  entries: slugs,
}: Props) => {
  const entries = await Promise.all(
    slugs.map(async (slug): Promise<TimelineEntry> => {
      const { default: Content, frontmatter } = await import(
        `@/content/${section}/${slug}.md`
      );
      const { start, end, chips, summary, ...entry } =
        timelineMetadataSchema.parse(frontmatter);
      const Summary = summary
        ? (await import(`@/content/${section}/summaries/${summary}.md`)).default
        : undefined;

      return {
        ...entry,
        start: timelineDate(start),
        end: timelineDate(end),
        description: Summary ? <Summary /> : undefined,
        content: (
          <div className="flex flex-col gap-4">
            <Content />
          </div>
        ),
        chips: chips.map((id) => technologies[id]),
      };
    }),
  );

  return (
    <section id={section}>
      <h2 className="text-xl font-bold">{title}</h2>
      <Timeline entries={entries} />
    </section>
  );
};
