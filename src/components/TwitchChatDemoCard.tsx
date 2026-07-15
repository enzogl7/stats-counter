import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo, faComment } from '@fortawesome/free-solid-svg-icons';
import { motion, AnimatePresence } from 'framer-motion';
import DeathIcon from '../assets/death-icon.png';
import PlatIcon from '../assets/plat-icon.png';

const CHAT_SENDER = 'StatsCounter';
const CHAT_SENDER_COLOR = '#a970ff';
const TROPHY_TOTAL = 5;
const MAX_DEATHS = 5;
const CLICK_COOLDOWN_MS = 350;

interface ChatMessage {
  id: number;
  text: string;
}

const TwitchChatDemoCard: React.FC = () => {
  const { t } = useTranslation();
  const [deaths, setDeaths] = useState(0);
  const [trophies, setTrophies] = useState(0);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [onCooldown, setOnCooldown] = useState(false);
  const chatBoxRef = useRef<HTMLDivElement>(null);
  const nextId = useRef(0);
  const cooldownTimeout = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    const box = chatBoxRef.current;
    if (box) box.scrollTop = box.scrollHeight;
  }, [messages]);

  useEffect(() => () => clearTimeout(cooldownTimeout.current), []);

  const postMessage = (text: string) => {
    nextId.current += 1;
    setMessages((prev) => [...prev.slice(-19), { id: nextId.current, text }]);
  };

  // ponytail: throttles clicks so spamming the demo can't flood the chat list or thrash layout
  const withCooldown = (action: () => void) => {
    if (onCooldown) return;
    action();
    setOnCooldown(true);
    cooldownTimeout.current = setTimeout(() => setOnCooldown(false), CLICK_COOLDOWN_MS);
  };

  const increaseDeaths = () => withCooldown(() => {
    if (deaths >= MAX_DEATHS) return;
    const newVal = deaths + 1;
    setDeaths(newVal);
    postMessage(t('desktop_app_landing.current_features.twitch_demo_death_message', { count: newVal }));
  });

  const increaseTrophies = () => withCooldown(() => {
    if (trophies >= TROPHY_TOTAL) return;
    const newVal = trophies + 1;
    setTrophies(newVal);
    postMessage(t('desktop_app_landing.current_features.twitch_demo_trophy_message', { earned: newVal, total: TROPHY_TOTAL }));
  });

  return (
    <motion.div
      className="dal-feature-card rounded-xl p-6"
      style={{ background: 'var(--bg-3)', border: '1px solid var(--line)' }}
      whileHover={{ y: -3, transition: { duration: 0.22, ease: [0.22, 1, 0.36, 1] } }}
    >
      <div className="flex items-center justify-between gap-2">
        <span className="font-mono text-[11px] font-medium" style={{ color: 'var(--ink-4)' }}>02</span>
        <span
          className="rounded-full px-2.5 py-0.5 font-mono text-[9px] font-bold uppercase tracking-[0.16em]"
          style={{ background: 'rgba(145,70,255,0.12)', border: '1px solid rgba(145,70,255,0.35)', color: '#a970ff' }}
        >
          TWITCH
        </span>
      </div>

      <div className="mt-4 flex items-center gap-2.5">
        <FontAwesomeIcon icon={faComment} style={{ color: '#a970ff', fontSize: '1rem', flexShrink: 0 }} />
        <h3 className="font-semibold leading-snug" style={{ color: 'var(--ink)', fontSize: '0.9375rem' }}>
          {t('desktop_app_landing.current_features.twitch_title')}
        </h3>
      </div>

      <p className="mt-3 text-sm" style={{ color: 'var(--ink-2)', lineHeight: 1.75 }}>
        {t('desktop_app_landing.current_features.twitch_description')}
      </p>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        {/* Counter templates */}
        <div className="flex flex-col gap-3">
          <div className="rounded-lg p-4 text-center" style={{ background: 'var(--bg-2)', border: '1px solid var(--line-2)' }}>
            <p className="mb-2 text-xs font-medium" style={{ color: 'var(--ink-3)' }}>
              {t('desktop_app_landing.current_features.twitch_demo_death_label')}
            </p>
            <div className="mx-auto mb-3 flex h-16 w-32 items-center justify-center gap-2 rounded-full bg-zinc-800">
              <img src={DeathIcon} alt="" className="h-7 w-7 object-contain" />
              <motion.span key={deaths} initial={{ scale: 1 }} animate={{ scale: [1.05, 0.95, 1] }} transition={{ duration: 0.3 }} className="text-2xl font-bold text-red-400">
                {deaths}
              </motion.span>
            </div>
            <div className="flex justify-center gap-2">
              <button
                type="button"
                disabled={onCooldown}
                onClick={() => withCooldown(() => setDeaths((d) => Math.max(0, d - 1)))}
                className="rounded-lg bg-red-600 px-3 py-1.5 text-sm font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                -
              </button>
              <button
                type="button"
                disabled={onCooldown}
                onClick={increaseDeaths}
                className="rounded-lg bg-green-600 px-3 py-1.5 text-sm font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                +
              </button>
            </div>
          </div>

          <div className="rounded-lg p-4 text-center" style={{ background: 'var(--bg-2)', border: '1px solid var(--line-2)' }}>
            <p className="mb-2 text-xs font-medium" style={{ color: 'var(--ink-3)' }}>
              {t('desktop_app_landing.current_features.twitch_demo_trophy_label')}
            </p>
            <div className="mx-auto mb-3 flex h-16 w-32 items-center justify-center gap-2 rounded-full bg-zinc-800">
              <img src={PlatIcon} alt="" className="h-7 w-7 object-contain" />
              <motion.span key={trophies} initial={{ scale: 1 }} animate={{ scale: [1.05, 0.95, 1] }} transition={{ duration: 0.3 }} className="text-xl font-bold text-white">
                {trophies} / {TROPHY_TOTAL}
              </motion.span>
            </div>
            <div className="flex justify-center gap-2">
              <button
                type="button"
                disabled={onCooldown}
                onClick={() => withCooldown(() => setTrophies((tr) => Math.max(0, tr - 1)))}
                className="rounded-lg bg-red-600 px-3 py-1.5 text-sm font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                -
              </button>
              <button
                type="button"
                disabled={onCooldown}
                onClick={increaseTrophies}
                className="rounded-lg bg-green-600 px-3 py-1.5 text-sm font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                +
              </button>
            </div>
          </div>
        </div>

        {/* Twitch chat mock */}
        <div className="flex h-full min-h-72 flex-col overflow-hidden rounded-lg" style={{ border: '1px solid var(--line-2)' }}>
          <div className="flex items-center gap-2 px-3 py-2" style={{ background: '#18181b' }}>
            <span className="h-2 w-2 rounded-full" style={{ background: '#a970ff' }} />
            <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-zinc-300">
              {t('desktop_app_landing.current_features.twitch_demo_chat_title')}
            </span>
          </div>
          <div ref={chatBoxRef} className="flex flex-1 flex-col gap-1.5 overflow-y-auto p-3" style={{ background: '#0e0e10' }}>
            {messages.length === 0 && (
              <p className="m-auto text-center text-xs text-zinc-500">
                {t('desktop_app_landing.current_features.twitch_demo_hint')}
              </p>
            )}
            <AnimatePresence initial={false}>
              {messages.map((m) => (
                <motion.div
                  key={m.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25 }}
                  className="text-sm leading-snug wrap-break-word"
                >
                  <span className="font-semibold" style={{ color: CHAT_SENDER_COLOR }}>
                    {CHAT_SENDER}
                  </span>
                  <span className="text-zinc-300">: {m.text}</span>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>

      <p className="mt-4 flex items-center gap-1.5 text-xs" style={{ color: 'var(--ink-3)' }}>
        <FontAwesomeIcon icon={faCircleInfo} />
        {t('desktop_app_landing.current_features.twitch_demo_hint')}
      </p>
    </motion.div>
  );
};

export default TwitchChatDemoCard;
