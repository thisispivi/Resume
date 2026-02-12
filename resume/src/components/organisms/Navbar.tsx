import { useState, useRef, useEffect, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { createPortal } from "react-dom";
import { SUPPORTED_LOCALES } from "@/i18n";
import Logo from "@/assets/icons/logo.svg?react";
import LanguageIcon from "@/assets/icons/language.svg?react";
import MoonIcon from "@/assets/icons/moon.svg?react";
import SunIcon from "@/assets/icons/sun.svg?react";
import MenuIcon from "@/assets/icons/menu.svg?react";

interface NavbarProps {
  appLocale: string;
  onAppLocaleChange: (value: string) => void;
  isDark: boolean;
  onToggleDark: () => void;
  onToggleSidebar: () => void;
}

const FLAG_MAP: Record<string, string> = {
  "en-US": "🇺🇸",
  "it-IT": "🇮🇹",
};

/** Top navigation bar with app branding, language switcher, and dark mode toggle. */
function Navbar({
  appLocale,
  onAppLocaleChange,
  isDark,
  onToggleDark,
  onToggleSidebar,
}: NavbarProps) {
  const { t } = useTranslation();
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [menuPos, setMenuPos] = useState<{ top: number; left: number } | null>(null);
  const langBtnRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLUListElement>(null);

  const openMenu = useCallback(() => {
    if (langBtnRef.current) {
      const rect = langBtnRef.current.getBoundingClientRect();
      setMenuPos({ top: rect.bottom + 4, left: rect.right });
    }
    setIsLangOpen(true);
  }, []);

  const closeMenu = useCallback(() => {
    setIsLangOpen(false);
    setMenuPos(null);
  }, []);

  const toggleLang = useCallback(() => {
    if (isLangOpen) closeMenu();
    else openMenu();
  }, [isLangOpen, closeMenu, openMenu]);

  const selectLocale = useCallback(
    (locale: string) => {
      onAppLocaleChange(locale);
      closeMenu();
      langBtnRef.current?.focus();
    },
    [onAppLocaleChange, closeMenu],
  );

  useEffect(() => {
    if (!isLangOpen) return;
    function handleClick(e: MouseEvent) {
      const target = e.target as Node;
      if (
        langBtnRef.current &&
        !langBtnRef.current.contains(target) &&
        menuRef.current &&
        !menuRef.current.contains(target)
      ) {
        closeMenu();
      }
    }
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [isLangOpen, closeMenu]);

  useEffect(() => {
    if (!isLangOpen) return;
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") closeMenu();
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [isLangOpen, closeMenu]);

  const langMenu =
    isLangOpen && menuPos
      ? createPortal(
          <ul
            className="navbar-lang-menu"
            ref={menuRef}
            role="listbox"
            style={{ position: "fixed", top: menuPos.top, right: window.innerWidth - menuPos.left }}
          >
            {SUPPORTED_LOCALES.map((locale) => (
              <li
                aria-selected={locale === appLocale}
                className={`navbar-lang-menu__item${locale === appLocale ? " navbar-lang-menu__item--active" : ""}`}
                key={locale}
                onClick={() => selectLocale(locale)}
                role="option"
              >
                <span className="navbar-lang-menu__flag">{FLAG_MAP[locale] ?? ""}</span>
                <span>{t(`localeNames.${locale}`)}</span>
              </li>
            ))}
          </ul>,
          document.body,
        )
      : null;

  return (
    <header className="navbar">
      <div className="navbar__brand">
        <Logo className="navbar__logo" height={32} width={32} />
        <span className="navbar__name">{t("appTitle")}</span>
      </div>

      <div className="navbar__spacer" />

      <nav className="navbar__actions">
        <button
          aria-label={t("menuLabel")}
          className="navbar__menu-btn"
          onClick={onToggleSidebar}
          title={t("menuLabel")}
          type="button"
        >
          <MenuIcon aria-hidden="true" height={20} width={20} />
        </button>
        <button
          aria-expanded={isLangOpen}
          aria-haspopup="listbox"
          aria-label={t("appLanguageLabel")}
          className={`navbar__icon-btn${isLangOpen ? " navbar__icon-btn--active" : ""}`}
          onClick={toggleLang}
          ref={langBtnRef}
          title={t("appLanguageLabel")}
          type="button"
        >
          <LanguageIcon aria-hidden="true" height={20} width={20} />
        </button>
        {langMenu}

        <button
          aria-label={t("darkModeLabel")}
          className="navbar__icon-btn"
          onClick={onToggleDark}
          title={t("darkModeLabel")}
          type="button"
        >
          {isDark ? (
            <SunIcon aria-hidden="true" height={20} width={20} />
          ) : (
            <MoonIcon aria-hidden="true" height={20} width={20} />
          )}
        </button>
      </nav>
    </header>
  );
}

export default Navbar;
