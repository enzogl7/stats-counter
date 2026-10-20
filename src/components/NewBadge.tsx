import { useTranslation } from 'react-i18next';

// Sticker stuck on the card's top-right edge — the parent needs `position: relative`.
const NewBadge = () => {
  const { t } = useTranslation();

  return (
    <span
      className="pointer-events-none absolute z-10 select-none"
      style={{
        top: '-12px',
        right: '-8px',
        padding: '4px 14px 3px',
        borderRadius: '6px',
        background: 'linear-gradient(90deg, #5b8dff, #7fb6ff)',
        color: '#07090f',
        fontFamily: '"Bebas Neue", sans-serif',
        fontSize: '17px',
        letterSpacing: '0.08em',
        lineHeight: 1,
        transform: 'rotate(6deg)',
        boxShadow: '0 6px 18px rgba(0, 0, 0, 0.45), 0 0 18px rgba(91, 141, 255, 0.35)',
      }}
    >
      {t('new_badge')}
    </span>
  );
};

export default NewBadge;
