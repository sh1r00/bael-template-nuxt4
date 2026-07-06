<script setup lang="ts">
interface Props {
  name: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  label?: string
}

const props = withDefaults(defineProps<Props>(), {
  size: 'md',
})

const sizeMap: Record<string, string> = {
  sm: 'text-sm',
  md: 'text-lg',
  lg: 'text-2xl',
  xl: 'text-4xl',
}
</script>

<template>
  <span
    :class="['inline-block', sizeMap[size]]"
    :aria-label="label || name"
    role="img"
  >
    {{ name }}
  </span>
</template>
