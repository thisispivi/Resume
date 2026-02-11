import { useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import Dropdown from "../atoms/Dropdown";
import { GOOGLE_FONTS, loadGoogleFont, type GoogleFont } from "../../data/fonts";

interface FontPickerProps {
  value: string;
  onChange: (font: GoogleFont) => void;
}

function FontPicker({ value, onChange }: FontPickerProps) {
  const { t } = useTranslation();

  const options = useMemo(
    () =>
      GOOGLE_FONTS.map((f) => ({
        value: f.family,
        label: f.family,
      })),
    [],
  );

  useEffect(() => {
    const font = GOOGLE_FONTS.find((f) => f.family === value);
    if (font) loadGoogleFont(font);
  }, [value]);

  const handleChange = (family: string) => {
    const font = GOOGLE_FONTS.find((f) => f.family === family);
    if (font) {
      loadGoogleFont(font);
      onChange(font);
    }
  };

  return (
    <Dropdown label={t("fontLabel")} options={options} value={value} onChange={handleChange} />
  );
}

export default FontPicker;
