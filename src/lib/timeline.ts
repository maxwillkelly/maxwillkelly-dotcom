import { readdir } from "node:fs/promises";
import path from "node:path";

import { compareDesc, parseISO } from "date-fns";
import type { MDXContent } from "mdx/types";
import { z } from "zod";

import { siteConfig } from "./site";
import { technologies } from "./technologies";

const textSchema = z.string().min(1);
const dateSchema = z.iso.date().transform((value) => parseISO(value));

const positionMetadataSchema = z
  .object({
    position: textSchema.optional(),
    location: textSchema.optional(),
    type: z
      .enum(["Full-time", "Part-time", "Contractor", "Freelancer"])
      .optional(),
    start: dateSchema.optional(),
    end: dateSchema.optional(),
  })
  .refine(
    ({ start, end }) => !end || (start !== undefined && end >= start),
    "End date requires a start date and cannot precede it",
  );

const organisationMetadataSchema = z.object({
  organisation: textSchema,
  chips: z.array(z.enum(technologies.map(({ id }) => id))).default([]),
});

export type TimelinePosition = z.infer<typeof positionMetadataSchema> & {
  id: string;
  Content: MDXContent;
};

export type TimelineOrganisation = z.infer<
  typeof organisationMetadataSchema
> & {
  id: string;
  Content: MDXContent;
  positions: TimelinePosition[];
};

export type TimelineSection = "experience" | "education" | "projects";

export type Timeline = TimelineOrganisation[];

const compareStartDates = (left?: Date, right?: Date) => {
  if (!left) {
    return right ? 1 : 0;
  }

  if (!right) {
    return -1;
  }

  return compareDesc(left, right);
};

const loadPositions = async (
  section: TimelineSection,
  organisation: string,
): Promise<TimelinePosition[]> => {
  const files = await readdir(
    path.join(process.cwd(), "src/content", section, organisation, "positions"),
    { withFileTypes: true },
  );

  const positions = await Promise.all(
    files
      .filter((file) => file.isFile())
      .map(async ({ name }) => {
        const { default: Content, frontmatter } = await import(
          `@/content/${section}/${organisation}/positions/${name}`
        );

        return {
          ...positionMetadataSchema.parse(frontmatter ?? {}),
          id: name,
          Content,
        };
      }),
  );

  if (positions.length === 0) {
    throw new Error(
      `Timeline organisation ${section}/${organisation} requires a position`,
    );
  }

  return positions.toSorted(
    (left, right) =>
      compareStartDates(left.start, right.start) ||
      left.id.localeCompare(right.id, siteConfig.locale),
  );
};

export const loadTimeline = async (
  section: TimelineSection,
): Promise<Timeline> => {
  const folders = await readdir(
    path.join(process.cwd(), "src/content", section),
    { withFileTypes: true },
  );

  const organisations = await Promise.all(
    folders
      .filter((folder) => folder.isDirectory())
      .map(async ({ name }) => {
        const [{ default: Content, frontmatter }, positions] =
          await Promise.all([
            import(`@/content/${section}/${name}/index.md`),
            loadPositions(section, name),
          ]);

        return {
          ...organisationMetadataSchema.parse(frontmatter),
          id: name,
          Content,
          positions,
        };
      }),
  );

  return organisations.toSorted(
    (left, right) =>
      compareStartDates(left.positions[0]?.start, right.positions[0]?.start) ||
      left.organisation.localeCompare(right.organisation, siteConfig.locale),
  );
};
