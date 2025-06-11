import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';

interface ModalProps {
  onClose: () => void;
}

const UpdatesModal: React.FC<ModalProps> = ({ onClose }) => {
  const { t } = useTranslation();

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = 'auto'; };
  }, []);

  return (
    <AnimatePresence>
      <motion.div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
        <motion.div className="bg-gradient-to-r from-zinc-800/80 to-zinc-900/80 p-6 rounded-lg shadow-lg max-w-lg w-full text-center" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ duration: 0.3 }}>
          <h2 className="text-2xl font-bold mb-4 text-zinc-900 dark:text-white">
            {t('modal.welcome')}
          </h2>
          <p className="text-zinc-700 dark:text-zinc-300 mb-4 text-sm">
            {t('modal.intro')}
            <p>{t('modal.step_generate')}</p>
            <p>{t('modal.step_use_obs')}</p>
            <hr className='text-zinc-600 mt-2 mb-2'></hr>
            <p className="text-2xl font-bold mb-2 text-zinc-900 dark:text-white">{t('modal.support_us_title')}</p>
            <p>{t('modal.support_us_update')}</p>
          </p>
          <button onClick={onClose} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition shadow">
            {t('modal.cta')}
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default UpdatesModal;
