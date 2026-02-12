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

/** Top navigation bar with app branding, language switcher, and dark mode toggle. */
function Navbar({ appLocale, onAppLocaleChange, isDark, onToggleDark }: NavbarProps) {
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
        <svg
          aria-hidden="true"
          className="navbar__logo"
          fill="none"
          height="32"
          viewBox="0 0 32 32"
          width="32"
        >
          <rect fill="var(--color-primary)" height="32" rx="8" width="32" />
          <path d="M8 10h6v2H10v8h4v2H8V10zm10 0h6v12h-6v-2h4v-8h-4V10z" fill="#fff" />
          <rect fill="#fff" height="2" opacity="0.7" rx="1" width="6" x="13" y="15" />
        </svg>
        <span className="navbar__name">{t("appTitle")}</span>
      </div>

      <div className="navbar__spacer" />

      <nav className="navbar__actions">
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
          <svg
            aria-hidden="true"
            fill="none"
            height="20"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            width="20"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M2 12h20" />
            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10A15.3 15.3 0 0 1 12 2z" />
          </svg>
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
            <svg
              aria-hidden="true"
              fill="none"
              height="20"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              width="20"
            >
              <circle cx="12" cy="12" r="5" />
              <line x1="12" x2="12" y1="1" y2="3" />
              <line x1="12" x2="12" y1="21" y2="23" />
              <line x1="4.22" x2="5.64" y1="4.22" y2="5.64" />
              <line x1="18.36" x2="19.78" y1="18.36" y2="19.78" />
              <line x1="1" x2="3" y1="12" y2="12" />
              <line x1="21" x2="23" y1="12" y2="12" />
              <line x1="4.22" x2="5.64" y1="19.78" y2="18.36" />
              <line x1="18.36" x2="19.78" y1="5.64" y2="4.22" />
            </svg>
          ) : (
            <svg
              aria-hidden="true"
              fill="none"
              height="20"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              width="20"
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
