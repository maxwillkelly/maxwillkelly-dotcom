import { LinkableChip } from "@/components/ui/linkable-chip";
import { getTechnologyIcon } from "@/components/ui/icon-map";

type Chip = {
  label: string;
  href?: string;
  icon?: string;
};

export const ChipList = ({ chips }: { chips: Chip[] }) => {
  if (chips.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-wrap gap-2">
      {chips.map((chip) => (
        <LinkableChip
          key={chip.label}
          {...chip}
          icon={getTechnologyIcon(chip.icon)}
        />
      ))}
    </div>
  );
};
