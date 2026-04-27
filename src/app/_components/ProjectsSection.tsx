import { Chip } from "@heroui/react";
import { Expo, Nextdotjs, React, Typescript } from "@thesvg/react";

import { Timeline, type TimelineEntry } from "./Timeline";

const projects: TimelineEntry[] = [
  {
    title: "EV Charging Analyser",
    chips: [
      { label: "TypeScript", icon: <Typescript width={12} /> },
      { label: "React Native", icon: <React width={12} /> },
      { label: "Expo", icon: <Expo width={12} /> },
      { label: "Next.js", icon: <Nextdotjs width={12} /> },
    ],
    content: (
      <>
        EV Charging Analyser is a manufacturer agnostic companion app for
        electric vehicles (EVs). EV Charging Analyser uses Smartcar Connect
        which allows drivers to connect their EVs with ease using the login to
        their manufacturer's account. From there, users can perform basic tasks
        with their EV such as to lock or unlock the doors or see its location on
        their phone. We use this application to collect navigation and charging
        data for academic research.
        <br />
        <br />
        EV Charging Analyser is divided into two projects: the front-end mobile
        application ev-charging-analyser which uses React Native to compile
        binaries for iOS and Android (Android was the main development platform)
        and the back-end API ev-charging-analyser-api which uses NestJS. Each
        project has their own Github repository, deployment mechanisms, CI/CD
        tools and documentation.
        <br />
        <br />
        Regardless, both the front-end and the back-end projects use TypeScript
        as their programming language.
      </>
    ),
  },
];

export const ProjectsSection = () => {
  return (
    <section id="projects">
      <h2 className="text-xl font-bold">Projects</h2>
      <Timeline entries={projects} />
    </section>
  );
};
