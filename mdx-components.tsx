import { cn, Link } from "@heroui/react";
import type { MDXComponents } from "mdx/types";
import type { ReactNode } from "react";

type ExternalLinkProps = {
  children: ReactNode;
  className?: string;
  href: string;
};

const ExternalLink = ({ children, className, href }: ExternalLinkProps) => {
  return (
    <Link
      className={cn("text-base no-underline hover:underline", className)}
      href={href}
      rel="noopener noreferrer"
      target="_blank"
    >
      {children}
      <Link.Icon />
    </Link>
  );
};

const components = {
  a:     <Link
    className={cn("text-base no-underline hover:underline", className)}
    href={href}
    rel="noopener noreferrer"
    target="_blank"
  >
    {children}
    <Link.Icon />
  </Link>,
} satisfies MDXComponents;

export function useMDXComponents(): MDXComponents {
  return components;
}
