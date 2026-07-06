<script setup lang="ts">
const { t } = useI18n()

const skills = computed(() => t('about.skillsList') as unknown as string[])

useHead({
  title: t('about.heading'),
  meta: [{ name: 'description', content: t('about.bio') as string }],
})
</script>

<template>
  <div class="max-w-3xl mx-auto animate-fade-in-up">
    <h1>{{ t('about.heading') }}</h1>

    <!-- Bio Section -->
    <div class="brutal-border bg-surface-alt p-8 mb-10">
      <div class="flex flex-col sm:flex-row items-start gap-6">
        <!-- Avatar placeholder -->
        <div
          class="w-20 h-20 flex-shrink-0 brutal-border-bright flex items-center justify-center font-mono text-2xl text-primary font-bold bg-surface"
          aria-hidden="true"
        >
          B
        </div>

        <div>
          <p class="text-lg text-text-secondary leading-relaxed">
            {{ t('about.bio') }}
          </p>
        </div>
      </div>
    </div>

    <!-- Skills -->
    <h2>{{ t('about.skills') }}</h2>
    <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
      <div
        v-for="skill in skills"
        :key="skill"
        class="brutal-border p-4 font-mono text-sm text-text-secondary hover:border-primary hover:text-primary transition-colors text-center"
      >
        {{ skill }}
      </div>
    </div>

    <!-- Contact Section -->
    <div class="mt-12 brutal-border bg-surface-alt p-8">
      <h2>{{ t('about.contact') }}</h2>
      <p class="font-mono text-text-secondary text-sm">
        <span class="text-primary">$</span> echo "hello{at}bael{dot}dev"
      </p>
      <div class="mt-6 flex flex-wrap gap-3">
        <ABaseButton variant="secondary" href="https://github.com" external>
          GitHub
        </ABaseButton>
        <ABaseButton variant="secondary" href="https://twitter.com" external>
          X/Twitter
        </ABaseButton>
        <ABaseButton variant="secondary" href="mailto:hello@bael.dev" external>
          Email
        </ABaseButton>
      </div>
    </div>
  </div>
</template>
