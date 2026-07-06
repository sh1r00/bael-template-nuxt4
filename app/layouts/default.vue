<template>
  <div class="min-h-screen flex flex-col">
    <OHeader />

    <main id="main-content" class="flex-1">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <slot />
      </div>
    </main>

    <OFooter />
  </div>
</template>
