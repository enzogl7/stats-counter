import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';

interface NoticeUpdateProps {
  onClose: () => void;
}

const NoticeUpdate: React.FC<NoticeUpdateProps> = ({ onClose }) => {
  const { t } = useTranslation();

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div className="bg-gradient-to-br from-zinc-800/80 to-zinc-900/80 p-6 rounded-xl shadow-2xl text-white max-w-md w-full text-center"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-4"
          >
            <div className="text-4xl mb-2 animate-bounce">✨</div>
            <h2 className="text-2xl font-bold">{t('new_version.title')}</h2>
            <p className="mt-2 text-sm opacity-90">
              {t('new_version.description')} <br />
              {t('new_version.thanks')}
            </p>
          </motion.div>

          <motion.button onClick={onClose} className="mt-6 bg-white cursor-pointer text-black font-bold px-4 py-2 rounded-full shadow-3xl hover:bg-zinc-100 transition" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            {t('new_version.cta')}
          </motion.button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default NoticeUpdate;
