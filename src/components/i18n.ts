import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import en from '/src/locales/enTranslation.json';
import pt from '/src/locales/ptTranslation.json';
    
i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      pt: { translation: pt },
    },
    fallbackLng: 'en',
      detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'], 
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
