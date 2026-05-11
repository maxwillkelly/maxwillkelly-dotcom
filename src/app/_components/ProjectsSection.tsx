import { Link } from "@heroui/react";
import { Expo, React, Typescript } from "@thesvg/react";

import { Timeline, type TimelineEntry } from "./Timeline";

const projects: TimelineEntry[] = [
  {
    title: "EV Charging Analyser",
    chips: [
      { label: "TypeScript", icon: <Typescript width={12} /> },
      { label: "React Native", icon: <React width={12} /> },
      { label: "Expo", icon: <Expo width={12} /> },
      { label: "Next.js" },
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
        application which uses React Native to compile binaries for iOS and
        Android (Android was the main development platform) and the back-end API
        which uses NestJS. Each project has its own GitHub repository,
        deployment mechanisms, CI/CD tools and documentation.
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
