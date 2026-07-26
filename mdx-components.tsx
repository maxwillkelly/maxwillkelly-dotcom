import { cn, Link } from "@heroui/react";
import type { MDXComponents } from "mdx/types";

const components = {
  a: ({ className, href, children }) => (
    <Link
      className={cn("text-base no-underline hover:underline", className)}
      href={href}
      rel="noopener noreferrer"
      target="_blank"
    >
      {children}
      <Link.Icon />
    </Link>
  ),
} satisfies MDXComponents;

export function useMDXComponents(): MDXComponents {
  return components;
}
