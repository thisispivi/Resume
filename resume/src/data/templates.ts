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
];
