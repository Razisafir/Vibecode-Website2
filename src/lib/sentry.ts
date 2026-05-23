import * as Sentry from '@sentry/browser';

const SENTRY_DSN = process.env.NEXT_PUBLIC_SENTRY_DSN;

export function initSentry() {
    if (typeof window === 'undefined') return; // Server-side guard
    if (!SENTRY_DSN) return; // Skip if no DSN configured
    
    Sentry.init({
        dsn: SENTRY_DSN,
        tracesSampleRate: 0.1,
        replaysOnErrorSampleRate: 1.0,
        enabled: !!SENTRY_DSN,
        environment: process.env.NODE_ENV,
    });
}

export { Sentry };
