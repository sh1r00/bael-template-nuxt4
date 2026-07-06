import { test, expect } from '@playwright/test'

test.describe('Navigation', () => {
  test('header navigation links are present', async ({ page }) => {
    await page.goto('/')

    const nav = page.locator('nav[aria-label="Main navigation"]')
    await expect(nav).toBeVisible()

    // Verify key nav links
    await expect(nav.locator('a[href="/"]')).toBeVisible()
    await expect(nav.locator('a[href="/about"]')).toBeVisible()
    await expect(nav.locator('a[href="/categories/design"]')).toBeVisible()
    await expect(nav.locator('a[href="/tags/nuxt"]')).toBeVisible()
  })

  test('logo links to homepage', async ({ page }) => {
    await page.goto('/about')
    const logo = page.locator('header a[aria-label="BAEL Home"]')
    await expect(logo).toBeVisible()
    await logo.click()
    await expect(page).toHaveURL('/')
  })

  test('navigates to about page', async ({ page }) => {
    await page.goto('/')
    await page.locator('nav[aria-label="Main navigation"] a[href="/about"]').click()
    await expect(page).toHaveURL('/about')
    await expect(page.locator('h1')).toBeVisible()
  })

  test('navigates to categories page', async ({ page }) => {
    await page.goto('/')
    await page.locator('nav[aria-label="Main navigation"] a[href="/categories/design"]').click()
    await expect(page).toHaveURL(/\/categories\/design/)
    await expect(page.locator('h1')).toBeVisible()
  })

  test('navigates to tags page', async ({ page }) => {
    await page.goto('/')
    await page.locator('nav[aria-label="Main navigation"] a[href="/tags/nuxt"]').click()
    await expect(page).toHaveURL(/\/tags\/nuxt/)
    await expect(page.locator('h1')).toBeVisible()
  })

  test('mobile navigation is accessible', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 })
    await page.goto('/')

    const mobileNav = page.locator('nav[aria-label="Mobile navigation"]')
    await expect(mobileNav).toBeVisible()

    const links = mobileNav.locator('a')
    const count = await links.count()
    expect(count).toBeGreaterThanOrEqual(4)
  })

  test('skip-to-content link exists', async ({ page }) => {
    await page.goto('/')
    const skipLink = page.locator('a.skip-link')
    await expect(skipLink).toBeVisible()
    await expect(skipLink).toHaveAttribute('href', '#main-content')
  })

  test('footer renders on all pages', async ({ page }) => {
    const pages = ['/', '/about', '/categories/design', '/tags/nuxt']

    for (const path of pages) {
      await page.goto(path)
      const footer = page.locator('footer[role="contentinfo"]')
      await expect(footer).toBeVisible()
      await expect(footer.locator('text=[BAEL]')).toBeVisible()
    }
  })

  test('footer includes tech stack badges', async ({ page }) => {
    await page.goto('/')
    const footer = page.locator('footer[role="contentinfo"]')

    await expect(footer.locator('text=Nuxt')).toBeVisible()
    await expect(footer.locator('text=Vue')).toBeVisible()
    await expect(footer.locator('text=Tailwind')).toBeVisible()
    await expect(footer.locator('text=Pinia')).toBeVisible()
  })
})
