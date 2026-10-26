import { readFileSync, writeFileSync, mkdirSync } from 'node:fs'

export const SITE = 'https://www.statscounter.pro'
const PT_URL = `${SITE}/desktop-app`
const EN_URL = `${SITE}/en/desktop-app`

const VIDEO = {
  id: 'TAJ6pQCgb74',
  uploadDate: '2026-07-18T12:39:37-07:00',
  duration: 'PT9M34S',
}

const LANGS = [
  { file: 'dist/desktop-app.html', url: PT_URL, htmlLang: 'pt-BR', locale: 'src/locales/ptTranslation.json', price: { value: '20', currency: 'BRL' } },
  { file: 'dist/en/desktop-app.html', url: EN_URL, htmlLang: 'en', locale: 'src/locales/enTranslation.json', price: { value: '20', currency: 'USD' } },
]

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
// JSON-LD lives inside <script>, so only "</" could break out of it.
const ld = (obj) => `<script type="application/ld+json">${JSON.stringify(obj).replace(/<\//g, '<\\/')}</script>`

const head = ({ url, htmlLang, price }, d) => {
  const f = d.current_features
  const title = esc(d.seo.title)
  const description = esc(d.seo.description)
  return `
    <title>${title}</title>
    <meta name="description" content="${description}" />
    <meta name="keywords" content="${esc(d.seo.keywords)}" />
    <link rel="canonical" href="${url}" />
    <link rel="alternate" hreflang="pt-BR" href="${PT_URL}" />
    <link rel="alternate" hreflang="en" href="${EN_URL}" />
    <link rel="alternate" hreflang="x-default" href="${PT_URL}" />
    <meta property="og:title" content="${title}" />
    <meta property="og:description" content="${description}" />
    <meta property="og:url" content="${url}" />
    <meta property="og:locale" content="${htmlLang.replace('-', '_')}" />
    <meta name="twitter:title" content="${title}" />
    <meta name="twitter:description" content="${description}" />
    ${ld({
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'SoftwareApplication',
          name: 'StatsCounter Desktop',
          operatingSystem: 'Windows, Linux',
          applicationCategory: 'MultimediaApplication',
          url,
          inLanguage: htmlLang,
          description: d.seo.description,
          featureList: [f.psn_sync_title, f.steam_sync_title, f.retroachievements_sync_title, f.steam_banner_title, f.twitch_title, f.hotkeys_title, f.timer_title, f.customization_title],
          offers: { '@type': 'Offer', price: price.value, priceCurrency: price.currency },
          creator: { '@type': 'Person', name: 'Enzo Lima' },
        },
        {
          '@type': 'VideoObject',
          name: d.video.iframe_title,
          description: d.video.description,
          thumbnailUrl: `https://i.ytimg.com/vi/${VIDEO.id}/hqdefault.jpg`,
          uploadDate: VIDEO.uploadDate,
          duration: VIDEO.duration,
          contentUrl: `https://www.youtube.com/watch?v=${VIDEO.id}`,
          embedUrl: `https://www.youtube.com/embed/${VIDEO.id}`,
        },
        {
          '@type': 'FAQPage',
          mainEntity: d.faq.items.map(({ q, a }) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
        },
      ],
    })}`
}

// Crawlable copy of the page for bots that don't run JS; React replaces #root on load.
const body = (d) => {
  const f = d.current_features
  const section = (title, text) => `<h3>${esc(title)}</h3><p>${esc(text)}</p>`
  return `<div id="root"><main>
      <h1>${esc(d.title_1 + d.title_accent + d.title_2)}</h1>
      <p>${esc(d.description)}</p>
      <h2>${esc(d.video.title_1 + d.video.title_accent + d.video.title_2)}</h2>
      <p><a href="https://www.youtube.com/watch?v=${VIDEO.id}">${esc(d.video.iframe_title)}</a></p>
      <h2>${esc(f.platform_sync_title)}</h2>
      <p>${esc(f.platform_sync_description)}</p>
      ${section(f.psn_sync_title, f.psn_sync_description)}
      ${section(f.steam_sync_title, f.steam_sync_description)}
      ${section(f.retroachievements_sync_title, f.retroachievements_sync_description)}
      ${section(f.twitch_title, f.twitch_description)}
      ${section(f.hotkeys_title, f.hotkeys_description)}
      ${section(f.timer_title, f.timer_description)}
      ${section(f.customization_title, f.customization_description)}
      ${section(f.steam_banner_title, f.steam_banner_description)}
      <h2>${esc(d.faq.title_1 + d.faq.title_accent + d.faq.title_2)}</h2>
      ${d.faq.items.map(({ q, a }) => section(q, a)).join('\n      ')}
      <h2>${esc(d.access_title)}</h2>
      <p>${esc(d.access_description)}</p>
    </main></div>`
}

// The SPA serves index.html for every route, so without this /desktop-app inherits the
// home's title and canonical and Google folds it into the home. vercel.json rewrites to these.
export const desktopPages = () => ({
  name: 'desktop-app-pages',
  apply: 'build',
  closeBundle() {
    const index = readFileSync('dist/index.html', 'utf8')
    mkdirSync('dist/en', { recursive: true })
    for (const lang of LANGS) {
      const d = JSON.parse(readFileSync(lang.locale, 'utf8')).desktop_app_landing
      const html = index
        .replace(/<html lang="[^"]*">/, `<html lang="${lang.htmlLang}">`)
        .replace(/<title>[\s\S]*?<link rel="canonical"[^>]*>/, '')
        .replace(/<meta (property="og:(title|description|url)"|name="twitter:(title|description)")[^>]*>/g, '')
        .replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/, '')
        .replace('<meta charset="UTF-8" />', `<meta charset="UTF-8" />${head(lang, d)}`)
        .replace('<div id="root"></div>', body(d))
      writeFileSync(lang.file, html)
    }
  },
})
