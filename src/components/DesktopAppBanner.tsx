import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const DesktopAppBanner: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="mx-auto mb-5 w-full max-w-3xl">
      <motion.div
        className="relative overflow-hidden rounded-3xl border border-blue-400/25 bg-gradient-to-r from-zinc-900/92 via-[#0b1727]/95 to-slate-900/90 px-4 py-4 shadow-lg backdrop-blur-xl"
        initial={{ opacity: 0, y: -10, scale: 0.985 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        whileHover={{ y: -2, boxShadow: '0 18px 45px rgba(0, 0, 0, 0.32)' }}
        transition={{ duration: 0.45, ease: 'easeOut' }}
      >
        <motion.div
          className="pointer-events-none absolute inset-y-0 left-[-12%] w-40 bg-gradient-to-r from-transparent via-sky-300/16 to-transparent blur-2xl"
          animate={{ x: [0, 24, 0], opacity: [0.35, 0.55, 0.35] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="pointer-events-none absolute inset-y-0 right-[-12%] w-44 bg-gradient-to-l from-blue-500/14 via-cyan-300/6 to-transparent blur-3xl"
          animate={{ scale: [1, 1.08, 1], opacity: [0.2, 0.34, 0.2] }}
          transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-sky-200/55 to-transparent"
          animate={{ opacity: [0.45, 0.8, 0.45] }}
          transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <div className="flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:items-center sm:text-left">
          <div className="relative z-10 flex flex-col items-center gap-2 sm:items-start">
            <div className="inline-flex items-center">
              <motion.span
                className="bg-gradient-to-r from-white via-sky-200 via-[42%] to-blue-400 bg-clip-text text-2xl font-extrabold tracking-[0.04em] text-transparent drop-shadow-[0_0_18px_rgba(96,165,250,0.18)] sm:text-[2rem]"
                style={{ textShadow: '0 0 24px rgba(96, 165, 250, 0.24)' }}
                animate={{
                  filter: [
                    'drop-shadow(0 0 10px rgba(96, 165, 250, 0.10))',
                    'drop-shadow(0 0 18px rgba(96, 165, 250, 0.24))',
                    'drop-shadow(0 0 10px rgba(96, 165, 250, 0.10))'
                  ]
                }}
                transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut' }}
              >
                StatsCounter Desktop
              </motion.span>
              <motion.span
                className="absolute -inset-x-2 top-1/2 -z-10 h-8 -translate-y-1/2 bg-gradient-to-r from-transparent via-blue-300/14 to-transparent blur-xl"
                animate={{ opacity: [0.18, 0.32, 0.18], scaleX: [0.98, 1.03, 0.98] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
              />
            </div>

            <motion.p
              className="max-w-xl text-xs leading-relaxed text-zinc-200 sm:text-sm"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.12, duration: 0.35, ease: 'easeOut' }}
            >
              {t('desktop_app_notice.banner_text')}
            </motion.p>
          </div>

          <div className="relative z-10">
            <Link
            to="/desktop-app"
            className="relative z-10 inline-flex items-center justify-center gap-1.5 rounded-full border border-blue-300/30 bg-blue-500/10 px-3.5 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-blue-100 transition hover:border-sky-200/55 hover:bg-blue-500/15 hover:text-white"
            >
              <span className="relative z-10">{t('desktop_app_notice.learn_more')}</span>
              <span className="relative z-10 inline-flex">
                <FontAwesomeIcon icon={faArrowRight} className="text-[11px]" />
              </span>
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default DesktopAppBanner;
