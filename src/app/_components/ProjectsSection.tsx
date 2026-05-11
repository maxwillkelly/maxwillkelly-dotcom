import { Link } from "@heroui/react";
import { Expo, React, Typescript } from "@thesvg/react";
import { Zap } from "lucide-react";

import { ProjectCard } from "./projects/ProjectCard";
import type { Project } from "./projects/shared/type";

const projects: Project[] = [
  {
    title: "EV Charging Analyser",
    summary:
      "A manufacturer-agnostic companion app for electric vehicles. Drivers can perform actions such unlocking their car, see its location and contribute charging data to academic research.",
    icon: <Zap className="size-5" />,
    href: "https://github.com/maxwillkelly/ev-charging-analyser/wiki",
    hrefLabel: "View on GitHub",
    colSpan: "sm:col-span-2",
    chips: [
      {
        label: "TypeScript",
        icon: <Typescript width={12} />,
        href: "https://www.typescriptlang.org/",
      },
      {
        label: "React Native",
        icon: <React width={12} />,
        href: "https://reactnative.dev/",
      },
      {
        label: "Expo",
        icon: <Expo width={12} />,
        href: "https://expo.dev/",
      },
      { label: "Next.js", href: "https://nextjs.org/" },
    ],
    content: (
      <>
        <Link
          className="text-base no-underline hover:underline"
          href="https://github.com/maxwillkelly/ev-charging-analyser/wiki"
          rel="noopener noreferrer"
          target="_blank"
        >
          EV Charging Analyser
          <Link.Icon />
        </Link>{" "}
        is a manufacturer agnostic companion app for electric vehicles (EVs). EV
        Charging Analyser uses{" "}
        <Link
          className="text-base no-underline hover:underline"
          href="https://smartcar.com/product/connect"
          rel="noopener noreferrer"
          target="_blank"
        >
          Smartcar Connect
          <Link.Icon />
        </Link>{" "}
        which allows drivers to connect their EVs with ease using the login to
        their manufacturer's account. From there, users can perform basic tasks
        with their EV such as to lock or unlock the doors or see its location on
        their phone. We use this application to collect navigation and charging
        data for academic research.
        <br />
        <br />
        EV Charging Analyser is divided into two projects: the front-end mobile
        application which uses{" "}
        <Link
          className="text-base no-underline hover:underline"
          href="https://reactnative.dev/"
          rel="noopener noreferrer"
          target="_blank"
        >
          React Native
          <Link.Icon />
        </Link>{" "}
        to compile binaries for iOS and Android (Android was the main
        development platform) and the back-end API which uses{" "}
        <Link
          className="text-base no-underline hover:underline"
          href="https://nestjs.com/"
          rel="noopener noreferrer"
          target="_blank"
        >
          NestJS
          <Link.Icon />
        </Link>
        . Each project has its own GitHub repository, deployment mechanisms,
        CI/CD tools and documentation.
      </>
    ),
  },
];

export const ProjectsSection = () => {
  return (
    <section id="projects">
      <h2 className="text-xl font-bold">Projects</h2>
      <div className="mt-4 grid auto-rows-fr grid-cols-1 gap-4 sm:grid-cols-2">
        {projects.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </div>
    </section>
  );
};
