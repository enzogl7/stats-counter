import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { useWidgetLoader } from '../hooks/useWidgetLoader';

interface CustomTextCounterProps {
}

const CustomTextCounter: React.FC<CustomTextCounterProps> = (props) => {
  const { t } = useTranslation();
  const [manualWidgetId, setManualWidgetId] = useState('');
  const [loadedWidgetData, setLoadedWidgetData] = useState<any>(null);
  const { carregando, carregarWidgetPorId } = useWidgetLoader();

  const carregarWidgetManual = async () => {
    const widgetData = await carregarWidgetPorId(manualWidgetId, 'custom_text');

    if (widgetData) {
      setLoadedWidgetData(widgetData);
      console.log("Widget carregado:", widgetData);
    }
  };


  return (
    <div className="flex-1 rounded-xl mb-8 p-6 bg-gradient-to-r from-zinc-800/80 to-zinc-900/80 shadow-2xl relative mt-5 backdrop-blur-md border border-zinc-700/50 transition-all duration-200 text-center transform hover:-translate-y-1 active:translate-y-0">
      <h2 className="text-2xl font-semibold mb-4 text-white">{t('customCounter.title')}</h2>

      <div className="text-left mb-4">
        <label htmlFor="manualWidgetId" className="text-sm mt-4 text-zinc-400 block mb-1">
          {t('manual_id_widget')}
        </label>
        <div className="flex gap-2">
          <input id="manualWidgetId" value={manualWidgetId} onChange={(e) => setManualWidgetId(e.target.value)} placeholder="ex: c5s29bf2-..." className="bg-zinc-700 text-white rounded-lg px-3 py-1.5 w-full h-10 leading-tight" disabled={carregando}/>
          <button onClick={carregarWidgetManual} disabled={carregando} className="font-medium bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white px-3 py-2 rounded-lg text-sm shadow hover:shadow-lg transition whitespace-nowrap">
            {carregando ? (
              <FontAwesomeIcon icon={faSpinner} spin className="h-4 w-4" />
            ) : (
              t('load_widget')
            )}
          </button>
        </div>
      </div>
      
       <hr className="text-zinc-600 w-full mb-4" />



    </div>
  );
};

export default CustomTextCounter;