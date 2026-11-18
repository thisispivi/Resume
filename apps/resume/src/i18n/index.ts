import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enUS from "./locales/en-US.json";
import itIT from "./locales/it-IT.json";

/** Default UI locale used when no preference is stored. */
export const DEFAULT_LOCALE = "en-US";
/** List of locale codes the app ships translations for. */
export const SUPPORTED_LOCALES = ["en-US", "it-IT"] as const;

/** Initialized i18next instance configured with react-i18next and bundled translations. */
i18n.use(initReactI18next).init({
  resources: {
    "en-US": { translation: enUS },
    "it-IT": { translation: itIT },
  },
  lng: DEFAULT_LOCALE,
  fallbackLng: DEFAULT_LOCALE,
  interpolation: {
    escapeValue: false,
  },
});
