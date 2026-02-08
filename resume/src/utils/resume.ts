import type { ResumeDataMap } from "../types";

export const getInitials = (name: string) => {
  if (!name) return "";
  return name
    .split(" ")
    .filter(Boolean)
    .map((part) => part[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
};

export const getFirstLocale = (
  resumeDataMap: ResumeDataMap,
  fallback: string,
) => {
  const locales = Object.keys(resumeDataMap);
  return locales.length > 0 ? locales[0] : fallback;
};
