import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

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
