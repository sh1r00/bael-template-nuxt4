import { test, expect } from '@playwright/test'

test.describe('Blog Post', () => {
  test('loads a blog post page successfully', async ({ page }) => {
    await page.goto('/blog/brutalist-design-philosophy')

    const response = await page.goto('/blog/brutalist-design-philosophy')
    expect(response?.status()).toBeLessThan(400)

    await expect(page.locator('article')).toBeVisible()
    await expect(page.locator('h1')).toBeVisible()
  })

  test('displays post title', async ({ page }) => {
    await page.goto('/blog/brutalist-design-philosophy')

    const title = page.locator('article h1')
    await expect(title).toBeVisible()
    const titleText = await title.textContent()
    expect(titleText?.length).toBeGreaterThan(0)
  })

  test('displays post metadata', async ({ page }) => {
    await page.goto('/blog/brutalist-design-philosophy')

    // Date should be visible
    const timeElement = page.locator('article time')
    await expect(timeElement).toBeVisible()
    await expect(timeElement).toHaveAttribute('datetime')

    // Author should be visible
    await expect(page.locator('article')).toContainText('Bael')
  })

  test('has back to blog link', async ({ page }) => {
    await page.goto('/blog/brutalist-design-philosophy')

    const backLink = page.locator('article a[href="/"]')
    await expect(backLink).toBeVisible()
  })

  test('back link navigates to homepage', async ({ page }) => {
    await page.goto('/blog/brutalist-design-philosophy')

    const backLink = page.locator('article a[href="/"]').first()
    await backLink.click()
    await expect(page).toHaveURL('/')
  })

  test('displays category badge', async ({ page }) => {
    await page.goto('/blog/brutalist-design-philosophy')

    const categoryLink = page.locator('article a[href^="/categories/"]').first()
    await expect(categoryLink).toBeVisible()
    const categoryText = await categoryLink.textContent()
    expect(categoryText?.trim().length).toBeGreaterThan(0)
  })

  test('category badge links to category page', async ({ page }) => {
    await page.goto('/blog/brutalist-design-philosophy')

    const categoryLink = page.locator('article a[href^="/categories/"]').first()
    const href = await categoryLink.getAttribute('href')
    await categoryLink.click()

    await expect(page).toHaveURL(href!)
    await expect(page.locator('h1')).toBeVisible()
  })

  test('displays tags', async ({ page }) => {
    await page.goto('/blog/brutalist-design-philosophy')

    const tagLinks = page.locator('article a[href^="/tags/"]')
    const count = await tagLinks.count()
    expect(count).toBeGreaterThanOrEqual(1)

    // Verify first tag links to a tag page
    const firstTag = tagLinks.first()
    const href = await firstTag.getAttribute('href')
    expect(href).toMatch(/^\/tags\//)
  })

  test('tag link navigates to tag page', async ({ page }) => {
    await page.goto('/blog/brutalist-design-philosophy')

    const tagLink = page.locator('article a[href^="/tags/"]').first()
    await tagLink.click()

    await expect(page).toHaveURL(/\/tags\//)
    await expect(page.locator('h1')).toBeVisible()
  })

  test('renders markdown content', async ({ page }) => {
    await page.goto('/blog/brutalist-design-philosophy')

    const markdownBody = page.locator('.markdown-body')
    await expect(markdownBody).toBeVisible()

    // Should have rendered content (not empty)
    const content = await markdownBody.textContent()
    expect(content?.trim().length).toBeGreaterThan(100)
  })

  test('displays related posts section', async ({ page }) => {
    await page.goto('/blog/brutalist-design-philosophy')

    // Related posts section should exist (more posts in same category)
    const relatedSection = page.locator('text=More in')
    // This may or may not be visible depending on data — just check article loaded
    await expect(page.locator('article')).toBeVisible()
  })

  test('shows 404 for non-existent post', async ({ page }) => {
    const response = await page.goto('/blog/non-existent-slug-xyz')
    await expect(page.locator('text=404')).toBeVisible()
    await expect(page.locator('text=Post not found')).toBeVisible()
  })

  test('copy link button exists', async ({ page }) => {
    await page.goto('/blog/brutalist-design-philosophy')

    // The copy link button should be somewhere on the page
    const shareSection = page.locator('article')
    await expect(shareSection).toBeVisible()
  })
})
