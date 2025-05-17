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
    <div className="rounded-xl mb-8 p-6 bg-gradient-to-r from-zinc-800 to-zinc-900 shadow-lg">
        <div className=" text-white text-center">
        <h3 className="text-xl font-bold mb-4">{(t('saved_widgets'))}</h3>
        {savedWidgets.length === 0 ? (
            <p className="text-zinc-400 text-sm">{(t('not_found_widgets'))}</p>) : (
            <ul className="space-y-3">
            {savedWidgets.map((widget) => (
                <li key={widget.id} className="bg-zinc-700 p-4 rounded-md flex justify-between items-center">
                <div>
                    <p className="font-semibold">{widget.type.toUpperCase()}</p>
                    <a href={widget.url} target="_blank" rel="noopener noreferrer" className="mt-2 w-12 text-sm text-zinc-400 bg-zinc-700  rounded cursor-pointer select-all transition hover:bg-gray-500" >
                    {widget.url}
                    </a>
                    <br></br>
                    <p onClick={() => copyToClipboard(widget.id)} rel="noopener noreferrer" className="text-sm text-zinc-400 bg-zinc-700 rounded cursor-pointer select-all transition hover:bg-gray-500" >
                    {widget.id}
                    </p>
                </div>
                <button onClick={() => deleteWidget(widget.id)} className="bg-red-600 px-3 py-1 rounded text-sm hover:bg-red-900 transition cursor-pointer">
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