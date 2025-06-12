import React, { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import DeathIcon from '../assets/death-icon.png';
import { supabase } from '../supabaseClient';
import themes from './ThemesDeath';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { motion } from 'framer-motion';
import { useWidgetLoader } from '../hooks/useWidgetLoader';

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
  const [manualWidgetId, setManualWidgetId] = useState('');
  const selectedTheme = localStorage.getItem('selectedTheme') || 'default';
  const [shortcuts, setShortcuts] = useState(() => {
    try {
      const saved = localStorage.getItem('stats-shortcuts');
      return saved ? JSON.parse(saved) : {
        increaseDeaths: 'ArrowUp',
        decreaseDeaths: 'ArrowDown',
        increaseTrophies: 'ArrowRight',
        decreaseTrophies: 'ArrowLeft',
      };
    } catch {
      return {
        increaseDeaths: 'ArrowUp',
        decreaseDeaths: 'ArrowDown',
        increaseTrophies: 'ArrowRight',
        decreaseTrophies: 'ArrowLeft',
      };
    }
  });

  const { carregando, carregarWidgetPorId } = useWidgetLoader();

  useEffect(() => {
    const savedWidgetId = localStorage.getItem('deathWidgetId');
    if (savedWidgetId) {
      setWidgetId(savedWidgetId);
      const generatedUrl = `${window.location.origin}/widget/${savedWidgetId}?theme=${selectedTheme}`;
      setUrl(generatedUrl);
    }
  }, [selectedTheme]);

  const updateDeathsInDB = async (newDeaths: number) => {
    if (!widgetId) return;
    const { error } = await supabase
      .from('widgets')
      .update({ value: newDeaths })
      .eq('id', widgetId);
    if (error) {
      console.error('Erro ao atualizar mortes no banco:', error);
      toast.error('Erro ao atualizar contador');
    }
  };

  const increaseDeaths = useCallback(() => {
    setDeaths((d) => {
      const newVal = d + 1;
      updateDeathsInDB(newVal);
      return newVal;
    });
  }, [widgetId]);

  const decreaseDeaths = useCallback(() => {
    setDeaths((d) => {
      const newVal = d > 0 ? d - 1 : 0;
      updateDeathsInDB(newVal);
      return newVal;
    });
  }, [widgetId]);

  const resetDeaths = () => {
    setDeaths(0);
    setCustomDeathsInput('');
    updateDeathsInDB(0);
  };

  const gerarURL = async () => {
    const { data, error } = await supabase
      .from('widgets')
      .insert([{ type, value: deaths }])
      .select()
      .single();

    if (error) {
      alert('Erro ao gerar widget');
      console.error(error);
      return;
    }

    setWidgetId(data.id);
    const generatedUrl = `${window.location.origin}/widget/${data.id}?theme=${selectedTheme}`;
    setUrl(generatedUrl);

    const existingWidgets = JSON.parse(localStorage.getItem('savedWidgets') || '[]');
    const updatedWidgets = [...existingWidgets, { id: data.id, type, url: generatedUrl }];
    localStorage.setItem('savedWidgets', JSON.stringify(updatedWidgets));

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

  const handleLoadWidget = async () => {
    const widgetData = await carregarWidgetPorId(manualWidgetId, 'deaths');
    if (widgetData) {
      setWidgetId(widgetData.id);
      setDeaths(widgetData.value || 0);
      const generatedUrl = `${window.location.origin}/widget/${widgetData.id}?theme=${selectedTheme}`;
      setUrl(generatedUrl);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const keys: string[] = [];
      if (e.ctrlKey) keys.push('Ctrl');
      if (e.altKey) keys.push('Alt');
      if (e.shiftKey) keys.push('Shift');
      if (e.metaKey) keys.push('Meta');

      const keyName = e.key.length === 1 ? e.key.toUpperCase() : e.key;
      keys.push(keyName);
      const pressedKey = keys.join('+');

      if (pressedKey === shortcuts.increaseDeaths) {
        e.preventDefault();
        increaseDeaths();
      } else if (pressedKey === shortcuts.decreaseDeaths) {
        e.preventDefault();
        decreaseDeaths();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [shortcuts, increaseDeaths, decreaseDeaths]);

  return (
    <div className="rounded-xl mb-8 p-6 bg-gradient-to-r from-zinc-800/80 to-zinc-900/80 shadow-2xl relative mt-5 backdrop-blur-md border border-zinc-700/50 transition-all duration-200 text-center transform hover:-translate-y-1 active:translate-y-0">
      <h2 className="text-2xl font-semibold mb-4 text-white">{t('deaths')}</h2>

      <div className="text-left mb-4">
        <label htmlFor="manualWidgetId" className="text-sm mt-4 text-zinc-400 block mb-1">
          {t('manual_id_widget')}
        </label>
        <div className="flex gap-2">
          <input id="manualWidgetId" value={manualWidgetId} onChange={(e) => setManualWidgetId(e.target.value)} placeholder="ex: c5s29bf2-..."
          className="bg-zinc-700 text-white rounded-lg px-3 py-1.5 w-full h-10 leading-tight"
          />
          <button onClick={handleLoadWidget} disabled={carregando} className="font-medium bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white px-3 py-2 rounded-lg text-sm shadow hover:shadow-lg transition whitespace-nowrap">
            {carregando ? (<FontAwesomeIcon icon={faSpinner} spin className="h-4 w-4" />) : (t('load_widget'))}
          </button>
        </div>
      </div>

      <hr className="text-zinc-600 w-full mb-4" />

      <div className={`mb-4 rounded-full ${theme.bg} p-4 w-35 h-24 flex items-center justify-center mx-auto ${selectedTheme !== 'basic' && selectedTheme !== 'noTrophy' ? 'border border-zinc-700' : '' }`}> 
        <div className={`text-4xl font-bold ${theme.text} flex items-center gap-2`}>
          <img src={DeathIcon} alt="Ícone de morte" className={`w-10 h-10 object-contain ${theme.iconFilter}`}/>
          <motion.span key={deaths} initial={{ scale: 1 }} animate={{ scale: [1.05, 0.95, 1] }} transition={{ duration: 0.3, ease: 'easeOut' }}
           className={`${theme.font || ''}`}>{deaths}</motion.span>
        </div>
      </div>

      <div className="flex gap-6 justify-center mb-6">
        <button onClick={decreaseDeaths}
          className="bg-red-600 hover:bg-red-700 text-white text-2xl px-5 py-3 rounded-lg shadow-md hover:shadow-lg transition-transform hover:-translate-y-1"
        >
          -
        </button>
        <button onClick={increaseDeaths}
          className="bg-green-600 hover:bg-green-700 text-white text-2xl px-5 py-3 rounded-lg shadow-md hover:shadow-lg transition-transform hover:-translate-y-1"
        >
          +
        </button>
      </div>

      <button onClick={resetDeaths} className="relative inline-flex items-center justify-center px-5 py-2.5 rounded-xl text-sm font-medium text-white border border-yellow-400 hover:border-yellow-500 bg-transparent shadow-none transition-all duration-300 ease-out group overflow-hidden mb-4">
        <span className="z-10">{t('reset_deaths')}</span>
        <span className="absolute inset-0 bg-white opacity-10 group-hover:opacity-20 transition duration-300 rounded-xl"></span>
      </button>

      <div>
      <button onClick={gerarURL} disabled={manualWidgetId.trim() !== ''} className="mb-2 relative inline-flex items-center justify-center px-5 py-2.5 rounded-xl text-sm font-medium text-white  bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-600 shadow-md hover:shadow-lg transition-all duration-300 ease-out disabled:opacity-50 disabled:cursor-not-allowed group overflow-hidden">
        <span className="z-10">{t('generate_url')}</span>
        <span className="absolute inset-0 bg-white opacity-10 group-hover:opacity-20 transition duration-300 rounded-xl"></span>
      </button>

        {urlCopiada && (
          <input type="text" value={url} readOnly onClick={copiarNovamente} className="mt-2 w-full text-sm text-zinc-400 bg-zinc-700 px-3 py-2 rounded cursor-pointer select-all hover:bg-gray-600 pt-3 mb-3"
            title="Clique para copiar novamente"/>
        )}
        {mensagemCopiada && (
          <p className="text-green-400 text-xs mt-1 transition-opacity duration-300">{mensagemCopiada}</p>
        )}
        <br></br>
        <span className='text-sm text-zinc-400 mt-5 pt-5'>
            <FontAwesomeIcon className='pr-2' icon={faCircleInfo}/>
            {t('recommended_size_title')}
            <br></br>
            {t('recommended_size_bordered_deaths')}
            <br></br>
            {t('recommended_size_borderless_deaths')}
        </span>
      </div>
    </div>
  );
};

export default DeathCounter;