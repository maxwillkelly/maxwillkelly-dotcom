import { z } from "zod";

import { technologies, type TechnologyId } from "@/lib/technologies";

const text = z.string().min(1);
const slug = text.regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
const date = z.iso.date();

export const timelineMetadataSchema = z
  .object({
    organisation: text,
    summary: slug.optional(),
    position: text.optional(),
    location: text.optional(),
    type: z
      .enum(["Full-time", "Part-time", "Contractor", "Freelancer"])
      .optional(),
    start: date.optional(),
    end: date.optional(),
    chips: z
      .array(z.enum(Object.keys(technologies) as TechnologyId[]))
      .default([]),
  })
  .refine(
    ({ start, end }) => !end || (start !== undefined && end >= start),
    "End date requires a start date and cannot precede it",
  );

// Interpret date-only metadata as local calendar dates, matching the timeline's
// original Date(year, month, day) values without UTC/time-zone shifts.
export const timelineDate = (value?: string) => {
  if (!value) return undefined;
  const [year, month, day] = value.split("-").map(Number);
  return new Date(year, month - 1, day);
};
