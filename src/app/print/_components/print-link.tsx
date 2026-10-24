import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

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
