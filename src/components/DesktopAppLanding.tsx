import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowLeft,
  faEnvelope,
  faKeyboard,
  faPalette,
  faWandMagicSparkles,
  faDesktop
} from '@fortawesome/free-solid-svg-icons';
import Header from './Header';
import Footer from './Footer';

const DesktopAppLanding: React.FC = () => {
  const { t, i18n } = useTranslation();
  const isPortuguese = i18n.language.startsWith('pt');

  const features = [
    {
      icon: faKeyboard,
      title: t('desktop_app_landing.features.hotkeys_title'),
      description: t('desktop_app_landing.features.hotkeys_description')
    },
    {
      icon: faPalette,
      title: t('desktop_app_landing.features.customization_title'),
      description: t('desktop_app_landing.features.customization_description')
    },
    {
      icon: faWandMagicSparkles,
      title: t('desktop_app_landing.features.future_title'),
      description: t('desktop_app_landing.features.future_description')
    }
  ];

  const supportLink = isPortuguese
    ? 'https://link.mercadopago.com.br/statscounter'
    : 'https://buymeacoffee.com/ogl7';

  return (
    <main className="max-w-5xl mx-auto px-4 py-8">
      <Header />

      <section className="relative mt-6 overflow-hidden rounded-[2rem] border border-amber-300/15 bg-gradient-to-br from-zinc-900/94 via-[#161108]/96 to-zinc-950 shadow-2xl backdrop-blur-xl">
        <div className="pointer-events-none absolute inset-y-0 left-[-12%] w-56 bg-gradient-to-r from-transparent via-amber-200/12 to-transparent blur-3xl" />
        <div className="pointer-events-none absolute right-[-6%] top-[-10%] h-44 w-44 rounded-full bg-amber-300/10 blur-3xl" />
        <div className="pointer-events-none absolute inset-x-14 top-0 h-px bg-gradient-to-r from-transparent via-amber-100/55 to-transparent" />

        <div className="relative border-b border-amber-200/10 bg-[radial-gradient(circle_at_top_left,_rgba(255,224,138,0.16),_transparent_30%),radial-gradient(circle_at_bottom_right,_rgba(217,119,6,0.12),_transparent_32%)] px-6 py-10 sm:px-10">
          <Link
            to="/"
            className="mb-6 inline-flex items-center gap-2 text-sm text-zinc-300 transition hover:text-amber-100"
          >
            <FontAwesomeIcon icon={faArrowLeft} />
            {t('desktop_app_landing.back_home')}
          </Link>

          <h1 className="mt-5 max-w-3xl bg-gradient-to-r from-[#fff8d6] via-[#ffe27a] via-[42%] to-[#b97b16] bg-clip-text text-4xl font-black leading-tight text-transparent sm:text-5xl">
            {t('desktop_app_landing.title')}
          </h1>

          <p className="mt-4 max-w-2xl text-base leading-7 text-zinc-200 sm:text-lg">
            {t('desktop_app_landing.description')}
          </p>

          <div className="mt-6 max-w-2xl rounded-2xl border border-amber-300/20 bg-gradient-to-r from-amber-200/[0.08] via-amber-100/[0.04] to-amber-500/[0.08] px-5 py-4 shadow-[0_0_40px_rgba(251,191,36,0.06)]">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-amber-300">
              {t('desktop_app_landing.beta_badge')}
            </p>
            <p className="mt-2 text-sm leading-6 text-zinc-200">
              {t('desktop_app_landing.beta_description')}
            </p>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="rounded-2xl border border-amber-200/10 bg-white/[0.04] p-5 shadow-lg transition hover:border-amber-200/18 hover:bg-white/[0.06]"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-amber-200/12 bg-gradient-to-br from-amber-200/14 to-amber-500/10 text-amber-200">
                  <FontAwesomeIcon icon={feature.icon} />
                </div>
                <h2 className="mt-4 text-lg font-bold text-white">{feature.title}</h2>
                <p className="mt-2 text-sm leading-6 text-zinc-300">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative grid gap-5 px-6 py-8 sm:px-10 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-2xl border border-amber-200/10 bg-white/[0.04] p-6">
            <h2 className="text-xl font-bold text-white">{t('desktop_app_landing.access_title')}</h2>
            <p className="mt-3 text-sm leading-7 text-zinc-300">
              {t('desktop_app_landing.access_description')}
            </p>

            <div className="mt-5 rounded-2xl border border-amber-300/18 bg-gradient-to-br from-[#221809]/80 via-[#1c160d]/75 to-zinc-900/80 p-5 shadow-[0_0_45px_rgba(251,191,36,0.05)]">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-200/70">
                {isPortuguese
                  ? t('desktop_app_landing.support_br_label')
                  : t('desktop_app_landing.support_global_label')}
              </p>
              <p className="mt-2 bg-gradient-to-r from-[#fff6cf] via-[#f4d46b] to-[#c78c1f] bg-clip-text text-lg font-bold text-transparent">
                {isPortuguese
                  ? t('desktop_app_landing.support_br_value')
                  : t('desktop_app_landing.support_global_value')}
              </p>
              <p className="mt-2 text-sm text-zinc-300">
                {isPortuguese
                  ? t('desktop_app_landing.support_br_description')
                  : t('desktop_app_landing.support_global_description')}
              </p>

              <a
                href={supportLink}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex w-full items-center justify-center rounded-xl border border-amber-200/25 bg-gradient-to-r from-[#f6d66c] via-[#f2c94d] to-[#d69a1b] px-4 py-3 text-sm font-semibold text-[#241706] transition hover:brightness-105"
              >
                {isPortuguese
                  ? t('desktop_app_landing.support_br_cta')
                  : t('desktop_app_landing.support_global_cta')}
              </a>
            </div>
          </div>

          <div className="rounded-2xl border border-amber-200/10 bg-white/[0.04] p-6">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-amber-200/12 bg-gradient-to-br from-amber-100/14 to-amber-400/10 text-amber-200">
              <FontAwesomeIcon icon={faEnvelope} />
            </div>

            <h2 className="mt-4 bg-gradient-to-r from-[#fff6cf] via-[#f4d46b] to-[#c78c1f] bg-clip-text text-xl font-bold text-transparent">
              {t('desktop_app_landing.email_title')}
            </h2>

            <p className="mt-3 text-sm leading-7 text-zinc-200">
              {t('desktop_app_landing.email_description')}
            </p>

            <a
              href="mailto:enzolima527@gmail.com?subject=StatsCounter%20Desktop%20App"
              className="mt-5 inline-flex items-center justify-center rounded-xl border border-amber-200/18 bg-white/5 px-4 py-3 text-sm font-semibold text-amber-100 transition hover:border-amber-100/35 hover:bg-white/8 hover:text-white"
            >
              enzolima527@gmail.com
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default DesktopAppLanding;
