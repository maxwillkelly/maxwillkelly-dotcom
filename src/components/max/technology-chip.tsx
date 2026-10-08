import {
  C,
  Cplusplus,
  Csharp,
  Docker,
  Dotnet,
  Electron,
  Expo,
  Express,
  Firebase,
  Graphql,
  Java,
  Javascript,
  MicrosoftSqlServer,
  Mongodb,
  Nestjs,
  Nodedotjs,
  React,
  Typescript,
  Vuedotjs,
} from "@thesvg/react";

import { LinkableChip } from "@/components/ui/linkable-chip";

export const technologyIds = [
  "c",
  "cplusplus",
  "csharp",
  "docker",
  "dotnet",
  "dotnet-core",
  "electron",
  "expo",
  "express",
  "firebase",
  "graphql",
  "grpc",
  "java",
  "javascript",
  "mongodb",
  "nestjs",
  "nextjs",
  "nodejs",
  "react",
  "react-native",
  "sql-server",
  "typescript",
  "vuejs",
] as const;

type TechnologyId = (typeof technologyIds)[number];

type Props = {
  technology: TechnologyId;
};

// fallow-ignore-next-line complexity -- Each technology has one independent rendering case.
export const TechnologyChip = ({ technology }: Props) => {
  switch (technology) {
    case "c":
      return <LinkableChip label="C" icon={<C width={12} />} />;
    case "cplusplus":
      return <LinkableChip label="C++" icon={<Cplusplus width={12} />} />;
    case "csharp":
      return (
        <LinkableChip
          label="C#"
          icon={<Csharp width={12} />}
          href="https://learn.microsoft.com/en-us/dotnet/csharp/"
        />
      );
    case "docker":
      return (
        <LinkableChip
          label="Docker"
          icon={<Docker width={12} />}
          href="https://www.docker.com/"
        />
      );
    case "dotnet":
      return (
        <LinkableChip
          label=".NET"
          icon={<Dotnet width={12} />}
          href="https://dotnet.microsoft.com/"
        />
      );
    case "dotnet-core":
      return (
        <LinkableChip
          label=".NET Core"
          icon={<Dotnet width={12} />}
          href="https://dotnet.microsoft.com/"
        />
      );
    case "electron":
      return (
        <LinkableChip
          label="Electron"
          icon={<Electron width={12} />}
          href="https://www.electronjs.org/"
        />
      );
    case "expo":
      return (
        <LinkableChip
          label="Expo"
          icon={<Expo width={12} />}
          href="https://expo.dev/"
        />
      );
    case "express":
      return (
        <LinkableChip
          label="Express"
          icon={<Express width={12} />}
          href="https://expressjs.com/"
        />
      );
    case "firebase":
      return (
        <LinkableChip
          label="Firebase"
          icon={<Firebase width={12} />}
          href="https://firebase.google.com/"
        />
      );
    case "graphql":
      return (
        <LinkableChip
          label="GraphQL"
          icon={<Graphql width={12} />}
          href="https://graphql.org/"
        />
      );
    case "grpc":
      return <LinkableChip label="gRPC" href="https://grpc.io/" />;
    case "java":
      return (
        <LinkableChip
          label="Java"
          icon={<Java width={12} />}
          href="https://www.java.com/"
        />
      );
    case "javascript":
      return (
        <LinkableChip label="JavaScript" icon={<Javascript width={12} />} />
      );
    case "mongodb":
      return (
        <LinkableChip
          label="MongoDB"
          icon={<Mongodb height={12} />}
          href="https://www.mongodb.com/"
        />
      );
    case "nestjs":
      return (
        <LinkableChip
          label="NestJS"
          icon={<Nestjs width={12} />}
          href="https://nestjs.com/"
        />
      );
    case "nextjs":
      return <LinkableChip label="Next.js" href="https://nextjs.org/" />;
    case "nodejs":
      return (
        <LinkableChip
          label="Node.js"
          icon={<Nodedotjs width={12} />}
          href="https://nodejs.org/"
        />
      );
    case "react":
      return (
        <LinkableChip
          label="React"
          icon={<React width={12} />}
          href="https://react.dev/"
        />
      );
    case "react-native":
      return (
        <LinkableChip
          label="React Native"
          icon={<React width={12} />}
          href="https://reactnative.dev/"
        />
      );
    case "sql-server":
      return (
        <LinkableChip
          label="SQL Server"
          icon={<MicrosoftSqlServer width={12} />}
          href="https://www.microsoft.com/en-us/sql-server"
        />
      );
    case "typescript":
      return (
        <LinkableChip
          label="TypeScript"
          icon={<Typescript width={12} />}
          href="https://www.typescriptlang.org/"
        />
      );
    case "vuejs":
      return (
        <LinkableChip
          label="Vue.js"
          icon={<Vuedotjs width={12} />}
          href="https://vuejs.org/"
        />
      );
  }
};
