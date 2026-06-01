import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { siteConfig } from "./site";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const absoluteUrl = (path = "") => {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;

  return new URL(normalizedPath, siteConfig.url).toString();
};
