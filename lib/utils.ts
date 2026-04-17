// ═════════════════════════════════════════════════════════════════════════════
// File    : lib/utils.ts
// Desc    : Utility functions — cn() untuk class merging (shadcn/ui standard).
// Layer   : Lib / Utils
// Deps    : clsx, tailwind-merge
// Step    : STEP 10 — Frontend: Struktur Direktori & Setup
// Ref     : Blueprint §2.3
// ═════════════════════════════════════════════════════════════════════════════

import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge Tailwind CSS classes dengan resolusi konflik yang benar.
 * Kombinasi clsx (conditional classes) + tailwind-merge (dedup Tailwind).
 *
 * Penggunaan:
 *   cn("px-4 py-2", isActive && "bg-primary", className)
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
