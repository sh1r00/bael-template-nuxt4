<script setup lang="ts">
const localePath = useLocalePath()
import { getPostsByCategory, getAllCategories } from '~/data/blogPosts'

const route = useRoute()
const { t } = useI18n()

const categoryParam = computed(() => (route.params.category as string).toLowerCase())
const categoryName = computed(() => {
  const cat = getAllCategories().find((c) => c.toLowerCase() === categoryParam.value)
  return cat || categoryParam.value
})

const posts = computed(() => getPostsByCategory(categoryParam.value))

useHead({
  title: t('category.heading', { category: categoryName.value }),
})
</script>

<template>
  <div class="animate-fade-in-up">
    <NuxtLink
      to="localePath('/')"
      class="inline-flex items-center gap-1 font-mono text-sm text-text-muted no-underline hover:text-primary transition-colors mb-6"
    >
      <span aria-hidden="true">←</span>
      {{ t('post.backToBlog') }}
    </NuxtLink>

    <h1>{{ t('category.heading', { category: categoryName.value }) }}</h1>
    <p class="font-mono text-text-secondary text-sm mt-2 mb-8">
      <span class="text-primary">$</span> find ./posts/ -category "{{ categoryName.value }}"
    </p>

    <!-- Post Grid -->
    <div v-if="posts.length > 0" class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <APostCard v-for="post in posts" :key="post.slug" :post="post" />
    </div>

    <!-- Empty -->
    <div v-else class="brutal-border p-12 text-center">
      <p class="font-mono text-text-muted text-lg">
        {{ t('category.empty') }}
      </p>
    </div>

    <p class="mt-8 font-mono text-xs text-text-muted">
      <span class="text-primary">$</span>
      {{ posts.length }} post{{ posts.length !== 1 ? 's' : '' }} in "{{ categoryName.value }}"
    </p>
  </div>
</template>
