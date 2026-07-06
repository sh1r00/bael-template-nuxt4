import { vi, describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { setActivePinia, createPinia } from 'pinia'
import { createI18n } from 'vue-i18n'
import { useDarkMode } from '~/stores/darkMode'

// Make useDarkMode available globally (Nuxt auto-import equivalent)
vi.stubGlobal('useDarkMode', useDarkMode)

import ADarkModeToggle from '~/components/atoms/ADarkModeToggle.vue'

const enMessages = {
  nav: {
    darkMode: 'Toggle dark mode',
    lightMode: 'Toggle light mode',
  },
}

const i18n = createI18n({
  legacy: false,
  locale: 'en',
  fallbackLocale: 'en',
  messages: { en: enMessages },
})

describe('ADarkModeToggle', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('renders a button', () => {
    const wrapper = mount(ADarkModeToggle, {
      global: { plugins: [i18n] },
    })
    expect(wrapper.find('button').exists()).toBe(true)
  })

  it('shows sun icon (☀) when dark mode is active', () => {
    const store = useDarkMode()
    store.isDark = true
    const wrapper = mount(ADarkModeToggle, {
      global: { plugins: [i18n] },
    })
    expect(wrapper.find('span[aria-hidden="true"]').text()).toBe('☀')
  })

  it('shows moon icon (☾) when dark mode is inactive', () => {
    const store = useDarkMode()
    store.isDark = false
    const wrapper = mount(ADarkModeToggle, {
      global: { plugins: [i18n] },
    })
    expect(wrapper.find('span[aria-hidden="true"]').text()).toBe('☾')
  })

  it('has correct aria-label for dark mode', () => {
    const store = useDarkMode()
    store.isDark = true
    const wrapper = mount(ADarkModeToggle, {
      global: { plugins: [i18n] },
    })
    expect(wrapper.find('button').attributes('aria-label')).toBe('Toggle light mode')
  })

  it('has correct aria-label for light mode', () => {
    const store = useDarkMode()
    store.isDark = false
    const wrapper = mount(ADarkModeToggle, {
      global: { plugins: [i18n] },
    })
    expect(wrapper.find('button').attributes('aria-label')).toBe('Toggle dark mode')
  })

  it('toggles dark mode on click', async () => {
    const wrapper = mount(ADarkModeToggle, {
      global: { plugins: [i18n] },
    })
    const store = useDarkMode()
    const initial = store.isDark

    await wrapper.find('button').trigger('click')
    expect(store.isDark).toBe(!initial)
  })

  it('toggles between dark and light on multiple clicks', async () => {
    const wrapper = mount(ADarkModeToggle, {
      global: { plugins: [i18n] },
    })
    const store = useDarkMode()
    const initial = store.isDark

    await wrapper.find('button').trigger('click')
    expect(store.isDark).toBe(!initial)

    await wrapper.find('button').trigger('click')
    expect(store.isDark).toBe(initial)
  })

  it('has sr-only text for screen readers in dark mode', () => {
    const store = useDarkMode()
    store.isDark = true
    const wrapper = mount(ADarkModeToggle, {
      global: { plugins: [i18n] },
    })
    expect(wrapper.find('.sr-only').text()).toBe('Toggle light mode')
  })

  it('has sr-only text for screen readers in light mode', () => {
    const store = useDarkMode()
    store.isDark = false
    const wrapper = mount(ADarkModeToggle, {
      global: { plugins: [i18n] },
    })
    expect(wrapper.find('.sr-only').text()).toBe('Toggle dark mode')
  })
})
