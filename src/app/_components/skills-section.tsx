import SkillsContent from "@/content/skills.md";

export const SkillsSection = () => (
  <section
    id="skills"
    className="flex flex-col gap-4 [&_ul]:list-disc [&_ul]:space-y-4 [&_ul]:pl-5"
  >
    <SkillsContent />
  </section>
);
