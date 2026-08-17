import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGift, faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';

interface Announcement {
  id: string;
  active: boolean;
  audience: 'br' | 'intl' | 'all';
  url: string;
  ribbonText: string;
  cardTitle: string;
  cardDescription: string;
  cardCta: string;
}

// ponytail: lista simples e hardcoded (sem i18n) porque cada anúncio é um
// evento pontual com texto próprio. Pra reativar/criar um novo, basta
// adicionar uma entrada aqui com active: true.
const ANNOUNCEMENTS: Announcement[] = [
  {
    id: 'giftcard-50-2026-08',
    active: false, // sorteio encerrado
    audience: 'br',
    url: 'https://www.instagram.com/p/DbmRjpjFQ6F/',
    ribbonText: 'Sorteio exclusivo pra apoiadores: Gift Card de R$50! Participe no nosso Instagram',
    cardTitle: 'Sorteio exclusivo pra apoiadores',
    cardDescription: 'Gift Card de R$50 (loja à sua escolha)! Regras e participação no nosso Instagram.',
    cardCta: 'Participar',
  },
];

function useActiveAnnouncement(): Announcement | null {
  const { i18n } = useTranslation();
  const isBr = i18n.language.startsWith('pt');
  return (
    ANNOUNCEMENTS.find(
      (a) => a.active && (a.audience === 'all' || (a.audience === 'br') === isBr)
    ) ?? null
  );
}

export const GiveawayRibbon: React.FC = () => {
  const announcement = useActiveAnnouncement();
  if (!announcement) return null;

  return (
    <motion.a
      href={announcement.url}
      target="_blank"
      rel="noopener noreferrer"
      className="mb-4 flex w-full items-center justify-center gap-2 rounded-full border border-amber-400/25 bg-amber-500/10 px-4 py-2 text-center text-xs font-medium text-amber-200 backdrop-blur-sm transition hover:border-amber-300/45 hover:bg-amber-500/15 hover:text-amber-100 sm:text-sm"
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      <FontAwesomeIcon icon={faGift} className="text-amber-300" />
      <span>{announcement.ribbonText}</span>
      <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="text-[10px] text-amber-300/80" />
    </motion.a>
  );
};

export const GiveawayCard: React.FC = () => {
  const announcement = useActiveAnnouncement();
  if (!announcement) return null;

  return (
    <motion.a
      href={announcement.url}
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
            {announcement.cardTitle}
          </p>
          <p className="text-sm" style={{ color: 'var(--ink-2)' }}>
            {announcement.cardDescription}
          </p>
        </div>
      </div>
      <span
        className="dal-btn-primary inline-flex shrink-0 items-center gap-1.5 rounded-xl px-4 py-2.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-white"
        style={{ background: 'var(--coral)', border: '1px solid var(--coral-2)' }}
      >
        {announcement.cardCta}
        <FontAwesomeIcon icon={faArrowUpRightFromSquare} className="text-[11px]" />
      </span>
    </motion.a>
  );
};
