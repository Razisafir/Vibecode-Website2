import { test, expect } from '@playwright/test';

const pages = [
  { path: '/', titleMatch: /VibeCode/i },
  { path: '/features', titleMatch: /VibeCode/i },
  { path: '/downloads', titleMatch: /VibeCode/i },
  { path: '/pricing', titleMatch: /VibeCode/i },
  { path: '/about', titleMatch: /VibeCode/i },
  { path: '/contact', titleMatch: /VibeCode/i },
  { path: '/careers', titleMatch: /VibeCode/i },
  { path: '/investors', titleMatch: /VibeCode/i },
  { path: '/blog', titleMatch: /VibeCode/i },
  { path: '/docs', titleMatch: /VibeCode/i },
  { path: '/compare', titleMatch: /VibeCode/i },
  { path: '/demo', titleMatch: /VibeCode/i },
  { path: '/privacy', titleMatch: /VibeCode/i },
  { path: '/terms', titleMatch: /VibeCode/i },
  { path: '/changelog', titleMatch: /VibeCode/i },
  { path: '/roadmap', titleMatch: /VibeCode/i },
  { path: '/security', titleMatch: /VibeCode/i },
  { path: '/privacy/data-deletion', titleMatch: /VibeCode/i },
];

for (const { path, titleMatch } of pages) {
  test(`${path} loads correctly`, async ({ page }) => {
    await page.goto(path);
    await expect(page).toHaveTitle(titleMatch);
  });
}
