// ═════════════════════════════════════════════════════════════════════════════
// File    : next.config.ts
// Desc    : Next.js App Router configuration untuk Miselia frontend.
//           - TypeScript strict
//           - Image optimization dengan domain whitelist
//           - Security headers
//           - Sentry source maps + tunneling (STEP 12)
// Layer   : Config
// Step    : STEP 12 — Monitoring: Sentry Setup
// Ref     : Blueprint §2.3, §17
// ═════════════════════════════════════════════════════════════════════════════

import type { NextConfig } from "next";
import { withSentryConfig } from "@sentry/nextjs";

const nextConfig: NextConfig = {
  // Aktifkan React strict mode untuk menemukan masalah lebih awal
  reactStrictMode: true,

  // Image optimization — whitelist domain yang diizinkan
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.supabase.co",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com", // Google OAuth avatar
      },
    ],
  },

  // Security headers
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-DNS-Prefetch-Control", value: "on" },
        ],
      },
    ];
  },

  // Logging untuk development
  logging: {
    fetches: {
      fullUrl: process.env.NODE_ENV === "development",
    },
  },
};

// ── Sentry config ─────────────────────────────────────────────────────────
// withSentryConfig wrap nextConfig untuk:
// - Upload source maps ke Sentry saat build production (butuh SENTRY_AUTH_TOKEN)
// - Tunnel Sentry requests lewat Next.js untuk bypass adblocker
// - Tree-shake Sentry logger dari client bundle
// Ref: Blueprint §17 Monitoring DoD

export default withSentryConfig(nextConfig, {
  // ── Project tagging ───────────────────────────────────────────────────
  org:     process.env.SENTRY_ORG     ?? "miselia",
  project: process.env.SENTRY_PROJECT ?? "miselia-frontend",

  // ── Source maps ───────────────────────────────────────────────────────
  // Upload source maps ke Sentry saat build production
  // Membutuhkan SENTRY_AUTH_TOKEN di env saat build
  widenClientFileUpload: true,

  sourcemaps: {
    disable: false,       // Upload source maps ke Sentry saat build
    deleteSourcemapsAfterUpload: true,  // Jangan expose ke client
  },
  // ── Tunneling ─────────────────────────────────────────────────────────
  // Route Sentry requests lewat /monitoring untuk bypass adblocker
  tunnelRoute: "/monitoring",

  // ── Build output ──────────────────────────────────────────────────────
  silent: !process.env.CI,      // Verbose di CI, silent di local dev

  // ── Tree shaking ──────────────────────────────────────────────────────
  webpack: {
    treeshake: {
      removeDebugLogging: true, // Strip Sentry logger dari production bundle
    },
  },

});
