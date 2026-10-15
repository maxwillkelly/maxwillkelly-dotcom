import type { Metadata } from "next";
import { connection } from "next/server";

import About from "@/content/about.md";
import HowIWork from "@/content/how-i-work.md";

import { CvEducationSection } from "./_components/cv-education-section";
import { CvExperienceSection } from "./_components/cv-experience-section";
import { CvHero } from "./_components/cv-hero";
import { components } from "./_components/mdx-components";

import "./print.css";

export const metadata: Metadata = {
  title: "Max Kelly - CV",
  robots: { index: false, follow: false },
};

export default async function CvPrintPage() {
  // We want to generate CV's at runtime for current role durations
  await connection();

  return (
    // The renderer waits for this marker, then separately waits for fonts/images.
    <main className="cv-document" data-cv-ready>
      <CvHero />
      <section>
        <About components={components} />
        <HowIWork components={components} />
      </section>
      <CvExperienceSection />
      <CvEducationSection />
    </main>
  );
}
