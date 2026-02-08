import Select from "../atoms/Select";
import type { UiCopy } from "../../types";

interface LocalePickerProps {
  locales: string[];
  value: string;
  copy: UiCopy;
  onChange: (value: string) => void;
}

function LocalePicker({ locales, value, copy, onChange }: LocalePickerProps) {
  return (
    <Select
      label={copy.localeLabel}
      value={value}
      onChange={(event) => onChange(event.target.value)}
    >
      {locales.map((locale) => (
        <option key={locale} value={locale}>
          {locale}
        </option>
      ))}
    </Select>
  );
}

export default LocalePicker;
