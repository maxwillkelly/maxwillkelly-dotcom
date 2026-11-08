"use client";

import { Scrollspy } from "@makotot/ghostui";
import { type RefObject, useEffect, useState } from "react";

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
  const [sectionRefs, setSectionRefs] = useState<RefObject<Element>[]>([]);

  useEffect(() => {
    // The server-rendered section elements are only available after mounting.
    // oxlint-disable-next-line react/set-state-in-effect -- Synchronise Scrollspy with the existing DOM sections.
    setSectionRefs(
      sections.flatMap(({ id }) => {
        const element = document.getElementById(id);

        return element ? [{ current: element }] : [];
      }),
    );
  }, []);

  return (
    <nav
      aria-label="Page sections"
      className="fixed top-1/2 left-[calc((100vw-48rem)/2-12rem)] z-20 hidden max-h-[calc(100dvh-3rem)] w-40 -translate-y-1/2 overflow-y-auto xl:block print:hidden"
    >
      <p className="mb-4 pl-4 text-xs font-medium tracking-widest text-muted uppercase">
        On this page
      </p>
      <Scrollspy
        sectionRefs={sectionRefs}
        rootSelector="#portfolio-scroll"
        offset={-96}
      >
        {({ currentElementIndexInViewport }) => (
          <ol>
            {sections.map(({ id, label }, index) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  aria-current={
                    index === Math.max(0, currentElementIndexInViewport)
                      ? "location"
                      : undefined
                  }
                  className="group flex min-h-11 items-center gap-4 rounded-sm px-1 text-sm text-muted transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus aria-[current=location]:font-semibold aria-[current=location]:text-accent motion-reduce:transition-none"
                >
                  <span
                    aria-hidden="true"
                    className="h-6 w-0.5 shrink-0 rounded-full bg-border transition-colors group-hover:bg-muted group-aria-[current=location]:bg-accent motion-reduce:transition-none"
                  />
                  {label}
                </a>
              </li>
            ))}
          </ol>
        )}
      </Scrollspy>
    </nav>
  );
};
