// ═════════════════════════════════════════════════════════════════════════════
// File    : components/layout/Footer.tsx
// Desc    : Public footer — link: Tentang, Pricing, FAQ, Privacy, Terms.
//           Digunakan oleh PublicLayout. Tidak muncul di dashboard.
//           Implementasi penuh di Fase 1 (landing page phase).
// Layer   : Components / Layout
// Step    : STEP 11 (placeholder) → Fase 1 (implementasi penuh)
// Ref     : Blueprint §2.3 Footer.tsx
// ═════════════════════════════════════════════════════════════════════════════

import Link from "next/link";

const FOOTER_LINKS = [
  { label: "Pricing", href: "/pricing" },
  { label: "FAQ", href: "/faq" },
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
] as const;

export function Footer() {
  return (
    <footer className="border-t border-[hsl(var(--landing-border))] bg-[hsl(var(--landing-background))]">
      <div className="container flex flex-col items-center gap-4 py-8 md:flex-row md:justify-between">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Miselia. Dibuat untuk mahasiswa Indonesia.
        </p>
        <nav className="flex items-center gap-6">
          {FOOTER_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
