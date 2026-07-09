import type { TemplateOption } from "@/types";

/** Available resume layout templates with i18n label keys. */
export const TEMPLATE_OPTIONS: TemplateOption[] = [
  { id: "modern", labelKey: "template.modern", fallbackLabel: "Modern" },
  { id: "classic", labelKey: "template.classic", fallbackLabel: "Classic" },
  { id: "minimal", labelKey: "template.minimal", fallbackLabel: "Minimal" },
  { id: "split", labelKey: "template.split", fallbackLabel: "Split" },
  { id: "executive", labelKey: "template.executive", fallbackLabel: "Executive" },
  { id: "creative", labelKey: "template.creative", fallbackLabel: "Creative" },
  { id: "compact", labelKey: "template.compact", fallbackLabel: "Compact" },
  { id: "elegant", labelKey: "template.elegant", fallbackLabel: "Elegant" },
  { id: "timeline", labelKey: "template.timeline", fallbackLabel: "Timeline" },
  { id: "portfolio", labelKey: "template.portfolio", fallbackLabel: "Portfolio" },
  { id: "editorial", labelKey: "template.editorial", fallbackLabel: "Editorial" },
  { id: "bold", labelKey: "template.bold", fallbackLabel: "Bold" },
  { id: "banner", labelKey: "template.banner", fallbackLabel: "Banner" },
  { id: "geometric", labelKey: "template.geometric", fallbackLabel: "Geometric" },
  { id: "neo", labelKey: "template.neo", fallbackLabel: "Neo" },
];
