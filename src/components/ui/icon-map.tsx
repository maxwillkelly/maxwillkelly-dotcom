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
import type { ReactNode } from "react";

export const getTechnologyIcon = (icon?: string): ReactNode => {
  switch (icon) {
    case "c":
      return <C width={12} />;
    case "cpp":
      return <Cplusplus width={12} />;
    case "csharp":
      return <Csharp width={12} />;
    case "docker":
      return <Docker width={12} />;
    case "dotnet":
      return <Dotnet width={12} />;
    case "electron":
      return <Electron width={12} />;
    case "expo":
      return <Expo width={12} />;
    case "express":
      return <Express width={12} />;
    case "firebase":
      return <Firebase width={12} />;
    case "graphql":
      return <Graphql width={12} />;
    case "java":
      return <Java width={12} />;
    case "javascript":
      return <Javascript width={12} />;
    case "mongodb":
      return <Mongodb height={12} />;
    case "nestjs":
      return <Nestjs width={12} />;
    case "node":
      return <Nodedotjs width={12} />;
    case "react":
      return <React width={12} />;
    case "sqlserver":
      return <MicrosoftSqlServer width={12} />;
    case "typescript":
      return <Typescript width={12} />;
    case "vue":
      return <Vuedotjs width={12} />;
    default:
      return undefined;
  }
};
