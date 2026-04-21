// ═════════════════════════════════════════════════════════════════════════════
// File    : components/layout/Navbar.tsx
// Desc    : Navbar component — dua varian:
//           "public"    : Logo + Login + "Daftar Gratis" CTA
//           "dashboard" : Logo + SubscriptionBadge + user avatar dropdown
//           Implementasi penuh di Fase 1.
//           Saat ini: placeholder dengan logo teks + skeleton structure.
// Layer   : Components / Layout
// Step    : STEP 11 (placeholder) → Fase 1 (implementasi penuh)
// Ref     : Blueprint §2.3 Navbar.tsx
// ═════════════════════════════════════════════════════════════════════════════

"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";

interface NavbarProps {
  variant?: "public" | "dashboard";
  className?: string;
}

export function Navbar({ variant = "public", className }: NavbarProps) {
  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b",
        variant === "public"
          ? "border-[hsl(var(--landing-border))] bg-[hsl(var(--landing-background))]/95 backdrop-blur"
          : "border-border bg-background/95 backdrop-blur",
        className
      )}
    >
      <div className="container flex h-14 items-center justify-between">
        {/* Logo */}
        <Link
          href={variant === "dashboard" ? "/find-papers" : "/"}
          className="flex items-center gap-2"
        >
          <span className="font-baskervville text-xl font-bold text-navy-700 dark:text-foreground">
            Miselia
          </span>
        </Link>

        {/* Nav actions — placeholder */}
        {variant === "public" ? (
          <nav className="flex items-center gap-3">
            {/* TODO Fase 1: Link ke pricing, FAQ */}
            <Link
              href="/login"
              className="label-caps text-muted-foreground hover:text-foreground transition-colors"
            >
              Masuk
            </Link>
            <Link
              href="/register"
              className="label-caps rounded-md bg-navy-700 px-4 py-2 text-white hover:bg-navy-800 transition-colors"
            >
              Daftar Gratis
            </Link>
          </nav>
        ) : (
          <nav className="flex items-center gap-3">
            {/* TODO Fase 1: SubscriptionBadge + user avatar dropdown */}
            <div className="h-8 w-8 rounded-full bg-muted" />
          </nav>
        )}
      </div>
    </header>
  );
}
