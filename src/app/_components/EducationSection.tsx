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
  Mui,
  Mysql,
  Nestjs,
  Nodedotjs,
  Postgresql,
  Python,
  React,
  Scala,
  TailwindCss,
  Typescript,
} from "@thesvg/react";

import { Timeline, type TimelineEntry } from "./Timeline";

const education: TimelineEntry[] = [
  {
    title: "University of Dundee",
    start: new Date(2018, 8, 1),
    end: new Date(2022, 8, 1),
    content: (
      <>
        I attended the University of Dundee from 2018 to 2022 and graduated with
        a First Class Honours degree in Computing Science.
        <br />
        <br />
        Unlike other computing degrees which place a great deal of emphasis on
        the theoretical mathematics underpinning computing, my course was
        centered around learning practical skills for the workplace.
        <br />
        <br />
        Most of our course was spend doing projects which were completed in
        teams, and we were encouraged to collabrate and learn a variety of
        different programming languages and skills.
        <br />
        <br />I was also active in the Dundee University Computing Society
        (DUCS) and served as Treasurer for 2021-22. I helped hold the first
        in-person society events, shortly after the UK had just emerged from the
        final Coronavirus lockdown. During my time on the committee, we held
        many successful events such as a Hackathon (sponsored by BlackRock and
        Unity) and a Ceildh.
      </>
    ),
    chips: [
      { label: "JavaScript", icon: <Javascript width={12} /> },
      { label: "TypeScript", icon: <Typescript width={12} /> },
      { label: "React", icon: <React width={12} /> },
      { label: "C#", icon: <Csharp width={12} /> },
      { label: ".NET", icon: <Dotnet width={12} /> },
      { label: "Node.js", icon: <Nodedotjs width={12} /> },
      { label: "Express", icon: <Express width={12} /> },
      { label: "NestJS", icon: <Nestjs width={12} /> },
      { label: "GraphQL", icon: <Graphql width={12} /> },
      { label: "Docker", icon: <Docker width={12} /> },
      { label: "React Native", icon: <React width={12} /> },
      { label: "Expo", icon: <Expo width={12} /> },
      { label: "Electron", icon: <Electron width={12} /> },
      { label: "C", icon: <C width={12} /> },
      { label: "C++", icon: <Cplusplus width={12} /> },
      { label: "Java", icon: <Java width={12} /> },
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
