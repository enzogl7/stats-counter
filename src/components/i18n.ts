import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from '/src/locales/enTranslation.json';
import pt from '/src/locales/ptTranslation.json';
    
i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      pt: { translation: pt },
    },
    lng: 'pt',
    fallbackLng: 'pt',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
