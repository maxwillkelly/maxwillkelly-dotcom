import { Link, type LinkIconProps, type LinkProps } from "@heroui/react";
import type { ReactNode } from "react";

interface Props extends LinkProps {
  iconProps?: LinkIconProps;
  isExternal?: boolean;
  children: ReactNode;
}

export function MaxLink({
  iconProps,
  isExternal,
  children,
  rel,
  target,
  ...other
}: Props) {
  return (
    <Link
      {...other}
      rel={rel ?? (isExternal ? "noopener noreferrer" : undefined)}
      target={target ?? (isExternal ? "_blank" : undefined)}
    >
      {children}
      {iconProps && <Link.Icon {...iconProps} />}
    </Link>
  );
}

export namespace MaxLink {
  export const Icon = Link.Icon;
}
