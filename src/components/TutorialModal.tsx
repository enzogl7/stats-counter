import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';

interface Step {
  title: string;
  description: string;
  gif: string;
  video: string;
}

interface TutorialModalProps {
  onClose: () => void;
}

const TutorialModal: React.FC<TutorialModalProps> = ({ onClose }) => {
  const { t } = useTranslation();
  const [stepIndex, setStepIndex] = useState(0);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = 'auto'; };
  }, []);

  const steps: Step[] = [
    {
      title: t('tutorialModal.step1Title'),
      description: t('tutorialModal.step1Description'),
      gif: '/assets/step1.gif',
      video: ''
    },
    {
      title: t('tutorialModal.step2Title'),
      description: t('tutorialModal.step2Description'),
      gif: '/assets/step2.gif',
      video: ''
    },
    {
      title: t('tutorialModal.step3Title'),
      description: t('tutorialModal.step3Description'),
      gif: '',
      video: '/assets/step3.mp4'
    },
    {
      title: t('tutorialModal.step4Title'),
      description: t('tutorialModal.step4Description'),
      gif: '',
      video: '/assets/step4.mp4'
    },
    {
      title: t('tutorialModal.step5Title'),
      description: t('tutorialModal.step5Description'),
      gif: '/assets/step5.gif',
      video: ''
    },
  ];

  const nextStep = () => {
    if (stepIndex < steps.length - 1) {
      setStepIndex(prev => prev + 1);
    } else {
      onClose();
    }
  };

  const prevStep = () => {
    if (stepIndex > 0) setStepIndex(prev => prev - 1);
  };

  const current = steps[stepIndex];

  return (
    <AnimatePresence>
      <motion.div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
        <motion.div key={stepIndex} className="bg-gradient-to-r from-zinc-800/80 to-zinc-900/80 shadow-2xl relative mt-5 backdrop-blur-md border border-zinc-700/50 p-6 rounded-lg max-w-lg w-full text-center" initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -100, opacity: 0 }}
          transition={{ duration: 0.3 }}>
          {stepIndex === 0 && (
          <h1 className="text-2xl font-extrabold text-zinc-900 dark:text-white mb-2">
            {t('tutorialModal.mainTitle')}
            <hr className="border-zinc-600 my-1" />
          </h1> )}
          <h3 className="text-xl font-bold mb-4 text-zinc-900 dark:text-white">{current.title}</h3>
          <p className="text-zinc-700 dark:text-zinc-300 text-sm mb-6">{current.description}</p>

        {(current.gif || current.video) && (
            <div className="mb-4">
                {current.gif && (<img src={current.gif} alt="Tutorial passo" className="w-full h-64 object-contain rounded border border-zinc-600"/>)}
                {current.video && (<video src={current.video} autoPlay loop muted playsInline className="rounded-lg w-full max-h-80 object-contain shadow"/>
            )}
            </div>)}

          <div className="flex justify-between">
            <button onClick={prevStep} disabled={stepIndex === 0} className="px-5 py-2.5 rounded-md text-sm font-semibold bg-zinc-700 text-white shadow-md transition-colors duration-200 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-zinc-600">← {t('tutorialModal.back')}</button>
            {stepIndex < steps.length - 1 ? (
              <button onClick={nextStep} className="px-5 py-2.5 rounded-md text-sm font-semibold bg-blue-600 text-white shadow-md transition-colors duration-200 hover:bg-blue-700 hover:shadow-lg">{t('tutorialModal.next')} →</button>
            ) : (
              <button onClick={onClose} className="px-5 py-2.5 rounded-md text-sm font-semibold bg-green-600 text-white shadow-md transition-colors duration-200 hover:bg-green-700 hover:shadow-lg">{t('tutorialModal.finish')}</button>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default TutorialModal;