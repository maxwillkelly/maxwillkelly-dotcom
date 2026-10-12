"use client";

import { buttonVariants } from "@heroui/react";
import { Ripple } from "m3-ripple";

import { MaxLink } from "@/components/max/max-link";

type Props = {
  href: string;
  ariaLabel: string;
  icon: React.ReactNode;
  download?: string;
};

export const SocialIcon = ({ href, ariaLabel, icon, download }: Props) => {
  return (
    <MaxLink
      aria-label={ariaLabel}
      className={buttonVariants({
        size: "sm",
        variant: "tertiary",
        className: "gap-2 text-xs [&_img]:size-4",
      })}
      download={download}
      href={href}
      isExternal={!download}
    >
      <Ripple />
      {icon}
      {ariaLabel}
    </MaxLink>
  );
};
