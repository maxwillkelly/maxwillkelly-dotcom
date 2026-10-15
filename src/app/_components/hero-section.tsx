import { Mail, Phone } from "lucide-react";
import Image from "next/image";

import { BlurFade } from "@/components/ui/blur-fade";
import { DiaTextReveal } from "@/components/ui/dia-text-reveal";
import { siteConfig } from "@/lib/site";

import { DownloadCvButton } from "./hero/download-cv-button";
import { GithubIcon } from "./hero/github-icon";
import { HeroContent } from "./hero/hero-content";
import { LinkedInIcon } from "./hero/linked-in-icon";
import { SocialIcon } from "./hero/social-icon";

export const HeroSection = () => {
  return (
    <section
      className="grid grid-cols-1 items-center gap-x-6 gap-y-4 sm:grid-cols-[minmax(0,1fr)_auto]"
      id="hero"
    >
      <div>
        <DiaTextReveal
          as="h1"
          className="pb-1 text-6xl font-bold"
          text={siteConfig.name}
        />
        <HeroContent />
      </div>
      <BlurFade className="sm:col-start-1" delay={0.4}>
        <div className="flex flex-wrap gap-2">
          <SocialIcon
            ariaLabel={siteConfig.email}
            href={`mailto:${siteConfig.email}`}
            icon={<Mail />}
          />
          <SocialIcon
            ariaLabel={siteConfig.telephone}
            href={`tel:${siteConfig.telephone.replace(/\s/g, "")}`}
            icon={<Phone />}
          />
        </div>
      </BlurFade>
      <BlurFade className="sm:col-start-1" delay={0.4}>
        <div className="flex flex-wrap gap-2">
          <DownloadCvButton />
          <SocialIcon
            ariaLabel="GitHub"
            href="https://github.com/maxwillkelly"
            icon={<GithubIcon />}
            isExternal
          />
          <SocialIcon
            ariaLabel="LinkedIn"
            href="https://www.linkedin.com/in/maxwillkelly"
            icon={<LinkedInIcon />}
            isExternal
          />
        </div>
      </BlurFade>
      <Image
        alt={siteConfig.name}
        className="hidden rounded-xl object-cover sm:col-start-2 sm:row-span-3 sm:row-start-1 sm:block sm:size-32"
        height={400}
        priority
        src="/profile.jpg"
        width={400}
      />
    </section>
  );
};
