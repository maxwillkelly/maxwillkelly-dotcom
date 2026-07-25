import type { MDXComponents } from "mdx/types";

import { ExternalLink } from "@/components/content/external-link";

const components = {
  a: ExternalLink,
} satisfies MDXComponents;

export function useMDXComponents(): MDXComponents {
  return components;
}
