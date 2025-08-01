import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faGear, faQuestion } from '@fortawesome/free-solid-svg-icons';
import { motion, AnimatePresence } from 'framer-motion';
import LanguageSelector from './LanguageSelector';
import TutorialModalContent from './TutorialModal';
import KeyboardShortcuts from './KeyboardShortcuts';

const Settings: React.FC = () => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => setIsOpen(prev => !prev);
  const openModal = () => {
    setShowModal(true);
    setIsOpen(false);
  };
  const closeModal = () => setShowModal(false);
  const openTutorialModal = () => {
    setShowTutorial(true);
    setIsOpen(false);
  };
  const closeTutorialModal = () => setShowTutorial(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const modalRoot = document.getElementById('modal-root');

  return (
    <>
      <div className="relative inline-block text-left" ref={dropdownRef}>
        <button onClick={toggleDropdown} className="w-8 h-8 bg-zinc-800 hover:bg-zinc-700 transition-all rounded-lg flex items-center justify-center text-xl border border-zinc-600 cursor-pointer">
          <FontAwesomeIcon className="text-center text-zinc-400" icon={faCaretDown} />
        </button>
        {isOpen && (
<div className="absolute left-0 mt-2 w-40 bg-gradient-to-r from-zinc-800/80 to-zinc-900/80 backdrop-blur-xl border border-zinc-600 rounded shadow-lg z-50">
            <button onClick={openModal} className="block w-full text-left px-4 py-2 text-sm text-white hover:bg-zinc-700">
              <FontAwesomeIcon className="pr-1 text-zinc-400" icon={faGear} /> {t('settings')}
            </button>
            <hr className="border-zinc-600 my-1" />
            <button onClick={openTutorialModal} className="block w-full text-left px-4 py-2 text-sm text-white hover:bg-zinc-700">
              <FontAwesomeIcon className="pr-1 text-zinc-400" icon={faQuestion} /> {t('tutorial')}
            </button>
          </div>
        )}
      </div>

      {modalRoot && createPortal(
        <AnimatePresence>
          {showModal && (
            <motion.div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black bg-opacity-70" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <motion.div className="rounded-xl max-w-md w-full mb-8 p-6 bg-gradient-to-r from-zinc-800/80 to-zinc-900/80 shadow-2xl relative mt-5 backdrop-blur-md border border-zinc-700/50" initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.3 }}>
                <h2 className="text-xl text-center font-bold mb-4 text-zinc-900 dark:text-white">{t('settings')}</h2>
                <hr className="border-zinc-600 my-1" />
                <LanguageSelector />
                <KeyboardShortcuts />
                <div className="flex justify-end">
                  <button onClick={closeModal} className="px-4 py-2 bg-zinc-700 hover:bg-zinc-600 rounded-lg text-white transition cursor-pointer">
                    {t('close')}
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        modalRoot
      )}

      {modalRoot && createPortal(
        <AnimatePresence>
          {showTutorial && (
            <motion.div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black bg-opacity-70" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <motion.div className="bg-white dark:bg-zinc-800 p-6 rounded-xl shadow-2xl max-w-md w-full relative border border-zinc-700" initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.3 }}>
                <TutorialModalContent onClose={closeTutorialModal} />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        modalRoot
      )}
    </>
  );
};

export default Settings;
