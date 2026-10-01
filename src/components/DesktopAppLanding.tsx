import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowLeft,
  faCheck,
  faChevronLeft,
  faChevronRight,
  faCircleInfo,
  faEnvelope
} from '@fortawesome/free-solid-svg-icons';
import { motion } from 'framer-motion';
import i18n from './i18n.ts';
import logoNova from '../assets/logo-nova.png';
import desktopPrintEn from '../assets/print-desktop-en.png';
import desktopPrintPt from '../assets/print-desktop-pt.png';
import desktopPrintFrame from '../assets/print-desktop-frame.jpeg';
import personalizationEn from '../assets/personalizacao-en.png';
import personalizationPt from '../assets/personalizacao-pt.png';
import trophiesText2 from '../assets/trophies-text-2.png';
import gtaviEn from '../assets/gtavi-en.jpeg';
import gtaviPt from '../assets/gtavi-pt.jpeg';
import Footer from './Footer';
import TwitchChatDemoCard from './TwitchChatDemoCard';
import StreamersCarousel from './StreamersCarousel';
import { streamers } from './streamersData';
import { GiveawayCard } from './GiveawayBanner';

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const FeatureCardImages: React.FC<{
  images: string[];
  alts: string[];
  onPreview: (src: string, alt: string) => void;
}> = ({ images, alts, onPreview }) => {
  const [idx, setIdx] = useState(0);
  const prev = () => setIdx((i) => (i - 1 + images.length) % images.length);
  const next = () => setIdx((i) => (i + 1) % images.length);

  return (
    <div className="dal-image-frame mt-5 overflow-hidden p-1.5">
      <div className="relative">
        <button
          type="button"
          onClick={() => onPreview(images[idx], alts[idx])}
          className="dal-preview-btn block w-full overflow-hidden rounded-[10px]"
        >
          <img src={images[idx]} alt={alts[idx]} className="w-full rounded-[10px] object-cover" />
        </button>

        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); prev(); }}
              className="dal-nav-btn absolute left-2 top-1/2 -translate-y-1/2 flex h-7.5 w-7.5 items-center justify-center rounded-full text-xs"
            >
              <FontAwesomeIcon icon={faChevronLeft} />
            </button>
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); next(); }}
              className="dal-nav-btn absolute right-2 top-1/2 -translate-y-1/2 flex h-7.5 w-7.5 items-center justify-center rounded-full text-xs"
            >
              <FontAwesomeIcon icon={faChevronRight} />
            </button>
            <div className="mt-2 flex justify-center gap-1.5 pb-0.5">
              {images.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setIdx(i)}
                  className="rounded-full transition-all duration-200"
                  style={{
                    height: '5px',
                    width: i === idx ? '20px' : '5px',
                    background: i === idx ? 'var(--accent)' : 'var(--line-2)',
                  }}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

// GTA VI launch — local midnight, same as the app's countdown.
const GTA_LAUNCH = new Date(2026, 10, 19).getTime();

