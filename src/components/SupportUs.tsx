import React from 'react';
import { useTranslation } from 'react-i18next';

const SupportUs: React.FC = () => {
  const { t, i18n } = useTranslation();
  const isPortuguese = i18n.language.startsWith('pt');

  return (
    <div className="text-center mt-4">
      <p className="text-sm text-gray-300 mb-2">
        {t('support_us')}
      </p>

      {isPortuguese ? (
        <a href="https://nubank.com.br/cobrar/1h7ozc/68311061-d59d-4d4a-bee6-814f62eef197 " target="_blank" rel="noopener noreferrer" className="inline-block bg-green-600 text-white font-semibold px-4 py-2 rounded hover:bg-green-500 transition">
          Apoie via PIX
        </a>
      ) : (
        <a href="https://buymeacoffee.com/ogl7" target="_blank" rel="noopener noreferrer" className="inline-block bg-yellow-500 text-black font-semibold px-4 py-2 rounded hover:bg-yellow-400 transition">
          Buy me a coffee
        </a>
      )}
    </div>
  );
};

export default SupportUs;
