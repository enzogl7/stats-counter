import React from 'react';
import themesTrophies from './ThemesTrophies';
import { useTranslation } from 'react-i18next';
import PlatIcon from '../assets/plat-icon.png';

interface Props {
  trophiesEarned: number;
  trophiesTotal: number;
  setTrophiesTotal: (val: number) => void;
  increase: () => void;
  decrease: () => void;
  reset: () => void;
  type: string;
  themeName: string;
}

const TrophyCounter: React.FC<Props> = ({
  trophiesEarned,
  trophiesTotal,
  setTrophiesTotal,
  increase,
  decrease,
  reset,
  type,
  themeName,
}) => {
  const theme = themesTrophies[themeName as keyof typeof themesTrophies];
  const { t } = useTranslation();

  return (
    <div className={`${type === 'card' ? `p-6 rounded-xl shadow-lg` : ''} bg-zinc-800 w-full max-w-sm text-center`}>
      <h2 className="text-2xl font-semibold mb-4 text-white">{t('trophies')}</h2>
      <div className="mb-4">
        <label htmlFor="totalTrophies" className="block text-zinc-400 mb-1 text-sm">
        {t('total_trophies_to_earn')}
        </label>
        <input type="number" id="totalTrophies" value={trophiesTotal} min="0" className="bg-zinc-700 text-white rounded-lg px-4 py-2 w-1/2"
          onChange={(e) => {
            const value = parseInt(e.target.value, 10);
            setTrophiesTotal(isNaN(value) ? 0 : value);
          }}/>
      </div>

      <div className={`border-zinc-700 border mb-4 rounded-full ${theme.bg} p-4 w-50 h-24 flex items-center justify-center mx-auto`}>
        <div className={`text-4xl font-bold ${theme.text} flex items-center justify-center gap-2 transition-transform duration-300`}>
          <img src={PlatIcon} alt="Troféu de Platina/Platinum trophy PS" className="w-10 h-10 object-contain" />
          <span>{trophiesEarned} / {trophiesTotal}</span>
        </div>
      </div>


      <div className="flex gap-6 justify-center mb-6">
        <button onClick={decrease} className="bg-red-600 hover:bg-red-700 active:bg-red-800 text-white text-2xl px-5 py-3 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-1 active:translate-y-0">
          -
        </button>
        <button onClick={increase} className="bg-green-600 hover:bg-green-700 active:bg-green-800 text-white text-2xl px-5 py-3 rounded-md transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-1 active:translate-y-0">
          +
        </button>
      </div>

      <div className="text-center">
        <button onClick={reset} className="bg-yellow-600 hover:bg-yellow-700 active:bg-yellow-800 text-white px-4 py-2 rounded-lg text-sm shadow hover:shadow-lg transition">
        {t('reset_trophies')}
        </button>
      </div>
      <div className="mt-4">
        <button className="bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white px-4 py-2 rounded-lg text-sm shadow hover:shadow-lg transition">
          Gerar URL do Widget
        </button>
      </div>
    </div>
  );
};

export default TrophyCounter;
