# Bael Template — bael-template-nuxt4 (Brutalist Blog)

> Category: Blog Template · Live: https://bael-template-sh1r00-814.netlify.app

## Functionality

A typography-first **brutalist** blog template with a green-on-dark, mono-font terminal aesthetic. Blog posts, categories, and tags are defined in a static TypeScript array (`app/data/blogPosts.ts`) and rendered through dynamic routes with client-side search and tag/category filtering on the home page. It also ships dark mode, a PWA install prompt, and i18n across three locales.

- **Public pages** — `app/pages/index.vue` (home + search/filter), `app/pages/about.vue`, `app/pages/blog/[slug].vue`, `app/pages/categories/[category].vue`, `app/pages/tags/[tag].vue`.
- **Components** — atoms (`ABaseButton`, `ADarkModeToggle`, `AIcon`, `APostCard`) and organisms (`OHeader`, `OFooter`), plus `PwaInstallPrompt.vue`.
- **Content** — static `app/data/blogPosts.ts` (no Nuxt Content / markdown files).
- **Also included** — dark mode (SSR-safe via Pinia + `useCookie`), PWA (offline + install prompt), i18n (3 locales).

## Stack

- Nuxt 4 (`compatibilityVersion: 4`), Vue 3 `<script setup>`, TypeScript
- Tailwind CSS v3.4 (`@nuxtjs/tailwindcss` v6) — brutalist theme with custom colors/typography, `darkMode: 'class'`
- Pinia (stores: `darkMode`, `pwaInstall`)
- `@nuxtjs/i18n` v10 — 3 locales (English, Español, አማርኛ), `strategy: 'prefix'`, `lazy: true`
- `@vite-pwa/nuxt` — service worker, offline caching, installable manifest
- `nuxt-security` — CSP (nonce-based), rate limiter, XSS validator (production only)
- Vitest + Vue Test Utils (unit), Playwright (e2e)

## Steps Taken

`git log --oneline` (newest first):

- `9764a8d` fix(netlify): root `/` redirect to `/en/` (prefix strategy) + SPA fallback to `/200.html`
- `e43a5de` fix(netlify): node 24 + legacy-peer-deps (nuxt-security@2.6.0 needs >=24)
- `68b8af9` fix(i18n+security): detectBrowserLanguage:false, `$t`→`t`, missing keys, CSP nonce, lazy i18n, branded PWA
- `c6a01bb` fix README.md formatting
- `efa55a7` convert README.txt to README.md with GitHub markdown formatting
- `f1dd744` add README.txt with deploy instructions + project overview
- `998eb51` nuxt4 migration/creation + bael-template-nuxt4

## Pitfalls & Fixes

### Shared pitfalls (all shiro Nuxt 4 templates)

- **`nuxt-security@2.6.0` needs Node ≥ 24** — Netlify's default Node is too old and `npm install` fails (EBADENGINE). Fix: `NODE_VERSION = "24"` in `netlify.toml` `[build.environment]`.
- **esbuild peer conflict** — a peer dependency conflict (esbuild/rollup) aborts `npm install` with ERESOLVE. Fix: `npm install --legacy-peer-deps`.
- **i18n v10 `detectBrowserLanguage`** — must be `false`; browser detection causes unpredictable 302s on first load. Fix: `detectBrowserLanguage: false` and build links with `const localePath = useLocalePath()`.
- **`$t()` is banned in `<template>`** — i18n v10 drops the global `$t()` template helper. Fix: `const { t } = useI18n()` in `<script setup>` and call `t('key')`.
- **Component auto-import `pathPrefix: false`** — the default path-prefixed auto-import names (e.g. `OrganismsOHeroSection`) don't match the tags, producing a blank screen with no console errors. Fix: declare each component dir with `pathPrefix: false`.
- **PWA `navigateFallback`** — a precached SPA fallback serves non-precached URLs as the app shell → blank screen. Fix: `navigateFallback: null` and exclude `.html` from precache globs (the Netlify SPA fallback targets `/200.html`).
- **i18n `prefix` strategy root redirect** — with `strategy: 'prefix'` there is no page at `/`. Netlify must 302 `/` → `/en/` (not a `/*` → `/index.html` SPA fallback, which loops).
- **`defineProps()` without `const props =`** — in `<script setup>` you must capture the return value (`const props = defineProps<...>()`); otherwise destructuring throws "props is not defined".
- **SSG vs SSR output dirs** — `nuxt build` (SSR) writes `.output/server` + `.output/public`; `nuxt generate` (SSG) writes the static site to `.output/public` only. Netlify `publish` must point at `.output/public`.

### Project-specific

- **Static content, not markdown** — posts live in `app/data/blogPosts.ts` (typed `BlogPost[]`), not Nuxt Content or markdown files; edit content there.
- **`pathPrefix: false` on atoms + organisms only** — this template declares `atoms` and `organisms` (no `molecules` dir). Tag names must match the component file names exactly.
- **Legacy Netlify CMS admin** — `public/admin/` contains a Netlify CMS `config.yml` + `index.html` left over from the original Bael template; it is not wired into the Nuxt app.

## Deployment

Static site generation:

```bash
npm install --legacy-peer-deps
npm run generate   # → .output/public
```

Netlify (`netlify.toml`): `NODE_VERSION = "24"`, build command `npm install --legacy-peer-deps --no-audit --no-fund && npm run generate`, publish dir `.output/public`, redirects `/` → `/en/` (302) and `/*` → `/200.html` (200, SPA fallback).

Live: https://bael-template-sh1r00-814.netlify.app

## TODO / Roadmap
- [ ] Point a custom domain (optional) — for client-facing work; a single wildcard domain can cover all sites.
