import React from 'react';
import { useTranslation } from 'react-i18next';
import i18n from './i18n.ts';


const LanguageSelector: React.FC = () => {
  const { t } = useTranslation();

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  return (
    <div className="mb-4 text-sm text-start pt-5 text-white">
      <label htmlFor="language" className="mr-2">
       🌐 {t('language')}:
      </label>
      <select
        id="language"
        onChange={(e) => changeLanguage(e.target.value)}
        value={i18n.language}
        className="bg-zinc-700 text-white rounded-md px-3 py-1 border border-zinc-600"
      >
        <option value="pt">Português 🇧🇷</option>
        <option value="en">English 🇺🇸</option>
      </select>
    </div>
  );
};

export default LanguageSelector;
