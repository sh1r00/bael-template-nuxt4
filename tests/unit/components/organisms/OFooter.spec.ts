import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import { createI18n } from 'vue-i18n'
import OFooter from '~/components/organisms/OFooter.vue'

const messages = {
  en: {
    site: { description: 'A brutalist blog about web development, design, and the raw web.' },
    footer: {
      builtWith: 'Built with Nuxt 4 and brutalist aesthetics.',
      license: 'MIT License',
    },
  },
}

const i18n = createI18n({
  legacy: false,
  locale: 'en',
  fallbackLocale: 'en',
  messages,
})

describe('OFooter', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('renders the footer with contentinfo role', () => {
    const wrapper = mount(OFooter, {
      global: { plugins: [i18n] },
    })
    expect(wrapper.find('footer[role="contentinfo"]').exists()).toBe(true)
  })

  it('renders BAEL branding', () => {
    const wrapper = mount(OFooter, {
      global: { plugins: [i18n] },
    })
    expect(wrapper.text()).toContain('[BAEL]')
  })

  it('renders site description', () => {
    const wrapper = mount(OFooter, {
      global: { plugins: [i18n] },
    })
    expect(wrapper.text()).toContain('A brutalist blog about web development, design, and the raw web.')
  })

  it('renders the current year in copyright', () => {
    const wrapper = mount(OFooter, {
      global: { plugins: [i18n] },
    })
    const currentYear = new Date().getFullYear().toString()
    expect(wrapper.text()).toContain(currentYear)
  })

  it('renders tech stack badges', () => {
    const wrapper = mount(OFooter, {
      global: { plugins: [i18n] },
    })
    expect(wrapper.text()).toContain('Nuxt')
    expect(wrapper.text()).toContain('Vue')
    expect(wrapper.text()).toContain('Tailwind')
    expect(wrapper.text()).toContain('Pinia')
  })

  it('renders license text', () => {
    const wrapper = mount(OFooter, {
      global: { plugins: [i18n] },
    })
    expect(wrapper.text()).toContain('MIT License')
  })

  it('renders "Built with" text', () => {
    const wrapper = mount(OFooter, {
      global: { plugins: [i18n] },
    })
    expect(wrapper.text()).toContain('Built with Nuxt 4 and brutalist aesthetics.')
  })

  it('renders the "echo stay raw" easter egg', () => {
    const wrapper = mount(OFooter, {
      global: { plugins: [i18n] },
    })
    expect(wrapper.text()).toContain('echo "stay raw"')
  })
})
