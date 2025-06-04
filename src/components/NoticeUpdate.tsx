import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const NoticeUpdate: React.FC = () => {
  const { t } = useTranslation();
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="fixed top-0 left-0 right-0 bg-blue-600 text-white flex items-center justify-center py-2 px-4 shadow-2xl z-50 rounded-b-md mb-4">
      <span>{t('notice_update')}</span>
      <button onClick={() => setVisible(false)} className="ml-4 text-white hover:text-gray-300 font-bold text-lg leading-none" style={{ lineHeight: 1 }}>
        ×
      </button>
    </div>
  );
};

export default NoticeUpdate;
