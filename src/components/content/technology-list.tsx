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
  React as ReactIcon,
  Typescript,
  Vuedotjs,
} from "@thesvg/react";
import type { ReactNode } from "react";

import { LinkableChip } from "@/components/ui/linkable-chip";

type IconProps = {
  height?: number;
  width?: number;
};

type IconRenderer = (props: IconProps) => ReactNode;

export type TechnologyIcon =
  | "c"
  | "cplusplus"
  | "csharp"
  | "docker"
  | "dotnet"
  | "electron"
  | "expo"
  | "express"
  | "firebase"
  | "graphql"
  | "java"
  | "javascript"
  | "mongodb"
  | "mssql"
  | "nestjs"
  | "nodejs"
  | "react"
  | "typescript"
  | "vuejs";

export type TechnologyItem = {
  href?: string;
  icon?: TechnologyIcon;
  label: string;
};

const technologyIcons = {
  c: (props) => <C {...props} />,
  cplusplus: (props) => <Cplusplus {...props} />,
  csharp: (props) => <Csharp {...props} />,
  docker: (props) => <Docker {...props} />,
  dotnet: (props) => <Dotnet {...props} />,
  electron: (props) => <Electron {...props} />,
  expo: (props) => <Expo {...props} />,
  express: (props) => <Express {...props} />,
  firebase: (props) => <Firebase {...props} />,
  graphql: (props) => <Graphql {...props} />,
  java: (props) => <Java {...props} />,
  javascript: (props) => <Javascript {...props} />,
  mongodb: (props) => <Mongodb {...props} />,
  mssql: (props) => <MicrosoftSqlServer {...props} />,
  nestjs: (props) => <Nestjs {...props} />,
  nodejs: (props) => <Nodedotjs {...props} />,
  react: (props) => <ReactIcon {...props} />,
  typescript: (props) => <Typescript {...props} />,
  vuejs: (props) => <Vuedotjs {...props} />,
} satisfies Record<TechnologyIcon, IconRenderer>;

type TechnologyListProps = {
  items: TechnologyItem[];
};

export const TechnologyList = ({ items }: TechnologyListProps) => {
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item) => {
        const icon = item.icon
          ? technologyIcons[item.icon]({ width: 12 })
          : undefined;

        return (
          <LinkableChip
            key={item.label}
            href={item.href}
            icon={icon}
            label={item.label}
          />
        );
      })}
    </div>
  );
};
