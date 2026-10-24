import {
  AmazonWebServices,
  C,
  Cplusplus,
  Csharp,
  Docker,
  Dotnet,
  Electron,
  Expo,
  Express,
  Firebase,
  GoogleCloud,
  Graphql,
  Java,
  Javascript,
  MicrosoftSqlServer,
  Mongodb,
  Nestjs,
  Nodedotjs,
  React,
  Typescript,
  Vercel,
  Vuedotjs,
} from "@thesvg/react";

export const technologies = [
  {
    id: "aws",
    label: "Amazon Web Services",
    icon: AmazonWebServices,
    href: "https://aws.amazon.com/",
  },
  { id: "c", label: "C", icon: C, href: undefined },
  { id: "cplusplus", label: "C++", icon: Cplusplus, href: undefined },
  {
    id: "csharp",
    label: "C#",
    icon: Csharp,
    href: "https://learn.microsoft.com/en-us/dotnet/csharp/",
  },
  {
    id: "docker",
    label: "Docker",
    icon: Docker,
    href: "https://www.docker.com/",
  },
  {
    id: "dotnet",
    label: ".NET",
    icon: Dotnet,
    href: "https://dotnet.microsoft.com/",
  },
  {
    id: "dotnet-core",
    label: ".NET Core",
    icon: Dotnet,
    href: "https://dotnet.microsoft.com/",
  },
  {
    id: "electron",
    label: "Electron",
    icon: Electron,
    href: "https://www.electronjs.org/",
  },
  { id: "expo", label: "Expo", icon: Expo, href: "https://expo.dev/" },
  {
    id: "express",
    label: "Express",
    icon: Express,
    href: "https://expressjs.com/",
  },
  {
    id: "firebase",
    label: "Firebase",
    icon: Firebase,
    href: "https://firebase.google.com/",
  },
  {
    id: "google-cloud",
    label: "Google Cloud",
    icon: GoogleCloud,
    href: "https://cloud.google.com/",
  },
  {
    id: "graphql",
    label: "GraphQL",
    icon: Graphql,
    href: "https://graphql.org/",
  },
  { id: "grpc", label: "gRPC", icon: null, href: "https://grpc.io/" },
  { id: "java", label: "Java", icon: Java, href: "https://www.java.com/" },
  { id: "javascript", label: "JavaScript", icon: Javascript, href: undefined },
  {
    id: "mongodb",
    label: "MongoDB",
    icon: Mongodb,
    href: "https://www.mongodb.com/",
  },
  { id: "nestjs", label: "NestJS", icon: Nestjs, href: "https://nestjs.com/" },
  { id: "nextjs", label: "Next.js", icon: null, href: "https://nextjs.org/" },
  {
    id: "nodejs",
    label: "Node.js",
    icon: Nodedotjs,
    href: "https://nodejs.org/",
  },
  { id: "react", label: "React", icon: React, href: "https://react.dev/" },
  {
    id: "react-native",
    label: "React Native",
    icon: React,
    href: "https://reactnative.dev/",
  },
  {
    id: "sql-server",
    label: "SQL Server",
    icon: MicrosoftSqlServer,
    href: "https://www.microsoft.com/en-us/sql-server",
  },
  {
    id: "typescript",
    label: "TypeScript",
    icon: Typescript,
    href: "https://www.typescriptlang.org/",
  },
  { id: "vercel", label: "Vercel", icon: Vercel, href: "https://vercel.com/" },
  { id: "vuejs", label: "Vue.js", icon: Vuedotjs, href: "https://vuejs.org/" },
] as const;

export type TechnologyId = (typeof technologies)[number]["id"];

export const getTechnology = (id: TechnologyId) => {
  const technology = technologies.find((entry) => entry.id === id);

  if (!technology) {
    throw new Error(`Unknown technology: ${id}`);
  }

  return technology;
};
