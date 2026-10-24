import type { Duration } from "@upstash/ratelimit";
import { parseISO } from "date-fns";
import { z } from "zod";

import { technologies } from "./technologies";

const textSchema = z.string().min(1);
const dateSchema = z.iso.date().transform((value) => parseISO(value));

export const positionMetadataSchema = z
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

export const organisationMetadataSchema = z.object({
  organisation: textSchema,
  chips: z.array(z.enum(technologies.map(({ id }) => id))).default([]),
});

// These types only contain the metadata validated from Markdown frontmatter
export type TimelinePosition = z.infer<typeof positionMetadataSchema>;
export type TimelineOrganisation = z.infer<typeof organisationMetadataSchema>;

export const upstashDurationSchema = z.custom<Duration>(
  (value) =>
    typeof value === "string" &&
    /^(\d+(?:\.\d+)?) ?(ms|s|m|h|d|w)$/.test(value),
  'Expected an Upstash duration, such as "1 m" or "60s"',
);
