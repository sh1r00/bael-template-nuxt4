<script setup lang="ts">
const localePath = useLocalePath()
import { getPostsByTag, getAllTags } from '~/data/blogPosts'

const route = useRoute()
const { t } = useI18n()

const tagParam = computed(() => (route.params.tag as string).toLowerCase())
const tagName = computed(() => {
  const tag = getAllTags().find((t) => t.toLowerCase() === tagParam.value)
  return tag || tagParam.value
})

const posts = computed(() => getPostsByTag(tagParam.value))

useHead({
  title: t('tag.heading', { tag: tagName.value }),
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

    <h1>{{ t('tag.heading', { tag: tagName.value }) }}</h1>
    <p class="font-mono text-text-secondary text-sm mt-2 mb-8">
      <span class="text-primary">$</span> grep -rl "#{{ tagName.value }}" ./posts/
    </p>

    <!-- Post Grid -->
    <div v-if="posts.length > 0" class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <APostCard v-for="post in posts" :key="post.slug" :post="post" />
    </div>

    <!-- Empty -->
    <div v-else class="brutal-border p-12 text-center">
      <p class="font-mono text-text-muted text-lg">
        {{ t('tag.empty') }}
      </p>
    </div>

    <p class="mt-8 font-mono text-xs text-text-muted">
      <span class="text-primary">$</span>
      {{ posts.length }} post{{ posts.length !== 1 ? 's' : '' }} tagged "#{{ tagName.value }}"
    </p>
  </div>
</template>
