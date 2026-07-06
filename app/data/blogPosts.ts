export interface BlogPost {
  slug: string
  title: string
  date: string
  excerpt: string
  body: string
  tags: string[]
  category: string
  author: {
    name: string
    avatar: string
  }
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'brutalist-design-philosophy',
    title: 'The Brutalist Design Philosophy in Modern Web Development',
    date: '2025-12-15',
    excerpt: 'Exploring how brutalist architecture principles translate into raw, honest web design that prioritizes function over decoration.',
    body: `Brutalism in web design draws inspiration from the architectural movement of the 1950s-70s. Just as concrete buildings exposed their raw materials and structure, brutalist websites strip away unnecessary decoration to reveal the fundamental elements of the web.

## Why Brutalism Matters Now

In an era of cookie-cutter designs and framework fatigue, brutalism offers something refreshing: **honesty**. Every border, every color choice, every layout decision is intentional and visible.

### Core Principles

- **Raw materials**: Use system fonts, default colors, and visible borders.
- **Structural honesty**: Let the HTML structure define the layout hierarchy.
- **Anti-decoration**: Remove gradients, shadows, and animations that serve no functional purpose.
- **High contrast**: Embrace dark backgrounds with bright, monospace typography.

## Implementation in Practice

When building a brutalist blog, the focus shifts from visual polish to content clarity. The design becomes a frame that amplifies the writing rather than competing with it.

> "Truth to materials" — not just for concrete, but for code.

The result is a reading experience that feels direct, developer-friendly, and refreshingly different from the generic SaaS aesthetic that dominates the modern web.`,
    tags: ['design', 'philosophy', 'brutalism'],
    category: 'Design',
    author: { name: 'Bael', avatar: '' },
  },
  {
    slug: 'nuxt-4-migration-guide',
    title: 'Migrating from Nuxt 3 to Nuxt 4: A Practical Guide',
    date: '2025-11-28',
    excerpt: 'Step-by-step walkthrough of the Nuxt 4 migration process, covering the new directory structure, composables, and performance improvements.',
    body: `Nuxt 4 introduces a new project structure that moves source files into an \`app/\` directory, bringing Nuxt closer to standard Vue/Nitro conventions.

## The New Directory Structure

\`\`\`
app/
  assets/
  components/
  composables/
  layouts/
  middleware/
  pages/
  plugins/
  stores/
  app.vue
\`\`\`

### Key Changes

1. **app/ directory** — All source code now lives under \`app/\`. The root \`pages/\`, \`components/\`, etc. directories are no longer auto-imported.
2. **compatibilityVersion: 4** — Opt-in to Nuxt 4 behavior explicitly.
3. **Improved TypeScript** — Better type inference for composables and auto-imports.

## Migration Steps

Start by setting \`compatibilityVersion: 4\` in your \`nuxt.config.ts\`:

\`\`\`ts
export default defineNuxtConfig({
  future: { compatibilityVersion: 4 },
})
\`\`\`

Then move your source files into the \`app/\` directory and update any path references.

### Watch Out For

- **Auto-imports**: Components in \`app/components/\` are still auto-imported, but nested paths may need explicit \`components.dirs\` configuration.
- **Middleware**: Global middleware must be in \`app/middleware/\` with a \`.global.ts\` suffix.
- **Plugins**: Explicit plugin registration is now the recommended pattern.

The migration is straightforward for most projects and the payoff is worth it — faster builds, cleaner structure, and better developer experience.`,
    tags: ['nuxt', 'javascript', 'migration'],
    category: 'Development',
    author: { name: 'Bael', avatar: '' },
  },
  {
    slug: 'css-grid-brutalist-layouts',
    title: 'CSS Grid Patterns for Brutalist Layouts',
    date: '2025-11-10',
    excerpt: 'Practical CSS Grid techniques for creating asymmetric, structurally honest layouts that define brutalist web design.',
    body: `CSS Grid is the perfect tool for brutalist layouts. Its explicit row and column definitions make the structure of your page visible and intentional.

## Asymmetric Grids

The hallmark of brutalist design is asymmetry. Unlike centered, balanced layouts, brutalist grids often feature:

- Wide content blocks next to narrow sidebars
- Offset headers that break the vertical rhythm
- Full-bleed elements that stretch edge to edge

\`\`\`css
.brutalist-grid {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2px;
  border: 3px solid var(--color-border);
}
\`\`\`

## The Gap as Border Technique

One signature brutalist technique is using grid gaps as visible borders:

\`\`\`css
.grid-with-visible-borders {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 3px;
  background: #00ff41; /* This becomes the border color */
}

.grid-with-visible-borders > * {
  background: #0a0a0a; /* Cell background */
}
\`\`\`

## Content-First Sizing

Instead of fixed breakpoints, use \`auto-fill\` and \`minmax()\` to let content dictate the grid:

\`\`\`css
.post-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2px;
  background: #333;
}
\`\`\`

This creates a fluid grid that adapts naturally — no media queries required. The structure is visible in the code and on screen.`,
    tags: ['css', 'grid', 'layout'],
    category: 'Design',
    author: { name: 'Bael', avatar: '' },
  },
  {
    slug: 'building-search-with-fusejs',
    title: 'Adding Blazing-Fast Client-Side Search with Fuse.js',
    date: '2025-10-22',
    excerpt: 'Implement fuzzy search for your blog using Fuse.js — zero server requirements, instant results, and a great developer experience.',
    body: `Fuse.js is a powerful, lightweight fuzzy-search library that works entirely client-side. It's perfect for blogs and documentation sites where you want fast search without a backend.

## Why Fuse.js?

- **Lightweight**: ~15KB gzipped.
- **Fuzzy matching**: Handles typos and approximate searches.
- **Configurable**: Weight fields, threshold tuning, and extended search.
- **Zero dependencies**: No server, no index builds.

## Basic Setup

\`\`\`ts
import Fuse from 'fuse.js'

const posts = [
  { title: 'Brutalist Design', content: '...' },
  { title: 'Nuxt 4 Migration', content: '...' },
]

const fuse = new Fuse(posts, {
  keys: ['title', 'content', 'tags'],
  threshold: 0.3,
  includeScore: true,
})

const results = fuse.search('brutalist')
// [{ item: {...}, score: 0.1, refIndex: 0 }]
\`\`\`

## Advanced Configuration

Tune the search experience with weighted keys:

\`\`\`ts
const fuse = new Fuse(posts, {
  keys: [
    { name: 'title', weight: 0.7 },
    { name: 'tags', weight: 0.5 },
    { name: 'content', weight: 0.3 },
  ],
  threshold: 0.4,
  distance: 100,
})
\`\`\`

Title matches get priority, then tags, then body content. This creates a natural search ranking that matches user expectations.

## Integration with Vue/Nuxt

Create a composable:

\`\`\`ts
export function useSearch(posts: Ref<Post[]>) {
  const query = ref('')
  const fuse = computed(() => new Fuse(posts.value, { ... }))
  const results = computed(() =>
    query.value ? fuse.value.search(query.value) : []
  )
  return { query, results }
}
\`\`\`

The result is instant, typo-tolerant search that works offline and requires zero infrastructure.`,
    tags: ['javascript', 'search', 'fuse.js'],
    category: 'Development',
    author: { name: 'Bael', avatar: '' },
  },
  {
    slug: 'typography-in-brutalist-design',
    title: 'Typography That Speaks: Monospace in Brutalist Design',
    date: '2025-10-05',
    excerpt: 'Why monospace fonts are the soul of brutalist web design and how to pair them effectively with sans-serif body text.',
    body: `Typography is the voice of your design. In brutalist web design, that voice is direct, unadorned, and often monospaced.

## Why Monospace?

Monospace fonts embody brutalist principles:

- **Every character is equal** — unlike proportional fonts, no letter gets more space than another.
- **Visible grid** — monospace text aligns to a natural grid, exposing the underlying structure.
- **Raw aesthetic** — reminiscent of terminals, code editors, and typewriters.

## JetBrains Mono

[JetBrains Mono](https://www.jetbrains.com/lp/mono/) is a developer-oriented monospace font with:

- **Heightened x-height** for better readability at small sizes.
- **Distinct letterforms** that reduce confusion (I vs l, 0 vs O).
- **Coding ligatures** — optional, but beautiful when enabled.

## Pairing Monospace with Sans-Serif

A common brutalist pattern pairs monospace headings with a clean sans-serif body:

\`\`\`css
:root {
  --font-mono: 'JetBrains Mono', monospace;
  --font-sans: 'Inter', system-ui, sans-serif;
}

h1, h2, h3, h4, h5, h6 {
  font-family: var(--font-mono);
  text-transform: uppercase;
  letter-spacing: -0.5px;
}

body {
  font-family: var(--font-sans);
  line-height: 1.7;
}
\`\`\`

### The Hierarchy

- **H1**: Monospace, uppercase, bold — commands attention.
- **H2**: Monospace, sentence case, bordered left.
- **Body**: Inter, generous line-height for readability.
- **Code**: JetBrains Mono with a green tint on dark backgrounds.

## Color in Typography

Brutalist type uses high-contrast colors:

- **#00ff41 (Matrix Green)**: Links, highlights, borders.
- **#e0e0e0**: Primary text on dark surfaces.
- **#888888**: Secondary/muted text.

The result is a reading experience that feels precise, technical, and immersive — like reading documentation in a well-configured terminal.`,
    tags: ['typography', 'design', 'fonts'],
    category: 'Design',
    author: { name: 'Bael', avatar: '' },
  },
  {
    slug: 'state-management-pinia-nuxt4',
    title: 'State Management with Pinia in Nuxt 4',
    date: '2025-09-18',
    excerpt: 'Setting up Pinia stores in Nuxt 4 with the manual plugin pattern — no module needed, just clean composition.',
    body: `Pinia is the official state management library for Vue 3, and it integrates seamlessly with Nuxt 4 using a simple manual plugin pattern.

## Why Manual Plugin Instead of @pinia/nuxt?

The manual approach gives you:

- **Full control** over store initialization.
- **No extra module dependency**.
- **Better Nuxt 4 compatibility** with the new app/ directory structure.

## The Plugin

Create \`app/plugins/pinia.ts\`:

\`\`\`ts
import { createPinia } from 'pinia'

export default defineNuxtPlugin((nuxtApp) => {
  const pinia = createPinia()
  nuxtApp.vueApp.use(pinia)
})
\`\`\`

That's it. No module, no extra config.

## Creating a Store

Define stores with the composition API style:

\`\`\`ts
// app/stores/darkMode.ts
import { defineStore } from 'pinia'

export const useDarkMode = defineStore('darkMode', () => {
  const isDark = useCookie('dark-mode', {
    default: () => true,
    watch: true,
  })

  const toggle = () => {
    isDark.value = !isDark.value
  }

  watch(isDark, (val) => {
    if (import.meta.client) {
      document.documentElement.classList.toggle('dark', val)
    }
  }, { immediate: true })

  return { isDark, toggle }
})
\`\`\`

## Why useCookie?

- **SSR-safe**: The cookie is available on both server and client.
- **Persistent**: Survives page refreshes and browser restarts.
- **Reactive**: Works with Pinia's reactivity system.

## Store Organization

For a blog, you might have:

- \`darkMode\` — Theme toggle.
- \`search\` — Search query and results.
- \`i18n\` — (handled by @nuxtjs/i18n).

Keep stores focused and composable. The Pinia manual plugin pattern is simple, maintainable, and perfectly suited for Nuxt 4 projects.`,
    tags: ['pinia', 'nuxt', 'state-management'],
    category: 'Development',
    author: { name: 'Bael', avatar: '' },
  },
  {
    slug: 'accessibility-brutalist-web',
    title: 'Accessibility in Brutalist Web Design',
    date: '2025-09-01',
    excerpt: 'Brutalist web design and accessibility are natural allies. High contrast, semantic HTML, and visible focus states make sites more usable for everyone.',
    body: `Brutalist design principles align surprisingly well with web accessibility best practices. The emphasis on clarity, contrast, and visible structure naturally supports WCAG guidelines.

## Natural Accessibility Wins

### High Contrast by Default

Brutalist designs use stark contrast — dark backgrounds with bright text. This satisfies WCAG AA (4.5:1) and often AAA (7:1) contrast ratios:

- \`#00ff41\` on \`#0a0a0a\` = **14.7:1** contrast ratio (AAA).
- \`#e0e0e0\` on \`#0a0a0a\` = **12.9:1** contrast ratio (AAA).

### Visible Focus States

No hidden outlines here. Brutalist focus indicators are bold and obvious:

\`\`\`css
*:focus-visible {
  outline: 3px solid #00ff41;
  outline-offset: 2px;
}
\`\`\`

### Semantic HTML

Brutalism encourages structural honesty — use the right HTML element for the job:

- \`<nav>\` for navigation.
- \`<main>\` for primary content.
- \`<article>\` for blog posts.
- \`<aside>\` for sidebars.

## Key Practices

### Skip Navigation

\`\`\`html
<a href="#main-content" class="skip-link">
  Skip to content
</a>
\`\`\`

### ARIA Labels

Even in a raw aesthetic, descriptive labels matter:

\`\`\`html
<nav aria-label="Main navigation">
<button aria-label="Toggle dark mode">
<article aria-labelledby="post-title">
\`\`\`

### Screen Reader Text

Use visually hidden text for context:

\`\`\`css
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
}
\`\`\`

Brutalism and accessibility aren't just compatible — they reinforce each other. A design that's honest about its structure is inherently more navigable for assistive technology.`,
    tags: ['accessibility', 'a11y', 'design'],
    category: 'Design',
    author: { name: 'Bael', avatar: '' },
  },
  {
    slug: 'markdown-to-html-nuxt',
    title: 'Rendering Markdown Content in Nuxt 4',
    date: '2025-08-15',
    excerpt: 'How to set up markdown rendering in Nuxt 4 with syntax highlighting, custom components, and frontmatter extraction.',
    body: `Markdown is the natural format for blog content. Here's how to render it beautifully in a Nuxt 4 application.

## Parsing Markdown

Use a lightweight markdown parser like \`markdown-it\`:

\`\`\`ts
import MarkdownIt from 'markdown-it'

const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
  highlight(str: string, lang: string) {
    // Add syntax highlighting here
    return \`&lt;pre&gt;&lt;code class="language-x"&gt;...code...&lt;/code&gt;&lt;/pre&gt;\`
  }
})

const html = md.render('# Hello World')
\`\`\`

## Creating a Composable

Wrap it in a Vue composable for easy use:

\`\`\`ts
export function useMarkdown(content: string) {
  const html = computed(() => md.render(content))
  return { html }
}
\`\`\`

## Frontmatter Extraction

Parse YAML frontmatter for metadata:

\`\`\`md
---
title: My Post
date: 2025-08-15
tags: [nuxt, markdown]
---

# Content starts here
\`\`\`

## Styling Markdown Output

Brutalist markdown styling:

\`\`\`css
.markdown-body h1 {
  font-family: 'JetBrains Mono', monospace;
  text-transform: uppercase;
  border-bottom: 3px solid #00ff41;
  padding-bottom: 0.5rem;
}

.markdown-body code {
  font-family: 'JetBrains Mono', monospace;
  background: #1a1a1a;
  color: #00ff41;
  padding: 0.15em 0.4em;
}

.markdown-body pre {
  background: #0a0a0a;
  border: 2px solid #333;
  padding: 1.5rem;
  overflow-x: auto;
}

.markdown-body blockquote {
  border-left: 4px solid #00ff41;
  padding-left: 1rem;
  color: #888;
  font-style: italic;
}
\`\`\`

## Full Integration

The complete flow:

1. Store blog posts with markdown body in \`blogPosts.ts\`.
2. Import and parse in page components.
3. Render with \`v-html\` in the template.
4. Style with brutalist typography CSS.

The result: pure content, zero database, zero API calls — just static markdown rendered into beautifully brutal HTML.`,
    tags: ['markdown', 'nuxt', 'content'],
    category: 'Development',
    author: { name: 'Bael', avatar: '' },
  },
]

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug)
}

export function getPostsByCategory(category: string): BlogPost[] {
  return blogPosts.filter((p) => p.category.toLowerCase() === category.toLowerCase())
}

export function getPostsByTag(tag: string): BlogPost[] {
  return blogPosts.filter((p) => p.tags.map((t) => t.toLowerCase()).includes(tag.toLowerCase()))
}

export function getAllTags(): string[] {
  const tagSet = new Set<string>()
  blogPosts.forEach((p) => p.tags.forEach((t) => tagSet.add(t)))
  return Array.from(tagSet).sort()
}

export function getAllCategories(): string[] {
  const catSet = new Set<string>()
  blogPosts.forEach((p) => catSet.add(p.category))
  return Array.from(catSet).sort()
}
