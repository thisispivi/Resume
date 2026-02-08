import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enUS from "./locales/en-US.json";
import itIT from "./locales/it-IT.json";

export const DEFAULT_LOCALE = "en-US";
export const SUPPORTED_LOCALES = ["en-US", "it-IT"] as const;

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

export default i18n;
