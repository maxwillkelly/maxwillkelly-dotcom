import type { MDXComponents } from "mdx/types";

import {
  PrintLink,
  PrintList,
  PrintParagraph,
  PrintSectionHeading,
  PrintSubheading,
} from "./print-components";

export const components = {
  h1: PrintSectionHeading,
  h2: PrintSectionHeading,
  h3: PrintSubheading,
  p: PrintParagraph,
  ul: PrintList,
  a: PrintLink,
} satisfies MDXComponents;
