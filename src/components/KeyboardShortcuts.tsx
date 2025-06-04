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
    <div className="space-y-4 pb-4">
      <div>
        <h2 className="text-lg font-semibold text-white leading-tight mb-1">
          {t('hotkeys.title')}
        </h2>
        <p className="text-zinc-400 text-sm leading-relaxed italic">
          *{t('hotkeys.advice')}
        </p>
        <p className="text-zinc-400 text-sm leading-relaxed italic">
          *{t('hotkeys.reload_advice')}
        </p>
      </div>
      {Object.entries(shortcuts).map(([action, key]) => (
        <div key={action} className="flex items-center space-x-2">
          <label className="capitalize w-48">{t(`hotkeys.${action}`)}</label>
          <input type="text" value={key} onKeyDown={(e) => handleKeyDown(e, action as ShortcutAction)} readOnly className="border px-2 py-1 rounded w-40 text-center cursor-pointer bg-zinc-800 text-white"/>
          <button type="button" onClick={() => clearShortcut(action as ShortcutAction)} className="ml-2 px-2 py-1 bg-red-600 hover:bg-red-700 text-white rounded">
            X
          </button>
        </div>
      ))}
    </div>
  );
};

export default KeyboardShortcuts;
