import { readdir } from "node:fs/promises";
import path from "node:path";

import { compareDesc } from "date-fns";

import {
  Timeline,
  type TimelineEntry,
  timelineMetadataSchema,
} from "../timeline";

type Props = {
  section: "experience" | "education" | "projects";
  title: string;
};

const compareStartDates = (left?: Date, right?: Date) => {
  if (!left) return right ? 1 : 0;
  if (!right) return -1;

  return compareDesc(left, right);
};

const sortTimelineEntries = (left: TimelineEntry, right: TimelineEntry) => {
  return (
    compareStartDates(left.start, right.start) ||
    left.organisation.localeCompare(right.organisation, "en-GB")
  );
};

export const TimelineSection = async ({ section, title }: Props) => {
  const files = await readdir(
    path.join(process.cwd(), "src/content", section),
    { withFileTypes: true },
  );

  const filenames = files
    .filter((file) => file.isFile())
    .map((file) => file.name);

  const entries = await Promise.all(
    filenames.map(async (filename): Promise<TimelineEntry> => {
      const { default: Content, frontmatter } = await import(
        `@/content/${section}/${filename}`
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

  const sortedEntries = entries.toSorted(sortTimelineEntries);

  return (
    <section id={section}>
      <h2 className="text-xl font-bold">{title}</h2>
      <Timeline entries={sortedEntries} />
    </section>
  );
};
