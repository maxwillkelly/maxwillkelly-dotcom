import ProfileContent from "@/content/profile.md";

export const AboutSection = () => {
  return (
    <section id="about">
      <h2 className="text-xl font-bold">About</h2>
      <div className="mt-4 flex flex-col gap-4">
        <ProfileContent />
      </div>
    </section>
  );
};
