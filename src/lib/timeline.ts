import { readdir } from "node:fs/promises";
import path from "node:path";

import { compareDesc } from "date-fns";
import type { MDXContent } from "mdx/types";

import {
  type TimelineMetadata,
  timelineMetadataSchema,
} from "./timeline-metadata";

export type TimelineSection = "experience" | "education" | "projects";
type LoadedTimelineEntry = TimelineMetadata & { Content: MDXContent };

const compareStartDates = (left?: Date, right?: Date) => {
  if (!left) return right ? 1 : 0;
  if (!right) return -1;

  return compareDesc(left, right);
};

const sortLoadedTimelineEntries = (
  left: LoadedTimelineEntry,
  right: LoadedTimelineEntry,
) => {
  return (
    compareStartDates(left.start, right.start) ||
    left.organisation.localeCompare(right.organisation, "en-GB")
  );
};

export const loadTimeline = async (section: TimelineSection) => {
  const files = await readdir(
    path.join(process.cwd(), "src/content", section),
    { withFileTypes: true },
  );

  const filenames = files
    .filter((file) => file.isFile())
    .map((file) => file.name);

  const entries = await Promise.all(
    filenames.map(async (filename): Promise<LoadedTimelineEntry> => {
      const { default: Content, frontmatter } = await import(
        `@/content/${section}/${filename}`
      );

      const entry = timelineMetadataSchema.parse(frontmatter);

      return {
        ...entry,
        Content,
      };
    }),
  );

  return entries.toSorted(sortLoadedTimelineEntries);
};
