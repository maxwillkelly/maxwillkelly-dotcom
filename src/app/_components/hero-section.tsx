import { buttonVariants } from "@heroui/react";
import { DownloadCloud, Mail, Phone } from "lucide-react";
import Image from "next/image";

import { MaxLink } from "@/components/max/max-link";
import { BlurFade } from "@/components/ui/blur-fade";
import { DiaTextReveal } from "@/components/ui/dia-text-reveal";
import { siteConfig } from "@/lib/site";

import { GithubIcon } from "./contact/github-icon";
import { LinkedInIcon } from "./contact/linked-in-icon";
import { HeroContent } from "./hero-description";
import { SocialIcon } from "./hero/social-icon";

export const HeroSection = () => {
  return (
    <section
      className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-6 gap-y-4"
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
      <BlurFade className="col-span-2 sm:col-span-1 sm:col-start-1" delay={0.4}>
        <div className="flex flex-wrap gap-2">
          <MaxLink
            className={buttonVariants({
              variant: "tertiary",
              className: "w-fit gap-2 text-sm",
            })}
            href={`mailto:${siteConfig.email}`}
          >
            <Mail aria-hidden="true" className="size-4 shrink-0" />
            {siteConfig.email}
          </MaxLink>
          <MaxLink
            className={buttonVariants({
              variant: "tertiary",
              className: "w-fit gap-2 text-sm",
            })}
            href={`tel:${siteConfig.telephone.replace(/\s/g, "")}`}
          >
            <Phone aria-hidden="true" className="size-4 shrink-0" />
            {siteConfig.telephone}
          </MaxLink>
        </div>
      </BlurFade>
      <BlurFade className="col-span-2 sm:col-span-1 sm:col-start-1" delay={0.4}>
        <div className="flex gap-2">
          <SocialIcon
            ariaLabel="Download CV"
            download={`${siteConfig.name} - CV.pdf`}
            href="/cv.pdf"
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
      </BlurFade>
      <Image
        alt={siteConfig.name}
        className="col-start-2 row-start-1 size-24 rounded-xl object-cover sm:row-span-3 sm:row-start-1 sm:size-32"
        height={400}
        priority
        src="/profile.jpg"
        width={400}
      />
    </section>
  );
};
