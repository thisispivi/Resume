import { useTranslation } from "react-i18next";
import LocalePicker from "../molecules/LocalePicker";
import Toggle from "../atoms/Toggle";

interface NavbarProps {
  appLocale: string;
  onAppLocaleChange: (value: string) => void;
  isDark: boolean;
  onToggleDark: () => void;
}

function Navbar({
  appLocale,
  onAppLocaleChange,
  isDark,
  onToggleDark,
}: NavbarProps) {
  const { t } = useTranslation();

  return (
    <header className="navbar">
      <h1 className="navbar__title">{t("appTitle")}</h1>
      <div className="navbar__spacer" />
      <nav className="navbar__actions">
        <LocalePicker
          label={t("appLanguageLabel")}
          value={appLocale}
          onChange={onAppLocaleChange}
        />
        <Toggle
          label={t("darkModeLabel")}
          checked={isDark}
          onChange={onToggleDark}
        />
      </nav>
    </header>
  );
}

export default Navbar;
