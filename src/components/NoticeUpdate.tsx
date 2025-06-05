import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const NoticeUpdate: React.FC = () => {
  const { t } = useTranslation();
  const [visible, setVisible] = useState(true);
  if (!visible) return null;
  
  {/* NOTICE UPDATE HIDDEN NOW, SHOW WHEN HAVE TO EXPLAIN A NEW FUNCTIONALITY */}
  return (
    <div className="fixed top-0 left-0 right-0 bg-blue-500/30 backdrop-blur-md text-white px-6 py-3 shadow-lg z-60 rounded-b-2xl flex items-center justify-center hidden">
      <span className="w-full text-center text-sm sm:text-base">
        {t('notice_update')}
      </span>
      <button onClick={() => setVisible(false)} className=" absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 font-bold text-xl leading-none" aria-label="Fechar notificação">
        ×
      </button>
    </div>
  );
};

export default NoticeUpdate;
