import type { ThemePalette } from "@/types";

/** Built-in color palettes available for resume theming. */
export const THEME_PALETTES: ThemePalette[] = [
  {
    id: "teal",
    name: "Teal Coast",
    colors: {
      primary: "#0f4c5c",
      secondary: "#2f6690",
      accent: "#3a6ea5",
      background: "#f6f7fb",
      surface: "#ffffff",
      text: "#1f2937",
    },
  },
  {
    id: "ember",
    name: "Ember",
    colors: {
      primary: "#7a1f33",
      secondary: "#b83280",
      accent: "#f59e0b",
      background: "#fbf4f5",
      surface: "#ffffff",
      text: "#1f2937",
    },
  },
  {
    id: "forest",
    name: "Forest",
    colors: {
      primary: "#1f4d36",
      secondary: "#3b7a57",
      accent: "#84cc16",
      background: "#f3f8f5",
      surface: "#ffffff",
      text: "#18222c",
    },
  },
  {
    id: "slate",
    name: "Slate",
    colors: {
      primary: "#2f3e46",
      secondary: "#52796f",
      accent: "#84a98c",
      background: "#f5f6f8",
      surface: "#ffffff",
      text: "#111827",
    },
  },
  {
    id: "noir",
    name: "Noir",
    colors: {
      primary: "#111827",
      secondary: "#374151",
      accent: "#6366f1",
      background: "#f3f4f6",
      surface: "#ffffff",
      text: "#0f172a",
    },
  },
];
