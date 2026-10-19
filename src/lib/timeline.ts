import { readdir } from "node:fs/promises";
import path from "node:path";

import { compareDesc, parseISO } from "date-fns";
import type { MDXContent } from "mdx/types";
import { z } from "zod";

import { locale } from "./locale";
import { technologies } from "./technologies";

const textSchema = z.string().min(1);
const dateSchema = z.iso.date().transform((value) => parseISO(value));

const timelineMetadataSchema = z
  .object({
    organisation: textSchema,
    position: textSchema.optional(),
    location: textSchema.optional(),
    type: z
      .enum(["Full-time", "Part-time", "Contractor", "Freelancer"])
      .optional(),
    start: dateSchema.optional(),
    end: dateSchema.optional(),
    chips: z.array(z.enum(technologies.map(({ id }) => id))).default([]),
  })
  .refine(
    ({ start, end }) => !end || (start !== undefined && end >= start),
    "End date requires a start date and cannot precede it",
  );

export type TimelineMetadata = z.infer<typeof timelineMetadataSchema>;

export type TimelineSection = "experience" | "education" | "projects";

type LoadedTimelineEntry = TimelineMetadata & { Content: MDXContent };

const compareStartDates = (left?: Date, right?: Date) => {
  if (!left) {
    return right ? 1 : 0;
  }

  if (!right) {
    return -1;
  }

  return compareDesc(left, right);
};

const sortLoadedTimelineEntries = (
  left: LoadedTimelineEntry,
  right: LoadedTimelineEntry,
) => {
  return (
    compareStartDates(left.start, right.start) ||
    left.organisation.localeCompare(right.organisation, locale.code)
  );
};

export type Timeline = LoadedTimelineEntry[];

export const loadTimeline = async (
  section: TimelineSection,
): Promise<Timeline> => {
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
