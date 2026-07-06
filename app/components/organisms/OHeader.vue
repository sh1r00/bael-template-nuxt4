<script setup lang="ts">
import { useI18n } from 'vue-i18n'
const { locale, locales } = useI18n()
const switchLocalePath = useSwitchLocalePath()
const localePath = useLocalePath()
const route = useRoute()

const navItems = [
  { label: 'nav.home', to: '/' },
  { label: 'nav.about', to: '/about' },
  { label: 'nav.categories', to: '/categories/design' },
  { label: 'nav.tags', to: '/tags/nuxt' },
]
</script>

<template>
  <header
    class="sticky top-0 z-50 bg-surface border-b-3 border-border"
    role="banner"
  >
    <!-- Skip to content (appears on focus) -->
    <a href="#main-content" class="skip-link">
      {{ $t('site.skipToContent') }}
    </a>

    <div class="max-w-6xl mx-auto px-4 sm:px-6">
      <div class="flex items-center justify-between h-16">
        <!-- Logo -->
        <NuxtLink
          :to="localePath('/')"
          class="font-mono text-xl font-bold text-primary no-underline hover:text-primary-dim transition-colors"
          aria-label="BAEL Home"
        >
          <span aria-hidden="true">[</span>BAEL<span aria-hidden="true">]</span>
        </NuxtLink>

        <!-- Desktop Nav -->
        <nav
          class="hidden md:flex items-center gap-6"
          aria-label="Main navigation"
        >
          <NuxtLink
            v-for="item in navItems"
            :key="item.to"
            :to="localePath(item.to)"
            class="font-mono text-sm text-text-secondary no-underline hover:text-primary transition-colors uppercase tracking-wide"
            :class="{ 'text-primary border-b-2 border-primary': route.path.startsWith(item.to) && item.to !== '/' || (route.path === '/' && item.to === '/') }"
          >
            {{ $t(item.label) }}
          </NuxtLink>
        </nav>

        <!-- Right: dark mode toggle + locale switcher -->
        <div class="flex items-center gap-3">
          <!-- Locale switcher -->
          <select
            :value="locale"
            class="bg-surface border-2 border-border font-mono text-sm text-text-secondary px-2 py-1 focus:border-primary transition-colors cursor-pointer"
            aria-label="Select language"
            @change="(e: Event) => {
              const target = e.target as HTMLSelectElement
              navigateTo(switchLocalePath(target.value))
            }"
          >
            <option
              v-for="loc in locales"
              :key="loc.code"
              :value="loc.code"
            >
              {{ loc.code.toUpperCase() }}
            </option>
          </select>

          <ADarkModeToggle />
        </div>
      </div>
    </div>

    <!-- Mobile Nav -->
    <nav
      class="md:hidden border-t-2 border-border flex overflow-x-auto"
      aria-label="Mobile navigation"
    >
      <NuxtLink
        v-for="item in navItems"
        :key="item.to"
        :to="localePath(item.to)"
        class="flex-shrink-0 px-4 py-2.5 font-mono text-xs text-text-secondary no-underline hover:text-primary hover:bg-surface-alt transition-colors uppercase tracking-wide"
      >
        {{ $t(item.label) }}
      </NuxtLink>
    </nav>
  </header>
</template>
