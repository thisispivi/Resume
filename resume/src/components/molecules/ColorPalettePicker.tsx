import Swatch from "../atoms/Swatch";
import type { ThemePalette } from "../../types";

interface ColorPalettePickerProps {
  label: string;
  palettes: ThemePalette[];
  selectedId: string;
  onSelect: (palette: ThemePalette) => void;
}

/** Row of color swatches allowing the user to pick a theme palette. */
function ColorPalettePicker({ label, palettes, selectedId, onSelect }: ColorPalettePickerProps) {
  return (
    <div className="palette-picker">
      <span className="palette-picker__label">{label}</span>
      <div className="palette-picker__swatches">
        {palettes.map((palette) => (
          <Swatch
            color={palette.colors.primary}
            isActive={selectedId === palette.id}
            key={palette.id}
            label={palette.name}
            onClick={() => onSelect(palette)}
          />
        ))}
      </div>
    </div>
  );
}

export default ColorPalettePicker;
