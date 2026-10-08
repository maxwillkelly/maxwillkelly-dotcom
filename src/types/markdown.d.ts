/// <reference types="mdx" />

declare module "*.md" {
  import type { MDXContent } from "mdx/types";

  export const frontmatter: unknown;
  const Content: MDXContent;
  export default Content;
}
