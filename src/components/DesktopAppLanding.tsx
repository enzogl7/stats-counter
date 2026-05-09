import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowLeft,
  faClock,
  faDesktop,
  faEnvelope,
  faKeyboard,
  faTrophy,
  faWandMagicSparkles
} from '@fortawesome/free-solid-svg-icons';
import { motion } from 'framer-motion';
import i18n from './i18n.ts';
import logoNova from '../assets/logo-nova.png';
import desktopPrintEn from '../assets/print-desktop-en.png';
import desktopPrintPt from '../assets/print-desktop-pt.png';
import desktopPrintFrame from '../assets/print-desktop-frame.jpg';
import personalizationEn from '../assets/personalizacao-en.jpg';
import personalizationPt from '../assets/personalizacao-pt.jpg';
import Footer from './Footer';

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

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

const PAGE_STYLES = `
  .dal-topbar {
    background: linear-gradient(to bottom, rgba(10,13,22,0.92) 0%, rgba(10,13,22,0.72) 100%);
    backdrop-filter: blur(14px);
    -webkit-backdrop-filter: blur(14px);
  }
  .dal-back-link:hover .dal-arrow {
    transform: translateX(-3px);
  }
  .dal-arrow {
    transition: transform 0.2s ease;
    display: inline-block;
  }
  .dal-btn-primary {
    box-shadow: 0 0 0 0 rgba(91,141,255,0);
    transition: box-shadow 0.25s ease, transform 0.18s ease, filter 0.18s ease;
  }
  .dal-btn-primary:hover {
    box-shadow: 0 6px 28px -6px rgba(91,141,255,0.45);
    transform: translateY(-1px);
    filter: brightness(1.08);
  }
  .dal-btn-secondary {
    transition: border-color 0.2s ease, color 0.2s ease, transform 0.18s ease;
  }
  .dal-btn-secondary:hover {
    border-color: rgba(200,215,255,0.22);
    color: var(--ink);
    transform: translateY(-1px);
  }
  .dal-hero-window {
    box-shadow:
      0 40px 90px -20px rgba(20,40,120,0.55),
      0 0 0 1px rgba(200,215,255,0.06) inset;
  }
  .dal-feature-card {
    transition: box-shadow 0.28s ease, border-color 0.28s ease;
  }
  .dal-feature-card:hover {
    box-shadow: 0 10px 48px -12px rgba(58,107,220,0.22);
    border-color: rgba(200,215,255,0.16);
  }
  .dal-feature-card:hover .dal-icon-wrap {
    box-shadow: 0 0 16px -4px currentColor;
  }
  .dal-icon-wrap {
    transition: box-shadow 0.25s ease;
  }
  .dal-preview-btn img {
    transition: transform 0.35s ease;
  }
  .dal-preview-btn:hover img {
    transform: scale(1.025);
  }
  .dal-section-card {
    background: linear-gradient(155deg, var(--bg-2) 0%, rgba(8,11,19,0.97) 100%);
  }
  .dal-pillar-card {
    transition: box-shadow 0.28s ease, border-color 0.28s ease;
  }
  .dal-pillar-card:hover {
    box-shadow: 0 8px 36px -10px rgba(58,107,220,0.18);
    border-color: rgba(200,215,255,0.14);
  }
  .dal-support-card {
    transition: box-shadow 0.28s ease, border-color 0.28s ease;
  }
  .dal-support-card:hover {
    box-shadow: 0 8px 36px -10px rgba(91,141,255,0.15);
    border-color: rgba(200,215,255,0.18);
  }
  .dal-lang-btn {
    transition: color 0.18s ease, background 0.18s ease;
  }
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
      index: '01',
      icon: faKeyboard,
      title: t('desktop_app_landing.current_features.hotkeys_title'),
      description: t('desktop_app_landing.current_features.hotkeys_description'),
      chip: 'GLOBAL',
      chipColor: 'var(--lime)' as string,
      image: undefined as string | undefined,
      alt: undefined as string | undefined
    },
    {
      index: '02',
      icon: faTrophy,
      title: t('desktop_app_landing.current_features.psn_sync_title'),
      description: t('desktop_app_landing.current_features.psn_sync_description'),
      chip: undefined as string | undefined,
      chipColor: 'var(--plat)' as string,
      image: undefined as string | undefined,
      alt: undefined as string | undefined
    },
    {
      index: '03',
      icon: faClock,
      title: t('desktop_app_landing.current_features.timer_title'),
      description: t('desktop_app_landing.current_features.timer_description'),
      chip: undefined as string | undefined,
      chipColor: 'var(--lime)' as string,
      image: isPortuguese ? desktopPrintPt : desktopPrintEn,
      alt: t('desktop_app_landing.current_features.timer_screenshot_alt')
    },
    {
      index: '04',
      icon: faWandMagicSparkles,
      title: t('desktop_app_landing.current_features.customization_title'),
      description: t('desktop_app_landing.current_features.customization_description'),
      chip: undefined as string | undefined,
      chipColor: 'var(--lime)' as string,
      image: isPortuguese ? personalizationPt : personalizationEn,
      alt: t('desktop_app_landing.current_features.customization_screenshot_alt')
    }
  ];

  const futurePillars = [
    {
      icon: faDesktop,
      title: t('desktop_app_landing.future.foundation_title'),
      description: t('desktop_app_landing.future.foundation_description')
    },
    {
      icon: faWandMagicSparkles,
      title: t('desktop_app_landing.future.customization_title'),
      description: t('desktop_app_landing.future.customization_description')
    }
  ];

  const supportLink = isPortuguese
    ? 'https://link.mercadopago.com.br/statscounter'
    : 'https://buymeacoffee.com/ogl7';

  const heroImage = desktopPrintFrame;

  return (
    <div className="relative">
      <style>{PAGE_STYLES}</style>

      {/* Atmospheric blue glow — full page */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0"
        style={{
          background: [
            'radial-gradient(ellipse 70% 40% at 75% 5%, rgba(58,107,220,0.32) 0%, rgba(30,58,138,0.12) 48%, transparent 68%)',
            'radial-gradient(ellipse 50% 35% at 8% 18%, rgba(91,141,255,0.10) 0%, transparent 55%)',
            'radial-gradient(ellipse 55% 35% at 20% 75%, rgba(58,107,220,0.10) 0%, transparent 60%)',
            'radial-gradient(ellipse 45% 30% at 85% 80%, rgba(91,141,255,0.08) 0%, transparent 55%)',
            'radial-gradient(ellipse 30% 20% at 50% 50%, rgba(58,107,220,0.04) 0%, transparent 60%)',
          ].join(', '),
          zIndex: 0,
        }}
      />

      {/* Topbar */}
      <motion.header
        className="dal-topbar relative w-full"
        style={{ borderBottom: '1px solid var(--line)' }}
        initial={{ opacity: 0, y: -14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: EASE }}
      >
        <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-3.5">
          <Link
            to="/"
            className="dal-back-link inline-flex items-center gap-2 text-sm transition hover:opacity-90"
            style={{ color: 'var(--ink-3)' }}
          >
            <span className="dal-arrow"><FontAwesomeIcon icon={faArrowLeft} /></span>
            {t('desktop_app_landing.back_home')}
          </Link>

          <div className="flex items-center gap-2.5">
            <img src={logoNova} alt="StatsCounter logo" className="h-7 w-7 rounded-lg" style={{ boxShadow: '0 0 12px rgba(91,141,255,0.2)' }} />
            <span className="text-sm font-semibold tracking-tight" style={{ color: 'var(--ink)' }}>
              stats/<strong>counter</strong>
            </span>
          </div>

          <div className="flex items-center gap-2.5">
            <div
              className="flex items-center overflow-hidden rounded-lg text-xs font-semibold"
              style={{ border: '1px solid var(--line-2)', background: 'var(--bg-3)' }}
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
                      background: active ? 'var(--bg-1)' : 'transparent',
                    }}
                  >
                    {lang.toUpperCase()}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </motion.header>

      <main className="relative mx-auto max-w-5xl px-5 py-10">

        {/* ── Hero ── */}
        <section className="mt-6 grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <motion.h1
              className="font-cormorant font-bold tracking-tight"
              style={{
                color: 'var(--ink)',
                fontSize: 'clamp(2.6rem, 5.5vw, 4rem)',
                lineHeight: 1.06,
                letterSpacing: '-0.01em',
              }}
              {...fadeUp(0.1)}
            >
              {t('desktop_app_landing.title_1')}
              <em style={{ color: 'var(--coral)', fontStyle: 'italic' }}>
                {t('desktop_app_landing.title_accent')}
              </em>
              {t('desktop_app_landing.title_2')}
            </motion.h1>

            <motion.p
              className="mt-5 text-base"
              style={{ color: 'var(--ink-2)', lineHeight: 1.85, maxWidth: '38ch' }}
              {...fadeUp(0.22)}
            >
              {t('desktop_app_landing.description')}
            </motion.p>

            <motion.div className="mt-8 flex flex-wrap gap-3" {...fadeUp(0.32)}>
              <a
                href={supportLink}
                target="_blank"
                rel="noopener noreferrer"
                className="dal-btn-primary inline-flex items-center gap-2.5 rounded-xl px-5 py-3 text-sm font-semibold text-white"
                style={{ background: 'var(--coral)', border: '1px solid var(--coral-2)' }}
              >
                {isPortuguese
                  ? t('desktop_app_landing.support_br_cta')
                  : t('desktop_app_landing.support_global_cta')}
              </a>
            </motion.div>


          </div>

          {/* macOS window frame */}
          <motion.div
            className="dal-hero-window overflow-hidden rounded-2xl"
            style={{ background: 'var(--bg-0)', border: '1px solid rgba(200,215,255,0.1)' }}
            initial={{ opacity: 0, scale: 0.96, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.65, ease: EASE, delay: 0.15 }}
          >
            <div
              className="flex items-center justify-between px-4 py-3"
              style={{
                background: 'linear-gradient(to bottom, var(--bg-3), rgba(24,29,43,0.9))',
                borderBottom: '1px solid var(--line)',
              }}
            >
              <div className="flex items-center gap-1.5">
                <span className="h-3 w-3 rounded-full" style={{ background: '#ff5f57', boxShadow: '0 0 6px rgba(255,95,87,0.5)' }} />
                <span className="h-3 w-3 rounded-full" style={{ background: '#febc2e', boxShadow: '0 0 6px rgba(254,188,46,0.4)' }} />
                <span className="h-3 w-3 rounded-full" style={{ background: '#28c840', boxShadow: '0 0 6px rgba(40,200,64,0.4)' }} />
              </div>
              <span className="font-mono text-[11px]" style={{ color: 'var(--ink-4)' }}>
                statsCounter.app
              </span>
              <div style={{ width: '3.25rem' }} />
            </div>
            <img
              src={heroImage}
              alt={t('desktop_app_landing.current_features.timer_screenshot_alt')}
              className="w-full object-cover"
            />
          </motion.div>
        </section>

        {/* ── Current Features ── */}
        <motion.section className="mt-20" {...fadeUpView(0)}>

          {/* Section display title */}
          <motion.h2
            className="font-cormorant mt-5 font-bold tracking-tight"
            style={{
              color: 'var(--ink)',
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              lineHeight: 1.08,
              letterSpacing: '-0.01em',
            }}
            {...fadeUpView(0.08)}
          >
            {t('desktop_app_landing.current_features.section_title_1')}
            <em style={{ color: 'var(--coral)', fontStyle: 'italic' }}>
              {t('desktop_app_landing.current_features.section_title_accent')}
            </em>
            {t('desktop_app_landing.current_features.section_title_2')}
          </motion.h2>

          <div className="mt-8 grid gap-4 lg:grid-cols-2">
            {currentFeatures.map((feature, i) => (
              <motion.div
                key={feature.title}
                className="dal-feature-card rounded-xl p-6"
                style={{ background: 'var(--bg-3)', border: '1px solid var(--line)' }}
                {...fadeUpView(i * 0.08)}
                whileHover={{ y: -3, transition: { duration: 0.22, ease: EASE } }}
              >
                {/* Index + chip row */}
                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono text-[11px] font-medium" style={{ color: 'var(--ink-4)' }}>
                    {feature.index}
                  </span>
                  {feature.chip && (
                    <span
                      className="rounded-full px-2.5 py-0.5 font-mono text-[9px] font-bold uppercase tracking-[0.16em]"
                      style={{
                        background: 'var(--bg-2)',
                        border: '1px solid var(--line-2)',
                        color: feature.chipColor
                      }}
                    >
                      {feature.chip}
                    </span>
                  )}
                </div>

                {/* Icon + title inline */}
                <div className="mt-4 flex items-center gap-2.5">
                  <FontAwesomeIcon
                    icon={feature.icon}
                    style={{ color: feature.chipColor, fontSize: '1rem', flexShrink: 0 }}
                  />
                  <h3
                    className="font-semibold leading-snug"
                    style={{ color: 'var(--ink)', fontSize: '0.9375rem' }}
                  >
                    {feature.title}
                  </h3>
                </div>

                <p
                  className="mt-3 text-sm"
                  style={{ color: 'var(--ink-2)', lineHeight: 1.75 }}
                >
                  {feature.description}
                </p>

                {feature.image && (
                  <div
                    className="mt-5 overflow-hidden rounded-xl p-1.5"
                    style={{ background: 'var(--bg-0)', border: '1px solid var(--line)' }}
                  >
                    <button
                      type="button"
                      onClick={() => openImagePreview(feature.image!, feature.alt!)}
                      className="dal-preview-btn block w-full overflow-hidden rounded-lg"
                    >
                      <img src={feature.image} alt={feature.alt} className="w-full rounded-lg object-cover" />
                    </button>
                  </div>
                )}
              </motion.div>
            ))}
          </div>

        </motion.section>

        {/* ── Future ── */}
        <motion.section className="mt-5" {...fadeUpView(0)}>
          <div
            className="dal-section-card rounded-2xl p-7 sm:p-10"
            style={{ border: '1px solid var(--line)' }}
          >
            <p
              className="font-mono text-[10px] font-semibold uppercase tracking-[0.28em]"
              style={{ color: 'var(--lime)' }}
            >
              · {t('desktop_app_landing.future.badge')} ·
            </p>
            <p className="mt-4 text-sm" style={{ color: 'var(--ink-3)', lineHeight: 1.8, maxWidth: '52ch' }}>
              {t('desktop_app_landing.future.description')}
            </p>

            <div className="mt-7 grid gap-4 lg:grid-cols-2">
              {futurePillars.map((item, i) => (
                <motion.div
                  key={item.title}
                  className="dal-pillar-card rounded-xl p-6"
                  style={{ background: 'var(--bg-3)', border: '1px solid var(--line)' }}
                  {...fadeUpView(i * 0.09)}
                  whileHover={{ y: -3, transition: { duration: 0.22, ease: EASE } }}
                >
                  <div
                    className="dal-icon-wrap flex h-10 w-10 items-center justify-center rounded-xl text-sm"
                    style={{
                      background: 'var(--bg-2)',
                      border: '1px solid var(--line-2)',
                      color: 'var(--lime)'
                    }}
                  >
                    <FontAwesomeIcon icon={item.icon} />
                  </div>
                  <h3
                    className="mt-4 font-semibold leading-snug"
                    style={{ color: 'var(--ink)', fontSize: '0.9375rem' }}
                  >
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm" style={{ color: 'var(--ink-2)', lineHeight: 1.75 }}>
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* ── Access ── */}
        <motion.section className="mt-5 mb-12" {...fadeUpView(0)}>
          <div
            className="dal-section-card rounded-2xl p-7 sm:p-10"
            style={{ border: '1px solid var(--line)' }}
          >
            <h2
              className="font-semibold leading-tight"
              style={{ color: 'var(--ink)', fontSize: '1.125rem', letterSpacing: '-0.01em' }}
            >
              {t('desktop_app_landing.access_title')}
            </h2>
            <p className="mt-3 text-sm" style={{ color: 'var(--ink-3)', lineHeight: 1.8, maxWidth: '52ch' }}>
              {t('desktop_app_landing.access_description')}
            </p>

            <div className="mt-6 grid gap-5 lg:grid-cols-2">
              <motion.div
                className="dal-support-card rounded-xl p-6"
                style={{ background: 'var(--bg-3)', border: '1px solid var(--line-2)' }}
                {...fadeUpView(0.06)}
              >
                <p
                  className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em]"
                  style={{ color: 'var(--ink-4)' }}
                >
                  {isPortuguese
                    ? t('desktop_app_landing.support_br_label')
                    : t('desktop_app_landing.support_global_label')}
                </p>
                <p
                  className="mt-2.5 font-semibold"
                  style={{ color: 'var(--ink)', fontSize: '1.125rem', letterSpacing: '-0.01em' }}
                >
                  {isPortuguese
                    ? t('desktop_app_landing.support_br_value')
                    : t('desktop_app_landing.support_global_value')}
                </p>
                <p className="mt-2 text-sm" style={{ color: 'var(--ink-2)', lineHeight: 1.7 }}>
                  {isPortuguese
                    ? t('desktop_app_landing.support_br_description')
                    : t('desktop_app_landing.support_global_description')}
                </p>

                <a
                  href={supportLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="dal-btn-primary mt-5 inline-flex w-full items-center justify-center rounded-xl px-4 py-3 text-sm font-semibold text-white"
                  style={{ background: 'var(--coral)', border: '1px solid var(--coral-2)' }}
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
                className="dal-support-card rounded-xl p-6"
                style={{ background: 'var(--bg-3)', border: '1px solid var(--line)' }}
                {...fadeUpView(0.13)}
              >
                <div
                  className="dal-icon-wrap flex h-10 w-10 items-center justify-center rounded-xl text-sm"
                  style={{
                    background: 'var(--bg-2)',
                    border: '1px solid var(--line-2)',
                    color: 'var(--lime)'
                  }}
                >
                  <FontAwesomeIcon icon={faEnvelope} />
                </div>

                <h3
                  className="mt-5 font-semibold leading-snug"
                  style={{ color: 'var(--ink)', fontSize: '0.9375rem' }}
                >
                  {t('desktop_app_landing.email_title')}
                </h3>

                <p className="mt-2.5 text-sm" style={{ color: 'var(--ink-2)', lineHeight: 1.75 }}>
                  {t('desktop_app_landing.email_description')}
                </p>

                <a
                  href="mailto:enzolima527@gmail.com?subject=StatsCounter%20Desktop%20App"
                  className="dal-btn-secondary mt-6 inline-flex items-center justify-center rounded-xl px-4 py-3 text-sm font-semibold"
                  style={{
                    background: 'var(--bg-2)',
                    border: '1px solid var(--line-2)',
                    color: 'var(--lime)'
                  }}
                >
                  enzolima527@gmail.com
                </a>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* Image Preview Modal */}
        {selectedImage && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center px-4 py-6 backdrop-blur-sm"
            style={{ background: 'rgba(5,7,13,0.94)' }}
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
                    style={{
                      background: 'var(--bg-3)',
                      border: '1px solid var(--line-2)',
                      color: 'var(--ink-2)'
                    }}
                  >
                    {label}
                  </button>
                ))}
              </div>
              <div
                className="overflow-auto rounded-2xl p-2 shadow-2xl"
                style={{ background: 'var(--bg-0)', border: '1px solid var(--line-2)' }}
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
