import { Chip } from "@heroui/react";
import type { ReactNode } from "react";

export type LinkableChipProps = {
  label: string;
  icon?: ReactNode;
  href?: string;
  isExternal?: boolean;
};

export const LinkableChip = ({
  label,
  icon,
  href,
  isExternal = false,
}: LinkableChipProps) => {
  const chip = (
    <Chip variant="primary">
      {icon}
      <Chip.Label>{label}</Chip.Label>
    </Chip>
  );

  if (href) {
    return (
      <a
        aria-label={label}
        className="no-underline transition-opacity hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent rounded-full"
        href={href}
        rel={isExternal || href.startsWith("http") ? "noopener noreferrer" : undefined}
        target={isExternal || href.startsWith("http") ? "_blank" : undefined}
      >
        {chip}
      </a>
    );
  }

  return <span>{chip}</span>;
};
