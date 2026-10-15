import type { MDXComponents } from "mdx/types";

export const components = {
  h1: ({ children }) => <h2>{children}</h2>,
  p: ({ children }) => <p>{children}</p>,
  ul: ({ children }) => <ul>{children}</ul>,
  a: ({ href, children }) => <a href={href}>{children}</a>,
} satisfies MDXComponents;
