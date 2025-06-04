import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { faGear } from '@fortawesome/free-solid-svg-icons';
import { faQuestion } from '@fortawesome/free-solid-svg-icons';

const Settings: React.FC = () => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsOpen(prev => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button onClick={toggleDropdown} className="w-8 h-8 bg-zinc-800 hover:bg-zinc-600 transition-all rounded-lg flex items-center justify-center text-xl border border-zinc-600 cursor-pointer">
        <FontAwesomeIcon className="text-center text-zinc-400" icon={faCaretDown} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-40 bg-zinc-800 border border-zinc-600 rounded-lg shadow-lg z-50">
          <button onClick={() => console.log('Abrir configurações')} className="block w-full text-left px-4 py-2 text-sm text-white hover:bg-zinc-700">
            <FontAwesomeIcon className="pr-1 text-zinc-400" icon={faGear} /> {t('settings')}
          </button>
          <hr className="border-zinc-600 my-1" />
          <button onClick={() => console.log('Abrir tutotrial')} className="block w-full text-left px-4 py-2 text-sm text-white hover:bg-zinc-700">
            <FontAwesomeIcon className="pr-1 text-zinc-400" icon={faQuestion} /> {t('tutorial')}
          </button>
        </div>
      )}
    </div>
  );
};

export default Settings;
