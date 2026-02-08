import ColorInput from "../atoms/ColorInput";
import type { ThemeColors, UiCopy } from "../../types";

interface ThemeCustomizerProps {
  colors: ThemeColors;
  copy: UiCopy;
  onChange: (colors: ThemeColors) => void;
}

function ThemeCustomizer({ colors, copy, onChange }: ThemeCustomizerProps) {
  const handleChange = (key: keyof ThemeColors, value: string) => {
    onChange({ ...colors, [key]: value });
  };

  return (
    <div className="theme-customizer">
      <span className="theme-customizer__label">{copy.customColorsLabel}</span>
      <div className="theme-customizer__grid">
        <ColorInput
          id="color-primary"
          label={copy.primaryColorLabel}
          value={colors.primary}
          onChange={(value) => handleChange("primary", value)}
        />
        <ColorInput
          id="color-secondary"
          label={copy.secondaryColorLabel}
          value={colors.secondary}
          onChange={(value) => handleChange("secondary", value)}
        />
        <ColorInput
          id="color-accent"
          label={copy.accentColorLabel}
          value={colors.accent}
          onChange={(value) => handleChange("accent", value)}
        />
        <ColorInput
          id="color-background"
          label={copy.backgroundColorLabel}
          value={colors.background}
          onChange={(value) => handleChange("background", value)}
        />
        <ColorInput
          id="color-surface"
          label={copy.surfaceColorLabel}
          value={colors.surface}
          onChange={(value) => handleChange("surface", value)}
        />
        <ColorInput
          id="color-text"
          label={copy.textColorLabel}
          value={colors.text}
          onChange={(value) => handleChange("text", value)}
        />
      </div>
    </div>
  );
}

export default ThemeCustomizer;
