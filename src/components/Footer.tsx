import React from 'react';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';

const Footer: React.FC = () => {
    const { t } = useTranslation();

  return (
    <footer className=" text-zinc-300 text-sm py-6 mt-10">
      <div className="container mx-auto px-4 text-center">
        <p>{t('contact')} <a href="mailto:enzolima527@gmail.com" className="underline hover:text-white">enzolima527@gmail.com</a></p>
        <p>{t('feedback')} <a href="https://forms.gle/RkcfsdbdWv2tNT2Z9" className="underline hover:text-white">Google Forms</a></p>
        <p className="mt-2">&copy; {new Date().getFullYear()} StatsCounter. {t('copyright')}</p>
        <p>v1.1.0</p>
      <div className="relative inline-block mt-1">
      <a href="https://github.com/enzogl7/stats-counter" target="_blank" className="text-3xl text-white hover:text-zinc-300" title="GitHub project">
        <i className="fa fa-github"></i>
      </a>
    </div>
      </div>
    </footer>
  );
};

export default Footer;
