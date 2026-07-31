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
          isIconOnly: true,
          variant: "tertiary",
        })}
        download={download}
        href={href}
        rel={download ? undefined : "noopener noreferrer"}
        target={download ? undefined : "_blank"}
      >
        <Ripple />
        {icon}
      </MaxLink>
      <Tooltip.Content placement="bottom">
        <p>{tooltipContent}</p>
      </Tooltip.Content>
    </Tooltip>
  );
};
