import { useTranslation } from "react-i18next";
import ColorInput from "../atoms/ColorInput";
import type { ThemeColors } from "../../types";

interface ThemeCustomizerProps {
  colors: ThemeColors;
  onChange: (colors: ThemeColors) => void;
}

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
          value={colors.primary}
          onChange={(value) => handleChange("primary", value)}
        />
        <ColorInput
          id="color-secondary"
          label={t("secondaryColorLabel")}
          value={colors.secondary}
          onChange={(value) => handleChange("secondary", value)}
        />
        <ColorInput
          id="color-accent"
          label={t("accentColorLabel")}
          value={colors.accent}
          onChange={(value) => handleChange("accent", value)}
        />
        <ColorInput
          id="color-background"
          label={t("backgroundColorLabel")}
          value={colors.background}
          onChange={(value) => handleChange("background", value)}
        />
        <ColorInput
          id="color-surface"
          label={t("surfaceColorLabel")}
          value={colors.surface}
          onChange={(value) => handleChange("surface", value)}
        />
        <ColorInput
          id="color-text"
          label={t("textColorLabel")}
          value={colors.text}
          onChange={(value) => handleChange("text", value)}
        />
      </div>
    </div>
  );
}

export default ThemeCustomizer;
