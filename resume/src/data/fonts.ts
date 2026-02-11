export interface GoogleFont {
  family: string;
  weights: number[];
  category: "sans-serif" | "serif" | "monospace" | "display" | "handwriting";
}

export const GOOGLE_FONTS: GoogleFont[] = [
  { family: "Inter", weights: [300, 400, 500, 600, 700], category: "sans-serif" },
  { family: "Roboto", weights: [300, 400, 500, 700], category: "sans-serif" },
  { family: "Open Sans", weights: [300, 400, 600, 700], category: "sans-serif" },
  { family: "Lato", weights: [300, 400, 700], category: "sans-serif" },
  { family: "Montserrat", weights: [300, 400, 500, 600, 700], category: "sans-serif" },
  { family: "Poppins", weights: [300, 400, 500, 600, 700], category: "sans-serif" },
  { family: "Raleway", weights: [300, 400, 500, 600, 700], category: "sans-serif" },
  { family: "Nunito", weights: [300, 400, 600, 700], category: "sans-serif" },
  { family: "Source Sans 3", weights: [300, 400, 600, 700], category: "sans-serif" },
  { family: "Work Sans", weights: [300, 400, 500, 600, 700], category: "sans-serif" },
  { family: "Playfair Display", weights: [400, 500, 600, 700], category: "serif" },
  { family: "Merriweather", weights: [300, 400, 700], category: "serif" },
  { family: "Lora", weights: [400, 500, 600, 700], category: "serif" },
  { family: "PT Serif", weights: [400, 700], category: "serif" },
  { family: "Libre Baskerville", weights: [400, 700], category: "serif" },
  { family: "EB Garamond", weights: [400, 500, 600, 700], category: "serif" },
  { family: "Crimson Text", weights: [400, 600, 700], category: "serif" },
  { family: "Cormorant Garamond", weights: [300, 400, 500, 600, 700], category: "serif" },
  { family: "JetBrains Mono", weights: [400, 500, 700], category: "monospace" },
  { family: "Fira Code", weights: [300, 400, 500, 700], category: "monospace" },
  { family: "Source Code Pro", weights: [300, 400, 500, 700], category: "monospace" },
];

const loadedFonts = new Set<string>();

export function loadGoogleFont(font: GoogleFont): void {
  if (loadedFonts.has(font.family)) return;
  loadedFonts.add(font.family);

  const params = new URLSearchParams();
  const familyParam = `${font.family}:wght@${font.weights.join(";")}`;
  params.set("family", familyParam);
  params.set("display", "swap");

  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = `https://fonts.googleapis.com/css2?${params.toString()}`;
  document.head.appendChild(link);
}

export function buildFontFamily(font: GoogleFont): string {
  const fallbacks: Record<string, string> = {
    "sans-serif": '"Segoe UI", "Helvetica Neue", sans-serif',
    serif: "Georgia, serif",
    monospace: '"Courier New", monospace',
    display: "cursive",
    handwriting: "cursive",
  };
  return `"${font.family}", ${fallbacks[font.category]}`;
}
