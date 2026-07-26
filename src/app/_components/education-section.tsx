import { Link } from "@heroui/react";
import {
  C,
  Cplusplus,
  Csharp,
  Docker,
  Dotnet,
  Electron,
  Expo,
  Express,
  Graphql,
  Java,
  Javascript,
  Nestjs,
  Nodedotjs,
  React,
  Typescript,
} from "@thesvg/react";

import { Timeline, type TimelineEntry } from "./timeline";

const education: TimelineEntry[] = [
  {
    company: "University of Dundee",
    start: new Date(2018, 8, 1),
    end: new Date(2022, 8, 1),
    content: (
      <p>
        I attended the{" "}
        <Link
          className="text-base no-underline hover:underline"
          href="https://www.dundee.ac.uk/"
          rel="noopener noreferrer"
          target="_blank"
        >
          University of Dundee
          <Link.Icon />
        </Link>{" "}
        from 2018 to 2022 and graduated with a First Class Honours degree in{" "}
        <Link
          className="text-base no-underline hover:underline"
          href="https://www.dundee.ac.uk/undergraduate/computer-science"
          rel="noopener noreferrer"
          target="_blank"
        >
          Computing Science
          <Link.Icon />
        </Link>
        .
        <br />
        <br />
        Unlike other computing degrees which place a great deal of emphasis on
        the theoretical mathematics underpinning computing, my course was
        centered around learning practical skills for the workplace.
        <br />
        <br />
        Most of our course was spent doing projects which were completed in
        teams, and we were encouraged to collaborate and learn a variety of
        different programming languages and skills.
        <br />
        <br />I was also active in the Dundee University Computing Society
        (DUCS) and served as Treasurer for 2021-22. I helped hold the first
        in-person society events, shortly after the UK had just emerged from the
        final Coronavirus lockdown. During my time on the committee, we held
        many successful events such as a Hackathon (sponsored by{" "}
        <Link
          className="text-base no-underline hover:underline"
          href="https://www.blackrock.com/"
          rel="noopener noreferrer"
          target="_blank"
        >
          BlackRock
          <Link.Icon />
        </Link>{" "}
        and{" "}
        <Link
          className="text-base no-underline hover:underline"
          href="https://unity.com/"
          rel="noopener noreferrer"
          target="_blank"
        >
          Unity
          <Link.Icon />
        </Link>
        ) and a Ceilidh.
      </p>
    ),
    chips: [
      { label: "JavaScript", icon: <Javascript width={12} /> },
      {
        label: "TypeScript",
        icon: <Typescript width={12} />,
        href: "https://www.typescriptlang.org/",
      },
      {
        label: "React",
        icon: <React width={12} />,
        href: "https://react.dev/",
      },
      {
        label: "C#",
        icon: <Csharp width={12} />,
        href: "https://learn.microsoft.com/en-us/dotnet/csharp/",
      },
      {
        label: ".NET",
        icon: <Dotnet width={12} />,
        href: "https://dotnet.microsoft.com/",
      },
      {
        label: "Node.js",
        icon: <Nodedotjs width={12} />,
        href: "https://nodejs.org/",
      },
      {
        label: "Express",
        icon: <Express width={12} />,
        href: "https://expressjs.com/",
      },
      {
        label: "NestJS",
        icon: <Nestjs width={12} />,
        href: "https://nestjs.com/",
      },
      {
        label: "GraphQL",
        icon: <Graphql width={12} />,
        href: "https://graphql.org/",
      },
      {
        label: "Docker",
        icon: <Docker width={12} />,
        href: "https://www.docker.com/",
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
      {
        label: "Electron",
        icon: <Electron width={12} />,
        href: "https://www.electronjs.org/",
      },
      { label: "C", icon: <C width={12} /> },
      { label: "C++", icon: <Cplusplus width={12} /> },
      {
        label: "Java",
        icon: <Java width={12} />,
        href: "https://www.java.com/",
      },
    ],
  },
];

export const EducationSection = () => {
  return (
    <section id="education">
      <h2 className="text-xl font-bold">Education</h2>
      <Timeline entries={education} />
    </section>
  );
};
