import React from 'react';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';

const Footer: React.FC = () => {
    const { t } = useTranslation();
    const [showOnce, setShowOnce] = useState(false);
    const [hovering, setHovering] = useState(false);

    useEffect(() => {
      const seen = localStorage.getItem('githubBalloonSeen');
      if (!seen) {
        setShowOnce(true);
        localStorage.setItem('githubBalloonSeen', 'true');
      }
    }, []);

  const showTooltip = showOnce || hovering;
  return (
    <footer className="bg-zinc-900 text-zinc-300 text-sm py-6 mt-10">
      <div className="container mx-auto px-4 text-center">
        <p>{t('contact')} <a href="mailto:enzolima527@gmail.com" className="underline hover:text-white">enzolima527@gmail.com</a></p>
        <p>{t('feedback')} <a href="https://forms.gle/RkcfsdbdWv2tNT2Z9" className="underline hover:text-white">Google Forms</a></p>
        <p className="mt-2">&copy; {new Date().getFullYear()} StatsCounter. {t('copyright')}</p>
      <div className="relative inline-block mt-4" onMouseEnter={() => setHovering(true)} onMouseLeave={() => setHovering(false)}>
      <a href="https://github.com/enzogl7/stats-counter" target="_blank" className="text-3xl text-white hover:text-zinc-300" title="GitHub project">
        <i className="fa fa-github"></i>
      </a>
      {showTooltip && (
        <div className="absolute -top-16 left-1/2 -translate-x-1/2 bg-zinc-800 text-white text-xs px-3 py-2 rounded shadow-lg w-max z-10 animate-fade">
          ⭐ {t('give_star_github')}
          <div className="absolute left-1/2 -bottom-2 w-3 h-3 bg-zinc-800 rotate-45 -translate-x-1/2"></div>
        </div>
      )}
    </div>
      </div>
    </footer>
  );
};

export default Footer;
