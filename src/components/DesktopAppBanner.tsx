import React from 'react';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle, faDesktop } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const DesktopAppBanner: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="mx-auto mb-5 w-full max-w-3xl">
      <div className="rounded-3xl border border-zinc-700/60 bg-gradient-to-r from-zinc-900/88 to-zinc-800/88 px-4 py-3 shadow-lg backdrop-blur-xl">
        <div className="flex flex-col items-center justify-between gap-3 text-center sm:flex-row sm:text-left">
          <div className="flex flex-col items-center gap-2 sm:flex-row sm:text-xs">
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/25 bg-emerald-500/10 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-300">
            <FontAwesomeIcon icon={faCircle} className="text-[7px]" />
            {t('desktop_app_notice.badge')}
          </span>

            <span className="hidden text-zinc-500 sm:inline">|</span>

            <span className="inline-flex items-center gap-2 text-[11px] leading-relaxed text-zinc-200 sm:text-xs">
              <FontAwesomeIcon icon={faDesktop} className="text-zinc-400" />
              {t('desktop_app_notice.banner_text')}
            </span>
          </div>

          <Link
            to="/desktop-app"
            className="inline-flex items-center justify-center rounded-full bg-blue-600 px-4 py-2 text-xs font-semibold text-white transition hover:bg-blue-700"
          >
            {t('desktop_app_notice.learn_more')}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DesktopAppBanner;
