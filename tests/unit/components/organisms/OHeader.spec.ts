import { vi, describe, it, expect, beforeEach } from 'vitest'
import { ref } from 'vue'
import { mount } from '@vue/test-utils'
import { setActivePinia, createPinia } from 'pinia'
import { createI18n } from 'vue-i18n'
import { useDarkMode } from '~/stores/darkMode'

// Make Nuxt auto-imports available globally
vi.stubGlobal('useDarkMode', useDarkMode)
vi.stubGlobal('useI18n', vi.fn(() => ({
  locale: ref('en'),
  locales: ref([
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Español' },
    { code: 'am', name: 'አማርኛ' },
  ]),
  t: (key: string) => key,
})))

import OHeader from '~/components/organisms/OHeader.vue'
import ADarkModeToggle from '~/components/atoms/ADarkModeToggle.vue'

const enMessages = {
  site: { skipToContent: 'Skip to main content' },
  nav: {
    home: 'Home',
    about: 'About',
    categories: 'Categories',
    tags: 'Tags',
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

describe('OHeader', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  function mountHeader() {
    return mount(OHeader, {
      global: {
        plugins: [i18n],
        components: { ADarkModeToggle },
      },
    })
  }

  it('renders the header banner', () => {
    const wrapper = mountHeader()
    expect(wrapper.find('header[role="banner"]').exists()).toBe(true)
  })

  it('renders BAEL logo link', () => {
    const wrapper = mountHeader()
    const links = wrapper.findAll('a')
    const logoLink = links.find(a => a.text().includes('BAEL'))
    expect(logoLink).toBeTruthy()
  })

  it('renders skip to content link', () => {
    const wrapper = mountHeader()
    expect(wrapper.find('a.skip-link').exists()).toBe(true)
    expect(wrapper.find('a.skip-link').attributes('href')).toBe('#main-content')
    expect(wrapper.find('a.skip-link').text()).toBe('Skip to main content')
  })

  it('renders navigation items', () => {
    const wrapper = mountHeader()
    expect(wrapper.text()).toContain('Home')
    expect(wrapper.text()).toContain('About')
    expect(wrapper.text()).toContain('Categories')
    expect(wrapper.text()).toContain('Tags')
  })

  it('renders desktop navigation', () => {
    const wrapper = mountHeader()
    const desktopNav = wrapper.find('nav[aria-label="Main navigation"]')
    expect(desktopNav.exists()).toBe(true)
  })

  it('renders mobile navigation', () => {
    const wrapper = mountHeader()
    const mobileNav = wrapper.find('nav[aria-label="Mobile navigation"]')
    expect(mobileNav.exists()).toBe(true)
  })

  it('renders locale switcher select', () => {
    const wrapper = mountHeader()
    const select = wrapper.find('select')
    expect(select.exists()).toBe(true)
    expect(select.attributes('aria-label')).toBe('Select language')
  })

  it('includes ADarkModeToggle', () => {
    const wrapper = mountHeader()
    expect(wrapper.findComponent(ADarkModeToggle).exists()).toBe(true)
  })
})
