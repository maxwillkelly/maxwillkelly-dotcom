"use client";

import { useEffect, useState } from "react";

const sections = [
  { id: "hero", label: "Introduction" },
  { id: "about", label: "About" },
  { id: "ai", label: "How I work" },
  { id: "experience", label: "Experience" },
  { id: "education", label: "Education" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];

export const SectionNavigation = () => {
  const [activeSectionId, setActiveSectionId] = useState("hero");

  useEffect(() => {
    const root = document.getElementById("portfolio-scroll");

    if (!root) {
      return;
    }

    const elements = sections.flatMap(({ id }) => {
      const element = document.getElementById(id);

      return element ? [element] : [];
    });
    let frame: number | null = null;

    const updateActiveSection = () => {
      frame = null;
      // Read just below the 6rem anchor offset, allowing for entrance motion.
      const readingLine = root.getBoundingClientRect().top + 120;
      const currentSection = elements.findLast(
        (element) => element.getBoundingClientRect().top <= readingLine,
      );
      const isAtBottom =
        root.scrollTop + root.clientHeight >= root.scrollHeight - 1;

      setActiveSectionId(isAtBottom ? "contact" : currentSection?.id || "hero");
    };

    const scheduleUpdate = () => {
      if (frame !== null) {
        return;
      }

      frame = requestAnimationFrame(updateActiveSection);
    };

    scheduleUpdate();
    root.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);

    // Recheck after fonts, content or the scroll container change size.
    const resizeObserver = new ResizeObserver(scheduleUpdate);
    resizeObserver.observe(root);
    elements.forEach((element) => resizeObserver.observe(element));

    return () => {
      root.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      resizeObserver.disconnect();

      if (frame !== null) {
        cancelAnimationFrame(frame);
      }
    };
  }, []);

  return (
    <nav
      aria-label="Page sections"
      className="fixed top-1/2 left-[calc((100vw-48rem)/2-12rem)] z-20 hidden max-h-[calc(100dvh-3rem)] w-40 -translate-y-1/2 overflow-y-auto xl:block print:hidden"
    >
      <p className="mb-4 pl-4 text-xs font-medium tracking-widest text-muted uppercase">
        On this page
      </p>
      <ol>
        {sections.map(({ id, label }) => (
          <li key={id}>
            <a
              href={`#${id}`}
              aria-current={id === activeSectionId ? "location" : undefined}
              className="group flex min-h-11 items-center gap-4 rounded-sm px-1 text-sm text-muted transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus aria-[current=location]:font-semibold aria-[current=location]:text-accent motion-reduce:transition-none"
            >
              <span
                aria-hidden="true"
                className="h-0.5 w-6 shrink-0 rounded-full bg-border transition-colors group-hover:bg-muted group-aria-[current=location]:bg-accent motion-reduce:transition-none"
              />
              {label}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
};
