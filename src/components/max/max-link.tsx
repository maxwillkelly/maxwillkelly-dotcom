import { Link, type LinkIconProps, type LinkProps } from "@heroui/react";
import type { ReactNode } from "react";

interface Props extends LinkProps {
  iconProps?: LinkIconProps;
  isExternal?: boolean;
  children: ReactNode;
}

function getExternalLinkDefaults(isExternal: boolean | undefined) {
  if (!isExternal) return {};
  return { rel: "noopener noreferrer", target: "_blank" };
}

function MaxLinkRoot({
  iconProps,
  isExternal,
  children,
  rel,
  target,
  ...other
}: Props) {
  const defaults = getExternalLinkDefaults(isExternal);

  return (
    <Link
      {...other}
      rel={rel ?? defaults.rel}
      target={target ?? defaults.target}
    >
      {children}
      {iconProps && <Link.Icon {...iconProps} />}
    </Link>
  );
}

export const MaxLink = Object.assign(MaxLinkRoot, { Icon: Link.Icon });
