import type { MDXComponents } from "mdx/types";

import { PrintLink } from "./print-link";
import { PrintList } from "./print-list";
import { PrintParagraph } from "./print-paragraph";
import { PrintSectionHeading } from "./print-section-heading";
import { PrintSubheading } from "./print-subheading";

export const components = {
  h1: PrintSectionHeading,
  h2: PrintSectionHeading,
  h3: PrintSubheading,
  p: PrintParagraph,
  ul: PrintList,
  a: PrintLink,
} satisfies MDXComponents;
