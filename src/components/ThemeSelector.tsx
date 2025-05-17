import React from 'react';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

interface Props {
  theme: string;
  setTheme: (value: string) => void;
}

const ThemeSelector: React.FC<Props> = ({ theme, setTheme }) => {
    const { t } = useTranslation();
    useEffect(() => {
      setTheme('default');
      localStorage.setItem('selectedTheme', 'default');
  }, []);

  
  return (
  <div className="text-center mb-8">
    <label className="text-zinc-400 pr-2 pl-4">{t('theme')}:</label>
    <select
      className="bg-zinc-700 text-zinc-400 rounded-lg p-2"
      value={theme}
      onChange={(e) => {
        const selectedTheme = e.target.value;
        setTheme(selectedTheme);
        localStorage.setItem('selectedTheme', selectedTheme);
      }}>
      <option value="default">{t('default_option')}</option>
      <option value="basic">{t('basic_option')}</option>
      <option value="elden">Elden Ring</option>
      <option value="souls">Dark Souls</option>
      <option value="ninja">Ninja Gaiden</option>
      <option value="godofwar">God of War</option>
      <option value="bloodborne">Bloodborne</option>
      <option value="ghost">Ghost of Tsushima</option>
      <option value="hollowknight">Hollow Knight</option>
      <option value="persona">Persona</option>
    </select>
  </div>
  )
};

export default ThemeSelector;
