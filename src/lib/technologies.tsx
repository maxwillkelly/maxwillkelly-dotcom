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

import type { TimelineChip } from "@/app/_components/timeline";

export const technologies = {
  c: {
    label: "C",
    icon: <C width={12} />,
  },
  cplusplus: {
    label: "C++",
    icon: <Cplusplus width={12} />,
  },
  csharp: {
    label: "C#",
    icon: <Csharp width={12} />,
    href: "https://learn.microsoft.com/en-us/dotnet/csharp/",
  },
  docker: {
    label: "Docker",
    icon: <Docker width={12} />,
    href: "https://www.docker.com/",
  },
  dotnet: {
    label: ".NET",
    icon: <Dotnet width={12} />,
    href: "https://dotnet.microsoft.com/",
  },
  "dotnet-core": {
    label: ".NET Core",
    icon: <Dotnet width={12} />,
    href: "https://dotnet.microsoft.com/",
  },
  electron: {
    label: "Electron",
    icon: <Electron width={12} />,
    href: "https://www.electronjs.org/",
  },
  expo: {
    label: "Expo",
    icon: <Expo width={12} />,
    href: "https://expo.dev/",
  },
  express: {
    label: "Express",
    icon: <Express width={12} />,
    href: "https://expressjs.com/",
  },
  firebase: {
    label: "Firebase",
    icon: <Firebase width={12} />,
    href: "https://firebase.google.com/",
  },
  graphql: {
    label: "GraphQL",
    icon: <Graphql width={12} />,
    href: "https://graphql.org/",
  },
  grpc: {
    label: "gRPC",
    href: "https://grpc.io/",
  },
  java: {
    label: "Java",
    icon: <Java width={12} />,
    href: "https://www.java.com/",
  },
  javascript: {
    label: "JavaScript",
    icon: <Javascript width={12} />,
  },
  mongodb: {
    label: "MongoDB",
    icon: <Mongodb height={12} />,
    href: "https://www.mongodb.com/",
  },
  nestjs: {
    label: "NestJS",
    icon: <Nestjs width={12} />,
    href: "https://nestjs.com/",
  },
  nextjs: {
    label: "Next.js",
    href: "https://nextjs.org/",
  },
  nodejs: {
    label: "Node.js",
    icon: <Nodedotjs width={12} />,
    href: "https://nodejs.org/",
  },
  react: {
    label: "React",
    icon: <React width={12} />,
    href: "https://react.dev/",
  },
  "react-native": {
    label: "React Native",
    icon: <React width={12} />,
    href: "https://reactnative.dev/",
  },
  "sql-server": {
    label: "SQL Server",
    icon: <MicrosoftSqlServer width={12} />,
    href: "https://www.microsoft.com/en-us/sql-server",
  },
  typescript: {
    label: "TypeScript",
    icon: <Typescript width={12} />,
    href: "https://www.typescriptlang.org/",
  },
  vuejs: {
    label: "Vue.js",
    icon: <Vuedotjs width={12} />,
    href: "https://vuejs.org/",
  },
} satisfies Record<string, TimelineChip>;

export type TechnologyId = keyof typeof technologies;
