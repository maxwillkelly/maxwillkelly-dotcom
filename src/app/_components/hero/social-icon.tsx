"use client";

import { buttonVariants, Tooltip } from "@heroui/react";
import { Ripple } from "m3-ripple";

import { MaxLink } from "@/components/max/max-link";

type Props = {
  href: string;
  ariaLabel: string;
  icon: React.ReactNode;
  tooltipContent: string;
  download?: string;
};

export const SocialIcon = ({
  href,
  ariaLabel,
  icon,
  tooltipContent,
  download,
}: Props) => {
  return (
    <Tooltip delay={0}>
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
      <Tooltip.Content placement="bottom">
        <p>{tooltipContent}</p>
      </Tooltip.Content>
    </Tooltip>
  );
};
