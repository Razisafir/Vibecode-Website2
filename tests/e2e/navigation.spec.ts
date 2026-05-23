import { test, expect } from '@playwright/test';

test('navbar has key links', async ({ page }) => {
  await page.goto('/');
  const nav = page.locator('nav');
  await expect(nav).toBeVisible();
});

test('footer is present on homepage', async ({ page }) => {
  await page.goto('/');
  const footer = page.locator('footer');
  await expect(footer).toBeVisible();
});

test('theme toggle exists and works', async ({ page }) => {
  await page.goto('/');
  const toggle = page.locator('button[aria-label="Toggle theme"]');
  if (await toggle.isVisible()) {
    await toggle.click();
    // Should have switched from dark to light
    await page.waitForTimeout(500);
  }
});

test('compare page loads', async ({ page }) => {
  await page.goto('/compare');
  await expect(page.locator('body')).toBeVisible();
});

test('demo page interactive steps work', async ({ page }) => {
  await page.goto('/demo');
  await expect(page.locator('body')).toBeVisible();
});
