===============================================================================
                     Bael Template — Brutalist Blog
                     shiro — where style meets function
===============================================================================

Category: Blog Template
Live URL:  https://bael-template-sh1r00-814.netlify.app
GitHub:    https://github.com/sh1r00/bael-template-nuxt4

===============================================================================
ABOUT THIS PROJECT
===============================================================================

Typography-first brutalist design blog. Markdown content, category filtering, tag system, and search functionality.

Technology Stack:
Nuxt 4, Vue 3, Nuxt Content, Tailwind CSS, Dark Mode, PWA, M3 Design

Shiro Portfolio: https://shiro-portfolio-sh1r00.netlify.app

===============================================================================
DEPLOYMENT
===============================================================================

npx nuxi generate
Deploy .output/public to Netlify via API zip upload.

===============================================================================
QUICK START (Local Development)
===============================================================================

1. Install dependencies:
   npm install

2. Start development server:
   npm run dev

3. Build for production:
   npm run generate

4. Preview production build:
   npx serve .output/public

===============================================================================
NOTES
===============================================================================

- Built with Nuxt 4 (compatibilityVersion 4) and Vue 3 Composition API
- All projects use atomic design: atoms/ → molecules/ → organisms/
- Dark mode is SSR-safe via Pinia store with useCookie() persistence
- PWA configured with service worker for offline access
- CSP headers configured via nuxt-security module (production only)
- i18n supports 3 locales: English, Español, አማርኛ

===============================================================================
Made with ❤️ by shiro — rasisg@gmail.com — github.com/sh1r00
===============================================================================
