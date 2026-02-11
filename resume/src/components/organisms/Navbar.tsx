import { useState, useRef, useEffect, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { createPortal } from "react-dom";
import { SUPPORTED_LOCALES } from "../../i18n";

interface NavbarProps {
  appLocale: string;
  onAppLocaleChange: (value: string) => void;
  isDark: boolean;
  onToggleDark: () => void;
}

const FLAG_MAP: Record<string, string> = {
  "en-US": "🇺🇸",
  "it-IT": "🇮🇹",
};

function Navbar({ appLocale, onAppLocaleChange, isDark, onToggleDark }: NavbarProps) {
  const { t } = useTranslation();
  const [langOpen, setLangOpen] = useState(false);
  const [menuPos, setMenuPos] = useState<{ top: number; left: number } | null>(null);
  const langBtnRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLUListElement>(null);

  const openMenu = useCallback(() => {
    if (langBtnRef.current) {
      const rect = langBtnRef.current.getBoundingClientRect();
      setMenuPos({ top: rect.bottom + 4, left: rect.right });
    }
    setLangOpen(true);
  }, []);

  const closeMenu = useCallback(() => {
    setLangOpen(false);
    setMenuPos(null);
  }, []);

  const toggleLang = useCallback(() => {
    if (langOpen) closeMenu();
    else openMenu();
  }, [langOpen, closeMenu, openMenu]);

  const selectLocale = useCallback(
    (locale: string) => {
      onAppLocaleChange(locale);
      closeMenu();
      langBtnRef.current?.focus();
    },
    [onAppLocaleChange, closeMenu],
  );

  useEffect(() => {
    if (!langOpen) return;
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
  }, [langOpen, closeMenu]);

  useEffect(() => {
    if (!langOpen) return;
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") closeMenu();
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [langOpen, closeMenu]);

  const langMenu =
    langOpen && menuPos
      ? createPortal(
          <ul
            ref={menuRef}
            className="navbar-lang-menu"
            role="listbox"
            style={{ position: "fixed", top: menuPos.top, right: window.innerWidth - menuPos.left }}
          >
            {SUPPORTED_LOCALES.map((locale) => (
              <li
                key={locale}
                role="option"
                aria-selected={locale === appLocale}
                className={`navbar-lang-menu__item${locale === appLocale ? " navbar-lang-menu__item--active" : ""}`}
                onClick={() => selectLocale(locale)}
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
        <svg
          className="navbar__logo"
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
          aria-hidden="true"
        >
          <rect width="32" height="32" rx="8" fill="var(--color-primary)" />
          <path d="M8 10h6v2H10v8h4v2H8V10zm10 0h6v12h-6v-2h4v-8h-4V10z" fill="#fff" />
          <rect x="13" y="15" width="6" height="2" rx="1" fill="#fff" opacity="0.7" />
        </svg>
        <span className="navbar__name">{t("appTitle")}</span>
      </div>

      <div className="navbar__spacer" />

      <nav className="navbar__actions">
        <button
          ref={langBtnRef}
          type="button"
          className={`navbar__icon-btn${langOpen ? " navbar__icon-btn--active" : ""}`}
          onClick={toggleLang}
          aria-label={t("appLanguageLabel")}
          aria-expanded={langOpen}
          aria-haspopup="listbox"
          title={t("appLanguageLabel")}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M2 12h20" />
            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10A15.3 15.3 0 0 1 12 2z" />
          </svg>
        </button>
        {langMenu}

        <button
          type="button"
          className="navbar__icon-btn"
          onClick={onToggleDark}
          aria-label={t("darkModeLabel")}
          title={t("darkModeLabel")}
        >
          {isDark ? (
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <circle cx="12" cy="12" r="5" />
              <line x1="12" y1="1" x2="12" y2="3" />
              <line x1="12" y1="21" x2="12" y2="23" />
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
              <line x1="1" y1="12" x2="3" y2="12" />
              <line x1="21" y1="12" x2="23" y2="12" />
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
            </svg>
          ) : (
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </svg>
          )}
        </button>
      </nav>
    </header>
  );
}

export default Navbar;
