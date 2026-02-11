export interface GoogleFont {
  family: string;
  weights: number[];
  category: "sans-serif" | "serif" | "monospace" | "display" | "handwriting";
}

export const GOOGLE_FONTS: GoogleFont[] = [
  { family: "Inter", weights: [300, 400, 500, 600, 700], category: "sans-serif" },
  { family: "Plus Jakarta Sans", weights: [300, 400, 500, 600, 700], category: "sans-serif" },
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

const loadedFonts = new Map<string, Promise<void>>();

export function loadGoogleFont(font: GoogleFont): Promise<void> {
  const existing = loadedFonts.get(font.family);
  if (existing) return existing;

  const promise = new Promise<void>((resolve) => {
    const familyParam = `${font.family}:wght@${font.weights.join(";")}`;
    const url = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(familyParam)}&display=swap`;

    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = url;
    link.onload = () => {
      document.fonts.ready.then(() => resolve());
    };
    link.onerror = () => resolve();
    document.head.appendChild(link);
  });

  loadedFonts.set(font.family, promise);
  return promise;
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
