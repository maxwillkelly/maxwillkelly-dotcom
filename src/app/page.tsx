import { BlurFade } from "@/components/ui/blur-fade";
import { AboutSection } from "./_components/AboutSection";
import { ContactSection } from "./_components/ContactSection";
import { EducationSection } from "./_components/EducationSection";
import { ExperienceSection } from "./_components/ExperienceSection";
import { HeroSection } from "./_components/HeroSection";
import { ProjectsSection } from "./_components/ProjectsSection";
import { ValuesSection } from "./_components/ValuesSection";

const HomePage = () => {
  return (
    <main className="flex flex-col space-y-12">
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
