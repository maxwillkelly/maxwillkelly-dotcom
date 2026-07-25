import ProjectsContent from "@/content/projects.mdx";

export const ProjectsSection = () => {
  return (
    <section id="projects">
      <h2 className="text-xl font-bold">Projects</h2>
      <div className="mt-4 grid auto-rows-fr grid-cols-1 gap-4 sm:grid-cols-2">
        <ProjectsContent />
      </div>
    </section>
  );
};
