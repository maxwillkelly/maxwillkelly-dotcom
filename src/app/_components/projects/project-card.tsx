"use client";

import { cn, useOverlayState } from "@heroui/react";
import { ArrowUpRight } from "lucide-react";
import { motion } from "motion/react";
import { ProjectModal } from "./card/project-modal";
import type { Project } from "./shared/type";

export const ProjectCard = ({ project }: { project: Project }) => {
  const { isOpen, open, close } = useOverlayState();

  return (
    <>
      <motion.button
        type="button"
        initial="rest"
        animate="rest"
        whileHover="hover"
        whileFocus="hover"
        whileTap={{ scale: 0.99 }}
        variants={{
          rest: { y: 0, scale: 1 },
          hover: { y: -4, scale: 1.01 },
        }}
        transition={{ type: "spring", stiffness: 280, damping: 22 }}
        aria-label={`Open details for ${project.title}`}
        className={cn(
          "group relative flex flex-col items-stretch gap-4 overflow-hidden rounded-3xl border border-accent-foreground p-5 text-left transition-colors duration-300 hover:border-accent/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
          project.colSpan,
        )}
        onClick={open}
      >
        {/* Overlay for hover effect */}
        <span className="pointer-events-none absolute inset-0 -z-10 bg-linear-to-br from-accent/0 via-transparent to-accent/0 opacity-0 transition-opacity duration-500 group-hover:from-accent/10 group-hover:to-accent/5 group-hover:opacity-100" />
        <span className="pointer-events-none absolute -top-24 -right-24 -z-10 h-48 w-48 rounded-full bg-accent-soft opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />
        <div className="flex items-start justify-between gap-3">
          {/* Icon */}
          <motion.span
            variants={{
              rest: { rotate: 0, scale: 1 },
              hover: { rotate: -8, scale: 1.08 },
            }}
            transition={{ type: "spring", stiffness: 320, damping: 16 }}
            className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-accent-soft text-accent-soft-foreground"
          >
            {project.icon}
          </motion.span>
          {/* Arrow in top right corner */}
          <motion.span
            variants={{
              rest: { x: 0, y: 0, opacity: 0.55 },
              hover: { x: 4, y: -4, opacity: 1 },
            }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="text-muted"
            aria-hidden="true"
          >
            <ArrowUpRight className="size-5" />
          </motion.span>
        </div>
        <div className="flex flex-col gap-2">
          <h3 className="text-lg text-foreground font-bold">{project.title}</h3>
          <p className="text-sm leading-relaxed text-muted">
            {project.summary}
          </p>
        </div>
      </motion.button>
      <ProjectModal isOpen={isOpen} close={close} project={project} />
    </>
  );
};
