import { cn } from "@heroui/react";
import type { MDXComponents } from "mdx/types";

import { MaxLink } from "@/components/max/max-link";

const components = {
  h1: ({ children }) => <h2 className="text-xl font-bold">{children}</h2>,
  p: ({ children }) => <p className="text-base leading-6">{children}</p>,
  a: ({ className, href, children }) => (
    <MaxLink
      className={cn("text-base no-underline hover:underline", className)}
      href={href}
      isExternal={href?.startsWith("https://") || href?.startsWith("http://")}
    >
      {children}
      <MaxLink.Icon />
    </MaxLink>
  ),
} satisfies MDXComponents;

export function useMDXComponents(): MDXComponents {
  return components;
}
