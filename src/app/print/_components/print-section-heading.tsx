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
