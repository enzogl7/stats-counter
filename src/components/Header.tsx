import React from 'react';
import LanguageSelector from './LanguageSelector';
import { useTranslation } from 'react-i18next';
import SupportUs from './SupportUs';

const Header: React.FC = () => {
  const { t } = useTranslation();

  return (
  <header className="rounded-xl mb-8 p-6 bg-gradient-to-r from-zinc-800 to-zinc-900 shadow-lg">
    <div className="flex items-center justify-center gap-3 mb-2">
      <h1 className="text-4xl font-bold tracking-tight">
        StatsCounter
      </h1>
    </div>
    <p className="text-center mt-2 max-w-md mx-auto">
        {t('description')}
    </p>
    <LanguageSelector />
    <SupportUs />
  </header>
  );
};




export default Header;
