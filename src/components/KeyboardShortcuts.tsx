import React, { useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

const defaultShortcuts = {
  increaseDeaths: 'ArrowUp',
  decreaseDeaths: 'ArrowDown',
  increaseTrophies: 'ArrowRight',
  decreaseTrophies: 'ArrowLeft',
} as const;

type ShortcutKey = string;
type ShortcutAction = keyof typeof defaultShortcuts;

const KeyboardShortcuts: React.FC = () => {
  const { t } = useTranslation();
  const [shortcuts, setShortcuts] = useState<Record<ShortcutAction, ShortcutKey>>(() => {
    try {
      const saved = localStorage.getItem('stats-shortcuts');
      return saved ? JSON.parse(saved) : defaultShortcuts;
    } catch {
      return defaultShortcuts;
    }
  });

  const handleChange = useCallback((action: ShortcutAction, key: ShortcutKey) => {
    const updated = { ...shortcuts, [action]: key };
    setShortcuts(updated);
    localStorage.setItem('stats-shortcuts', JSON.stringify(updated));
  }, [shortcuts]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>, action: ShortcutAction) => {
    e.preventDefault();

    if (e.key === 'Control' || e.key === 'Shift' || e.key === 'Alt' || e.key === 'Meta') {
      return;
    }

    const keys: string[] = [];
    if (e.ctrlKey) keys.push('Ctrl');
    if (e.altKey) keys.push('Alt');
    if (e.shiftKey) keys.push('Shift');
    if (e.metaKey) keys.push('Meta');

    const keyName = e.key.length === 1 ? e.key.toUpperCase() : e.key;

    keys.push(keyName);

    const shortcut = keys.join('+');
    handleChange(action, shortcut);
  }, [handleChange]);

  const clearShortcut = (action: ShortcutAction) => {
    handleChange(action, '');
  };

  return (
    <div className="space-y-8 pb-8 max-w-md mx-auto">
      <div>
        <h2 className="text-2xl font-bold text-white mb-4 border-b border-zinc-700 pb-3 tracking-wide">{t('hotkeys.title')}</h2>
        {[ 'browser_advice', 'advice', 'reload_advice' ].map((key) => (
          <p key={key} className="text-zinc-400 text-sm italic mb-2 select-text leading-relaxed">{`*${t(`hotkeys.${key}`)}`}</p>
        ))}
      </div>
      {Object.entries(shortcuts).map(([action, key]) => (
        <div key={action} className="flex items-center space-x-4">
          <label className="capitalize w-44 text-zinc-300 font-semibold">{t(`hotkeys.${action}`)}</label>
          <input type="text" value={key} onKeyDown={(e) => handleKeyDown(e, action as ShortcutAction)} readOnly title={t(`hotkeys.${action}_description`) || ''} className="flex-1 bg-zinc-900 text-white rounded border border-zinc-600 px-4 py-2 text-center cursor-pointer transition focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-1"/>
          <button type="button" onClick={() => clearShortcut(action as ShortcutAction)} aria-label={t('hotkeys.clear_shortcut')} className="text-white bg-red-600 hover:bg-red-700 rounded px-4 py-2 font-semibold transition focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-1">
            ×
          </button>
        </div>
      ))}
    </div>
  );
};

export default KeyboardShortcuts;
