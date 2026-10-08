import { readdir } from "node:fs/promises";
import path from "node:path";

import { technologies } from "@/lib/technologies";
import { timelineDate, timelineMetadataSchema } from "@/schemas/content";

import { Timeline, type TimelineEntry } from "./timeline";

type Props = {
  section: "experience" | "education" | "projects";
  title: string;
};

const compareEntries = (left: TimelineEntry, right: TimelineEntry) =>
  (right.start?.getTime() ?? -Infinity) -
    (left.start?.getTime() ?? -Infinity) ||
  left.organisation.localeCompare(right.organisation, "en-GB");

export const TimelineSection = async ({ section, title }: Props) => {
  const files = await readdir(
    path.join(process.cwd(), "src/content", section),
    { withFileTypes: true },
  );
  const slugs = files
    .filter((file) => file.isFile() && file.name.endsWith(".md"))
    .map((file) => file.name.slice(0, -3));
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
      <Timeline entries={entries.toSorted(compareEntries)} />
    </section>
  );
};
