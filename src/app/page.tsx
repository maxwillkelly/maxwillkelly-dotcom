import { BlurFade } from "@/components/ui/blur-fade";
import { personJsonLd } from "@/lib/site";
import { AboutSection } from "./_components/about-section";
import { ContactSection } from "./_components/contact-section";
import { EducationSection } from "./_components/education-section";
import { ExperienceSection } from "./_components/experience-section";
import { HeroSection } from "./_components/hero-section";
import { ProjectsSection } from "./_components/projects-section";
import { ValuesSection } from "./_components/values-section";

const HomePage = () => {
  return (
    <main className="flex flex-col space-y-12">
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: Structured data must be emitted as JSON-LD.
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(personJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <HeroSection />
      <BlurFade delay={0.6}>
        <div className="flex flex-col space-y-12">
          <AboutSection />
          <ValuesSection />
          <ExperienceSection />
          <EducationSection />
          <ProjectsSection />
          <ContactSection />
        </div>
      </BlurFade>
    </main>
  );
};

export default HomePage;
