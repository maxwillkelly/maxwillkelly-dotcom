import type { MDXComponents } from "mdx/types";
import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

export const PrintSectionHeading = ({
  children,
  className,
  ...props
}: ComponentProps<"h2">) => (
  <h2
    className={cn(
      "mt-[6mm] mb-[3mm] border-b border-[#ccc] pb-[1.5mm] text-[15pt] font-bold break-after-avoid break-inside-avoid",
      className,
    )}
    {...props}
  >
    {children}
  </h2>
);

export const PrintSubheading = ({
  children,
  className,
  ...props
}: ComponentProps<"h3">) => (
  <h3
    className={cn(
      "text-[11.5pt] font-bold break-after-avoid break-inside-avoid",
      className,
    )}
    {...props}
  >
    {children}
  </h3>
);

export const PrintParagraph = ({
  children,
  className,
  ...props
}: ComponentProps<"p">) => (
  <p className={cn("mb-[2.5mm] [orphans:3] [widows:3]", className)} {...props}>
    {children}
  </p>
);

const PrintList = ({ children, className, ...props }: ComponentProps<"ul">) => (
  <ul className={cn("mb-[3mm] list-disc pl-[5mm]", className)} {...props}>
    {children}
  </ul>
);

export const PrintLink = ({
  children,
  className,
  ...props
}: ComponentProps<"a">) => (
  <a
    className={cn(
      "text-inherit underline underline-offset-2 wrap-anywhere",
      className,
    )}
    {...props}
  >
    {children}
  </a>
);

export const components = {
  h1: PrintSectionHeading,
  h2: PrintSectionHeading,
  h3: PrintSubheading,
  p: PrintParagraph,
  ul: PrintList,
  a: PrintLink,
} satisfies MDXComponents;
