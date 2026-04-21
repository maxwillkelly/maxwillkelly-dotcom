"use client";

import { Button } from "@heroui/react";
import { useTheme } from "@wrksz/themes/client";
import { Moon, Sun } from "lucide-react";

export const ThemeToggle = () => {
  const { resolvedTheme, setTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  return (
    <Button
      isIconOnly
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      variant="ghost"
      onPress={() => setTheme(isDark ? "light" : "dark")}
    >
      {isDark ? <Moon size={18} /> : <Sun size={18} />}
    </Button>
  );
};
