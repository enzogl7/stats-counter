import React from 'react';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle, faDesktop } from '@fortawesome/free-solid-svg-icons';

const DesktopAppBanner: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="mx-auto mb-5 w-full max-w-3xl">
      <div className="rounded-full border border-zinc-700/60 bg-gradient-to-r from-zinc-900/88 to-zinc-800/88 px-4 py-2 shadow-lg backdrop-blur-xl">
        <div className="flex items-center justify-center gap-3 text-center text-[11px] text-zinc-200 sm:text-xs">
          <span className="inline-flex items-center gap-2 rounded-full border border-blue-500/25 bg-blue-500/10 px-2.5 py-1 font-semibold uppercase tracking-[0.18em] text-blue-300">
            <FontAwesomeIcon icon={faCircle} className="text-[7px]" />
            {t('desktop_app_notice.badge')}
          </span>

          <span className="hidden text-zinc-500 sm:inline">|</span>

          <span className="inline-flex items-center gap-2 leading-relaxed text-zinc-200">
            <FontAwesomeIcon icon={faDesktop} className="text-zinc-400" />
            {t('desktop_app_notice.banner_text')}
          </span>
        </div>
      </div>
    </div>
  );
};

export default DesktopAppBanner;
