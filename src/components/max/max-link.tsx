import { Link, type LinkProps } from "@heroui/react";
import type { ReactNode } from "react";

interface Props extends LinkProps {
  isExternal?: boolean;
  children: ReactNode;
}

export const MaxLink = ({
  isExternal,
  children,
  rel = isExternal ? "noopener noreferrer" : undefined,
  target = isExternal ? "_blank" : undefined,
  ...other
}: Props) => {
  return (
    <Link {...other} rel={rel} target={target}>
      {children}
    </Link>
  );
};

MaxLink.Icon = Link.Icon;
