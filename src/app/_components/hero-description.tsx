import { DiaTextReveal } from "@/components/ui/dia-text-reveal";
import MarkdownContent from "@/content/hero.md";

const HeroDescription = ({ children }: { children?: React.ReactNode }) => {
  if (typeof children !== "string") {
    return <p className="text-lg font-light mt-4">{children}</p>;
  }

  return (
    <DiaTextReveal as="p" className="text-lg font-light mt-4" text={children} />
  );
};

export const HeroContent = () => (
  <MarkdownContent components={{ p: HeroDescription }} />
);
