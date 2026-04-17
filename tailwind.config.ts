// ═════════════════════════════════════════════════════════════════════════════
// File    : tailwind.config.ts
// Desc    : Tailwind CSS config dengan design system Miselia — Midnight Scholar.
//
//           Design system dari STEP 1 (dikonfirmasi):
//           PALETTE:
//             Dashboard (F — Refined Professional):
//               primary   : #1B2A4A (navy dark)
//               accent    : #14B8A6 (teal)
//               sidebar   : #18181B (dark sidebar)
//             Landing (E — Editorial Academic):
//               bg        : #FAF7F2 (warm parchment)
//               warm      : #C9A96E (gold accent)
//               muted     : #8B7355 (warm brown)
//           TYPOGRAPHY:
//             --font-sans          : Inter (UI labels, buttons, metadata, numerical)
//             --font-baskervville  : Baskervville (hero/main highlight — Bold)
//             --font-crimson       : Crimson Text (heading/body content)
//             --font-garamond      : EB Garamond (quotes, terms — Italic)
//
// Step    : STEP 10 — Frontend: Struktur Direktori & Setup
// Ref     : Blueprint §2.3, STEP 1 design decisions
// ═════════════════════════════════════════════════════════════════════════════

import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      // ── Color System ─────────────────────────────────────────────────────
      // Referensi ke CSS variables yang didefinisikan di globals.css
      // Mengikuti konvensi shadcn/ui (HSL via CSS vars)
      colors: {
        // ── Core shadcn/ui colors ──────────────────────────────────────────
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",

        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },

        // ── Miselia Midnight Scholar (Dashboard) ──────────────────────────
        navy: {
          50: "#EBF0F8",
          100: "#C7D3E9",
          200: "#A3B6DA",
          300: "#7F99CB",
          400: "#5B7CBC",
          500: "#3A5FA4",
          600: "#2D4A7A",
          700: "#1B2A4A",  // primary — #1B2A4A
          800: "#132036",
          900: "#0D1B2E",
        },
        teal: {
          50: "#F0FDFA",
          100: "#CCFBF1",
          200: "#99F6E4",
          300: "#5EEAD4",  // accent dark mode
          400: "#2DD4BF",
          500: "#14B8A6",  // accent DEFAULT — #14B8A6
          600: "#0D9488",
          700: "#0F766E",
          800: "#115E59",
          900: "#134E4A",
        },

        // ── Miselia Landing (Warm Editorial) ──────────────────────────────
        parchment: {
          50: "#FEFCF9",
          100: "#FAF7F2",  // landing background — #FAF7F2
          200: "#F3EDE4",  // landing bg-secondary — #F3EDE4
          300: "#EDE8E0",
          400: "#DDD4C4",  // landing border
          500: "#C9A96E",  // warm accent/gold — #C9A96E
          600: "#A8875A",
          700: "#8B7355",  // muted warm — #8B7355
          800: "#6B5840",
          900: "#4A3D2C",
        },

        // ── Sidebar dark ──────────────────────────────────────────────────
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },

      // ── Typography — 4-font system STEP 1 ────────────────────────────────
      // Font variables diinject ke html element oleh layout.tsx (STEP 11)
      // via next/font/google
      fontFamily: {
        // Inter — UI labels, buttons, metadata, numerical data
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        // Baskervville — hero/main highlight, landing page display
        baskervville: ["var(--font-baskervville)", "Georgia", "serif"],
        // Crimson Text — heading, body content, academic text
        crimson: ["var(--font-crimson)", "Georgia", "serif"],
        // EB Garamond — quotes, terminology (italic)
        garamond: ["var(--font-garamond)", "Georgia", "serif"],
        // Alias: serif = Crimson Text (default serif untuk konten)
        serif: ["var(--font-crimson)", "Georgia", "serif"],
        // Alias: mono = monospace untuk code blocks
        mono: ["var(--font-mono)", "Menlo", "monospace"],
      },

      // ── Font Sizes — academic content scale ───────────────────────────
      fontSize: {
        // Baskervville hero sizes
        "hero-sm": ["2.25rem", { lineHeight: "1.15", letterSpacing: "-0.01em" }],
        "hero-md": ["3rem", { lineHeight: "1.1", letterSpacing: "-0.015em" }],
        "hero-lg": ["3.75rem", { lineHeight: "1.05", letterSpacing: "-0.02em" }],
        // Crimson Text content sizes
        "content-sm": ["0.9375rem", { lineHeight: "1.75" }],
        "content-md": ["1rem", { lineHeight: "1.8" }],
        "content-lg": ["1.125rem", { lineHeight: "1.85" }],
      },

      // ── Border Radius ─────────────────────────────────────────────────
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },

      // ── Keyframes & Animations ────────────────────────────────────────
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-in": {
          from: { opacity: "0", transform: "translateY(4px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "slide-in-from-left": {
          from: { transform: "translateX(-100%)" },
          to: { transform: "translateX(0)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.3s ease-out",
        "slide-in": "slide-in-from-left 0.2s ease-out",
      },

      // ── Box Shadow — untuk card academic style ────────────────────────
      boxShadow: {
        card: "0 1px 3px rgba(27,42,74,0.08), 0 1px 2px rgba(27,42,74,0.04)",
        "card-hover": "0 4px 12px rgba(27,42,74,0.12), 0 2px 4px rgba(27,42,74,0.06)",
        sidebar: "1px 0 0 rgba(255,255,255,0.05)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
