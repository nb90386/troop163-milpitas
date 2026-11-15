import { expect, test } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

const routes = ['/', '/adventures', '/adventures/camp-hi-sierra-2023', '/adventures/clavey-backpacking', '/gallery', '/about', '/join', '/parents', '/contact']
const isReview = process.env.PHOTO_MODE === 'review'

test.describe('every page', () => {
  for (const path of routes) {
    test(`${path} renders with one h1 and no console errors`, async ({ page }) => {
      const errors: string[] = []
      page.on('pageerror', (e) => errors.push(e.message))
      page.on('console', (m) => m.type() === 'error' && errors.push(m.text()))
      const res = await page.goto(path)
      expect(res?.status()).toBe(200)
      await expect(page.locator('h1')).toHaveCount(1)
      await expect(page).toHaveTitle(/Troop 163/)
      expect(errors).toEqual([])
    })

    test(`${path} has no serious accessibility violations`, async ({ page }) => {
      await page.emulateMedia({ reducedMotion: 'reduce' })
      await page.goto(path)
      const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa']).analyze()
      const serious = results.violations.filter((v) => v.impact === 'serious' || v.impact === 'critical')
      expect(serious.map((v) => `${v.id}: ${v.nodes.map((n) => n.target.join(' ')).slice(0, 3).join(' | ')}`)).toEqual([])
    })
  }

  test('unknown route shows the 404 page', async ({ page }) => {
    const res = await page.goto('/not-a-real-page')
    expect(res?.status()).toBe(404)
    await expect(page.getByRole('heading', { name: 'Off the trail.' })).toBeVisible()
  })
})

test('no horizontal overflow at 320px', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 700 })
  for (const path of routes) {
    await page.goto(path)
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)
    expect(overflow, path).toBeLessThanOrEqual(0)
  }
})

test('navigation reaches every section and back/forward works', async ({ page, isMobile }) => {
  await page.goto('/')
  for (const label of ['Adventures', 'Gallery', 'About', 'Join', 'Parents']) {
    if (isMobile) {
      await page.getByRole('button', { name: 'Menu' }).click()
      await page.getByRole('dialog', { name: 'Menu' }).getByRole('link', { name: label, exact: true }).click()
    } else {
      await page.getByRole('navigation', { name: 'Main' }).getByRole('link', { name: label, exact: true }).click()
    }
    await expect(page).toHaveURL(new RegExp(`/${label.toLowerCase()}$`))
    await expect(page.locator('h1')).toBeVisible()
  }
  await page.goBack()
  await expect(page).toHaveURL(/\/join$/)
  await page.goForward()
  await expect(page).toHaveURL(/\/parents$/)
})

test('mobile menu opens, traps focus and closes with Escape', async ({ page, isMobile }) => {
  test.skip(!isMobile, 'mobile only')
  await page.goto('/')
  const btn = page.getByRole('button', { name: 'Menu' })
  await btn.click()
  const dialog = page.getByRole('dialog', { name: 'Menu' })
  await expect(dialog).toBeVisible()
  await page.keyboard.press('Escape')
  await expect(dialog).toBeHidden()
  await expect(btn).toBeFocused()
})

test('gallery filters and lightbox work with keyboard and URL', async ({ page }) => {
  await page.goto('/gallery')
  const items = page.locator('main ul li button[aria-label^="Open photo"]')
  const total = await items.count()
  expect(total).toBeGreaterThan(20)
  await page.getByRole('button', { name: /^On the water/ }).click()
  await expect(page.getByRole('button', { name: /^On the water/ })).toHaveAttribute('aria-pressed', 'true')
  await expect.poll(() => items.count()).toBeLessThan(total)
  await items.first().click()
  const dialog = page.getByRole('dialog', { name: 'Photo viewer' })
  await expect(dialog).toBeVisible()
  await expect(page).toHaveURL(/\?photo=/)
  const counter = dialog.getByText(/^1 of \d+$/)
  await expect(counter).toBeVisible()
  await page.keyboard.press('ArrowRight')
  await expect(dialog.getByText(/^2 of \d+$/)).toBeVisible()
  await page.keyboard.press('Escape')
  await expect(dialog).toBeHidden()
  await expect(page).not.toHaveURL(/\?photo=/)
  // deep link + back closes
  await page.goto('/gallery?photo=sail-lone-boat')
  await expect(page.getByRole('dialog', { name: 'Photo viewer' })).toBeVisible()
})

test('contact composer builds a real mailto link', async ({ page }) => {
  await page.goto('/contact')
  await page.getByLabel('Your name (parent or guardian)').fill('Test Parent')
  await page.getByText('Troop 2163 (girls)').click()
  const href = await page.locator('a[href^="mailto:"]').first().getAttribute('href')
  expect(href).toContain('bsa2163girlsmilpitas@gmail.com')
  await expect(page.getByRole('button', { name: 'Open in my email app' })).toBeVisible()
})

test('content stays visible with reduced motion', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/')
  await expect(page.getByRole('heading', { name: 'Seven days at Hi-Sierra' })).toBeVisible()
  await expect(page.getByRole('heading', { name: 'Home', level: 3, exact: true })).toBeVisible()
  await page.getByRole('heading', { name: 'What you’ll actually do' }).scrollIntoViewIfNeeded()
  await expect(page.getByRole('heading', { name: 'Sail a mountain lake' })).toBeVisible()
})

test('public build never ships review-only photos', async ({ page, request }) => {
  test.skip(isReview, 'public build only')
  for (const path of ['/', '/gallery', '/about', '/join', '/adventures/camp-hi-sierra-2023']) {
    await page.goto(path)
    const html = await page.content()
    expect(html, path).not.toContain('/images/review/')
  }
  const res = await request.get('/images/review/hi-sierra-2023/two-friends.jpg')
  expect(res.status()).toBe(404)
})

test('nothing covers the home hero on load', async ({ page }) => {
  await page.goto('/')
  const inHero = await page.evaluate(() => {
    const hero = document.querySelector('main section')
    const hit = document.elementFromPoint(innerWidth / 2, innerHeight / 2)
    return !!hero && !!hit && hero.contains(hit)
  })
  expect(inHero).toBe(true)
})

// Regression: masked photos once never revealed in Chromium (the clipped element itself was observed).
test('every masked photo reveals after scrolling past it', async ({ page }) => {
  for (const path of ['/', '/about', '/join', '/parents', '/adventures/camp-hi-sierra-2023']) {
    await page.goto(path)
    const height = await page.evaluate(() => document.documentElement.scrollHeight)
    for (let y = 0; y < height; y += 300) {
      await page.evaluate((yy) => window.scrollTo(0, yy), y)
      await page.waitForTimeout(40)
    }
    await page.waitForTimeout(400)
    const hidden = await page.evaluate(() => [...document.querySelectorAll('[data-reveal="mask"]:not(.is-in)')].length)
    expect(hidden, path).toBe(0)
  }
})
