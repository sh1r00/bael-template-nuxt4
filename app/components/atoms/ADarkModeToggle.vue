<script setup lang="ts">
import { useDarkModeStore } from '~/stores/darkMode'
const darkMode = useDarkModeStore()

// Set initial class on client
if (import.meta.client) {
  document.documentElement.classList.toggle('dark', darkMode.isDark)
}
</script>

<template>
  <button
    type="button"
    class="brutal-border p-2 font-mono text-sm text-primary hover:bg-surface-raised transition-colors duration-150"
    :aria-label="darkMode.isDark ? $t('nav.lightMode') : $t('nav.darkMode')"
    @click="darkMode.toggle()"
  >
    <span aria-hidden="true" class="text-lg">
      {{ darkMode.isDark ? '☀' : '☾' }}
    </span>
    <span class="sr-only">
      {{ darkMode.isDark ? $t('nav.lightMode') : $t('nav.darkMode') }}
    </span>
  </button>
</template>
