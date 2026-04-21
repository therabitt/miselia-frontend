// ═════════════════════════════════════════════════════════════════════════════
// File    : sentry.client.config.ts
// Desc    : Sentry client-side (browser) configuration.
//           Diload via instrumentation.ts — Next.js 14 pattern.
//           Hanya aktif jika NEXT_PUBLIC_SENTRY_DSN diset.
//           send_default_pii: false — tidak kirim IP/email ke Sentry.
// Layer   : Config / Monitoring
// Deps    : @sentry/nextjs
// Step    : STEP 12 — Monitoring: Sentry Setup
// Ref     : Blueprint §17 Monitoring
// ═════════════════════════════════════════════════════════════════════════════

import * as Sentry from "@sentry/nextjs";

const SENTRY_DSN = process.env.NEXT_PUBLIC_SENTRY_DSN;

if (SENTRY_DSN) {
  Sentry.init({
    dsn: SENTRY_DSN,

    // ── Environment tagging ────────────────────────────────────────────────
    environment: process.env.NODE_ENV,
    release: `miselia-frontend@0.1.0`,

    // ── Performance tracing ────────────────────────────────────────────────
    // 10% di production — cukup untuk Web Vitals tanpa overhead
    tracesSampleRate: process.env.NODE_ENV === "production" ? 0.1 : 1.0,

    // ── Replays ────────────────────────────────────────────────────────────
    // Session replay untuk bug reproduction — 10% sessions, 100% saat error
    replaysSessionSampleRate: 0.1,
    replaysOnErrorSampleRate: 1.0,

    // ── Integrations ──────────────────────────────────────────────────────
    integrations: [
      Sentry.replayIntegration({
        // Mask semua teks dan input — WAJIB untuk UU PDP compliance
        maskAllText: true,
        blockAllMedia: true,
      }),
    ],

    // ── Privacy ────────────────────────────────────────────────────────────
    // Jangan kirim PII (IP address, email) ke Sentry
    sendDefaultPii: false,

    // ── Filter ────────────────────────────────────────────────────────────
    beforeSend(event) {
      // Jangan kirim di development kecuali testing
      if (
        process.env.NODE_ENV === "development" &&
        process.env.NEXT_PUBLIC_SENTRY_DEBUG !== "true"
      ) {
        console.warn("[Sentry] Event captured (not sent in dev):", event);
        return null;
      }
      return event;
    },

    // ── Debug ──────────────────────────────────────────────────────────────
    debug: false,
  });
}
