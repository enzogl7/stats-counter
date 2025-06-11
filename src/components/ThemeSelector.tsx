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
      <label className="text-zinc-400 pr-2 pl-4 font-medium">{t('theme')}:</label>
      <div className="inline-block relative">
        <select className="appearance-none bg-zinc-800 text-zinc-200 border border-zinc-600 pr-10 pl-4 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-zinc-400 focus:border-ring-400 transition-all"
          value={theme}
          onChange={(e) => {
            const selectedTheme = e.target.value;
            setTheme(selectedTheme);
            localStorage.setItem('selectedTheme', selectedTheme);
          }}>
          <option value="default">{t('default_option')}</option>
          <option value="basic">{t('basic_option')}</option>
          <option value="noTrophy">{t('no_trophy')}</option>
          <option value="elden">Elden Ring</option>
          <option value="souls">Dark Souls</option>
          <option value="ninja">Ninja Gaiden</option>
          <option value="godofwar">God of War</option>
          <option value="bloodborne">Bloodborne</option>
          <option value="ghost">Ghost of Tsushima</option>
          <option value="hollowknight">Hollow Knight</option>
          <option value="persona">Persona</option>
          <option value="minecraft">Minecraft</option>
          <option value="deathStranding2">Death Stranding 2</option>
        </select>

        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
          <svg className="w-4 h-4 text-zinc-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
            <path d="M6 8l4 4 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
    </div>

  )
};

export default ThemeSelector;
