import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import { createI18n } from 'vue-i18n'
import APostCard from '~/components/atoms/APostCard.vue'
import type { BlogPost } from '~/data/blogPosts'

const messages = {
  en: {
    post: { readMore: 'Read more' },
  },
}

const i18n = createI18n({
  legacy: false,
  locale: 'en',
  fallbackLocale: 'en',
  messages,
})

const mockPost: BlogPost = {
  slug: 'test-post',
  title: 'Test Post Title',
  date: '2025-06-15',
  excerpt: 'This is a test excerpt for the post.',
  body: 'Full body content here.',
  tags: ['vue', 'testing'],
  category: 'Development',
  author: { name: 'Test Author', avatar: '' },
}

describe('APostCard', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('renders the post title', () => {
    const wrapper = mount(APostCard, {
      global: { plugins: [i18n] },
      props: { post: mockPost },
    })
    expect(wrapper.text()).toContain('Test Post Title')
  })

  it('renders the post excerpt', () => {
    const wrapper = mount(APostCard, {
      global: { plugins: [i18n] },
      props: { post: mockPost },
    })
    expect(wrapper.text()).toContain('This is a test excerpt for the post.')
  })

  it('renders the category badge', () => {
    const wrapper = mount(APostCard, {
      global: { plugins: [i18n] },
      props: { post: mockPost },
    })
    const badges = wrapper.findAll('span')
    const categoryBadge = badges.find(s => s.text() === 'Development')
    expect(categoryBadge).toBeTruthy()
  })

  it('renders a formatted date', () => {
    const wrapper = mount(APostCard, {
      global: { plugins: [i18n] },
      props: { post: mockPost },
    })
    // The date Jun 15, 2025 - format depends on system timezone
    // Check for year and month components
    const text = wrapper.text()
    expect(text).toMatch(/\b2025\b/)
    expect(text).toMatch(/\bJun\b/)
  })

  it('renders tags with # prefix', () => {
    const wrapper = mount(APostCard, {
      global: { plugins: [i18n] },
      props: { post: mockPost },
    })
    expect(wrapper.text()).toContain('#vue')
    expect(wrapper.text()).toContain('#testing')
  })

  it('renders a NuxtLink to the post slug', () => {
    const wrapper = mount(APostCard, {
      global: { plugins: [i18n] },
      props: { post: mockPost },
    })
    const link = wrapper.find('a')
    expect(link.exists()).toBe(true)
    // The NuxtLink stub renders href="to"
    expect(link.attributes('href')).toBe('/blog/test-post')
  })

  it('renders "Read more" text', () => {
    const wrapper = mount(APostCard, {
      global: { plugins: [i18n] },
      props: { post: mockPost },
    })
    expect(wrapper.text()).toContain('Read more')
  })

  it('renders as an article element', () => {
    const wrapper = mount(APostCard, {
      global: { plugins: [i18n] },
      props: { post: mockPost },
    })
    expect(wrapper.find('article').exists()).toBe(true)
  })

  it('renders a time element with correct datetime', () => {
    const wrapper = mount(APostCard, {
      global: { plugins: [i18n] },
      props: { post: mockPost },
    })
    const time = wrapper.find('time')
    expect(time.exists()).toBe(true)
    expect(time.attributes('datetime')).toBe('2025-06-15')
  })
})
