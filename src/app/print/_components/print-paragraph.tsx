import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

export const PrintParagraph = ({
  children,
  className,
  ...props
}: ComponentProps<"p">) => (
  <p className={cn("mb-[2.5mm] [orphans:3] [widows:3]", className)} {...props}>
    {children}
  </p>
);
