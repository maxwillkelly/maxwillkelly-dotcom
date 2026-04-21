import { DiaTextReveal } from "@/components/ui/dia-text-reveal";

export const HeroSection = () => {
  return (
    <section id="hero">
      <DiaTextReveal as="h1" className="text-5xl font-bold" text="Max Kelly" />
      <DiaTextReveal
        as="h2"
        className="text-2xl mt-2 font-semibold"
        text="Software Engineer"
      />
      <DiaTextReveal
        as="p"
        className="text-lg mt-4"
        text="I build interactive applications with an eye for small details"
      />
    </section>
  );
};
