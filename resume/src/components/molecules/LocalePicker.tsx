import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import Dropdown from "../atoms/Dropdown";
import { SUPPORTED_LOCALES } from "../../i18n";

interface LocalePickerProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
}

function LocalePicker({ value, onChange, label }: LocalePickerProps) {
  const { t } = useTranslation();

  const options = useMemo(
    () =>
      SUPPORTED_LOCALES.map((locale) => ({
        value: locale,
        label: t(`localeNames.${locale}`),
      })),
    [t],
  );

  return (
    <Dropdown
      label={label ?? t("localeLabel")}
      options={options}
      value={value}
      onChange={onChange}
    />
  );
}

export default LocalePicker;
