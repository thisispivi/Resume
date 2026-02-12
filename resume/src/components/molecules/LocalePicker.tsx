import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import Dropdown from "@/components/atoms/Dropdown";
import { SUPPORTED_LOCALES } from "@/i18n";

interface LocalePickerProps {
  label?: string;
  locales?: readonly string[];
  onChange: (value: string) => void;
  value: string;
}

/** Dropdown for choosing a locale. Uses SUPPORTED_LOCALES by default or a custom list. */
function LocalePicker({ label, locales, onChange, value }: LocalePickerProps) {
  const { t } = useTranslation();
  const activeLocales = locales ?? SUPPORTED_LOCALES;

  const options = useMemo(
    () =>
      activeLocales.map((locale) => ({
        value: locale,
        label: t(`localeNames.${locale}`, { defaultValue: locale }),
      })),
    [activeLocales, t],
  );

  return (
    <Dropdown
      label={label ?? t("localeLabel")}
      onChange={onChange}
      options={options}
      value={value}
    />
  );
}

export default LocalePicker;
