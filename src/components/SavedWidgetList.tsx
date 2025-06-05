import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

interface SavedWidget {
  id: string;
  type: string;
  url: string;
}

const SavedWidgetList: React.FC = () => {
  const { t } = useTranslation();
  const [savedWidgets, setSavedWidgets] = useState<SavedWidget[]>([]);

  useEffect(() => {
    const widgetsFromStorage = localStorage.getItem('savedWidgets');
    if (widgetsFromStorage) {
      setSavedWidgets(JSON.parse(widgetsFromStorage));
    }
  }, []);

  const copyToClipboard = async (url: string) => {
    await navigator.clipboard.writeText(url);
    toast.warn(t('copy'));
  };

  const deleteWidget = (id: string) => {
    const updatedWidgets = savedWidgets.filter((widget) => widget.id !== id);
    setSavedWidgets(updatedWidgets);
    localStorage.setItem('savedWidgets', JSON.stringify(updatedWidgets));
  };

  return (
    <div className="rounded-xl mb-8 p-6 bg-gradient-to-r from-zinc-800/80 to-zinc-900/80 shadow-xl relative mt-5 backdrop-blur-md border border-zinc-700/50">
        <div className=" text-white text-center">
        <h3 className="text-xl font-bold mb-4">{(t('saved_widgets'))}</h3>
        {savedWidgets.length === 0 ? (
            <p className="text-zinc-400 text-sm">{(t('not_found_widgets'))}</p>) : (
        <ul className="space-y-4">
        {savedWidgets.map((widget) => (
            <li key={widget.id} className="bg-gradient-to-r from-zinc-800/80 to-zinc-900/80 rounded-xl overflow-hidden shadow-md transition-all duration-300 hover:shadow-lg hover:bg-zinc-800/80 border border-zinc-700/30 p-5 flex justify-between items-start"
            >
            <div className="flex-1 space-y-4">
                <div className="flex items-center justify-between mb-1">
                <span className="bg-blue-600 text-white text-center text-xs font-semibold px-2.5 py-1 rounded-md tracking-wide">
                    {widget.type === 'deaths' ? t('type_death') : widget.type === 'trophies' ? t('type_trophy') : widget.type.toUpperCase()}
                </span>
                </div>
                <div className="flex gap-6 w-full">
                <div className="flex-1 w-0">
                    <span className="text-zinc-400 text-sm font-medium mb-1 block">URL</span>
                    <a href={widget.url} target="_blank" rel="noopener noreferrer" className="bg-zinc-700/30 rounded-lg p-2 text-sm text-zinc-400 cursor-pointer transition-colors duration-200 hover:bg-zinc-700/50 truncate block"
                    title={widget.url}>
                    {widget.url}
                    </a>
                </div>

                <div className="flex-1 w-0">
                    <span className="text-zinc-400 text-sm font-medium mb-1 block">ID</span>
                    <div className="bg-zinc-700/30 rounded-lg p-2 text-sm text-zinc-400 cursor-pointer transition-colors duration-200 hover:bg-zinc-700/50 truncate"
                    onClick={() => copyToClipboard(widget.id)}
                    title={widget.id}>
                    {widget.id}
                    </div>
                </div>
                </div>
                
            </div>
            <button onClick={() => deleteWidget(widget.id)} className="text-white hover:bg-red-900 bg-red-500 transition-colors duration-200 p-2 rounded px-3 py-1 ml-4 cursor-pointer"
                aria-label="Delete widget">
                <FontAwesomeIcon icon={faTrash} />
            </button>
            </li>
        ))}
        </ul>

        )}
        </div>
    </div>

  );
};

export default SavedWidgetList;