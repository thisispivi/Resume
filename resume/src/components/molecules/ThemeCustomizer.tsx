import { useTranslation } from "react-i18next";
import ColorInput from "../atoms/ColorInput";
import type { ThemeColors } from "../../types";

interface ThemeCustomizerProps {
  colors: ThemeColors;
  onChange: (colors: ThemeColors) => void;
}

/** Grid of color inputs for fine-tuning individual theme color values. */
function ThemeCustomizer({ colors, onChange }: ThemeCustomizerProps) {
  const { t } = useTranslation();

  const handleChange = (key: keyof ThemeColors, value: string) => {
    onChange({ ...colors, [key]: value });
  };

  return (
    <div className="theme-customizer">
      <span className="theme-customizer__label">{t("customColorsLabel")}</span>
      <div className="theme-customizer__grid">
        <ColorInput
          id="color-primary"
          label={t("primaryColorLabel")}
          onChange={(value) => handleChange("primary", value)}
          value={colors.primary}
        />
        <ColorInput
          id="color-secondary"
          label={t("secondaryColorLabel")}
          onChange={(value) => handleChange("secondary", value)}
          value={colors.secondary}
        />
        <ColorInput
          id="color-accent"
          label={t("accentColorLabel")}
          onChange={(value) => handleChange("accent", value)}
          value={colors.accent}
        />
        <ColorInput
          id="color-background"
          label={t("backgroundColorLabel")}
          onChange={(value) => handleChange("background", value)}
          value={colors.background}
        />
        <ColorInput
          id="color-surface"
          label={t("surfaceColorLabel")}
          onChange={(value) => handleChange("surface", value)}
          value={colors.surface}
        />
        <ColorInput
          id="color-text"
          label={t("textColorLabel")}
          onChange={(value) => handleChange("text", value)}
          value={colors.text}
        />
      </div>
    </div>
  );
}

export default ThemeCustomizer;
