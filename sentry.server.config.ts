// ═════════════════════════════════════════════════════════════════════════════
// File    : sentry.server.config.ts
// Desc    : Sentry server-side (Node.js) configuration.
//           Aktif di Next.js server runtime — Server Components, API routes.
//           Menggunakan SENTRY_DSN (non-public) untuk server-side.
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

    // Server-side: lebih tinggi sample rate karena lebih critical
    tracesSampleRate: process.env.NODE_ENV === "production" ? 0.2 : 1.0,

    // Privacy — jangan kirim PII
    sendDefaultPii: false,

    // Filter: jangan kirim di development
    beforeSend(event) {
      if (
        process.env.NODE_ENV === "development" &&
        process.env.SENTRY_DEBUG !== "true"
      ) {
        return null;
      }
      return event;
    },

    debug: false,
  });
}
