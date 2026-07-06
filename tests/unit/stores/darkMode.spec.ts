import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useDarkMode } from '~/stores/darkMode'

describe('useDarkMode store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('should initialize isDark as true by default', () => {
    const store = useDarkMode()
    expect(store.isDark).toBe(true)
  })

  it('should toggle isDark from true to false', () => {
    const store = useDarkMode()
    store.toggle()
    expect(store.isDark).toBe(false)
  })

  it('should toggle isDark from false back to true', () => {
    const store = useDarkMode()
    store.toggle() // true -> false
    store.toggle() // false -> true
    expect(store.isDark).toBe(true)
  })

  it('should toggle multiple times correctly', () => {
    const store = useDarkMode()
    store.toggle()
    store.toggle()
    store.toggle()
    expect(store.isDark).toBe(false)
  })

  it('should return the same store instance on multiple calls', () => {
    const store1 = useDarkMode()
    const store2 = useDarkMode()
    expect(store1).toBe(store2)
  })
})
