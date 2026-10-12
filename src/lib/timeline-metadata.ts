import { parseISO } from "date-fns";
import { z } from "zod";

import { technologyIds } from "./technologies";

const text = z.string().min(1);
const date = z.iso.date().transform((value) => parseISO(value));

export const timelineMetadataSchema = z
  .object({
    organisation: text,
    position: text.optional(),
    location: text.optional(),
    type: z
      .enum(["Full-time", "Part-time", "Contractor", "Freelancer"])
      .optional(),
    start: date.optional(),
    end: date.optional(),
    chips: z.array(z.enum(technologyIds)).default([]),
  })
  .refine(
    ({ start, end }) => !end || (start !== undefined && end >= start),
    "End date requires a start date and cannot precede it",
  );

export type TimelineMetadata = z.infer<typeof timelineMetadataSchema>;
