import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDesktop, faKeyboard, faWandMagicSparkles } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

interface NoticeUpdateProps {
  onClose: () => void;
}

const NoticeUpdate: React.FC<NoticeUpdateProps> = ({ onClose }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  const highlights = [
    {
      icon: faKeyboard,
      text: t('desktop_app_notice.highlight_hotkeys')
    },
    {
      icon: faDesktop,
      text: t('desktop_app_notice.highlight_focus')
    },
    {
      icon: faWandMagicSparkles,
      text: t('desktop_app_notice.highlight_features')
    }
  ];

  const handleLearnMore = () => {
    onClose();
    navigate('/desktop-app');
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="w-full max-w-xl rounded-2xl border border-zinc-700/50 bg-gradient-to-br from-zinc-800/90 to-zinc-900/90 p-6 text-white shadow-2xl backdrop-blur-md"
          initial={{ scale: 0.92, opacity: 0, y: 18 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.92, opacity: 0, y: 18 }}
          transition={{ duration: 0.3 }}
        >
          <div className="mb-4 inline-flex items-center rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-300">
            {t('desktop_app_notice.badge')}
          </div>

          <h2 className="mb-3 text-2xl font-bold text-white">
            {t('desktop_app_notice.title')}
          </h2>

          <p className="mb-3 text-sm leading-relaxed text-zinc-200">
            {t('desktop_app_notice.description')}
          </p>

          <p className="mb-5 text-sm leading-relaxed text-zinc-300">
            {t('desktop_app_notice.complement')}
          </p>

          <div className="mb-6 grid gap-3">
            {highlights.map((item) => (
              <div
                key={item.text}
                className="flex items-center gap-3 rounded-xl border border-zinc-700/60 bg-zinc-900/60 px-4 py-3 text-left"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/15 text-blue-300">
                  <FontAwesomeIcon icon={item.icon} />
                </div>
                <p className="text-sm text-zinc-100">{item.text}</p>
              </div>
            ))}
          </div>

          <motion.button
            onClick={handleLearnMore}
            className="w-full cursor-pointer rounded-xl bg-blue-600 px-4 py-3 font-semibold text-white transition hover:bg-blue-700"
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
          >
            {t('desktop_app_notice.cta')}
          </motion.button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default NoticeUpdate;
