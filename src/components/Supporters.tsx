import React from 'react';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

const Supporters: React.FC = () => {
  const { t, i18n } = useTranslation();
  const isPortuguese = i18n.language.startsWith('pt');

  return (
    <>

  <button title={t('supporters')} className="cursor-pointer relative inline-flex items-center justify-center px-4 py-2.5 rounded-xl
   text-sm font-medium bg-gradient-to-r from-blue-500 to-blue-400 hover:from-blue-600 hover:to-blue-500
   shadow-md hover:shadow-lg transition-all duration-300 ease-out group overflow-hidden">
    <FontAwesomeIcon icon={faHeart} className="block sm:hidden" />
    <span className="hidden sm:block group-hover:opacity-20 transition duration-300"></span>
    <span className="absolute inset-0 bg-white opacity-10 group-hover:opacity-20 transition duration-300 rounded-xl"></span>
  </button>

    </>
  );
};

export default Supporters;
