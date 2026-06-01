import { Zap } from "lucide-react";

export const getProjectIcon = (icon: "zap") => {
  switch (icon) {
    case "zap":
      return <Zap className="size-5" />;
  }
};
