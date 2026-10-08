import { readdir } from "node:fs/promises";
import path from "node:path";

import { compareDesc } from "date-fns";

import {
  Timeline,
  type TimelineEntry,
  timelineMetadataSchema,
} from "./timeline";

type Props = {
  section: "experience" | "education" | "projects";
  title: string;
};

const compareEntries = (left: TimelineEntry, right: TimelineEntry) => {
  if (!left.start && right.start) return 1;
  if (left.start && !right.start) return -1;

  const dateOrder =
    left.start && right.start ? compareDesc(left.start, right.start) : 0;

  return (
    dateOrder || left.organisation.localeCompare(right.organisation, "en-GB")
  );
};

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
      const entry = timelineMetadataSchema.parse(frontmatter);

      return {
        ...entry,
        content: (
          <div className="flex flex-col gap-4">
            <Content />
          </div>
        ),
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
