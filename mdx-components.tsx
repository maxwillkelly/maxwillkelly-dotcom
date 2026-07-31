import { cn } from "@heroui/react";
import type { MDXComponents } from "mdx/types";
import { MaxLink } from "@/components/max/max-link";

const components = {
  a: ({ className, href, children }) => (
    <MaxLink
      className={cn("text-base no-underline hover:underline", className)}
      href={href}
      rel="noopener noreferrer"
      target="_blank"
    >
      {children}
      <MaxLink.Icon />
    </MaxLink>
  ),
} satisfies MDXComponents;

export function useMDXComponents(): MDXComponents {
  return components;
}
