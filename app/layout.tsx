// ═════════════════════════════════════════════════════════════════════════════
// File    : app/layout.tsx
// Desc    : RootLayout — shell paling luar aplikasi Miselia.
//           - Load 4 font via next/font/google dan inject ke CSS variables
//           - Init PostHog (client component via provider)
//           - Placeholder untuk providers (QueryClient, ThemeProvider)
//           Font system (STEP 1 confirmed):
//             Inter          → --font-sans (UI, labels, buttons, metadata)
//             Baskervville   → --font-baskervville (hero, landing highlight)
//             Crimson Text   → --font-crimson (heading, body, academic text)
//             EB Garamond    → --font-garamond (quotes, terminology)
// Layer   : App / Layout
// Deps    : next/font/google, next-themes
// Step    : STEP 11 — Frontend: Layout & Design System
// Ref     : Blueprint §2.3, STEP 1 design system
// ═════════════════════════════════════════════════════════════════════════════

import { PostHogProvider } from "@/components/providers/PostHogProvider";
import type { Metadata } from "next";
import { Baskervville, Crimson_Text, EB_Garamond, Inter } from "next/font/google";
import "./globals.css";

// ── Font definitions ──────────────────────────────────────────────────────
// Variable CSS: setiap font di-expose sebagai CSS var via `variable` prop
// Ref: tailwind.config.ts fontFamily section

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-sans",
    display: "swap",
});

const baskervville = Baskervville({
    subsets: ["latin"],
    weight: ["400"],
    style: ["normal", "italic"],
    variable: "--font-baskervville",
    display: "swap",
});

const crimsonText = Crimson_Text({
    subsets: ["latin"],
    weight: ["400", "600"],
    style: ["normal", "italic"],
    variable: "--font-crimson",
    display: "swap",
});

const ebGaramond = EB_Garamond({
    subsets: ["latin"],
    weight: ["400", "500"],
    style: ["normal", "italic"],
    variable: "--font-garamond",
    display: "swap",
});

// ── Metadata ─────────────────────────────────────────────────────────────

export const metadata: Metadata = {
    title: {
        default: "Miselia — AI Academic Research Companion",
        template: "%s | Miselia",
    },
    description:
        "Temukan paper, analisis research gap, dan susun metodologi skripsimu — dengan bantuan AI yang memahami konteks akademik Indonesia.",
    keywords: ["skripsi", "tesis", "AI", "research", "literature review", "akademik"],
    openGraph: {
        type: "website",
        locale: "id_ID",
        url: process.env.NEXT_PUBLIC_APP_URL,
        siteName: "Miselia",
    },
    robots: {
        index: true,
        follow: true,
    },
};

// ── Root Layout ───────────────────────────────────────────────────────────

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html
            lang="id"
            suppressHydrationWarning
            className={`
        ${inter.variable}
        ${baskervville.variable}
        ${crimsonText.variable}
        ${ebGaramond.variable}
      `}
        >
            <body className="min-h-screen bg-background font-sans antialiased">
                {/*
          PostHogProvider: init PostHog + track pageviews.
          Harus di luar Suspense boundary agar tidak blocking.
          Ref: Blueprint §14.0
        */}
                <PostHogProvider>
                    {/*
            TODO STEP 12+: Tambahkan providers di sini:
            - ThemeProvider (next-themes) — dark mode toggle
            - QueryClientProvider (react-query) — server state management
            - ToastProvider (radix-ui/react-toast)
            - AuthProvider (jika diperlukan context global)
          */}
                    {children}
                </PostHogProvider>
            </body>
        </html>
    );
}
