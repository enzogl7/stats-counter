import React from 'react';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDollarSign} from '@fortawesome/free-solid-svg-icons';

const SupportUs: React.FC = () => {
  const { t, i18n } = useTranslation();
  const isPortuguese = i18n.language.startsWith('pt');

  return (
    <>

{isPortuguese ? (
  <a href="https://nubank.com.br/cobrar/1h7ozc/6842eb05-279a-454b-b02a-e155a8f30bbe" target="_blank" rel="noopener noreferrer" className="relative inline-flex items-center justify-center px-5 py-2.5 rounded-xl text-sm font-medium text-white bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 shadow-md hover:shadow-lg transition-all duration-300 ease-out group overflow-hidden">
    <FontAwesomeIcon icon={faDollarSign} className="block sm:hidden pr-1" />
    <span className="hidden sm:block">Apoie via PIX</span>
    <span className="absolute inset-0 bg-white opacity-10 group-hover:opacity-20 transition duration-300 rounded-xl"></span>
  </a>
) : (
  <a href="https://buymeacoffee.com/ogl7" target="_blank" rel="noopener noreferrer" className="relative inline-flex items-center justify-center px-5 py-2.5 rounded-xl text-sm font-medium text-black bg-gradient-to-r from-yellow-400 to-yellow-300 hover:from-yellow-500 hover:to-yellow-400 shadow-md hover:shadow-lg transition-all duration-300 ease-out group overflow-hidden">
    <FontAwesomeIcon icon={faDollarSign} className="block sm:hidden pr-1" />
    <span className="hidden sm:block">Support with Buy Me a Coffee</span>
    <span className="absolute inset-0 bg-white opacity-10 group-hover:opacity-20 transition duration-300 rounded-xl"></span>
  </a>
)}

    </>
  );
};

export default SupportUs;
