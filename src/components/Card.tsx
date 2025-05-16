import React, { useState, useEffect } from 'react';
import ThemeSelector from './ThemeSelector';
import DeathCounter from './DeathCounter';
import TrophyCounter from './TrophyCounter';
import themes from './ThemesDeath';
import { useTranslation } from 'react-i18next';

const Card: React.FC = () => {
  const { t } = useTranslation();
  const [theme, setTheme] = useState('default');


  const currentTheme = themes[theme as keyof typeof themes];

  return (
    <>
      <div className="p-4">
        <ThemeSelector theme={theme} setTheme={setTheme} />
      </div>

      <section className="flex flex-col md:flex-row justify-center gap-8 text-start">
        <DeathCounter
          type="deaths"
          theme={currentTheme}
        />

        <TrophyCounter
          type="trophies"
          themeName={theme}
        />
      </section>
    </>
  );
};

export default Card;