<script setup lang="ts">
const localePath = useLocalePath()
import type { BlogPost } from '~/data/blogPosts'

interface Props {
  post: BlogPost
}

defineProps<Props>()

function formatDate(dateStr: string): string {
  const date = new Date(dateStr)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}
</script>

<template>
  <article
    class="brutal-border bg-surface-alt hover:border-primary transition-colors duration-200 group animate-fade-in-up"
    aria-labelledby="post-title"
  >
    <NuxtLink
      :to="localePath(`/blog/${post.slug}`)"
      class="block p-6 no-underline"
    >
      <!-- Category badge -->
      <span class="inline-block px-2 py-0.5 mb-3 font-mono text-xs uppercase border border-primary text-primary">
        {{ post.category }}
      </span>

      <!-- Title -->
      <h3
        :id="`post-title-${post.slug}`"
        class="font-mono text-lg font-bold text-text-primary group-hover:text-primary transition-colors mb-3 border-0 p-0 m-0 uppercase tracking-tight"
      >
        {{ post.title }}
      </h3>

      <!-- Excerpt -->
      <p class="text-text-secondary text-sm leading-relaxed mb-4 line-clamp-3">
        {{ post.excerpt }}
      </p>

      <!-- Meta: date + tags -->
      <div class="flex flex-wrap items-center gap-3 text-xs text-text-muted font-mono">
        <time :datetime="post.date">
          {{ formatDate(post.date) }}
        </time>

        <div class="flex flex-wrap gap-1.5">
          <span
            v-for="tag in post.tags"
            :key="tag"
            class="px-1.5 py-0.5 border border-border text-text-muted group-hover:border-primary group-hover:text-primary transition-colors"
          >
            #{{ tag }}
          </span>
        </div>
      </div>

      <!-- Read more -->
      <div class="mt-4 flex items-center gap-2 font-mono text-xs uppercase text-primary font-bold">
        <span>{{ $t('post.readMore') }}</span>
        <span aria-hidden="true">→</span>
      </div>
    </NuxtLink>
  </article>
</template>
