"use client";

import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

// Peak scale: 1 means no enlargement; 1.2 means 20% larger.
const MAGNIFICATION = "[--magnification:1.2]";

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
      className={cn(
        MAGNIFICATION,
        "[--nearby-magnification:calc(1_+_(var(--magnification)_-_1)*16/35)]",
        "[--distant-magnification:calc(1_+_(var(--magnification)_-_1)*6/35)]",
        "fixed top-1/2 left-4 z-20 hidden max-h-[calc(100dvh-3rem)] w-56 -translate-y-1/2 overflow-y-auto px-1 py-2 xl:block print:hidden",
      )}
    >
      <ol>
        {sections.map(({ id, label }) => (
          <li
            key={id}
            className={cn(
              "motion-safe:[&:has(>a:is(:hover,:focus-visible))>a>span]:[transform:translateX(18px)_scale(var(--magnification))]",
              "motion-safe:[&:has(+li>a:is(:hover,:focus-visible))>a>span]:[transform:translateX(9px)_scale(var(--nearby-magnification))]",
              "motion-safe:[&:has(>a:is(:hover,:focus-visible))+li>a>span]:[transform:translateX(9px)_scale(var(--nearby-magnification))]",
              "motion-safe:[&:has(+li+li>a:is(:hover,:focus-visible))>a>span]:[transform:translateX(3px)_scale(var(--distant-magnification))]",
              "motion-safe:[&:has(>a:is(:hover,:focus-visible))+li+li>a>span]:[transform:translateX(3px)_scale(var(--distant-magnification))]",
            )}
          >
            <a
              href={`#${id}`}
              aria-current={id === activeSectionId ? "location" : undefined}
              className="group flex min-h-11 items-center rounded-sm px-1 text-sm text-muted transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus aria-[current=location]:font-semibold aria-[current=location]:text-accent motion-reduce:transition-none"
            >
              <span className="inline-flex origin-left items-center gap-4 motion-safe:transition-transform motion-safe:duration-240 motion-safe:ease-[cubic-bezier(0.22,1,0.36,1)]">
                <span
                  aria-hidden="true"
                  className="h-[0.5px] w-10 shrink-0 rounded-full bg-muted transition-colors group-hover:bg-foreground group-aria-[current=location]:bg-accent motion-reduce:transition-none"
                />
                {label}
              </span>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
};
