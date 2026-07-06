import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import { createI18n } from 'vue-i18n'
import ABaseButton from '~/components/atoms/ABaseButton.vue'

const messages = { en: {} }
const i18n = createI18n({
  legacy: false,
  locale: 'en',
  fallbackLocale: 'en',
  messages,
})

describe('ABaseButton', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('renders as a button by default', () => {
    const wrapper = mount(ABaseButton, {
      global: { plugins: [i18n] },
      slots: { default: 'Click me' },
    })
    const button = wrapper.find('button')
    expect(button.exists()).toBe(true)
    expect(button.text()).toBe('Click me')
  })

  it('renders with default type="button"', () => {
    const wrapper = mount(ABaseButton, {
      global: { plugins: [i18n] },
      slots: { default: 'Submit' },
    })
    expect(wrapper.find('button').attributes('type')).toBe('button')
  })

  it('renders as submit button when type="submit"', () => {
    const wrapper = mount(ABaseButton, {
      global: { plugins: [i18n] },
      props: { type: 'submit' },
      slots: { default: 'Submit' },
    })
    expect(wrapper.find('button').attributes('type')).toBe('submit')
  })

  it('renders disabled button', () => {
    const wrapper = mount(ABaseButton, {
      global: { plugins: [i18n] },
      props: { disabled: true },
      slots: { default: 'Disabled' },
    })
    const button = wrapper.find('button')
    expect(button.attributes('disabled')).toBeDefined()
    expect(button.classes()).toContain('opacity-50')
  })

  it('renders as NuxtLink when "to" prop is provided', () => {
    const wrapper = mount(ABaseButton, {
      global: { plugins: [i18n] },
      props: { to: '/about' },
      slots: { default: 'About' },
    })
    // NuxtLink is stubbed globally as an <a> tag
    const link = wrapper.find('a')
    expect(link.exists()).toBe(true)
    expect(link.text()).toBe('About')
  })

  it('renders as external anchor when href is provided', () => {
    const wrapper = mount(ABaseButton, {
      global: { plugins: [i18n] },
      props: { href: 'https://example.com', external: true },
      slots: { default: 'External' },
    })
    const anchor = wrapper.find('a')
    expect(anchor.exists()).toBe(true)
    expect(anchor.attributes('href')).toBe('https://example.com')
    expect(anchor.attributes('target')).toBe('_blank')
    expect(anchor.attributes('rel')).toBe('noopener noreferrer')
  })

  it('renders with aria-label when provided', () => {
    const wrapper = mount(ABaseButton, {
      global: { plugins: [i18n] },
      props: { ariaLabel: 'Close dialog' },
      slots: { default: 'X' },
    })
    expect(wrapper.find('button').attributes('aria-label')).toBe('Close dialog')
  })

  it('applies variant classes correctly', () => {
    const wrapper = mount(ABaseButton, {
      global: { plugins: [i18n] },
      props: { variant: 'primary' },
      slots: { default: 'Primary' },
    })
    expect(wrapper.find('button').classes()).toContain('bg-primary')
  })

  it('applies size classes correctly', () => {
    const wrapper = mount(ABaseButton, {
      global: { plugins: [i18n] },
      props: { size: 'lg' },
      slots: { default: 'Large' },
    })
    expect(wrapper.find('button').classes()).toContain('px-7')
  })

  it('applies default variant and size when not specified', () => {
    const wrapper = mount(ABaseButton, {
      global: { plugins: [i18n] },
      slots: { default: 'Default' },
    })
    const classes = wrapper.find('button').classes()
    expect(classes).toContain('bg-transparent') // secondary variant
  })
})
