import { Chip } from "@heroui/react";
import { TimelineChip } from "../../Timeline";

type ProjectChipListProps = {
  chips: TimelineChip[];
  linked?: boolean;
};

export const ProjectChipList = ({
  chips,
  linked = false,
}: ProjectChipListProps) => (
  <div className="flex flex-wrap gap-2">
    {chips.map(({ label, icon, href }) => {
      const chip = (
        <Chip variant="primary">
          {icon}
          <Chip.Label>{label}</Chip.Label>
        </Chip>
      );

      if (linked && href) {
        return (
          <a
            className="no-underline transition-opacity hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent rounded-full"
            href={href}
            key={label}
            rel="noopener noreferrer"
            target="_blank"
          >
            {chip}
          </a>
        );
      }

      return <span key={label}>{chip}</span>;
    })}
  </div>
);
