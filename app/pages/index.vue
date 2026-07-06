<script setup lang="ts">
import { blogPosts, getAllTags, getAllCategories } from '~/data/blogPosts'

definePageMeta({ layout: 'default' })

const { t } = useI18n()
const searchQuery = ref('')
const selectedTag = ref<string | null>(null)

// Simple client-side search
const filteredPosts = computed(() => {
  let posts = blogPosts

  if (searchQuery.value.trim()) {
    const q = searchQuery.value.toLowerCase()
    posts = posts.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.excerpt.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q)) ||
        p.category.toLowerCase().includes(q),
    )
  }

  if (selectedTag.value) {
    posts = posts.filter((p) =>
      p.tags.map((t) => t.toLowerCase()).includes(selectedTag.value!.toLowerCase()),
    )
  }

  return posts
})

const tags = getAllTags()
const categories = getAllCategories()
</script>

<template>
  <div>
    <!-- Hero / Heading -->
    <div class="mb-10">
      <h1>{{ t('home.heading') }}</h1>
      <p class="font-mono text-text-secondary text-sm mt-2">
        <span class="text-primary">$</span> ls -la ./posts/
        <span class="animate-pulse text-primary ml-1">▌</span>
      </p>
    </div>

    <!-- Search -->
    <div class="mb-8">
      <div class="relative max-w-lg">
        <span class="absolute left-3 top-1/2 -translate-y-1/2 font-mono text-text-muted text-sm" aria-hidden="true">
          $
        </span>
        <input
          v-model="searchQuery"
          type="search"
          :placeholder="t('home.searchPlaceholder')"
          class="w-full pl-8 pr-4 py-3 bg-surface-alt border-3 border-border font-mono text-sm text-text-primary placeholder:text-text-muted focus:border-primary transition-colors"
          aria-label="Search posts"
        />
      </div>
    </div>

    <!-- Tag Cloud -->
    <div class="mb-8">
      <p class="font-mono text-xs text-text-muted uppercase tracking-wider mb-3">
        {{ t('home.allTags') }}
      </p>
      <div class="flex flex-wrap gap-2">
        <button
          :class="[
            'px-3 py-1 font-mono text-xs border-2 transition-colors',
            selectedTag === null
              ? 'border-primary text-primary bg-primary/10'
              : 'border-border text-text-muted hover:border-primary hover:text-primary',
          ]"
          @click="selectedTag = null"
        >
          ALL
        </button>
        <button
          v-for="tag in tags"
          :key="tag"
          :class="[
            'px-3 py-1 font-mono text-xs border-2 transition-colors',
            selectedTag === tag
              ? 'border-primary text-primary bg-primary/10'
              : 'border-border text-text-muted hover:border-primary hover:text-primary',
          ]"
          @click="selectedTag = tag"
        >
          #{{ tag }}
        </button>
      </div>
    </div>

    <!-- Category links -->
    <div class="mb-8">
      <p class="font-mono text-xs text-text-muted uppercase tracking-wider mb-3">
        {{ t('home.allCategories') }}
      </p>
      <div class="flex flex-wrap gap-2">
        <NuxtLink
          v-for="cat in categories"
          :key="cat"
          :to="`/categories/${cat.toLowerCase()}`"
          class="px-3 py-1 font-mono text-xs border-2 border-border text-text-muted no-underline hover:border-primary hover:text-primary transition-colors"
        >
          {{ cat }}
        </NuxtLink>
      </div>
    </div>

    <!-- Post Grid -->
    <div v-if="filteredPosts.length > 0" class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <APostCard v-for="post in filteredPosts" :key="post.slug" :post="post" />
    </div>

    <!-- No Results -->
    <div v-else class="brutal-border p-12 text-center">
      <p class="font-mono text-text-muted text-lg">
        {{ t('home.noResults') }}
      </p>
      <p class="font-mono text-text-muted text-sm mt-2">
        <span class="text-primary">$</span> grep -r "{{ searchQuery }}" ./posts/ → 0 results
      </p>
    </div>

    <!-- Post count -->
    <p class="mt-8 font-mono text-xs text-text-muted">
      <span class="text-primary">$</span>
      {{ filteredPosts.length }} post{{ filteredPosts.length !== 1 ? 's' : '' }} found
    </p>
  </div>
</template>
