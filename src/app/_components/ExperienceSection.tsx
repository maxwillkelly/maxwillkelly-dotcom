import { Link } from "@heroui/react";
import {
  Csharp,
  Docker,
  Dotnet,
  Firebase,
  Graphql,
  Javascript,
  MicrosoftSqlServer,
  Mongodb,
  Nodedotjs,
  React,
  Typescript,
  Vuedotjs,
} from "@thesvg/react";

import { Timeline, type TimelineEntry } from "./Timeline";

const experiences: TimelineEntry[] = [
  {
    title: "The Key Support Services",
    start: new Date(2022, 5, 28),
    content: (
      <>
        I work as a Software Engineer on{" "}
        <Link
          className="text-base no-underline hover:underline"
          href="https://governorhub.com/"
          rel="noopener noreferrer"
          target="_blank"
        >
          GovernorHub
          <Link.Icon />
        </Link>
        , the leading online service for school governors and trustees.
        <br />
        <br />I am responsible for reimplementing a number of features from a
        monolithic AngularJS codebase into React and gRPC microservices.
        <br />
        <br />
        I've also had the opportunity to onboard new developers into an
        expanding team and write developer specifications for new features.
      </>
    ),
    chips: [
      { label: "React", icon: <React width={12} /> },
      { label: "Next.js" },
      { label: "JavaScript", icon: <Javascript width={12} /> },
      { label: "TypeScript", icon: <Typescript width={12} /> },
      { label: "Node.js", icon: <Nodedotjs width={12} /> },
      { label: "gRPC" },
      { label: "GraphQL", icon: <Graphql width={12} /> },
      { label: "MongoDB", icon: <Mongodb height={12} /> },
      { label: "Firebase", icon: <Firebase width={12} /> },
      { label: "Docker", icon: <Docker width={12} /> },
    ],
  },
  {
    title: "Udrafter",
    start: new Date(2020, 8, 1),
    end: new Date(2021, 8, 1),
    content: (
      <>
        Initially, I worked as a React developer in tandem with a .NET developer
        on Udrafter's platform.
        <br />
        <br />
        I later transitioned into the role of a Fullstack engineer independently
        rewriting the messaging features in their platform.
        <br />
        <br />
        This involved creating a Vue.js front-end and a .NET Core messaging
        microservice. I then led the team that integrated this service into the
        main platform.
      </>
    ),
    chips: [
      { label: "JavaScript", icon: <Javascript width={12} /> },
      { label: "Vue.js", icon: <Vuedotjs width={12} /> },
      { label: ".NET Core", icon: <Dotnet width={12} /> },
      { label: "C#", icon: <Csharp width={12} /> },
      { label: "SQL Server", icon: <MicrosoftSqlServer width={12} /> },
      { label: "Docker", icon: <Docker width={12} /> },
    ],
  },
];

export const ExperienceSection = () => {
  return (
    <section id="experience">
      <h2 className="text-xl font-bold">Experience</h2>
      <Timeline entries={experiences} />
    </section>
  );
};
