import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import { createI18n } from 'vue-i18n'
import AIcon from '~/components/atoms/AIcon.vue'

const messages = { en: {} }
const i18n = createI18n({
  legacy: false,
  locale: 'en',
  fallbackLocale: 'en',
  messages,
})

describe('AIcon', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('renders the icon name as text', () => {
    const wrapper = mount(AIcon, {
      global: { plugins: [i18n] },
      props: { name: '→' },
    })
    expect(wrapper.text()).toBe('→')
  })

  it('has role="img"', () => {
    const wrapper = mount(AIcon, {
      global: { plugins: [i18n] },
      props: { name: '☀' },
    })
    expect(wrapper.find('span').attributes('role')).toBe('img')
  })

  it('uses name as default aria-label', () => {
    const wrapper = mount(AIcon, {
      global: { plugins: [i18n] },
      props: { name: '→' },
    })
    expect(wrapper.find('span').attributes('aria-label')).toBe('→')
  })

  it('uses label prop as aria-label when provided', () => {
    const wrapper = mount(AIcon, {
      global: { plugins: [i18n] },
      props: { name: '↗', label: 'External link' },
    })
    expect(wrapper.find('span').attributes('aria-label')).toBe('External link')
  })

  it('applies default size class (md)', () => {
    const wrapper = mount(AIcon, {
      global: { plugins: [i18n] },
      props: { name: '✕' },
    })
    expect(wrapper.find('span').classes()).toContain('text-lg')
  })

  it('applies sm size class', () => {
    const wrapper = mount(AIcon, {
      global: { plugins: [i18n] },
      props: { name: '✕', size: 'sm' },
    })
    expect(wrapper.find('span').classes()).toContain('text-sm')
  })

  it('applies lg size class', () => {
    const wrapper = mount(AIcon, {
      global: { plugins: [i18n] },
      props: { name: '✕', size: 'lg' },
    })
    expect(wrapper.find('span').classes()).toContain('text-2xl')
  })

  it('applies xl size class', () => {
    const wrapper = mount(AIcon, {
      global: { plugins: [i18n] },
      props: { name: '✕', size: 'xl' },
    })
    expect(wrapper.find('span').classes()).toContain('text-4xl')
  })
})
