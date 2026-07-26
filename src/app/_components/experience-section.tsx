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

import { Timeline, type TimelineEntry } from "./timeline";

const experiences: TimelineEntry[] = [
  {
    company: "The Key Group",
    position: "Software Engineer",
    type: "Full-time",
    location: "Bristol",
    start: new Date(2022, 5, 28),
    description: (
      <p className="text-base leading-6">
        <Link
          className="text-base no-underline hover:underline"
          href="https://thekeygroup.com/"
          rel="noopener noreferrer"
          target="_blank"
        >
          The Key Group
          <Link.Icon />
        </Link>{" "}
        (trades as The Key Support Services Ltd) is a company that serves 20,000
        British state schools, including around 80% of schools in England. It
        sells SaaS cloud-based products and resources for training and guidance.
        Most of its products are market leading in the sector they operate in.
      </p>
    ),
    content: (
      <p>
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
        <br />I have become the most senior developer on the team. In addition
        to building software, I've had the opportunity to onboard and train new
        engineers. I work with product managers and other stakeholders to write
        technical specifications and gather requirements.
        <br />
        <br />
        My colleagues and I were responsible for a complete ground up rewrite of
        GovernorHub's front-end. At the time I joined, GovernorHub was a legacy{" "}
        <Link
          className="text-base no-underline hover:underline"
          href="https://angularjs.org/"
          rel="noopener noreferrer"
          target="_blank"
        >
          AngularJS
          <Link.Icon />
        </Link>{" "}
        codebase with{" "}
        <Link
          className="text-base no-underline hover:underline"
          href="https://react.dev/"
          rel="noopener noreferrer"
          target="_blank"
        >
          React
          <Link.Icon />
        </Link>{" "}
        injected into it for specific components. We completely rearchitected it
        using the{" "}
        <Link
          className="text-base no-underline hover:underline"
          href="https://nextjs.org/"
          rel="noopener noreferrer"
          target="_blank"
        >
          Next.js
          <Link.Icon />
        </Link>{" "}
        App router which produced a much better user experience. I was
        responsible for reimplementing many significant features in{" "}
        <Link
          className="text-base no-underline hover:underline"
          href="https://react.dev/"
          rel="noopener noreferrer"
          target="_blank"
        >
          React
          <Link.Icon />
        </Link>
        .
        <br />
        <br />I built processes to triage bugs from customer feedback in{" "}
        <Link
          className="text-base no-underline hover:underline"
          href="https://www.intercom.com/"
          rel="noopener noreferrer"
          target="_blank"
        >
          Intercom
          <Link.Icon />
        </Link>{" "}
        and convert them into issues in Linear. I've worked on integrations with
        products maintained by other teams internally and externally such as{" "}
        <Link
          className="text-base no-underline hover:underline"
          href="https://www.salesforce.com/"
          rel="noopener noreferrer"
          target="_blank"
        >
          Salesforce
          <Link.Icon />
        </Link>{" "}
        and{" "}
        <Link
          className="text-base no-underline hover:underline"
          href="https://get-information-schools.service.gov.uk/"
          rel="noopener noreferrer"
          target="_blank"
        >
          Get Information About Schools (GIAS)
          <Link.Icon />
        </Link>
        .
        <br />
        <br />
        I've also had the opportunity to onboard new developers into an
        expanding team and write developer specifications for new features.
      </p>
    ),
    chips: [
      {
        label: "React",
        icon: <React width={12} />,
        href: "https://react.dev/",
      },
      { label: "Next.js", href: "https://nextjs.org/" },
      { label: "JavaScript", icon: <Javascript width={12} /> },
      {
        label: "TypeScript",
        icon: <Typescript width={12} />,
        href: "https://www.typescriptlang.org/",
      },
      {
        label: "Node.js",
        icon: <Nodedotjs width={12} />,
        href: "https://nodejs.org/",
      },
      { label: "gRPC", href: "https://grpc.io/" },
      {
        label: "GraphQL",
        icon: <Graphql width={12} />,
        href: "https://graphql.org/",
      },
      {
        label: "MongoDB",
        icon: <Mongodb height={12} />,
        href: "https://www.mongodb.com/",
      },
      {
        label: "Firebase",
        icon: <Firebase width={12} />,
        href: "https://firebase.google.com/",
      },
      {
        label: "Docker",
        icon: <Docker width={12} />,
        href: "https://www.docker.com/",
      },
    ],
  },
  {
    company: "Udrafter",
    position: "Software Developer",
    type: "Part-time",
    location: "Remote",
    start: new Date(2020, 8, 1),
    end: new Date(2021, 8, 1),
    description: (
      <p className="text-base leading-6">
        Udrafter was a startup that recruited students for micro-internships. It
        connected businesses with students for short, paid projects that were
        relevant to the field they had studied. The students would gain
        practical experience and businesses could get low-risk access to early
        career talent.
      </p>
    ),
    content: (
      <p>
        Initially, I worked as a React developer in tandem with a .NET developer
        on Udrafter's platform.
        <br />
        <br />I later transitioned into the role of a Fullstack engineer
        independently rewriting the messaging features in their platform.
        <br />
        <br />
        This involved creating a{" "}
        <Link
          className="text-base no-underline hover:underline"
          href="https://vuejs.org/"
          rel="noopener noreferrer"
          target="_blank"
        >
          Vue.js
          <Link.Icon />
        </Link>{" "}
        front-end and a .NET Core messaging microservice. I then led the team
        that integrated this service into the main platform.
      </p>
    ),
    chips: [
      { label: "JavaScript", icon: <Javascript width={12} /> },
      {
        label: "Vue.js",
        icon: <Vuedotjs width={12} />,
        href: "https://vuejs.org/",
      },
      {
        label: ".NET Core",
        icon: <Dotnet width={12} />,
        href: "https://dotnet.microsoft.com/",
      },
      {
        label: "C#",
        icon: <Csharp width={12} />,
        href: "https://learn.microsoft.com/en-us/dotnet/csharp/",
      },
      {
        label: "SQL Server",
        icon: <MicrosoftSqlServer width={12} />,
        href: "https://www.microsoft.com/en-us/sql-server",
      },
      {
        label: "Docker",
        icon: <Docker width={12} />,
        href: "https://www.docker.com/",
      },
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
