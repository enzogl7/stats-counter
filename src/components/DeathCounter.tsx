import React from 'react';
import { useTranslation } from 'react-i18next';

interface Props {
  deaths: number;
  setDeaths: (val: number) => void; 
  increase: () => void;
  decrease: () => void;
  resetDeaths: () => void;
  customDeathsInput: string;
  setCustomDeathsInput: (val: string) => void;
  type: string;
  theme: { bg: string; text: string };
}

const DeathCounter: React.FC<Props> = ({ deaths, setDeaths, increase, decrease, type, theme, resetDeaths, customDeathsInput, setCustomDeathsInput}) => {
    const { t } = useTranslation();
  
  return (
  <div className={`${type === 'card' ? `p-6 rounded-xl shadow-lg` : ''} ${theme.bg} w-full max-w-sm text-center`}>
    <h2 className="text-2xl font-semibold mb-4 text-white">{t('deaths')}</h2>

    <div className="mb-4">
      <label htmlFor="customDeaths" className="block text-zinc-400 mb-1 text-sm">
        {t('custom_total_deaths')}
      </label>
      <input id="customDeaths" type="number" inputMode="numeric" value={customDeathsInput} min={0} placeholder={deaths.toString()} className="bg-zinc-700 text-white rounded-lg px-4 py-2 w-1/2"
        onChange={(e) => {
          const val = e.target.value;
          if (/^\d*$/.test(val)) {
            setCustomDeathsInput(val);
            const numeric = parseInt(val, 10);
            setDeaths(isNaN(numeric) ? 0 : numeric);
          }
        }}/>
    </div>
    
    <div className="border-zinc-700 border mb-4 rounded-lg p-4 mb-6">
      <p className={`text-5xl font-bold ${theme.text} mb-6 transition-transform duration-300`}>
        {deaths}
      </p>
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
      <button onClick={resetDeaths} className="bg-yellow-600 hover:bg-yellow-700 active:bg-yellow-800 text-white px-4 py-2 rounded-lg text-sm shadow hover:shadow-lg transition">
        {t('reset_deaths')}
      </button>
    </div>
  </div>
  );
};

export default DeathCounter;
