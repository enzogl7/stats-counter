import React, { useState, useEffect } from 'react';
import ThemeSelector from './ThemeSelector';
import DeathCounter from './DeathCounter';
import TrophyCounter from './TrophyCounter';
import themes from './ThemesDeath';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

const Card: React.FC = () => {
  const [deaths, setDeaths] = useState(0);
  const [customDeathsInput, setCustomDeathsInput] = useState('');
  const [type, setType] = useState('card');
  const [theme, setTheme] = useState('default');
  const [trophiesEarned, setTrophiesEarned] = useState(0);
  const [trophiesTotal, setTrophiesTotal] = useState(0);
  const { t } = useTranslation();

  const increaseTrophies = () => {
    if (trophiesTotal === 0) {
      toast.warn(t('alert_total_trophies'));
      return;
    }
    if (trophiesEarned < trophiesTotal) {
      setTrophiesEarned((t) => t + 1);
    } else {
      toast.info(t('alert_all_trophies'));
    }
  };

  const decreaseTrophies = () => setTrophiesEarned((t) => (t > 0 ? t - 1 : 0));
  const resetTrophies = () => {
    setTrophiesEarned(0);
    setTrophiesTotal(0);
  };

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
          trophiesEarned={trophiesEarned}
          trophiesTotal={trophiesTotal}
          setTrophiesTotal={setTrophiesTotal}
          increase={increaseTrophies}
          decrease={decreaseTrophies}
          reset={resetTrophies}
          type="trophies"
          themeName={theme}
        />
      </section>
    </>
  );
};

export default Card;