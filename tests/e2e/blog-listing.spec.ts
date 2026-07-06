import { test, expect } from '@playwright/test'

test.describe('Blog Listing', () => {
  test('homepage displays blog post cards', async ({ page }) => {
    await page.goto('/')

    // Post cards should be visible
    const postCards = page.locator('.grid > a, [class*="post"]')
    const count = await postCards.count()
    expect(count).toBeGreaterThanOrEqual(1)
  })

  test('homepage has search input', async ({ page }) => {
    await page.goto('/')

    const searchInput = page.locator('input[type="search"][aria-label="Search posts"]')
    await expect(searchInput).toBeVisible()
  })

  test('search filters posts on homepage', async ({ page }) => {
    await page.goto('/')

    const searchInput = page.locator('input[type="search"][aria-label="Search posts"]')

    // Type a term that should match at least one post
    await searchInput.fill('brutalist')

    // Wait for reactivity
    await page.waitForTimeout(300)

    // There should still be visible posts (the ones matching)
    const visiblePosts = page.locator('a[href^="/blog/"]')
    const count = await visiblePosts.count()
    expect(count).toBeGreaterThanOrEqual(1)
  })

  test('search with no results shows empty state', async ({ page }) => {
    await page.goto('/')

    const searchInput = page.locator('input[type="search"][aria-label="Search posts"]')
    await searchInput.fill('xyznonexistent123')

    await page.waitForTimeout(300)

    // Should show no results message
    await expect(page.locator('text=0 results')).toBeVisible()
  })

  test('tag cloud filters posts', async ({ page }) => {
    await page.goto('/')

    // Find tag buttons (they start with #)
    const tagButtons = page.locator('button:has-text("#")')
    const tagCount = await tagButtons.count()

    if (tagCount > 0) {
      const firstTag = tagButtons.first()
      const tagText = await firstTag.textContent()

      await firstTag.click()
      await page.waitForTimeout(300)

      // Post count should update
      const postCountText = page.locator('text=/\\d+ post/')
      await expect(postCountText).toBeVisible()
    }
  })

  test('category links are present on homepage', async ({ page }) => {
    await page.goto('/')

    // Category section should show category links
    const categoryLinks = page.locator('a[href^="/categories/"]')
    const count = await categoryLinks.count()
    expect(count).toBeGreaterThanOrEqual(1)
  })

  test('navigates to a blog post from listing', async ({ page }) => {
    await page.goto('/')

    // Find the first blog post link
    const firstPostLink = page.locator('a[href^="/blog/"]').first()
    await expect(firstPostLink).toBeVisible()

    const href = await firstPostLink.getAttribute('href')
    await firstPostLink.click()

    // Should navigate to the blog post page
    await expect(page).toHaveURL(href!)
    await expect(page.locator('article')).toBeVisible()
    await expect(page.locator('h1')).toBeVisible()
  })

  test('post count is displayed', async ({ page }) => {
    await page.goto('/')

    const postCountElement = page.locator('text=/\\d+ post/')
    await expect(postCountElement).toBeVisible()
  })
})
