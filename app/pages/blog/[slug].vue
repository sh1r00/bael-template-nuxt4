<script setup lang="ts">
const localePath = useLocalePath()
import { getPostBySlug, blogPosts } from '~/data/blogPosts'

const route = useRoute()
const { t } = useI18n()
const slug = computed(() => route.params.slug as string)

const post = computed(() => getPostBySlug(slug.value))

if (!post.value) {
  throw createError({ statusCode: 404, message: 'Post not found', fatal: true })
}

// Simple markdown-like rendering (for seed data - real projects use markdown-it)
function renderMarkdown(content: string): string {
  let html = content
    // Bold
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    // Italic
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    // Inline code
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    // Code blocks
    .replace(/```(\w*)\n([\s\S]*?)```/g, '<pre><code class="language-$1">$2</code></pre>')
    // Blockquotes
    .replace(/^> (.+)$/gm, '<blockquote>$1</blockquote>')
    // Headers
    .replace(/^### (.+)$/gm, '<h3>$1</h3>')
    .replace(/^## (.+)$/gm, '<h2>$1</h2>')
    .replace(/^# (.+)$/gm, '<h1>$1</h1>')
    // Horizontal rules
    .replace(/^---$/gm, '<hr>')
    // Unordered lists
    .replace(/^- (.+)$/gm, '<li>$1</li>')
    // Ordered lists
    .replace(/^\d+\. (.+)$/gm, '<li>$1</li>')
    // Wrap consecutive <li> in <ul> (simple approach)
    .replace(/((?:<li>.*<\/li>\n?)+)/g, '<ul>$1</ul>')
    // Links
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>')
    // Paragraphs: double newlines
    .replace(/\n\n/g, '</p><p>')
    // Bold on its own line (for the markdown body content)
    .replace(/^- \*\*(.+?)\*\*(.*)$/gm, '<li><strong>$1</strong>$2</li>')

  return `<p>${html}</p>`
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

const copyLinkText = ref(t('post.copyLink'))

function copyLink() {
  if (import.meta.client) {
    navigator.clipboard.writeText(window.location.href)
    copyLinkText.value = t('post.linkCopied')
    setTimeout(() => {
      copyLinkText.value = t('post.copyLink')
    }, 2000)
  }
}

// Related posts (same category, excluding current)
const relatedPosts = computed(() =>
  blogPosts
    .filter((p) => p.category === post.value!.category && p.slug !== post.value!.slug)
    .slice(0, 2),
)

useHead({
  title: post.value.title,
  meta: [
    { name: 'description', content: post.value.excerpt },
    { property: 'og:title', content: post.value.title },
    { property: 'og:description', content: post.value.excerpt },
    { property: 'og:type', content: 'article' },
    { property: 'article:published_time', content: post.value.date },
    { property: 'article:tag', content: post.value.tags.join(', ') },
  ],
})
</script>

<template>
  <article v-if="post" class="max-w-3xl mx-auto animate-fade-in-up">
    <!-- Back link -->
    <NuxtLink
      to="localePath('/')"
      class="inline-flex items-center gap-1 font-mono text-sm text-text-muted no-underline hover:text-primary transition-colors mb-8"
    >
      <span aria-hidden="true">←</span>
      {{ t('post.backToBlog') }}
    </NuxtLink>

    <!-- Post Header -->
    <header class="mb-8">
      <!-- Category -->
      <NuxtLink
        :to="localePath(`/categories/${post.category.toLowerCase()}`)"
        class="inline-block px-3 py-1 mb-4 font-mono text-xs uppercase border-2 border-primary text-primary no-underline hover:bg-primary/10 transition-colors"
      >
        {{ post.category }}
      </NuxtLink>

      <h1>{{ post.title }}</h1>

      <div class="flex flex-wrap items-center gap-4 mt-4 font-mono text-sm text-text-muted">
        <time :datetime="post.date" class="flex items-center gap-1">
          <span aria-hidden="true">📅</span>
          {{ formatDate(post.date) }}
        </time>
        <span class="text-border">|</span>
        <span>
          {{ t('post.by') }} <strong class="text-text-secondary">{{ post.author.name }}</strong>
        </span>
      </div>
    </header>

    <!-- Post Body -->
    <div
      class="markdown-body"
      v-html="renderMarkdown(post.body)"
    />

    <!-- Tags -->
    <div class="mt-10 pt-6 border-t-3 border-border">
      <p class="font-mono text-xs text-text-muted uppercase tracking-wider mb-3">
        {{ t('post.tags') }}
      </p>
      <div class="flex flex-wrap gap-2">
        <NuxtLink
          v-for="tag in post.tags"
          :key="tag"
          :to="localePath(`/tags/${tag}`)"
          class="px-3 py-1 font-mono text-xs border-2 border-border text-text-muted no-underline hover:border-primary hover:text-primary transition-colors"
        >
          #{{ tag }}
        </NuxtLink>
      </div>
    </div>

    <!-- Share -->
    <div class="mt-6 flex items-center gap-3">
      <span class="font-mono text-xs text-text-muted uppercase tracking-wider">
        {{ t('post.share') }}
      </span>
      <button
        class="px-3 py-1 font-mono text-xs border-2 border-border text-text-muted hover:border-primary hover:text-primary transition-colors cursor-pointer"
        @click="copyLink"
      >
        {{ copyLinkText }}
      </button>
    </div>

    <!-- Related Posts -->
    <div v-if="relatedPosts.length > 0" class="mt-12 pt-8 border-t-3 border-border">
      <p class="font-mono text-xs text-text-muted uppercase tracking-wider mb-4">
        More in {{ post.category }}
      </p>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <APostCard v-for="rp in relatedPosts" :key="rp.slug" :post="rp" />
      </div>
    </div>
  </article>

  <!-- 404 fallback -->
  <div v-else class="text-center py-20">
    <p class="font-mono text-2xl text-primary">404</p>
    <p class="font-mono text-text-muted mt-4">Post not found</p>
  </div>
</template>
