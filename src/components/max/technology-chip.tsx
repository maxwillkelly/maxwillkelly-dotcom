import { LinkableChip } from "@/components/ui/linkable-chip";
import { getTechnology, type TechnologyId } from "@/lib/technologies";

type Props = {
  technology: TechnologyId;
};

export const TechnologyChip = ({ technology }: Props) => {
  const { label, icon: Icon, href } = getTechnology(technology);

  return (
    <LinkableChip
      label={label}
      icon={Icon ? <Icon width={12} height={12} /> : undefined}
      href={href}
    />
  );
};
