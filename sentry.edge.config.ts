// ═════════════════════════════════════════════════════════════════════════════
// File    : sentry.edge.config.ts
// Desc    : Sentry edge runtime configuration.
//           Digunakan oleh Next.js edge routes (proxy.ts, dll).
//           Config minimal — edge runtime memiliki API terbatas.
// Layer   : Config / Monitoring
// Deps    : @sentry/nextjs
// Step    : STEP 12 — Monitoring: Sentry Setup
// Ref     : Blueprint §17 Monitoring
// ═════════════════════════════════════════════════════════════════════════════

import * as Sentry from "@sentry/nextjs";

const SENTRY_DSN =
  process.env.SENTRY_DSN ?? process.env.NEXT_PUBLIC_SENTRY_DSN;

if (SENTRY_DSN) {
  Sentry.init({
    dsn: SENTRY_DSN,
    environment: process.env.NODE_ENV,
    release: `miselia-frontend@0.1.0`,
    tracesSampleRate: process.env.NODE_ENV === "production" ? 0.1 : 1.0,
    sendDefaultPii: false,
    debug: false,
  });
}
