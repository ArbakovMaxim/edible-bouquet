import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import commonUk from "./locales/uk/common.json";
import commonRu from "./locales/ru/common.json";
import catalogUk from "./locales/uk/catalog.json";
import catalogRu from "./locales/ru/catalog.json";

export const LANGUAGES = ["uk", "ru"] as const;
export type Language = (typeof LANGUAGES)[number];

export const DEFAULT_LANGUAGE: Language = "uk";
const STORAGE_KEY = "lang";

const isLanguage = (value: unknown): value is Language =>
  typeof value === "string" && (LANGUAGES as readonly string[]).includes(value);

/**
 * Язык браузера сознательно не учитываем: сайт украинский по умолчанию,
 * русский — только явный выбор посетителя. Заодно отсекаем мусор в
 * localStorage (например, старое "ru-RU" с регионом).
 */
const getInitialLanguage = (): Language => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (isLanguage(stored)) return stored;
    if (stored !== null) localStorage.removeItem(STORAGE_KEY);
  } catch {
    // приватный режим или запрет на storage — молча остаёмся на дефолте
  }
  return DEFAULT_LANGUAGE;
};

i18n.use(initReactI18next).init({
  resources: {
    uk: { common: commonUk, catalog: catalogUk },
    ru: { common: commonRu, catalog: catalogRu },
  },
  lng: getInitialLanguage(),
  fallbackLng: DEFAULT_LANGUAGE,
  supportedLngs: LANGUAGES,
  ns: ["common", "catalog"],
  defaultNS: "common",
  interpolation: {
    // React сам экранирует вывод
    escapeValue: false,
  },
});

/** Держим <html lang> и сохранённый выбор в соответствии с текущим языком. */
const syncLanguage = (lng: string) => {
  document.documentElement.lang = lng;
  try {
    if (isLanguage(lng)) localStorage.setItem(STORAGE_KEY, lng);
  } catch {
    // выбор просто не переживёт перезагрузку — не критично
  }
};

syncLanguage(i18n.resolvedLanguage || DEFAULT_LANGUAGE);
i18n.on("languageChanged", syncLanguage);

export default i18n;
