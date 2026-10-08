import {
  C,
  Cplusplus,
  Csharp,
  Docker,
  Dotnet,
  Electron,
  Expo,
  Express,
  Firebase,
  Graphql,
  Java,
  Javascript,
  MicrosoftSqlServer,
  Mongodb,
  Nestjs,
  Nodedotjs,
  React,
  Typescript,
  Vuedotjs,
} from "@thesvg/react";
import type { MDXContent } from "mdx/types";

import {
  timelineDate,
  timelineMetadataSchema,
  timelineSectionSchema,
} from "@/schemas/content";

import { Timeline, type TimelineEntry } from "./timeline";

const icons = {
  C,
  Cplusplus,
  Csharp,
  Docker,
  Dotnet,
  Electron,
  Expo,
  Express,
  Firebase,
  Graphql,
  Java,
  Javascript,
  MicrosoftSqlServer,
  Mongodb,
  Nestjs,
  Nodedotjs,
  React,
  Typescript,
  Vuedotjs,
};

type Props = {
  section: "experience" | "education" | "projects";
  Heading: MDXContent;
  metadata: unknown;
};

export const TimelineSection = async ({
  section,
  Heading,
  metadata,
}: Props) => {
  const { entries: slugs } = timelineSectionSchema.parse(metadata);
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
        chips: chips.map(({ icon, ...chip }) => {
          const Icon = icon ? icons[icon] : undefined;
          return {
            ...chip,
            icon: Icon ? (
              icon === "Mongodb" ? (
                <Icon height={12} />
              ) : (
                <Icon width={12} />
              )
            ) : undefined,
          };
        }),
      };
    }),
  );

  return (
    <section id={section}>
      <Heading />
      <Timeline entries={entries} />
    </section>
  );
};
