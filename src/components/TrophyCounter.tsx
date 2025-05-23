import React, { useState, useEffect } from 'react';
import themesTrophies from './ThemesTrophies';
import { useTranslation } from 'react-i18next';
import PlatIcon from '../assets/plat-icon.png';
import { supabase } from '../supabaseClient';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';

interface Props {
  type: string;
  themeName: string;
}

const TrophyCounter: React.FC<Props> = ({
  type,
  themeName,
}) => {
  const theme = themesTrophies[themeName as keyof typeof themesTrophies];
  const { t } = useTranslation();
  const [widgetId, setWidgetId] = useState<string | null>(null);
  const [url, setUrl] = useState('');
  const [urlCopiada, setUrlCopiada] = useState(false);
  const [mensagemCopiada, setMensagemCopiada] = useState('');
  const [trophiesEarned, setTrophiesEarned] = useState(0);
  const [trophiesTotal, setTrophiesTotal] = useState(0);
  const selectedTheme = localStorage.getItem('selectedTheme') || 'default';
  const [widgetsSalvos, setWidgetsSalvos] = useState<{ id: string, url: string }[]>([]);
  const [manualWidgetId, setManualWidgetId] = useState('');
  const [carregandoWidget, setCarregandoWidget] = useState(false);

useEffect(() => {
  const savedWidgetId = localStorage.getItem('trophyWidgetId');
  const allWidgets = JSON.parse(localStorage.getItem('trophyWidgets') || '[]');

  if (savedWidgetId) {
    setWidgetId(savedWidgetId);
    const generatedUrl = `${window.location.origin}/widget/${savedWidgetId}?theme=${selectedTheme}`;
    setUrl(generatedUrl);
  }

  setWidgetsSalvos(allWidgets);
}, [selectedTheme]);


  const atualizarTrophiesNoBanco = async (earned: number, total: number) => {
    if (!widgetId) return;

    const { error } = await supabase
      .from('widgets')
      .update({ value: earned, total })
      .eq('id', widgetId);

    if (error) {
      console.error('Erro ao atualizar widget:', error);
      toast.error('Error');
    }
  };

  const increaseTrophies = () => {
    if (trophiesTotal === 0) {
      toast.warn(t('alert_total_trophies'));
      return;
    }
    if (trophiesEarned < trophiesTotal) {
      const novo = trophiesEarned + 1;
      setTrophiesEarned(novo);
      atualizarTrophiesNoBanco(novo, trophiesTotal);
    } else {
      toast.info(t('alert_all_trophies'));
    }
  };

  const decreaseTrophies = () => {
    const novo = trophiesEarned > 0 ? trophiesEarned - 1 : 0;
    setTrophiesEarned(novo);
    atualizarTrophiesNoBanco(novo, trophiesTotal);
  };

  const resetTrophies = () => {
    setTrophiesEarned(0);
    setTrophiesTotal(0);
    atualizarTrophiesNoBanco(0, 0);
  };

  const gerarURL = async () => {
    if (trophiesTotal <= 0) {
      toast.warning(t('alert_total_trophies'));
      return;
    }

    const { data, error } = await supabase
      .from('widgets')
      .insert([{ type, value: trophiesEarned, total: trophiesTotal}])
      .select()
      .single();

    if (error) {
      alert('Error');
      console.error(error);
      return;
    }

    setWidgetId(data.id);
    const generatedUrl = `${window.location.origin}/widget/${data.id}?theme=${selectedTheme}`;
    setUrl(generatedUrl);

    const existingWidgets = JSON.parse(localStorage.getItem('savedWidgets') || '[]');
    const updatedWidgets = [...existingWidgets, { id: data.id, type, url: generatedUrl, trophiesEarned, trophiesTotal }];
    localStorage.setItem('savedWidgets', JSON.stringify(updatedWidgets));
    console.log("trophiesEarned", trophiesEarned);
    await navigator.clipboard.writeText(generatedUrl);
    setUrlCopiada(true);
    setMensagemCopiada(t('copy_url'));

    setTimeout(() => {
      setMensagemCopiada('');
    }, 3000);
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
      <h2 className="text-2xl font-semibold mb-4 text-white">{t('trophies')}</h2>
      <div className="mt-4 text-left">
        <label htmlFor="manualWidgetId" className="text-sm text-zinc-400 block mb-1">
          {t('manual_id_widget')}
        </label>
      <div className="flex gap-2">
        <input type="text" id="manualWidgetId" value={manualWidgetId} onChange={(e) => setManualWidgetId(e.target.value)} className="bg-zinc-700 text-white rounded-lg px-3 py-2 w-full"
            placeholder="ex: c5s29bf2-..."
        />
        <button
          onClick={async () => {
            if (!manualWidgetId.trim()) return;

            setCarregandoWidget(true);
            const { data, error } = await supabase
              .from('widgets')
              .select('id, value, total, type')
              .eq('id', manualWidgetId.trim())
              .single();
            setCarregandoWidget(false);

            if (error || !data) {
              toast.error(t('manual_widget_not_found'));
              return;
            }
            if (data.type !== 'trophies') {
              toast.error(t('invalid_widget_type'));
              return;
            }

            setWidgetId(data.id);
            setTrophiesEarned(data.value || 0);
            setTrophiesTotal(data.total || 0);
            const generatedUrl = `${window.location.origin}/widget/${data.id}?theme=${selectedTheme}`;
            setUrl(generatedUrl);
            toast.success(t('manual_widget_success'));
          }}
          className="bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white px-3 py-2 rounded-lg text-sm shadow hover:shadow-lg transition whitespace-nowrap"
          disabled={carregandoWidget}>
          {carregandoWidget ? t('loading_widget') : t('load_widget')}
        </button>
      </div>
    </div>

      <hr className='text-zinc-600 w-full mb-3 mt-3' />

      <div className="mb-4">
        <label htmlFor="totalTrophies" className="block text-zinc-400 mb-1 text-sm">
          {t('total_trophies_to_earn')}
        </label>
        <input
          type="number"
          id="totalTrophies"
          value={trophiesTotal}
          min={0}
          onChange={(e) => {
            const value = parseInt(e.target.value, 10);
            const novoTotal = isNaN(value) ? 0 : value;
            setTrophiesTotal(novoTotal);
            atualizarTrophiesNoBanco(trophiesEarned, novoTotal);
          }}
          className="bg-zinc-700 text-white rounded-lg px-4 py-2 w-1/2"
        />
      </div>

      <div className={`mb-4 rounded-full ${theme.bg} p-4 w-75 h-24 flex items-center justify-center mx-auto ${selectedTheme !== 'basic' ? 'border border-zinc-700' : '' }`}> 
       <div className={`text-4xl font-bold ${theme.text} flex items-center justify-center gap-2 transition-transform duration-300`}>
          <img src={PlatIcon} alt="Troféu de Platina/Platinum trophy PS" className={`w-10 h-10 object-contain {theme.iconFilter}`}/>
          <span className={`${theme.font || ''} tracking-tighter drop-shadow-[0_0_2px_black] text-shadow-2xl text-3xl`}>
            {trophiesEarned} / {trophiesTotal}
          </span>
        </div>
      </div>

      <div className="flex gap-6 justify-center mb-6">
        <button
          onClick={decreaseTrophies}
          className="bg-red-600 hover:bg-red-700 active:bg-red-800 text-white text-2xl px-5 py-3 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-1 active:translate-y-0"
        >
          -
        </button>
        <button
          onClick={increaseTrophies}
          className="bg-green-600 hover:bg-green-700 active:bg-green-800 text-white text-2xl px-5 py-3 rounded-md transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-1 active:translate-y-0"
        >
          +
        </button>
      </div>

      <div className="text-center">
        <button
          onClick={resetTrophies}
          className="bg-yellow-600 hover:bg-yellow-700 active:bg-yellow-800 text-white px-4 py-2 rounded-lg text-sm shadow hover:shadow-lg transition"
        >
          {t('reset_trophies')}
        </button>
      </div>

      <div className="mt-4">
        <button onClick={gerarURL} className="mb-3 pb-3 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white px-4 py-2 rounded-lg text-sm shadow hover:shadow-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={manualWidgetId.trim() !== ''} >
          {t('generate_url')}
        </button>

        {urlCopiada && (
          <input
            type="text"
            value={url}
            readOnly
            onClick={copiarNovamente}
            className="mt-2 w-50 text-sm text-zinc-400 bg-zinc-700 px-3 py-2 rounded cursor-pointer select-all transition hover:bg-gray-600 pt-3 mb-3"
            title="Clique para copiar novamente"
          />
        )}
        {mensagemCopiada && (
          <p className="text-green-400 text-xs mt-1 transition-opacity duration-300">{mensagemCopiada}</p>
        )}
        <br></br>
        <span className='text-sm text-zinc-400 mt-4 pt-4'>
            <FontAwesomeIcon className='pr-2' icon={faCircleInfo}/>
            {t('recommended_size_title')}
            <br></br>
            {t('recommended_size_borderless')}
            <br></br>
            {t('recommended_size_bordered')}
        </span>
      </div>
    </div>
  );
};

export default TrophyCounter;
