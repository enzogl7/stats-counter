import React from 'react';
import { useTranslation } from 'react-i18next';

interface Props {
  type: string;
  setType: (value: string) => void;
  theme: string;
  setTheme: (value: string) => void;
}

const ThemeSelector: React.FC<Props> = ({ type, setType, theme, setTheme }) => {
    const { t } = useTranslation();
  
  return (
  <div className="text-center mb-8">
    <label className="text-zinc-400 pr-2">{t('type')}:</label>
    <select
      className="bg-zinc-700 text-zinc-400 rounded-lg p-2"
      value={type}
      onChange={(e) => setType(e.target.value)}>
      <option value="card">Card</option>
      <option value="minimal">{t('minimal_option')}</option>
    </select>

    <label className="text-zinc-400 pr-2 pl-4">{t('theme')}:</label>
    <select
      className="bg-zinc-700 text-zinc-400 rounded-lg p-2"
      value={theme}
      onChange={(e) => setTheme(e.target.value)}>
      <option value="default">{t('default_option')}</option>
      <option value="elden">Elden Ring</option>
      <option value="souls">Dark Souls</option>
    </select>
  </div>
  )
};

export default ThemeSelector;
