import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown, faArrowLeft, faArrowRight, faArrowUp, faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import { motion, useInView } from 'framer-motion';
import DeathIcon from '../assets/death-icon.png';
import PlatIcon from '../assets/plat-icon.png';

const MAX_DEATHS = 99;
const TROPHY_TOTAL = 5;
const PRESS_COOLDOWN_MS = 250;
const PRESS_ANIMATION_MS = 140;

// Illustrative hotkeys (the desktop app ships with none set), laid out as an arrow-key cluster
const KEYS = [
  { code: 'ArrowUp', icon: faArrowUp, counter: 'deaths', delta: 1, col: 'col-start-2' },
  { code: 'ArrowLeft', icon: faArrowLeft, counter: 'trophies', delta: -1, col: 'col-start-1' },
  { code: 'ArrowDown', icon: faArrowDown, counter: 'deaths', delta: -1, col: 'col-start-2' },
  { code: 'ArrowRight', icon: faArrowRight, counter: 'trophies', delta: 1, col: 'col-start-3' },
] as const;

type HotkeyCode = (typeof KEYS)[number]['code'];

const HotkeysDemo: React.FC = () => {
  const { t } = useTranslation();
  const [deaths, setDeaths] = useState(0);
  const [trophies, setTrophies] = useState(0);
  const [pressed, setPressed] = useState<HotkeyCode | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.6 });
  const onCooldown = useRef(false);
  const cooldownTimeout = useRef<ReturnType<typeof setTimeout>>();
  const pressTimeout = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => () => {
    clearTimeout(cooldownTimeout.current);
    clearTimeout(pressTimeout.current);
  }, []);

  // ponytail: same throttle idea as the Twitch demo, so spamming keys can't thrash the counters
  const press = (code: HotkeyCode) => {
    setPressed(code);
    clearTimeout(pressTimeout.current);
    pressTimeout.current = setTimeout(() => setPressed(null), PRESS_ANIMATION_MS);

    if (onCooldown.current) return;
    onCooldown.current = true;
    cooldownTimeout.current = setTimeout(() => { onCooldown.current = false; }, PRESS_COOLDOWN_MS);

    const key = KEYS.find((k) => k.code === code)!;
    if (key.counter === 'deaths') setDeaths((d) => Math.min(MAX_DEATHS, Math.max(0, d + key.delta)));
    else setTrophies((tr) => Math.min(TROPHY_TOTAL, Math.max(0, tr + key.delta)));
  };

  // Real arrow keys only drive the demo while it is on screen
  useEffect(() => {
    if (!inView) return;
    const onKeyDown = (e: KeyboardEvent) => {
      const key = KEYS.find((k) => k.code === e.key);
      if (!key || e.ctrlKey || e.metaKey || e.altKey) return;
      if ((e.target as HTMLElement).closest('input, textarea, select, [contenteditable]')) return;
      e.preventDefault();
      if (!e.repeat) press(key.code);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [inView]);

  const counters = [
    { icon: DeathIcon, value: `${deaths}` },
    { icon: PlatIcon, value: `${trophies} / ${TROPHY_TOTAL}` },
  ];

  return (
    <div ref={ref} className="flex flex-col items-center gap-5">
      <div className="flex flex-wrap justify-center gap-3">
        {counters.map((c) => (
          <div
            key={c.icon}
            className="flex h-16 w-[150px] items-center justify-center gap-2.5 rounded-full"
            style={{ background: 'var(--field)', border: '1px solid var(--line-accent)', boxShadow: '0 0 26px var(--line-accent)' }}
          >
            <img src={c.icon} alt="" className="h-7 w-7 object-contain" />
            <motion.span
              key={c.value}
              animate={{ scale: [1, 1.18, 1] }}
              transition={{ duration: 0.42, ease: [0.2, 0.9, 0.25, 1] }}
              className="dal-display inline-block text-[30px] leading-none tracking-[0.03em] text-white"
              style={{ textShadow: '0 0 14px var(--text-glow)' }}
            >
              {c.value}
            </motion.span>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-2">
        {KEYS.map((k) => {
          const isPressed = pressed === k.code;
          const label = `${t(k.counter)} ${k.delta > 0 ? '+1' : '−1'}`;
          return (
            <motion.button
              key={k.code}
              type="button"
              aria-label={label}
              title={label}
              onClick={() => press(k.code)}
              animate={{ y: isPressed ? 3 : 0 }}
              transition={{ duration: 0.08 }}
              className={`${k.col} flex h-16 w-16 flex-col items-center justify-center gap-1 rounded-xl`}
              style={{
                background: isPressed ? 'var(--info-soft)' : 'var(--tint)',
                border: `1px solid ${isPressed ? 'var(--info-line)' : 'var(--line-2)'}`,
                borderBottomWidth: isPressed ? 1 : 4,
              }}
            >
              <FontAwesomeIcon icon={k.icon} className="text-sm" style={{ color: 'var(--ink-2)' }} />
              <span className="flex items-center gap-1">
                <img src={k.counter === 'deaths' ? DeathIcon : PlatIcon} alt="" className="h-3.5 w-3.5 object-contain" />
                <span className="dal-mono text-[11px] font-bold" style={{ color: k.delta > 0 ? 'var(--inc)' : 'var(--dec)' }}>
                  {k.delta > 0 ? '+1' : '−1'}
                </span>
              </span>
            </motion.button>
          );
        })}
      </div>

      <p className="flex items-center gap-1.5 text-center text-xs" style={{ color: 'var(--ink-3)' }}>
        <FontAwesomeIcon icon={faCircleInfo} />
        {t('desktop_app_landing.current_features.hotkeys_demo_hint')}
      </p>
    </div>
  );
};

export default HotkeysDemo;
