import { test, expect } from '@playwright/test';

test('health endpoint returns 200', async ({ request }) => {
  const response = await request.get('/api/health');
  expect(response.ok()).toBeTruthy();
  const body = await response.json();
  expect(body.status).toBe('healthy');
  expect(body.version).toBe('1.0.0');
});

test('GDPR endpoint processes email via POST', async ({ request }) => {
  const response = await request.post('/api/gdpr', {
    data: { email: 'test@example.com' },
  });
  expect(response.ok()).toBeTruthy();
  const body = await response.json();
  expect(body).toHaveProperty('success');
});

test('contact endpoint accepts form data', async ({ request }) => {
  const response = await request.post('/api/contact', {
    data: {
      name: 'Test User',
      email: 'test@example.com',
      message: 'Hello from E2E test',
    },
  });
  // May return 200 or 429 (rate limited) — both confirm endpoint exists
  expect([200, 429]).toContain(response.status());
});

test('newsletter endpoint accepts email', async ({ request }) => {
  const response = await request.post('/api/newsletter', {
    data: { email: 'test@example.com' },
  });
  // May return 200 or 429 (rate limited) — both confirm endpoint exists
  expect([200, 429]).toContain(response.status());
});
