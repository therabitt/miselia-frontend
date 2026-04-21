// ═════════════════════════════════════════════════════════════════════════════
// File    : app/(public)/layout.tsx
// Desc    : PublicLayout — layout untuk landing page, pricing, FAQ.
//           Route group (public) tidak require auth.
//           Menggunakan warm parchment background (#FAF7F2) sesuai
//           style E — Editorial Academic dari STEP 1.
//           Shell: Navbar (logo + CTA) + main content + Footer.
// Layer   : App / Layout / Public
// Step    : STEP 11 — Frontend: Layout & Design System
// Ref     : Blueprint §2.3 (public) route group
// ═════════════════════════════════════════════════════════════════════════════

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // Landing page: warm parchment bg sesuai STEP 1 (E — Editorial Academic)
    <div className="flex min-h-screen flex-col bg-[hsl(var(--landing-background))]">
      <Navbar variant="public" />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
