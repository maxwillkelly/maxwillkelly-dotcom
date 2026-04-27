import Image from "next/image";

import { DiaTextReveal } from "@/components/ui/dia-text-reveal";

export const HeroSection = () => {
  return (
    <section className="flex items-center justify-between gap-6" id="hero">
      <div className="flex-1">
        <DiaTextReveal
          as="h1"
          className="text-5xl font-bold"
          text="Max Kelly"
        />
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
      </div>
      <Image
        alt="Max Kelly"
        className="size-32 shrink-0 rounded-xl object-cover sm:size-40"
        height={400}
        priority
        src="/profile.jpg"
        width={400}
      />
    </section>
  );
};
