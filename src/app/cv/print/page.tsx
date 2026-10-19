import type { Metadata } from "next";
import { connection } from "next/server";

import About from "@/content/about.md";
import HowIWork from "@/content/how-i-work.md";

import { components } from "./_components/mdx-components";
import { PrintEducationSection } from "./_components/print-education-section";
import { PrintExperienceSection } from "./_components/print-experience-section";
import { PrintHero } from "./_components/print-hero";

import "./print.css";

export const metadata: Metadata = {
  title: "Max Kelly - CV",
  robots: { index: false, follow: false },
};

export default async function PrintPage() {
  // Render per request so current-role durations stay up to date.
  await connection();

  // oxlint-disable-next-line react/purity -- Server-only, after connection(): one date per document.
  const referenceDate = new Date();

  return (
    <main
      data-print-document
      className="text-[10pt] leading-[1.4] print:[print-color-adjust:exact]"
    >
      <PrintHero />
      <section>
        <About components={components} />
        <HowIWork components={components} />
      </section>
      <PrintExperienceSection referenceDate={referenceDate} />
      <PrintEducationSection referenceDate={referenceDate} />
    </main>
  );
}
