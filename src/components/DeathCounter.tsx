import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import DeathIcon from '../assets/death-icon.png';
import { supabase } from '../supabaseClient';

interface Props {
  type: string;
  theme: { bg: string; text: string };
}

const DeathCounter: React.FC<Props> = ({ type, theme }) => {
  const { t } = useTranslation();
  const [deaths, setDeaths] = useState(0);
  const [customDeathsInput, setCustomDeathsInput] = useState('');
  const [widgetId, setWidgetId] = useState<string | null>(null);
  const [url, setUrl] = useState('');
  const [urlCopiada, setUrlCopiada] = useState(false);
  const [mensagemCopiada, setMensagemCopiada] = useState('');

  const updateDeathsInDB = async (newDeaths: number) => {
    if (!widgetId) return;
    const { error } = await supabase
      .from('widgets')
      .update({ value: newDeaths })
      .eq('id', widgetId);
    if (error) console.error('Erro ao atualizar mortes no banco:', error);
  };

  const increaseDeaths = () => {
    setDeaths((d) => {
      const newVal = d + 1;
      updateDeathsInDB(newVal);
      return newVal;
    });
  };

  const decreaseDeaths = () => {
    setDeaths((d) => {
      const newVal = d > 0 ? d - 1 : 0;
      updateDeathsInDB(newVal);
      return newVal;
    });
  };

  const resetDeaths = () => {
    setDeaths(0);
    setCustomDeathsInput('');
    updateDeathsInDB(0);
  };

  const gerarURL = async () => {
    const { data, error } = await supabase
      .from('widgets')
      .insert([{ type }])
      .select()
      .single();

    if (error) {
      alert('Erro ao gerar widget');
      console.error(error);
      return;
    }

    setWidgetId(data.id);
    const generatedUrl = `${window.location.origin}/widget/${data.id}`;
    setUrl(generatedUrl);
    await navigator.clipboard.writeText(generatedUrl);
    setUrlCopiada(true);
    setMensagemCopiada(t('copy_url'));
    setTimeout(() => setMensagemCopiada(''), 3000);
  };
const copiarNovamente = async () => {
  if (url) {
    await navigator.clipboard.writeText(url);
    setMensagemCopiada(t('copy_url'));
    setTimeout(() => setMensagemCopiada(''), 3000);
  }
};

  return (
    <div className={`p-6 rounded-xl shadow-lg bg-zinc-800 w-full max-w-sm text-center`}>
      <h2 className="text-2xl font-semibold mb-4 text-white">{t('deaths')}</h2>

      <div className="mb-4">
        <label htmlFor="customDeaths" className="block text-zinc-400 mb-1 text-sm">
          {t('custom_total_deaths')}
        </label>
        <input
          id="customDeaths"
          type="number"
          inputMode="numeric"
          value={customDeathsInput}
          min={0}
          placeholder={deaths.toString()}
          className="bg-zinc-700 text-white rounded-lg px-4 py-2 w-1/2"
          onChange={(e) => {
            const val = e.target.value;
            if (/^\d*$/.test(val)) {
              setCustomDeathsInput(val);
              const numeric = parseInt(val, 10);
              const newDeaths = isNaN(numeric) ? 0 : numeric;
              setDeaths(newDeaths);
              updateDeathsInDB(newDeaths);
            }
          }}
        />
      </div>

      <div className={`border-zinc-700 border mb-4 rounded-full ${theme.bg} p-4 w-30 h-24 flex items-center justify-center mx-auto`}>
        <div className={`text-4xl font-bold ${theme.text} flex items-center justify-center gap-2 transition-transform duration-300`}>
          <img src={DeathIcon} alt="Ícone mortes/Death icon" className="w-6 h-6 text-white object-contain" />
          <span>{deaths}</span>
        </div>
      </div>

      <div className="flex gap-6 justify-center mb-6">
        <button
          onClick={decreaseDeaths}
          className="bg-red-600 hover:bg-red-700 active:bg-red-800 text-white text-2xl px-5 py-3 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-1 active:translate-y-0"
        >
          -
        </button>
        <button
          onClick={increaseDeaths}
          className="bg-green-600 hover:bg-green-700 active:bg-green-800 text-white text-2xl px-5 py-3 rounded-md transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-1 active:translate-y-0"
        >
          +
        </button>
      </div>

      <div className="text-center">
        <button
          onClick={resetDeaths}
          className="bg-yellow-600 hover:bg-yellow-700 active:bg-yellow-800 text-white px-4 py-2 rounded-lg text-sm shadow hover:shadow-lg transition"
        >
          {t('reset_deaths')}
        </button>
      </div>

      <div className="mt-4">
        <button
          onClick={gerarURL}
          className="bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white px-4 py-2 rounded-lg text-sm shadow hover:shadow-lg transition"
        >
          {t('generate_url')}
        </button>

        {urlCopiada && (
          <input
            type="text"
            value={url}
            readOnly
            onClick={copiarNovamente}
            className="mt-2 w-50 text-sm text-zinc-400 bg-zinc-700 px-3 py-2 rounded cursor-pointer select-all transition hover:bg-gray-600"
            title="Clique para copiar novamente"/>
        )}
        {mensagemCopiada && (
          <p className="text-green-400 text-xs mt-1 transition-opacity duration-300">
            {mensagemCopiada}
          </p>
        )}
      </div>
    </div>
  );
};

export default DeathCounter;
