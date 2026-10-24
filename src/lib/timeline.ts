import { readdir } from "node:fs/promises";
import path from "node:path";

import { compareDesc } from "date-fns";
import type { MDXContent } from "mdx/types";

import {
  organisationMetadataSchema,
  positionMetadataSchema,
  type TimelineOrganisation,
  type TimelinePosition,
} from "./schema";
import { siteConfig } from "./site";

// These types extend the originals with what the file loader produces
export type LoadedTimelinePosition = TimelinePosition & {
  id: string;
  Content: MDXContent;
};

type LoadedTimelineOrganisation = TimelineOrganisation & {
  id: string;
  Content: MDXContent;
  positions: LoadedTimelinePosition[];
};

export type TimelineSection = "experience" | "education" | "projects";

export type Timeline = LoadedTimelineOrganisation[];

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
): Promise<LoadedTimelinePosition[]> => {
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
