import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGift, faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';

// ponytail: sorteio pt-br-only e sem data de término prevista, então o texto é
// hardcoded (não passa pelo i18n) e a remoção do banner após o sorteio é manual.
const GIVEAWAY_URL = 'https://www.instagram.com/p/DbmRjpjFQ6F/';

export const GiveawayRibbon: React.FC = () => {
  const { i18n } = useTranslation();
  if (!i18n.language.startsWith('pt')) return null;

  return (
  <motion.a
    href={GIVEAWAY_URL}
    target="_blank"
    rel="noopener noreferrer"
    className="mb-4 flex w-full items-center justify-center gap-2 rounded-full border border-amber-400/25 bg-amber-500/10 px-4 py-2 text-center text-xs font-medium text-amber-200 backdrop-blur-sm transition hover:border-amber-300/45 hover:bg-amber-500/15 hover:text-amber-100 sm:text-sm"
    initial={{ opacity: 0, y: -6 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, ease: 'easeOut' }}
  >
    <FontAwesomeIcon icon={faGift} className="text-amber-300" />
    <span>
      Sorteio exclusivo pra apoiadores: Gift Card de R$50! Participe no nosso Instagram
    </span>
    <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="text-[10px] text-amber-300/80" />
  </motion.a>
  );
};

export const GiveawayCard: React.FC = () => {
  const { i18n } = useTranslation();
  if (!i18n.language.startsWith('pt')) return null;

  return (
  <motion.a
    href={GIVEAWAY_URL}
    target="_blank"
    rel="noopener noreferrer"
    className="dal-support-card sticky top-4 z-20 mb-6 flex flex-col items-center gap-3 rounded-xl p-5 text-center sm:flex-row sm:justify-between sm:text-left"
    style={{ background: 'var(--bg-3)', border: '1px solid var(--line)' }}
    initial={{ opacity: 0, y: -10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.45, ease: 'easeOut' }}
  >
    <div className="flex items-center gap-3">
      <span
        className="dal-icon-wrap flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-sm"
        style={{ background: 'var(--bg-2)', border: '1px solid var(--line-2)', color: 'var(--coral)' }}
      >
        <FontAwesomeIcon icon={faGift} />
      </span>
      <div>
        <p className="text-sm font-bold uppercase tracking-[0.1em]" style={{ color: 'var(--coral)' }}>
          Sorteio exclusivo pra apoiadores
        </p>
        <p className="text-sm" style={{ color: 'var(--ink-2)' }}>
          Gift Card de R$50 (loja à sua escolha)! Regras e participação no nosso Instagram.
        </p>
      </div>
    </div>
    <span
      className="dal-btn-primary inline-flex shrink-0 items-center gap-1.5 rounded-xl px-4 py-2.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-white"
      style={{ background: 'var(--coral)', border: '1px solid var(--coral-2)' }}
    >
      Participar
      <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="text-[11px]" />
    </span>
  </motion.a>
  );
};
