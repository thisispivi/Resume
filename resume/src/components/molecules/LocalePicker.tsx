import { useTranslation } from "react-i18next";
import Select from "../atoms/Select";
import { SUPPORTED_LOCALES } from "../../i18n";

interface LocalePickerProps {
  value: string;
  onChange: (value: string) => void;
}

function LocalePicker({ value, onChange }: LocalePickerProps) {
  const { t } = useTranslation();

  return (
    <Select
      label={t("localeLabel")}
      value={value}
      onChange={(event) => onChange(event.target.value)}
    >
      {SUPPORTED_LOCALES.map((locale) => (
        <option key={locale} value={locale}>
          {t(`localeNames.${locale}`)}
        </option>
      ))}
    </Select>
  );
}

export default LocalePicker;
