import React, { useState } from 'react';
import ThemeSelector from './ThemeSelector';
import DeathCounter from './DeathCounter';
import TrophyCounter from './TrophyCounter';
import themes from './ThemesDeath';

const Card: React.FC = () => {
  const [deaths, setDeaths] = useState(0);
  const [type, setType] = useState('card');
  const [theme, setTheme] = useState('default');
  const [trophiesEarned, setTrophiesEarned] = useState(0);
  const [trophiesTotal, setTrophiesTotal] = useState(0);

  const increaseDeaths = () => setDeaths((d) => d + 1);
  const decreaseDeaths = () => setDeaths((d) => (d > 0 ? d - 1 : 0));
  const resetDeaths = () => setDeaths(0);

  const increaseTrophies = () => {
    if (trophiesTotal === 0) return alert('Defina o total de troféus primeiro!');
    if (trophiesEarned < trophiesTotal) {
      setTrophiesEarned((t) => t + 1);
    } else {
      alert('Você já conquistou todos os troféus!');
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
        <ThemeSelector type={type} setType={setType} theme={theme} setTheme={setTheme} />
      </div>

      <section className="flex flex-col md:flex-row justify-center gap-8 text-start">
        <DeathCounter deaths={deaths} increase={increaseDeaths} decrease={decreaseDeaths} type={type} theme={currentTheme} resetDeaths={resetDeaths} setDeaths={setDeaths}/>
        <TrophyCounter trophiesEarned={trophiesEarned} trophiesTotal={trophiesTotal} setTrophiesTotal={setTrophiesTotal} increase={increaseTrophies} decrease={decreaseTrophies}
          reset={resetTrophies}
          type={type}
          themeName={theme}
        />
      </section>
    </>
  );
};

export default Card;
