import { expect, test } from '@playwright/test'

test('modal contains keyboard focus, closes with Escape, and returns focus', async ({ page }) => {
  await page.goto('/')
  const trigger = page.getByRole('button', { name: 'Open hand-built dialog' })
  await page.keyboard.press('Tab')
  await expect(trigger).toBeFocused()

  await page.keyboard.press('Enter')
  const dialog = page.getByRole('dialog', { name: 'Example modal dialog' })
  const close = dialog.getByRole('button', { name: 'Close dialog' })
  const input = dialog.getByRole('textbox', { name: 'Name' })
  const done = dialog.getByRole('button', { name: 'Done' })
  await expect(dialog).toBeVisible()
  await expect(close).toBeFocused()

  await page.keyboard.press('Tab')
  await expect(input).toBeFocused()
  await page.keyboard.press('Tab')
  await expect(done).toBeFocused()
  await page.keyboard.press('Tab')
  await expect(close).toBeFocused()
  await page.keyboard.press('Shift+Tab')
  await expect(done).toBeFocused()

  await page.keyboard.press('Escape')
  await expect(dialog).toHaveCount(0)
  await expect(trigger).toBeFocused()
})

test('tabs use one Tab stop and arrows, Home, and End activate panels', async ({ page }) => {
  await page.goto('/')
  await page.keyboard.press('Tab')
  await page.keyboard.press('Tab')
  const tablist = page.getByRole('tablist', { name: 'Hand-built example tabs' })
  const overview = tablist.getByRole('tab', { name: 'Overview' })
  const keyboard = tablist.getByRole('tab', { name: 'Keyboard' })
  const focus = tablist.getByRole('tab', { name: 'Focus' })
  await expect(overview).toBeFocused()

  await page.keyboard.press('ArrowRight')
  await expect(keyboard).toBeFocused()
  await expect(keyboard).toHaveAttribute('aria-selected', 'true')
  await expect(page.getByRole('tabpanel', { name: 'Keyboard' })).toBeVisible()

  await page.keyboard.press('End')
  await expect(focus).toBeFocused()
  await page.keyboard.press('ArrowRight')
  await expect(overview).toBeFocused()
  await page.keyboard.press('ArrowLeft')
  await expect(focus).toBeFocused()
  await page.keyboard.press('Home')
  await expect(overview).toBeFocused()

  await page.keyboard.press('Tab')
  await expect(page.getByRole('tabpanel', { name: 'Overview' })).toBeFocused()
})

test('disclosure toggles with Space and Enter', async ({ page }) => {
  await page.goto('/')
  for (let index = 0; index < 4; index++) await page.keyboard.press('Tab')
  const button = page.getByRole('button', { name: 'Show keyboard guidance' })
  await expect(button).toBeFocused()
  await expect(button).toHaveAttribute('aria-expanded', 'false')

  await page.keyboard.press('Space')
  await expect(button).toHaveAttribute('aria-expanded', 'true')
  await expect(page.getByText('The content is removed from the Tab order')).toBeVisible()
  await page.keyboard.press('Enter')
  await expect(button).toHaveAttribute('aria-expanded', 'false')
})
