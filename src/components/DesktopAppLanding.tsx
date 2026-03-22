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

  const supportCardClassName = isPortuguese
    ? 'rounded-2xl border border-green-500/20 bg-green-500/[0.08] p-5 transition hover:border-green-400/35 hover:bg-green-500/[0.12]'
    : 'rounded-2xl border border-yellow-400/20 bg-yellow-400/[0.08] p-5 transition hover:border-yellow-300/35 hover:bg-yellow-400/[0.12]';

  return (
    <main className="max-w-5xl mx-auto px-4 py-8">
      <Header />

      <section className="mt-6 overflow-hidden rounded-[2rem] border border-zinc-700/60 bg-gradient-to-br from-zinc-800/90 via-zinc-900/92 to-zinc-950/95 shadow-2xl backdrop-blur-xl">
        <div className="border-b border-zinc-700/40 bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.18),_transparent_32%),radial-gradient(circle_at_bottom_right,_rgba(16,185,129,0.14),_transparent_30%)] px-6 py-10 sm:px-10">
          <Link
            to="/"
            className="mb-6 inline-flex items-center gap-2 text-sm text-zinc-300 transition hover:text-white"
          >
            <FontAwesomeIcon icon={faArrowLeft} />
            {t('desktop_app_landing.back_home')}
          </Link>

          <h1 className="mt-5 max-w-3xl text-4xl font-black leading-tight text-white sm:text-5xl">
            {t('desktop_app_landing.title')}
          </h1>

          <p className="mt-4 max-w-2xl text-base leading-7 text-zinc-200 sm:text-lg">
            {t('desktop_app_landing.description')}
          </p>

          <div className="mt-6 max-w-2xl rounded-2xl border border-amber-400/25 bg-amber-400/[0.08] px-5 py-4">
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
                className="rounded-2xl border border-zinc-700/60 bg-zinc-900/65 p-5 shadow-lg"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/15 text-blue-300">
                  <FontAwesomeIcon icon={feature.icon} />
                </div>
                <h2 className="mt-4 text-lg font-bold text-white">{feature.title}</h2>
                <p className="mt-2 text-sm leading-6 text-zinc-300">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-5 px-6 py-8 sm:px-10 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-2xl border border-zinc-700/60 bg-zinc-900/65 p-6">
            <h2 className="text-xl font-bold text-white">{t('desktop_app_landing.access_title')}</h2>
            <p className="mt-3 text-sm leading-7 text-zinc-300">
              {t('desktop_app_landing.access_description')}
            </p>

            <div className={`mt-5 ${supportCardClassName}`}>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-400">
                {isPortuguese
                  ? t('desktop_app_landing.support_br_label')
                  : t('desktop_app_landing.support_global_label')}
              </p>
              <p className="mt-2 text-lg font-bold text-white">
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
                className={`mt-4 inline-flex w-full items-center justify-center rounded-xl px-4 py-3 text-sm font-semibold transition ${
                  isPortuguese
                    ? 'bg-green-600 text-white hover:bg-green-700'
                    : 'bg-yellow-400 text-black hover:bg-yellow-300'
                }`}
              >
                {isPortuguese
                  ? t('desktop_app_landing.support_br_cta')
                  : t('desktop_app_landing.support_global_cta')}
              </a>
            </div>
          </div>

          <div className="rounded-2xl border border-blue-500/20 bg-blue-500/[0.08] p-6">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/15 text-blue-300">
              <FontAwesomeIcon icon={faEnvelope} />
            </div>

            <h2 className="mt-4 text-xl font-bold text-white">
              {t('desktop_app_landing.email_title')}
            </h2>

            <p className="mt-3 text-sm leading-7 text-zinc-200">
              {t('desktop_app_landing.email_description')}
            </p>

            <a
              href="mailto:enzolima527@gmail.com?subject=StatsCounter%20Desktop%20App"
              className="mt-5 inline-flex items-center justify-center rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
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