const GtaCountdown: React.FC = () => {
  const { t } = useTranslation();
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  const sec = Math.floor(Math.max(0, GTA_LAUNCH - now) / 1000);
  const units = [
    { value: Math.floor(sec / 86400), label: t('desktop_app_landing.gta_theme.countdown_days') },
    { value: Math.floor(sec / 3600) % 24, label: t('desktop_app_landing.gta_theme.countdown_hours') },
    { value: Math.floor(sec / 60) % 60, label: t('desktop_app_landing.gta_theme.countdown_minutes') },
    { value: sec % 60, label: t('desktop_app_landing.gta_theme.countdown_seconds') },
  ];

  return (
    <div className="mt-5">
      <p className="text-sm font-semibold" style={{ color: 'var(--ink-2)' }}>
        {t('desktop_app_landing.gta_theme.countdown_title')}
      </p>
      <div className="mt-2.5 flex flex-wrap gap-2">
        {units.map(({ value, label }) => (
          <div
            key={label}
            className="flex min-w-15 flex-col items-center rounded-[10px] px-2.5 py-2"
            style={{ background: 'var(--field)', border: '1px solid rgba(255, 79, 160, .3)' }}
          >
            <span className="dal-display text-[30px] leading-none tracking-[0.03em] text-white tabular-nums" style={{ textShadow: '0 0 14px rgba(255, 111, 177, .6)' }}>
              {String(value).padStart(2, '0')}
            </span>
            <span className="dal-mono mt-1 text-[9px] font-bold uppercase tracking-[0.16em]" style={{ color: '#ff8cc4' }}>
              {label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 22 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.55, ease: EASE, delay },
});

const fadeUpView = (delay = 0) => ({
  initial: { opacity: 0, y: 22 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-50px' },
  transition: { duration: 0.55, ease: EASE, delay },
});

// Design tokens scoped to this page so the rest of the site keeps the global :root palette.
const PAGE_STYLES = `
  .dal-root {
    --font-display: "Bebas Neue", sans-serif;
    --font-mono: "Cascadia Code", "Fira Code", Consolas, monospace;
    --glass: rgba(14, 17, 24, 0.62);
    --glass-header: rgba(14, 17, 24, 0.55);
    --modal-bg: linear-gradient(180deg, rgba(22, 28, 46, 0.95), rgba(10, 12, 20, 0.97));
    --field: rgba(7, 9, 15, 0.6);
    --tint: rgba(200, 215, 255, 0.04);
    --line: rgba(200, 215, 255, 0.1);
    --line-2: rgba(200, 215, 255, 0.18);
    --line-accent: rgba(91, 141, 255, 0.4);
    --ink: #eef2fb;
    --ink-2: #c3cbdc;
    --ink-3: #9aa4ba;
    --ink-4: #7a8499;
    --accent: #5b8dff;
    --accent-text: #9bbcff;
    --accent-soft: rgba(91, 141, 255, 0.14);
    --text-glow: rgba(127, 182, 255, 0.7);
    --grad: linear-gradient(90deg, #5b8dff, #7fb6ff);
    --strip: linear-gradient(90deg, #5b8dff, #7fb6ff 55%, #9bd1ff);
    --hero-grad: linear-gradient(90deg, #5b8dff, #7fb6ff 60%, #9bd1ff);
    --info: #9bd1ff;
    --info-soft: rgba(155, 209, 255, 0.1);
    --info-line: rgba(155, 209, 255, 0.32);
    --inc: #7fb6ff;
    --inc-ink: #07090f;
    --dec: #ff6b6b;
    --radius-section: 16px;
    --radius-panel: 18px;
    --radius-modal: 20px;
    --radius-hero: 22px;
    --blur-panel: blur(18px) saturate(140%);
    --shadow-panel: 0 22px 60px rgba(0, 0, 0, 0.45);
    --shadow-modal: 0 30px 80px rgba(0, 0, 0, 0.6);
    --ease: cubic-bezier(0.22, 1, 0.36, 1);
    font-family: "Segoe UI Variable", "Segoe UI", system-ui, sans-serif;
    color: var(--ink);
  }
  @keyframes dal-orbA { 0% { transform: translate(0,0) scale(1) } 50% { transform: translate(8vw,6vh) scale(1.15) } 100% { transform: translate(-4vw,12vh) scale(.95) } }
  @keyframes dal-orbB { 0% { transform: translate(0,0) scale(1) } 50% { transform: translate(-10vw,-4vh) scale(1.2) } 100% { transform: translate(4vw,-10vh) scale(1) } }
  @keyframes dal-sweep { from { transform: translateX(-30%) rotate(-12deg) } to { transform: translateX(30%) rotate(-12deg) } }
  @media (prefers-reduced-motion: reduce) {
    .dal-scene * { animation: none !important; }
  }
  .dal-mono { font-family: var(--font-mono); }
  .dal-display { font-family: var(--font-display); font-weight: 400; }
  .dal-accent {
    font-family: var(--font-display);
    background: var(--hero-grad);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    padding-right: .1em;
  }
  .dal-h2 {
    font-family: var(--font-display);
    font-weight: 400;
    font-size: clamp(2.4rem, 4.6vw, 3.5rem);
    line-height: 1;
    letter-spacing: .015em;
    color: var(--ink);
    text-wrap: balance;
  }
  .dal-h3 {
    font-family: var(--font-display);
    font-weight: 400;
    font-size: 26px;
    letter-spacing: .05em;
    line-height: 1.05;
    color: var(--ink);
  }
  .dal-chip {
    padding: 2px 10px;
    border-radius: 999px;
    font-family: var(--font-mono);
    font-size: 9px;
    font-weight: 700;
    letter-spacing: .16em;
    text-transform: uppercase;
    background: var(--field);
    border: 1px solid var(--line-2);
  }
  .dal-topbar {
    background: var(--glass-header);
    backdrop-filter: blur(16px) saturate(140%);
    -webkit-backdrop-filter: blur(16px) saturate(140%);
    border-bottom: 1px solid var(--line);
  }
  .dal-back-link { color: var(--ink-3); transition: color .2s ease; }
  .dal-back-link:hover { color: var(--ink); }
  .dal-back-link:hover .dal-arrow { transform: translateX(-3px); }
  .dal-arrow { transition: transform 0.2s ease; display: inline-block; }
  .dal-btn-primary {
    background: var(--grad);
    border: 1px solid var(--line-accent);
    color: #fff;
    transition: transform .18s var(--ease), box-shadow .25s ease;
  }
  .dal-btn-primary:hover {
    transform: translateY(-1px) scale(1.01);
    box-shadow: 0 8px 30px -6px var(--line-accent);
    color: #fff;
  }
  .dal-btn-secondary {
    background: var(--field);
    border: 1px solid var(--line-2);
    transition: border-color .2s ease, color .2s ease, transform .18s ease;
  }
  .dal-btn-secondary:hover {
    border-color: var(--line-accent);
    color: var(--ink) !important;
    transform: translateY(-1px);
  }
  .dal-glass-card {
    border-radius: var(--radius-panel);
    padding: 24px;
    background: var(--glass);
    backdrop-filter: var(--blur-panel);
    -webkit-backdrop-filter: var(--blur-panel);
    border: 1px solid var(--line);
    transition: box-shadow .28s ease, border-color .28s ease;
  }
  .dal-glass-card:hover {
    box-shadow: 0 0 40px var(--accent-soft);
    border-color: var(--line-2);
  }
  .dal-gta-card:hover { box-shadow: 0 0 40px rgba(255, 79, 160, .12); }
  .dal-sub-card {
    border-radius: var(--radius-section);
    padding: 16px;
    background: var(--tint);
    border: 1px solid var(--line);
  }
  .dal-image-frame {
    border-radius: var(--radius-section);
    background: var(--field);
    border: 1px solid var(--line);
  }
  .dal-nav-btn {
    background: var(--glass-header);
    backdrop-filter: blur(6px);
    -webkit-backdrop-filter: blur(6px);
    border: 1px solid var(--line-2);
    color: var(--ink-2);
  }
  .dal-counter-btn { transition: transform .15s ease; }
  .dal-counter-btn:hover:not(:disabled) { transform: translateY(-1px) scale(1.04); }
  .dal-preview-btn { cursor: zoom-in; }
  .dal-preview-btn img { transition: transform 0.35s ease; }
  .dal-preview-btn:hover img { transform: scale(1.025); }
  .dal-hero-panel {
    overflow: hidden;
    border-radius: var(--radius-hero);
    background: var(--glass);
    backdrop-filter: var(--blur-panel);
    -webkit-backdrop-filter: var(--blur-panel);
    border: 1px solid var(--line-2);
    box-shadow: var(--shadow-panel), 0 0 70px var(--accent-soft);
  }
  .dal-strip { height: 3px; background: var(--strip); }
  /* ponytail: prints have a ~3.5% black bar on top; zooming from the bottom pushes it out of the frame */
  .dal-crop-top { transform: scale(1.06); transform-origin: center bottom; }
  .dal-preview-btn:hover .dal-crop-top { transform: scale(1.085); }
  .dal-lang-btn { transition: color 0.18s ease, background 0.18s ease; }
  .dal-streamers-track { scrollbar-width: none; }
  .dal-streamers-track::-webkit-scrollbar { display: none; }
  .dal-streamer-card img {
    border: 1px solid var(--line-accent);
    box-shadow: 0 0 24px var(--accent-soft);
    transition: box-shadow 0.28s ease, transform 0.18s ease;
  }
  .dal-streamer-card:hover img {
    box-shadow: 0 0 32px var(--line-accent);
    transform: translateY(-3px);
  }
  .dal-streamer-name { transition: color 0.2s ease; }
  .dal-streamer-card:hover .dal-streamer-name { color: var(--accent-text); }
`;

const DesktopAppLanding: React.FC = () => {
  const { t, i18n } = useTranslation();
  const isPortuguese = i18n.language.startsWith('pt');
  const [selectedImage, setSelectedImage] = useState<{ src: string; alt: string } | null>(null);
  const [zoomLevel, setZoomLevel] = useState(1);

  const openImagePreview = (src: string, alt: string) => {
    setSelectedImage({ src, alt });
    setZoomLevel(1);
  };

  const closeImagePreview = () => {
    setSelectedImage(null);
    setZoomLevel(1);
  };

  const increaseZoom = () => setZoomLevel((z) => Math.min(z + 0.25, 3));
  const decreaseZoom = () => setZoomLevel((z) => Math.max(z - 0.25, 1));

  const currentFeatures = [
    {
      index: '03',
      title: t('desktop_app_landing.current_features.hotkeys_title'),
      description: t('desktop_app_landing.current_features.hotkeys_description'),
      chip: 'GLOBAL',
      image: undefined as string | undefined,
      alt: undefined as string | undefined
    },
    {
      index: '04',
      title: t('desktop_app_landing.current_features.timer_title'),
      description: t('desktop_app_landing.current_features.timer_description'),
      chip: undefined as string | undefined,
      image: isPortuguese ? desktopPrintPt : desktopPrintEn,
      alt: t('desktop_app_landing.current_features.timer_screenshot_alt')
    },
    {
      index: '05',
      title: t('desktop_app_landing.current_features.customization_title'),
      description: t('desktop_app_landing.current_features.customization_description'),
      chip: undefined as string | undefined,
      image: undefined as string | undefined,
      alt: undefined as string | undefined,
      images: [isPortuguese ? personalizationPt : personalizationEn, trophiesText2],
      alts: [
        t('desktop_app_landing.current_features.customization_screenshot_alt'),
        t('desktop_app_landing.current_features.customization_screenshot_alt_2'),
      ],
    }
  ];

  const supportLink = isPortuguese
    ? 'https://link.mercadopago.com.br/statscounter'
    : 'https://buymeacoffee.com/ogl7';

  const heroImage = desktopPrintFrame;

  return (
    <div className="dal-root relative">
      <style>{PAGE_STYLES}</style>

      {/* Animated background scene — full page */}
      <div
        aria-hidden="true"
        className="dal-scene pointer-events-none fixed inset-0 overflow-hidden"
        style={{ zIndex: 0, background: 'linear-gradient(160deg, #0b1430 0%, #07090f 45%, #030407 100%)' }}
      >
        <div className="absolute rounded-full" style={{ left: '-12vw', top: '-18vh', width: '70vw', height: '70vw', background: 'radial-gradient(circle, rgba(91,141,255,.42), rgba(91,141,255,0) 62%)', animation: 'dal-orbA 26s ease-in-out infinite alternate' }} />
        <div className="absolute rounded-full" style={{ right: '-18vw', top: '20vh', width: '62vw', height: '62vw', background: 'radial-gradient(circle, rgba(127,182,255,.24), rgba(127,182,255,0) 60%)', animation: 'dal-orbB 32s ease-in-out infinite alternate' }} />
        <div className="absolute rounded-full" style={{ left: '20vw', bottom: '-40vh', width: '60vw', height: '60vw', background: 'radial-gradient(circle, rgba(58,109,212,.3), rgba(58,109,212,0) 60%)', animation: 'dal-orbB 38s ease-in-out -10s infinite alternate' }} />
        <div className="absolute" style={{ left: '-20%', right: '-20%', top: '30%', height: '18vh', background: 'linear-gradient(90deg, transparent, rgba(155,209,255,.07), transparent)', filter: 'blur(20px)', animation: 'dal-sweep 18s ease-in-out infinite alternate' }} />
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle, rgba(200,215,255,.05) 1px, transparent 1.2px)', backgroundSize: '28px 28px' }} />
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 50% 40%, transparent 40%, rgba(0,0,0,.55) 100%)' }} />
      </div>

      {/* Topbar */}
      <motion.header
        className="dal-topbar sticky top-0 z-30 w-full"
        initial={{ opacity: 0, y: -14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: EASE }}
      >
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-5 py-3">
          <Link to="/" className="dal-back-link inline-flex items-center gap-2 text-sm">
            <span className="dal-arrow"><FontAwesomeIcon icon={faArrowLeft} /></span>
            {t('desktop_app_landing.back_home')}
          </Link>

          <div className="flex items-center gap-2.5">
            <img src={logoNova} alt="StatsCounter logo" className="h-7 w-7 rounded-lg" style={{ boxShadow: '0 0 14px var(--accent-soft)' }} />
            <span className="text-sm font-semibold" style={{ color: 'var(--ink)', letterSpacing: '-0.01em' }}>
              stats<span style={{ color: 'var(--accent)' }}>/</span><strong>counter</strong>
            </span>
          </div>

          <div
            className="flex items-center overflow-hidden rounded-[10px] text-xs font-semibold"
            style={{ border: '1px solid var(--line-2)', background: 'var(--field)' }}
          >
            {(['pt', 'en'] as const).map((lang) => {
              const active = i18n.language.startsWith(lang);
              return (
                <button
                  key={lang}
                  type="button"
                  onClick={() => i18n.changeLanguage(lang)}
                  className="dal-lang-btn px-3 py-1.5"
                  style={{
                    color: active ? 'var(--ink)' : 'var(--ink-4)',
                    background: active ? 'var(--accent-soft)' : 'transparent',
                  }}
                >
                  {lang.toUpperCase()}
                </button>
              );
            })}
          </div>
        </div>
      </motion.header>

      <main className="relative mx-auto max-w-5xl px-5 pt-10 pb-6">

        <GiveawayCard />

        {/* ── Hero ── */}
        <section className="mt-6 grid items-center gap-12 lg:grid-cols-2 lg:gap-14">
          <div>
            <motion.h1
              className="dal-display"
              style={{
                color: 'var(--ink)',
                fontSize: 'clamp(3rem, 6vw, 4.6rem)',
                lineHeight: 0.98,
                letterSpacing: '0.015em',
                textWrap: 'balance',
              }}
              {...fadeUp(0.1)}
            >
              {t('desktop_app_landing.title_1')}
              <span className="dal-accent" style={{ filter: 'drop-shadow(0 0 18px var(--accent-soft))' }}>
                {t('desktop_app_landing.title_accent')}
              </span>
              {t('desktop_app_landing.title_2')}
            </motion.h1>

            <motion.p
              className="mt-5 text-base"
              style={{ color: 'var(--ink-2)', lineHeight: 1.85, maxWidth: '38ch', textWrap: 'pretty' }}
              {...fadeUp(0.22)}
            >
              {t('desktop_app_landing.description')}
            </motion.p>

            <motion.div className="mt-8 flex flex-wrap gap-3" {...fadeUp(0.32)}>
              <a
                href={supportLink}
                target="_blank"
                rel="noopener noreferrer"
                className="dal-btn-primary inline-flex items-center gap-2.5 rounded-xl px-5 py-3 text-sm font-semibold"
              >
                {isPortuguese
                  ? t('desktop_app_landing.support_br_cta')
                  : t('desktop_app_landing.support_global_cta')}
              </a>
            </motion.div>
          </div>

          {/* macOS window frame */}
          <motion.div
            className="dal-hero-panel"
            initial={{ opacity: 0, scale: 0.96, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.65, ease: EASE, delay: 0.15 }}
          >
            <div className="dal-strip" />
            <div
              className="flex items-center justify-between px-4 py-3"
              style={{ background: 'var(--tint)', borderBottom: '1px solid var(--line)' }}
            >
              <div className="flex items-center gap-1.5">
                <span className="h-3 w-3 rounded-full" style={{ background: '#ff5f57' }} />
                <span className="h-3 w-3 rounded-full" style={{ background: '#febc2e' }} />
                <span className="h-3 w-3 rounded-full" style={{ background: '#28c840' }} />
              </div>
              <span className="dal-mono text-[11px]" style={{ color: 'var(--ink-4)' }}>
                statsCounter.app
              </span>
              <div style={{ width: '52px' }} />
            </div>
            <button
              type="button"
              onClick={() => openImagePreview(heroImage, t('desktop_app_landing.current_features.timer_screenshot_alt'))}
              className="dal-preview-btn block w-full overflow-hidden"
            >
              <img
                src={heroImage}
                alt={t('desktop_app_landing.current_features.timer_screenshot_alt')}
                className="dal-crop-top block w-full object-cover"
              />
            </button>
          </motion.div>
        </section>

        {/* ── Current Features ── */}
        <motion.section className="mt-22" {...fadeUpView(0)}>

          <motion.h2 className="dal-h2" {...fadeUpView(0.08)}>
            {t('desktop_app_landing.current_features.section_title_1')}
            <span className="dal-accent">
              {t('desktop_app_landing.current_features.section_title_accent')}
            </span>
            {t('desktop_app_landing.current_features.section_title_2')}
          </motion.h2>

          <div className="mt-8 flex flex-col gap-4">

            {/* Platform Sync — full width, first card */}
            <motion.div
              className="dal-glass-card"
              {...fadeUpView(0)}
              whileHover={{ y: -3, transition: { duration: 0.22, ease: EASE } }}
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="dal-mono text-[11px]" style={{ color: 'var(--ink-4)' }}>01</span>
                <div className="flex flex-wrap gap-1.5">
                  <span className="dal-chip" style={{ color: '#9bd1ff' }}>PSN</span>
                  <span className="dal-chip" style={{ color: '#66c0f4' }}>STEAM</span>
                  <span className="dal-chip" style={{ color: '#ffcc00' }}>RETROACHIEVEMENTS</span>
                </div>
              </div>

              <h3 className="dal-h3 mt-4">
                {t('desktop_app_landing.current_features.platform_sync_title')}
              </h3>

              <p className="mt-2.5 text-sm" style={{ color: 'var(--ink-2)', lineHeight: 1.75 }}>
                {t('desktop_app_landing.current_features.platform_sync_description')}
              </p>

              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                <div className="dal-sub-card">
                  <span className="dal-mono text-[10px] font-bold tracking-[0.14em]" style={{ color: '#9bd1ff' }}>PSN</span>
                  <p className="mt-2 text-sm" style={{ color: 'var(--ink-3)', lineHeight: 1.7 }}>
                    {t('desktop_app_landing.current_features.psn_sync_description')}
                  </p>
                </div>
                <div className="dal-sub-card">
                  <span className="dal-mono text-[10px] font-bold tracking-[0.14em]" style={{ color: '#66c0f4' }}>STEAM</span>
                  <p className="mt-2 text-sm" style={{ color: 'var(--ink-3)', lineHeight: 1.7 }}>
                    {t('desktop_app_landing.current_features.steam_sync_description')}
                  </p>
                </div>
                <div className="dal-sub-card">
                  <span className="dal-mono text-[10px] font-bold tracking-[0.14em]" style={{ color: '#ffcc00' }}>RETROACHIEVEMENTS</span>
                  <p className="mt-2 text-sm" style={{ color: 'var(--ink-3)', lineHeight: 1.7 }}>
                    {t('desktop_app_landing.current_features.retroachievements_sync_description')}
                  </p>
                </div>
              </div>
            </motion.div>

            <TwitchChatDemoCard />

            {currentFeatures.map((feature, i) => (
              <motion.div
                key={feature.title}
                className="dal-glass-card"
                {...fadeUpView((i + 1) * 0.08)}
                whileHover={{ y: -3, transition: { duration: 0.22, ease: EASE } }}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="dal-mono text-[11px]" style={{ color: 'var(--ink-4)' }}>
                    {feature.index}
                  </span>
                  {feature.chip && (
                    <span
                      className="dal-chip"
                      style={{ background: 'var(--info-soft)', borderColor: 'var(--info-line)', color: 'var(--info)' }}
                    >
                      {feature.chip}
                    </span>
                  )}
                </div>

                <h3 className="dal-h3 mt-4">{feature.title}</h3>

                <p className="mt-2.5 text-sm" style={{ color: 'var(--ink-2)', lineHeight: 1.75 }}>
                  {feature.description}
                </p>

                {feature.images ? (
                  <FeatureCardImages
                    images={feature.images}
                    alts={feature.alts!}
                    onPreview={openImagePreview}
                  />
                ) : feature.image && (
                  <div className="dal-image-frame mt-5 overflow-hidden p-1.5">
                    <button
                      type="button"
                      onClick={() => openImagePreview(feature.image!, feature.alt!)}
                      className="dal-preview-btn block w-full overflow-hidden rounded-[10px]"
                    >
                      <img src={feature.image} alt={feature.alt} className="w-full rounded-[10px] object-cover" />
                    </button>
                  </div>
                )}
              </motion.div>
            ))}
          </div>

        </motion.section>

        {/* ── GTA VI theme ── */}
        <motion.section className="mt-22" {...fadeUpView(0)}>
          <div className="dal-glass-card dal-gta-card grid items-center gap-8 md:grid-cols-2">
            <div>
              <h2 className="dal-h2">
                {t('desktop_app_landing.gta_theme.title_1')}
                <span
                  style={{
                    fontFamily: "'Yellowtail', cursive",
                    background: 'linear-gradient(90deg, #ff4fa0, #ffa25a 70%, #ffd27a)',
                    WebkitBackgroundClip: 'text',
                    backgroundClip: 'text',
                    color: 'transparent',
                    paddingRight: '.12em',
                  }}
                >
                  {t('desktop_app_landing.gta_theme.title_accent')}
                </span>
              </h2>
              <p className="mt-3 text-base" style={{ color: 'var(--ink-2)', lineHeight: 1.75 }}>
                {t('desktop_app_landing.gta_theme.description')}
              </p>
              <GtaCountdown />
            </div>
            <div className="dal-image-frame p-1.5">
              <button
                type="button"
                onClick={() => openImagePreview(isPortuguese ? gtaviPt : gtaviEn, t('desktop_app_landing.gta_theme.screenshot_alt'))}
                className="dal-preview-btn block w-full overflow-hidden rounded-[10px]"
              >
                <img
                  src={isPortuguese ? gtaviPt : gtaviEn}
                  alt={t('desktop_app_landing.gta_theme.screenshot_alt')}
                  className="dal-crop-top block w-full object-cover"
                />
              </button>
            </div>
          </div>
        </motion.section>

        {/* ── Streamers ── */}
        <motion.section className="mt-18 mb-16" {...fadeUpView(0)}>
          <motion.h2 className="dal-h2" {...fadeUpView(0.08)}>
            {t('desktop_app_landing.streamers.section_title_1')}
            <span className="dal-accent">
              {t('desktop_app_landing.streamers.section_title_accent')}
            </span>
            {t('desktop_app_landing.streamers.section_title_2')}
          </motion.h2>

          <motion.p
            className="mt-3 max-w-[52ch] text-sm"
            style={{ color: 'var(--ink-3)', lineHeight: 1.8 }}
            {...fadeUpView(0.12)}
          >
            {t('desktop_app_landing.streamers.section_description')}
          </motion.p>

          <motion.div className="mt-8" {...fadeUpView(0.16)}>
            <StreamersCarousel streamers={streamers} />
          </motion.div>

          <motion.p
            className="mt-6 flex flex-wrap items-center justify-center gap-1.5 text-center text-xs"
            style={{ color: 'var(--ink-3)' }}
            {...fadeUpView(0.2)}
          >
            <FontAwesomeIcon icon={faCircleInfo} />
            {t('desktop_app_landing.streamers.contact_note')}{' '}
            <a
              href="mailto:statscountersup@gmail.com?subject=StatsCounter%20-%20Streamer%20Carousel"
              className="font-semibold underline-offset-2 hover:underline"
              style={{ color: 'var(--accent-text)' }}
            >
              statscountersup@gmail.com
            </a>
          </motion.p>
        </motion.section>

        {/* ── Access ── */}
        <motion.section className="mb-12" {...fadeUpView(0)}>
          <div
            className="relative overflow-hidden"
            style={{
              borderRadius: 'var(--radius-hero)',
              padding: 'clamp(28px, 4vw, 40px)',
              background: 'var(--glass)',
              backdropFilter: 'var(--blur-panel)',
              WebkitBackdropFilter: 'var(--blur-panel)',
              border: '1px solid var(--line-2)',
              boxShadow: 'var(--shadow-panel)',
            }}
          >
            <div className="dal-strip absolute inset-x-0 top-0" />
            <h2
              className="dal-display"
              style={{ color: 'var(--ink)', fontSize: '32px', letterSpacing: '0.04em', lineHeight: 1 }}
            >
              {t('desktop_app_landing.access_title')}
            </h2>
            <p className="mt-2.5 text-sm" style={{ color: 'var(--ink-2)', lineHeight: 1.8, maxWidth: '52ch' }}>
              {t('desktop_app_landing.access_description')}
            </p>

            <div className="mt-6 grid gap-5 lg:grid-cols-2">
              <motion.div
                className="p-6"
                style={{ borderRadius: 'var(--radius-panel)', background: 'var(--accent-soft)', border: '1px solid var(--line-accent)' }}
                {...fadeUpView(0.06)}
              >
                <p
                  className="dal-mono text-[10px] font-semibold uppercase tracking-[0.2em]"
                  style={{ color: 'var(--accent-text)' }}
                >
                  {isPortuguese
                    ? t('desktop_app_landing.support_br_label')
                    : t('desktop_app_landing.support_global_label')}
                </p>
                <p
                  className="dal-display mt-2"
                  style={{ color: '#fff', fontSize: '34px', letterSpacing: '0.03em', lineHeight: 1, textShadow: '0 0 14px var(--text-glow)' }}
                >
                  {isPortuguese
                    ? t('desktop_app_landing.support_br_value')
                    : t('desktop_app_landing.support_global_value')}
                </p>
                <p className="mt-2.5 text-sm" style={{ color: 'var(--ink-2)', lineHeight: 1.7 }}>
                  {isPortuguese
                    ? t('desktop_app_landing.support_br_description')
                    : t('desktop_app_landing.support_global_description')}
                </p>

                <ul className="mt-4 flex flex-col gap-2">
                  {[
                    t('desktop_app_landing.support_check_lifetime'),
                    t('desktop_app_landing.support_check_email'),
                  ].map((check) => (
                    <li key={check} className="flex items-start gap-2 text-sm" style={{ color: 'var(--ink-2)', lineHeight: 1.55 }}>
                      <FontAwesomeIcon icon={faCheck} className="mt-1" style={{ color: 'var(--info)', fontSize: '0.75rem', flexShrink: 0 }} />
                      {check}
                    </li>
                  ))}
                </ul>

                <a
                  href={supportLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="dal-btn-primary mt-5 flex w-full items-center justify-center rounded-xl px-4 py-3 text-sm font-semibold"
                >
                  {isPortuguese
                    ? t('desktop_app_landing.support_br_cta')
                    : t('desktop_app_landing.support_global_cta')}
                </a>

                <p className="mt-3.5 text-xs" style={{ color: 'var(--ink-3)', lineHeight: 1.7 }}>
                  {isPortuguese
                    ? t('desktop_app_landing.support_br_email_notice')
                    : t('desktop_app_landing.support_global_email_notice')}
                </p>
              </motion.div>

              <motion.div
                className="flex flex-col p-6"
                style={{ borderRadius: 'var(--radius-panel)', background: 'var(--tint)', border: '1px solid var(--line)' }}
                {...fadeUpView(0.13)}
              >
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-xl"
                  style={{ background: 'var(--info-soft)', border: '1px solid var(--info-line)', color: 'var(--info)' }}
                >
                  <FontAwesomeIcon icon={faEnvelope} />
                </div>

                <h3
                  className="mt-5 font-semibold leading-snug"
                  style={{ color: 'var(--ink)', fontSize: '15px' }}
                >
                  {t('desktop_app_landing.email_title')}
                </h3>

                <p className="mt-2.5 text-sm" style={{ color: 'var(--ink-2)', lineHeight: 1.75 }}>
                  {t('desktop_app_landing.email_description')}
                </p>

                <a
                  href="mailto:statscountersup@gmail.com?subject=StatsCounter%20Desktop%20App"
                  className="dal-btn-secondary mt-6 flex items-center justify-center rounded-xl px-4 py-3 text-sm font-semibold"
                  style={{ color: 'var(--accent-text)' }}
                >
                  statscountersup@gmail.com
                </a>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* Image Preview Modal */}
        {selectedImage && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center px-4 py-6"
            style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(6px)', WebkitBackdropFilter: 'blur(6px)' }}
            onClick={closeImagePreview}
          >
            <div className="w-full max-w-6xl" onClick={(e) => e.stopPropagation()}>
              <div className="mb-4 flex flex-wrap items-center justify-end gap-3">
                {[
                  { label: 'Zoom −', action: decreaseZoom },
                  { label: 'Zoom +', action: increaseZoom },
                  { label: t('close'), action: closeImagePreview }
                ].map(({ label, action }) => (
                  <button
                    key={label}
                    type="button"
                    onClick={action}
                    className="dal-btn-secondary inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-semibold"
                    style={{ background: 'var(--glass)', color: 'var(--ink-2)' }}
                  >
                    {label}
                  </button>
                ))}
              </div>
              <div
                className="overflow-auto p-2"
                style={{
                  maxHeight: '80vh',
                  borderRadius: 'var(--radius-modal)',
                  background: 'var(--modal-bg)',
                  border: '1px solid var(--line-accent)',
                  boxShadow: 'var(--shadow-modal), 0 0 70px var(--accent-soft)',
                }}
              >
                <img
                  src={selectedImage.src}
                  alt={selectedImage.alt}
                  onClick={increaseZoom}
                  className="mx-auto max-h-none cursor-zoom-in rounded-xl object-contain transition-transform duration-200"
                  style={{ transform: `scale(${zoomLevel})`, transformOrigin: 'center center' }}
                />
              </div>
            </div>
          </div>
        )}

        <Footer />
      </main>
    </div>
  );
};

export default DesktopAppLanding;
