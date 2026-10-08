import { z } from "zod";

const text = z.string().min(1);
const slug = text.regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
const date = z.iso.date();

export const timelineSectionSchema = z.object({
  entries: z
    .array(slug)
    .min(1)
    .refine(
      (entries) => new Set(entries).size === entries.length,
      "Timeline entries must be unique",
    ),
});

const technologyIcons = [
  "C",
  "Cplusplus",
  "Csharp",
  "Docker",
  "Dotnet",
  "Electron",
  "Expo",
  "Express",
  "Firebase",
  "Graphql",
  "Java",
  "Javascript",
  "MicrosoftSqlServer",
  "Mongodb",
  "Nestjs",
  "Nodedotjs",
  "React",
  "Typescript",
  "Vuedotjs",
] as const;

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
      .array(
        z.object({
          label: text,
          icon: z.enum(technologyIcons).optional(),
          href: z.url().optional(),
        }),
      )
      .default([]),
  })
  .refine(
    ({ start, end }) => !end || (start !== undefined && end >= start),
    "End date requires a start date and cannot precede it",
  );

export const heroMetadataSchema = z.object({
  name: text,
  additionalName: text,
  givenName: text,
  familyName: text,
  title: text,
  description: text,
  url: z.url(),
  email: z.email(),
  location: text,
  addressLocality: text,
  addressCountry: text,
  jobTitle: text,
  image: text,
  sameAs: z.array(z.url()),
  socialLinks: z.array(
    z.object({
      label: text,
      href: text,
      icon: z.enum(["DownloadCloud", "Github", "LinkedIn"]),
      download: text.optional(),
    }),
  ),
});

// Interpret date-only metadata as local calendar dates, matching the timeline's
// original Date(year, month, day) values without UTC/time-zone shifts.
export const timelineDate = (value?: string) => {
  if (!value) return undefined;
  const [year, month, day] = value.split("-").map(Number);
  return new Date(year, month - 1, day);
};

const fieldCopy = z.object({ label: text, placeholder: text });
export const contactMetadataSchema = z.object({
  form: z.object({
    firstName: fieldCopy,
    lastName: fieldCopy,
    email: fieldCopy,
    subtitle: fieldCopy,
    message: fieldCopy,
    submit: text,
    pending: text,
    success: text,
  }),
});
export type ContactFormCopy = z.infer<typeof contactMetadataSchema>["form"];
