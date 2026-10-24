// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityVersion: 4,
  future: { compatibilityVersion: 4 },
  devtools: { enabled: true },

  modules: [
    '@vite-pwa/nuxt',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/i18n',
    'nuxt-security',
  ],

  css: ['~/assets/css/main.css'],

  app: {
    head: {
      link: [
        {
          rel: 'preconnect',
          href: 'https://fonts.googleapis.com',
        },
        {
          rel: 'preconnect',
          href: 'https://fonts.gstatic.com',
          crossorigin: '',
        },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&family=JetBrains+Mono:wght@400;500;700&display=swap',
        },
      ],
    },
  },

  components: {
    dirs: [
      { path: '~/components/atoms', pathPrefix: false },
      { path: '~/components/organisms', pathPrefix: false },
    ],
  },

  i18n: {
    strategy: 'prefix',
    defaultLocale: 'en',
    baseUrl: process.env.NUXT_PUBLIC_SITE_URL || 'http://localhost:3000',
    langDir: 'locales',
    locales: [
      { code: 'en', language: 'en', iso: 'en-US', file: 'en.json', name: 'English' },
      { code: 'es', language: 'es', iso: 'es-ES', file: 'es.json', name: 'Español' },
      { code: 'am', language: 'am', iso: 'am-ET', file: 'am.json', name: 'አማርኛ' },
    ],
    detectBrowserLanguage: false,
    vueI18n: './i18n.config.ts',
    lazy: true,
  },

  pwa: {
    registerType: 'autoUpdate',
    devOptions: { enabled: false },
    manifest: { name: 'BAEL', short_name: 'BAEL', theme_color: '#00ff41', background_color: '#ffffff', display: 'standalone' },
    workbox: { globPatterns: ['**/*.{js,css,html,png,svg,ico,woff2,json}'], navigateFallback: '/', cleanupOutdatedCaches: true, skipWaiting: true, clientsClaim: true,
      runtimeCaching: [
        { urlPattern: /\\.json$/, handler: 'StaleWhileRevalidate', options: { cacheName: 'i18n' } },
        { urlPattern: /\\.(?:png|jpg|jpeg|svg|gif|webp|ico)$/, handler: 'CacheFirst', options: { cacheName: 'images' } },
        { urlPattern: /^https:\/\/fonts\\.googleapis\\.com/, handler: 'StaleWhileRevalidate', options: { cacheName: 'google-fonts' } },
        { urlPattern: /^https:\/\/fonts\\.gstatic\\.com/, handler: 'CacheFirst', options: { cacheName: 'google-webfonts' } },
      ],
    },
  },
  security: {
    headers: process.env.NODE_ENV === "development" ? false : {
      contentSecurityPolicy: {
        'default-src': ["'self'"],
        'script-src': ["'self'", "'strict-dynamic'", "'nonce-{{nonce}}'"],
        'style-src': ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'],
        'font-src': ["'self'", 'https://fonts.gstatic.com', 'https://fonts.googleapis.com'],
        'img-src': ["'self'", 'data:', 'https:'],
        'connect-src': ["'self'"],
        'frame-src': ["'self'"],
        'frame-ancestors': ["'self'"],
        'base-uri': ["'self'"],
        'form-action': ["'self'"],
      },
    },
    rateLimiter: { tokensPerInterval: 30, interval: 60000 },
    xssValidator: process.env.NODE_ENV !== "development",
  },

  tailwindcss: {
    cssPath: '~/assets/css/main.css',
    config: {
      darkMode: 'class',
      theme: {
        extend: {
          colors: {
            primary: '#00ff41',
            'primary-dim': '#00cc34',
            surface: '#0a0a0a',
            'surface-alt': '#111111',
            'surface-raised': '#1a1a1a',
            border: '#333333',
            'border-bright': '#00ff41',
            'text-primary': '#e0e0e0',
            'text-secondary': '#888888',
            'text-muted': '#555555',
          },
          fontFamily: {
            mono: ['"JetBrains Mono"', 'monospace'],
            sans: ['Inter', 'system-ui', 'sans-serif'],
          },
          borderWidth: {
            '3': '3px',
          },
          typography: {
            DEFAULT: {
              css: {
                maxWidth: 'none',
                a: {
                  color: '#00ff41',
                  textDecoration: 'underline',
                  textUnderlineOffset: '4px',
                },
                code: {
                  fontFamily: '"JetBrains Mono", monospace',
                  backgroundColor: '#1a1a1a',
                  padding: '0.2em 0.4em',
                  borderRadius: '0',
                  fontWeight: '400',
                  color: '#00ff41',
                },
                pre: {
                  backgroundColor: '#0a0a0a',
                  border: '2px solid #333333',
                  borderRadius: '0',
                },
                'code::before': false,
                'code::after': false,
              },
            },
          },
        },
      },
    },
  },
  vite: {
    optimizeDeps: {
      include: ['@vue/devtools-core', '@vue/devtools-kit', 'pinia'],
    },
  },
  nitro: { prerender: { failOnError: false } },
})
