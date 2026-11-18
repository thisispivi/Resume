import type { TemplateOption } from "@/types";

/**
 * Available resume layout templates with i18n label keys.
 *
 * `layout` drives the schematic thumbnail in the template gallery — it is a
 * coarse description of the page structure, not a rendering instruction.
 */
export const TEMPLATE_OPTIONS: TemplateOption[] = [
  { id: "modern", labelKey: "template.modern", fallbackLabel: "Modern", layout: "sidebar-left" },
  { id: "classic", labelKey: "template.classic", fallbackLabel: "Classic", layout: "columns" },
  { id: "minimal", labelKey: "template.minimal", fallbackLabel: "Minimal", layout: "single" },
  { id: "split", labelKey: "template.split", fallbackLabel: "Split", layout: "sidebar-left" },
  {
    id: "executive",
    labelKey: "template.executive",
    fallbackLabel: "Executive",
    layout: "columns",
  },
  { id: "creative", labelKey: "template.creative", fallbackLabel: "Creative", layout: "banner" },
  { id: "compact", labelKey: "template.compact", fallbackLabel: "Compact", layout: "sidebar-left" },
  { id: "elegant", labelKey: "template.elegant", fallbackLabel: "Elegant", layout: "columns" },
  { id: "timeline", labelKey: "template.timeline", fallbackLabel: "Timeline", layout: "single" },
  {
    id: "portfolio",
    labelKey: "template.portfolio",
    fallbackLabel: "Portfolio",
    layout: "sidebar-left",
  },
  {
    id: "editorial",
    labelKey: "template.editorial",
    fallbackLabel: "Editorial",
    layout: "sidebar-right",
  },
  { id: "bold", labelKey: "template.bold", fallbackLabel: "Bold", layout: "banner" },
  { id: "banner", labelKey: "template.banner", fallbackLabel: "Banner", layout: "banner" },
  { id: "geometric", labelKey: "template.geometric", fallbackLabel: "Geometric", layout: "single" },
  { id: "neo", labelKey: "template.neo", fallbackLabel: "Neo", layout: "columns" },
];
