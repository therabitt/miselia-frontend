// ═════════════════════════════════════════════════════════════════════════════
// File    : lib/posthog.ts
// Desc    : PostHog analytics init dan helper functions.
//           Strategy: anonymous ID untuk guest, identify() setelah login.
//           Ref: Blueprint §14.0 Guest Analytics — Anonymous Identity Strategy
//
//           Flow:
//           - Guest: posthog auto-generate anonymous UUID → simpan di localStorage
//           - Login: identifyUser(userId) → PostHog merge anonymous → userId
//           - Event pre-login ter-attribute ke user yang sama (funnel analysis)
//
//           Konfigurasi:
//           - autocapture: false → manual event only, tidak ada passive tracking
//           - persistence: localStorage → anonymous ID persist lintas tab/session
//           - api_host: NEXT_PUBLIC_POSTHOG_HOST (default: https://eu.posthog.com)
//
// Layer   : Lib / Analytics
// Deps    : posthog-js
// Step    : STEP 11 — Frontend: Layout & Design System
// Ref     : Blueprint §14.0, §14.1
// ═════════════════════════════════════════════════════════════════════════════

import posthog, { type Properties } from "posthog-js";

let initialized = false;

/**
 * Inisialisasi PostHog — dipanggil sekali di RootLayout (client component).
 * Safe untuk dipanggil multiple kali — hanya init sekali.
 */
export function initPostHog(): void {
  if (initialized || typeof window === "undefined") return;
  if (!process.env.NEXT_PUBLIC_POSTHOG_KEY) {
    console.warn("[PostHog] NEXT_PUBLIC_POSTHOG_KEY tidak diset — analytics disabled");
    return;
  }

  posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
    api_host:
      process.env.NEXT_PUBLIC_POSTHOG_HOST ?? "https://eu.posthog.com",
    // Manual event only — tidak ada passive click/page tracking
    // Ref: Blueprint §14.0 — "autocapture: false"
    autocapture: false,
    // Anonymous ID persist di localStorage lintas tab/session
    // Ref: Blueprint §14.0 — "persistence: 'localStorage'"
    persistence: "localStorage",
    // Disable session recording di development
    disable_session_recording: process.env.NODE_ENV !== "production",
    // Capture pageview manual — kita handle di layout
    capture_pageview: false,
    // Debug mode di development
    loaded: (ph) => {
      if (process.env.NODE_ENV === "development") {
        ph.debug();
      }
    },
  });

  initialized = true;
}

/**
 * Identify user setelah login berhasil.
 * Merge anonymous ID (guest events) ke userId → funnel analysis lengkap.
 * Dipanggil di auth callback page setelah Supabase session terbentuk.
 *
 * Ref: Blueprint §14.0
 * @param userId - Miselia user.id (UUID dari tabel users, BUKAN supabase_id)
 * @param properties - User properties untuk segmentasi di PostHog
 */
export function identifyUser(
  userId: string,
  properties: {
    tier: string;
    degree_level: string | null;
    has_org_code: boolean;
    field_of_study?: string | null;
  }
): void {
  if (typeof window === "undefined" || !initialized) return;
  posthog.identify(userId, properties);
}

/**
 * Reset identity saat user logout.
 * Setelah reset, PostHog akan membuat anonymous ID baru untuk sesi berikutnya.
 */
export function resetPostHog(): void {
  if (typeof window === "undefined" || !initialized) return;
  posthog.reset();
}

/**
 * Track analytics event.
 * Semua event taxonomy dari Blueprint §14.1 menggunakan fungsi ini.
 *
 * @param eventName - Nama event sesuai §14.1 taxonomy
 * @param properties - Properties event (bukan PII)
 */
export function trackEvent(eventName: string, properties?: Properties): void {
  if (typeof window === "undefined" || !initialized) return;
  posthog.capture(eventName, properties);
}

/**
 * Track pageview manual.
 * Dipanggil di layout atau page components saat route berubah.
 */
export function trackPageView(path?: string): void {
  if (typeof window === "undefined" || !initialized) return;
  posthog.capture("$pageview", {
    $current_url: path ?? window.location.href,
  });
}

export default posthog;
