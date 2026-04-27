"use client";

import { Link, Tooltip, buttonVariants } from "@heroui/react";
import { Ripple } from "m3-ripple";

type Props = {
  href: string;
  ariaLabel: string;
  icon: React.ReactNode;
  tooltipContent: string;
};

export const SocialIcon = ({
  href,
  ariaLabel,
  icon,
  tooltipContent,
}: Props) => {
  return (
    <Tooltip delay={0}>
      <Link
        aria-label={ariaLabel}
        className={buttonVariants({
          isIconOnly: true,
          variant: "tertiary",
        })}
        href={href}
        rel="noopener noreferrer"
        target="_blank"
      >
        <Ripple />
        {icon}
      </Link>
      <Tooltip.Content placement="bottom">
        <p>{tooltipContent}</p>
      </Tooltip.Content>
    </Tooltip>
  );
};
