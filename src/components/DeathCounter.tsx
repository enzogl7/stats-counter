import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import DeathIcon from '../assets/death-icon.png';
import { supabase } from '../supabaseClient';
import themes from './ThemesDeath';
import { toast } from 'react-toastify';

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
  const [carregandoWidget, setCarregandoWidget] = useState(false);
  const selectedTheme = localStorage.getItem('selectedTheme') || 'default';

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

  const carregarWidgetManual = async () => {
    if (!manualWidgetId.trim()) return;

    setCarregandoWidget(true);
    const { data, error } = await supabase
      .from('widgets')
      .select('id, value, type')
      .eq('id', manualWidgetId.trim())
      .single();
    setCarregandoWidget(false);

    if (error || !data) {
      toast.error(t('manual_widget_not_found'));
      return;
    }
    if (data.type !== 'deaths') {
      toast.error(t('invalid_widget_type'));
      return;
    }

    setWidgetId(data.id);
    setDeaths(data.value || 0);
    const generatedUrl = `${window.location.origin}/widget/${data.id}?theme=${selectedTheme}`;
    setUrl(generatedUrl);
    toast.success(t('manual_widget_success'));
  };

  return (
    <div className="p-6 rounded-xl shadow-lg bg-zinc-800 w-full max-w-sm text-center">
      <h2 className="text-2xl font-semibold mb-4 text-white">{t('deaths')}</h2>

      <div className="text-left mb-4">
        <label htmlFor="manualWidgetId" className="text-sm mt-4 text-zinc-400 block mb-1">
          {t('manual_id_widget')}
        </label>
        <div className="flex gap-2">
          <input id="manualWidgetId" value={manualWidgetId} onChange={(e) => setManualWidgetId(e.target.value)} placeholder="ex: c5s29bf2-..."
          className="bg-zinc-700 text-white rounded-lg px-3 py-1.5 w-full h-10 leading-tight"
          />
          <button
            onClick={carregarWidgetManual}
            disabled={carregandoWidget}
                      className="bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white px-3 py-2 rounded-lg text-sm shadow hover:shadow-lg transition whitespace-nowrap"
>
            {carregandoWidget ? t('loading_widget') : t('load_widget')}
          </button>
        </div>
      </div>

      <hr className="text-zinc-600 w-full mb-4" />

      <div className={`mb-4 rounded-full ${theme.bg} p-4 w-35 h-24 flex items-center justify-center mx-auto ${selectedTheme !== 'basic' ? 'border border-zinc-700' : '' }`}> 
        <div className={`text-4xl font-bold ${theme.text} flex items-center gap-2`}>
          <img src={DeathIcon} alt="Ícone de morte" className={`w-10 h-10 object-contain {theme.iconFilter}`}/>
          <span>{deaths}</span>
        </div>
      </div>

      <div className="flex gap-6 justify-center mb-6">
        <button
          onClick={decreaseDeaths}
          className="bg-red-600 hover:bg-red-700 text-white text-2xl px-5 py-3 rounded-lg shadow-md hover:shadow-lg transition-transform hover:-translate-y-1"
        >
          -
        </button>
        <button
          onClick={increaseDeaths}
          className="bg-green-600 hover:bg-green-700 text-white text-2xl px-5 py-3 rounded-lg shadow-md hover:shadow-lg transition-transform hover:-translate-y-1"
        >
          +
        </button>
      </div>

      <button
        onClick={resetDeaths}
        className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg text-sm shadow hover:shadow-lg transition mb-4"
      >
        {t('reset_deaths')}
      </button>

      <div>
        <button
          onClick={gerarURL}
          disabled={manualWidgetId.trim() !== ''}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm shadow hover:shadow-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {t('generate_url')}
        </button>

        {urlCopiada && (
          <input
            type="text"
            value={url}
            readOnly
            onClick={copiarNovamente}
            className="mt-2 w-full text-sm text-zinc-400 bg-zinc-700 px-3 py-2 rounded cursor-pointer select-all hover:bg-gray-600"
            title="Clique para copiar novamente"
          />
        )}
        {mensagemCopiada && (
          <p className="text-green-400 text-xs mt-1 transition-opacity duration-300">{mensagemCopiada}</p>
        )}
      </div>
    </div>
  );
};

export default DeathCounter;
