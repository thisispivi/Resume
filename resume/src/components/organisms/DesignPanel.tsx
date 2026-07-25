import { useTranslation } from "react-i18next";
import CollapsibleSection from "@/components/atoms/CollapsibleSection";
import Toggle from "@/components/atoms/Toggle";
import ColorPalettePicker from "@/components/molecules/ColorPalettePicker";
import FontPicker from "@/components/molecules/FontPicker";
import TemplateGallery from "@/components/molecules/TemplateGallery";
import ThemeCustomizer from "@/components/molecules/ThemeCustomizer";
import type { GoogleFont } from "@/data/fonts";
import type { TemplateId, TemplateOption, ThemeColors, ThemePalette } from "@/types";

interface DesignPanelProps {
  colors: ThemeColors;
  fontFamily: string;
  isPdfDark: boolean;
  onColorsChange: (colors: ThemeColors) => void;
  onFontChange: (font: GoogleFont) => void;
  onPaletteChange: (palette: ThemePalette) => void;
  onTemplateChange: (value: TemplateId) => void;
  onTogglePdfDark: () => void;
  paletteId: string;
  palettes: ThemePalette[];
  templateId: TemplateId;
  templates: TemplateOption[];
}

/** Design tab of the workspace: layout, colors, typography, and page options. */
function DesignPanel({
  colors,
  fontFamily,
  isPdfDark,
  onColorsChange,
  onFontChange,
  onPaletteChange,
  onTemplateChange,
  onTogglePdfDark,
  paletteId,
  palettes,
  templateId,
  templates,
}: DesignPanelProps) {
  const { t } = useTranslation();

  return (
    <div className="design-panel">
      <CollapsibleSection isOpenByDefault title={t("templateLabel")}>
        <TemplateGallery onChange={onTemplateChange} templates={templates} value={templateId} />
      </CollapsibleSection>

      <CollapsibleSection isOpenByDefault title={t("paletteLabel")}>
        <ColorPalettePicker
          label={t("paletteLabel")}
          onSelect={onPaletteChange}
          palettes={palettes}
          selectedId={paletteId}
        />
      </CollapsibleSection>

      <CollapsibleSection title={t("customColorsLabel")}>
        <ThemeCustomizer colors={colors} onChange={onColorsChange} />
      </CollapsibleSection>

      <CollapsibleSection isOpenByDefault title={t("fontLabel")}>
        <FontPicker onChange={onFontChange} value={fontFamily} />
      </CollapsibleSection>

      <CollapsibleSection isOpenByDefault title={t("pageOptionsLabel")}>
        <Toggle isChecked={isPdfDark} label={t("pdfDarkModeLabel")} onChange={onTogglePdfDark} />
      </CollapsibleSection>
    </div>
  );
}

export default DesignPanel;
