<script setup lang="ts">
const vueVersion = '3.5'
const nuxtVersion = '4'

const currentYear = new Date().getFullYear()
</script>

<template>
  <footer
    class="border-t-3 border-border bg-surface-alt mt-16"
    role="contentinfo"
  >
    <div class="max-w-6xl mx-auto px-4 sm:px-6 py-8">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <!-- Branding -->
        <div>
          <p class="font-mono text-sm text-primary font-bold mb-2">
            [BAEL]
          </p>
          <p class="text-text-muted text-sm leading-relaxed">
            {{ $t('site.description') }}
          </p>
        </div>

        <!-- Tech stack -->
        <div>
          <p class="font-mono text-xs text-primary uppercase tracking-wider mb-2">
            {{ $t('footer.builtWith') }}
          </p>
          <div class="flex flex-wrap gap-2 font-mono text-xs text-text-muted">
            <span class="px-2 py-1 border border-border">Nuxt {{ nuxtVersion }}</span>
            <span class="px-2 py-1 border border-border">Vue {{ vueVersion }}</span>
            <span class="px-2 py-1 border border-border">Tailwind</span>
            <span class="px-2 py-1 border border-border">Pinia</span>
          </div>
        </div>

        <!-- Legal -->
        <div class="text-right">
          <p class="font-mono text-xs text-text-muted">
            &copy; {{ currentYear }} BAEL
          </p>
          <p class="font-mono text-xs text-text-muted mt-1">
            {{ $t('footer.license') }}
          </p>
        </div>
      </div>

      <!-- Bottom bar -->
      <div class="mt-6 pt-4 border-t-2 border-border flex flex-col sm:flex-row items-center justify-between gap-2">
        <p class="font-mono text-xs text-text-muted">
          {{ $t('footer.builtWith') }}
        </p>
        <p class="font-mono text-xs text-text-muted">
          <span aria-hidden="true">$</span> echo "stay raw"
        </p>
      </div>
    </div>
  </footer>
</template>
