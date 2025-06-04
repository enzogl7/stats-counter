import React from 'react';
import LanguageSelector from './LanguageSelector';
import { useTranslation } from 'react-i18next';
import SupportUs from './SupportUs';
import Settings from './Settings';

const Header: React.FC = () => {
  const { t } = useTranslation();

  return (
    <header className="rounded-xl mb-8 p-6 bg-gradient-to-r from-zinc-800 to-zinc-900 shadow-lg relative">
      <h1 className="text-4xl font-bold tracking-tight text-center">
        StatsCounter
      </h1>
      <div className="absolute top-6 right-6">
        <Settings />
      </div>
      <p className="text-center mt-2 max-w-md mx-auto">
        {t('description')}
      </p>
      <SupportUs />
    </header>
  );

};

export default Header;
