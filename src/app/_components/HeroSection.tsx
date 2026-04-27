import Image from "next/image";

import { DiaTextReveal } from "@/components/ui/dia-text-reveal";

export const HeroSection = () => {
  return (
    <section className="flex items-center justify-between gap-6" id="hero">
      <div className="flex-1">
        <DiaTextReveal
          as="h1"
          className="text-6xl font-bold"
          text="Max Kelly"
        />
        <DiaTextReveal
          as="p"
          className="text-lg font-light mt-4"
          text="I'm a Software Engineer that builds interactive applications with an eye for small details."
        />
      </div>
      <Image
        alt="Max Kelly"
        className="size-24 shrink-0 rounded-xl object-cover sm:size-32"
        height={400}
        priority
        src="/profile.jpg"
        width={400}
      />
    </section>
  );
};
