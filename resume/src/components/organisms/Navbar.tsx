import { useTranslation } from "react-i18next";

function Navbar() {
  const { t } = useTranslation();

  return (
    <header className="navbar">
      <h1 className="navbar__title">{t("appTitle")}</h1>
    </header>
  );
}

export default Navbar;
