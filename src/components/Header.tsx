import React from 'react';
import { useTranslation } from 'react-i18next';
import SupportUs from './SupportUs';
import Settings from './Settings';
import Supporters from './Supporters'

const Header: React.FC = () => {
  const { t } = useTranslation();

  return (
    <header
      className="rounded-xl bg-gradient-to-r from-zinc-800/80 to-zinc-900/80 shadow-xl backdrop-blur-xl border border-zinc-700/50 
                 flex flex-col md:flex-row items-center justify-between px-6 py-3 z-[10] relative"
      style={{
        maxWidth: 'calc(100vw - 2rem)',
        boxShadow: '0 0 8px 3px rgba(255, 255, 255, 0.08)'
      }}
    >
      {/* Título e descrição */}
      <div className="flex flex-col max-w-lg w-full md:w-auto items-center md:items-start">
        <h1 className="text-3xl font-extrabold tracking-wide bg-gradient-to-r from-white via-zinc-400 to-zinc-500 bg-clip-text text-transparent whitespace-nowrap">
          StatsCounter
        </h1>
        <p className="hidden md:block text-zinc-300 text-xs md:text-sm mt-1">{t('description')}</p>
      </div>

      {/* Botões */}
      <div className="flex w-full justify-center space-x-5 mt-3 md:mt-0 md:w-auto md:justify-start">
        <SupportUs />
        <Supporters />
        <Settings />
      </div>
    </header>
  );
};


export default Header;
