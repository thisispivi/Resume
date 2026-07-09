import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import Swatch from "@/components/atoms/Swatch";
import type { ThemePalette } from "@/types";

interface ColorPalettePickerProps {
  label: string;
  palettes: ThemePalette[];
  selectedId: string;
  onSelect: (palette: ThemePalette) => void;
}

/** Grid of color swatches, grouped by style, allowing the user to pick a theme palette. */
function ColorPalettePicker({ label, palettes, selectedId, onSelect }: ColorPalettePickerProps) {
  const { t } = useTranslation();

  const { classicPalettes, boldPalettes, selectedPalette } = useMemo(
    () => ({
      classicPalettes: palettes.filter((palette) => palette.group !== "bold"),
      boldPalettes: palettes.filter((palette) => palette.group === "bold"),
      selectedPalette: palettes.find((palette) => palette.id === selectedId),
    }),
    [palettes, selectedId],
  );

  const renderGroup = (groupLabel: string, groupPalettes: ThemePalette[]) => (
    <div className="palette-picker__group">
      <span className="palette-picker__group-label">{groupLabel}</span>
      <div className="palette-picker__swatches">
        {groupPalettes.map((palette) => (
          <Swatch
            colors={[palette.colors.primary, palette.colors.secondary, palette.colors.accent]}
            isActive={selectedId === palette.id}
            key={palette.id}
            label={palette.name}
            onClick={() => onSelect(palette)}
          />
        ))}
      </div>
    </div>
  );

  return (
    <div className="palette-picker">
      <div className="palette-picker__header">
        <span className="palette-picker__label">{label}</span>
        {selectedPalette ? (
          <span className="palette-picker__selected">{selectedPalette.name}</span>
        ) : null}
      </div>
      {renderGroup(t("paletteGroupClassic"), classicPalettes)}
      {renderGroup(t("paletteGroupBold"), boldPalettes)}
    </div>
  );
}

export default ColorPalettePicker;
