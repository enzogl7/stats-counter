import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faTimes } from '@fortawesome/free-solid-svg-icons';

const Supporters: React.FC = () => {
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const supportersList = [
    { name: 'Plateus Gaming - BR', url: 'https://www.youtube.com/@Plateus.Gaming' },
    { name: 'Mark Alston - USA', url: 'https://www.youtube.com' },
  ];

  const modalContent = (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-zinc-900 text-black dark:text-white rounded-xl p-6 w-full max-w-md shadow-lg relative">
        <h2 className="text-xl text-center font-bold mb-4 text-zinc-900 dark:text-white">{t('supporters.title')}</h2>
        <hr className="border-zinc-600 my-1" />
        <h3 className="mt-3 font-bold text-center">
          {t('supporters.desc')}
        </h3>

        <ul className="space-y-2 mt-4 mb-1">
          {supportersList.map((supporter, index) => (
            <li key={index}>
              <a href={supporter.url} target="_blank" rel="noopener noreferrer"  className="block w-full text-center px-4 py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition-all">
                {supporter.name}
              </a>
            </li>
          ))}
        </ul>
        <span className='text-zinc-400 text-sm italic mb-2 select-text leading-relaxed text-center'>{t('supporters.warn')}</span>
        <hr className="border-zinc-600 mt-3" />

        <div className="flex justify-end mt-2">
          <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 bg-zinc-700 hover:bg-zinc-600 rounded-lg text-white transition cursor-pointer">
            {t('close')}
          </button>
        </div>
      </div>
    </div>
  );


  return (
    <>
      <button
        title={t('supporters.title')}
        onClick={() => setIsModalOpen(true)}
        className="cursor-pointer relative inline-flex items-center justify-center px-4 py-3 rounded-xl
        text-sm font-medium bg-gradient-to-r from-blue-500 to-blue-400 hover:from-blue-600 hover:to-blue-500
        shadow-md hover:shadow-lg transition-all duration-300 ease-out group overflow-hidden"
      >
        <FontAwesomeIcon icon={faHeart} className="block sm:hidden" />
        <span className="absolute inset-0 bg-white opacity-10 group-hover:opacity-20 transition duration-300 rounded-xl"></span>
      </button>

      {isModalOpen && ReactDOM.createPortal(modalContent, document.getElementById('modal-root')!)}
    </>
  );
};

export default Supporters;
