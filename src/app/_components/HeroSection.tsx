import { DownloadCloud } from "lucide-react";
import Image from "next/image";

import { DiaTextReveal } from "@/components/ui/dia-text-reveal";
import { GithubIcon } from "./contact/GithubIcon";
import { LinkedInIcon } from "./contact/LinkedInIcon";
import { SocialIcon } from "./hero/SocialIcon";

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
      <div className="flex flex-col items-center gap-3">
        <Image
          alt="Max Kelly"
          className="size-24 shrink-0 rounded-xl object-cover sm:size-32"
          height={400}
          priority
          src="/profile.jpg"
          width={400}
        />
        <div className="flex gap-2">
          <SocialIcon
            ariaLabel="Download CV"
            download="Max Kelly - CV.pdf"
            href="/cv-october-2023.pdf"
            icon={<DownloadCloud />}
            tooltipContent="Download CV"
          />
          <SocialIcon
            ariaLabel="GitHub"
            href="https://github.com/maxwillkelly"
            icon={<GithubIcon />}
            tooltipContent="GitHub"
          />
          <SocialIcon
            ariaLabel="LinkedIn"
            href="https://www.linkedin.com/in/maxwillkelly"
            icon={<LinkedInIcon />}
            tooltipContent="LinkedIn"
          />
        </div>
      </div>
    </section>
  );
};
