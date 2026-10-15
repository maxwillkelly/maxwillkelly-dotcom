import type { Metadata } from "next";
import { connection } from "next/server";

import About from "@/content/about.md";
import HowIWork from "@/content/how-i-work.md";
import { loadTimeline } from "@/lib/timeline";

import { CvHero } from "./_components/cv-hero";
import { CvTimeline } from "./_components/cv-timeline";
import { components } from "./_components/mdx-components";

import "./print.css";

export const metadata: Metadata = {
  title: "CV",
  robots: { index: false, follow: false },
};

export default async function CvPrintPage() {
  // Current-role durations must use the download date, not the build date.
  await connection();
  const [experience, education] = await Promise.all([
    loadTimeline("experience"),
    loadTimeline("education"),
  ]);

  return (
    // The renderer waits for this marker, then separately waits for fonts/images.
    <main className="cv-document" data-cv-document data-cv-ready>
      <CvHero />
      <section>
        <About components={components} />
        <HowIWork components={components} />
      </section>
      <CvTimeline entries={experience} title="Experience" />
      <CvTimeline entries={education} title="Education" />
    </main>
  );
}
