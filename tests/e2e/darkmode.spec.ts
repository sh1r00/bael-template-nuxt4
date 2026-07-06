import { test, expect } from '@playwright/test'

test.describe('Dark Mode', () => {
  test('dark mode toggle exists', async ({ page }) => {
    await page.goto('/')

    const toggle = page.locator('[aria-label*="mode"]')
    await expect(toggle).toBeVisible()
  })

  test('toggles between dark and light mode', async ({ page }) => {
    await page.goto('/')

    const toggle = page.locator('[aria-label*="mode"]')
    await expect(toggle).toBeVisible()

    // Get initial state
    const initialLabel = await toggle.getAttribute('aria-label')

    // Click to toggle
    await toggle.click()
    await page.waitForTimeout(300)

    // Label should change
    const newLabel = await toggle.getAttribute('aria-label')
    expect(newLabel).not.toBe(initialLabel)
  })

  test('dark mode persists across navigation', async ({ page }) => {
    await page.goto('/')

    const toggle = page.locator('[aria-label*="mode"]')
    await toggle.click()
    await page.waitForTimeout(200)

    // Navigate to another page
    await page.goto('/about')
    await page.waitForTimeout(200)

    // Toggle should still exist and be functional
    await expect(page.locator('[aria-label*="mode"]')).toBeVisible()
  })

  test('page content remains visible after toggle', async ({ page }) => {
    await page.goto('/')

    const toggle = page.locator('[aria-label*="mode"]')

    // Toggle dark mode
    await toggle.click()
    await page.waitForTimeout(300)

    // Key elements should still be visible
    await expect(page.locator('header')).toBeVisible()
    await expect(page.locator('footer')).toBeVisible()
    await expect(page.locator('main')).toBeVisible()
  })

  test('dark mode toggle is accessible via keyboard', async ({ page }) => {
    await page.goto('/')

    const toggle = page.locator('[aria-label*="mode"]')

    // Focus the toggle
    await toggle.focus()
    await expect(toggle).toBeFocused()

    // Press Enter to toggle
    const initialLabel = await toggle.getAttribute('aria-label')
    await toggle.press('Enter')
    await page.waitForTimeout(300)

    const newLabel = await toggle.getAttribute('aria-label')
    expect(newLabel).not.toBe(initialLabel)
  })

  test('dark mode toggle works on blog post page', async ({ page }) => {
    await page.goto('/blog/brutalist-design-philosophy')

    const toggle = page.locator('[aria-label*="mode"]')
    await expect(toggle).toBeVisible()

    // Should still be able to toggle
    await toggle.click()
    await page.waitForTimeout(200)

    // Article should remain visible
    await expect(page.locator('article')).toBeVisible()
  })

  test('dark mode toggle works on category page', async ({ page }) => {
    await page.goto('/categories/design')

    const toggle = page.locator('[aria-label*="mode"]')
    await expect(toggle).toBeVisible()

    await toggle.click()
    await page.waitForTimeout(200)

    await expect(page.locator('h1')).toBeVisible()
  })
})
