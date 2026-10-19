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
      className="text-[10pt] leading-[1.4] print:[print-color-adjust:exact] [&_h1]:text-[27pt] [&_h1]:font-bold [&_h1]:leading-[1.1] [&_h1]:mb-[3mm] [&_h2]:text-[15pt] [&_h2]:font-bold [&_h2]:border-b [&_h2]:border-[#ccc] [&_h2]:pb-[1.5mm] [&_h2]:mt-[6mm] [&_h2]:mb-[3mm] [&_h3]:text-[11.5pt] [&_h3]:font-bold [&_p]:mb-[2.5mm] [&_p]:[orphans:3] [&_p]:[widows:3] [&_a]:text-inherit [&_a]:underline [&_a]:underline-offset-2 [&_a]:[overflow-wrap:anywhere] [&_ul]:list-disc [&_ul]:pl-[5mm] [&_ul]:mb-[3mm] [&_article]:mb-[4mm] [&_h2]:break-after-avoid [&_h2]:break-inside-avoid [&_h3]:break-after-avoid [&_h3]:break-inside-avoid [&_article>header]:break-after-avoid [&_article>header]:break-inside-avoid"
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
