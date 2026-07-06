<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  to?: string
  href?: string
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  ariaLabel?: string
  external?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'secondary',
  size: 'md',
  type: 'button',
  disabled: false,
  external: false,
})

const variantClasses: Record<string, string> = {
  primary: 'bg-primary text-surface border-primary hover:bg-primary-dim',
  secondary: 'bg-transparent text-primary border-border hover:border-primary hover:text-primary-dim',
  ghost: 'bg-transparent text-text-secondary border-transparent hover:text-primary',
}

const sizeClasses: Record<string, string> = {
  sm: 'px-3 py-1 text-xs',
  md: 'px-5 py-2 text-sm',
  lg: 'px-7 py-3 text-base',
}

const isLink = computed(() => !!(props.to || props.href))
const isRouterLink = computed(() => !!props.to && !props.external)
</script>

<template>
  <NuxtLink
    v-if="isRouterLink"
    :to="to!"
    :aria-label="ariaLabel"
    :class="[
      'inline-flex items-center justify-center gap-2 font-mono font-bold uppercase tracking-wide border-3 transition-all duration-150',
      variantClasses[variant],
      sizeClasses[size],
      disabled ? 'opacity-50 pointer-events-none cursor-not-allowed' : 'cursor-pointer',
    ]"
  >
    <slot />
  </NuxtLink>

  <a
    v-else-if="isLink && href"
    :href="href"
    :aria-label="ariaLabel"
    :target="external ? '_blank' : undefined"
    :rel="external ? 'noopener noreferrer' : undefined"
    :class="[
      'inline-flex items-center justify-center gap-2 font-mono font-bold uppercase tracking-wide border-3 transition-all duration-150',
      variantClasses[variant],
      sizeClasses[size],
      disabled ? 'opacity-50 pointer-events-none cursor-not-allowed' : 'cursor-pointer',
    ]"
  >
    <slot />
  </a>

  <button
    v-else
    :type="type"
    :disabled="disabled"
    :aria-label="ariaLabel"
    :class="[
      'inline-flex items-center justify-center gap-2 font-mono font-bold uppercase tracking-wide border-3 transition-all duration-150',
      variantClasses[variant],
      sizeClasses[size],
      disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer',
    ]"
  >
    <slot />
  </button>
</template>
