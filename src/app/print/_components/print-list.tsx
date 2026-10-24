import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

export const PrintList = ({
  children,
  className,
  ...props
}: ComponentProps<"ul">) => (
  <ul className={cn("mb-[3mm] list-disc pl-[5mm]", className)} {...props}>
    {children}
  </ul>
);
