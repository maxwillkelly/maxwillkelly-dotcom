import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "zod";

const chipSchema = z.object({
  label: z.string(),
  href: z.url().optional(),
  icon: z.string().optional(),
});

const timelineSchema = z.object({
  title: z.string(),
  start: z.coerce.date(),
  end: z.coerce.date().optional(),
  chips: z.array(chipSchema).default([]),
  order: z.number(),
});

const timelineCollection = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/experience" }),
  schema: timelineSchema,
});

export const collections = {
  about: defineCollection({
    loader: glob({ pattern: "**/*.md", base: "./src/content/about" }),
    schema: z.object({
      title: z.string(),
    }),
  }),
  values: defineCollection({
    loader: glob({ pattern: "**/*.md", base: "./src/content/values" }),
    schema: z.object({
      title: z.string(),
      icon: z.enum(["code", "refresh", "flask", "brain"]),
      order: z.number(),
    }),
  }),
  experience: timelineCollection,
  education: defineCollection({
    loader: glob({ pattern: "**/*.md", base: "./src/content/education" }),
    schema: timelineSchema,
  }),
  projects: defineCollection({
    loader: glob({ pattern: "**/*.md", base: "./src/content/projects" }),
    schema: z.object({
      title: z.string(),
      summary: z.string(),
      href: z.url(),
      hrefLabel: z.string(),
      colSpan: z.string().optional(),
      icon: z.enum(["zap"]),
      chips: z.array(chipSchema).default([]),
      order: z.number(),
    }),
  }),
};
