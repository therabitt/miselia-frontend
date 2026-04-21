// ═════════════════════════════════════════════════════════════════════════════
// File    : app/(auth)/layout.tsx
// Desc    : AuthLayout — shell untuk login, register, callback, onboarding.
//           Split screen layout (STEP 1: Auth Layout = Split Screen).
//           Kiri: branding/illustration, Kanan: form content.
//           Implementasi penuh di Fase 1 — saat ini skeleton centered card.
// Layer   : App / Layout / Auth
// Step    : STEP 11 (skeleton) → Fase 1 (split screen implementasi)
// Ref     : Blueprint §2.3 (auth) route group, STEP 1 Auth Layout = Split Screen
// ═════════════════════════════════════════════════════════════════════════════

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // TODO Fase 1: Implementasi split screen layout
    // Kiri: navy bg + Miselia branding + tagline
    // Kanan: white card + form content
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-md">
        {/* Logo placeholder */}
        <div className="mb-8 text-center">
          <span className="font-baskervville text-2xl font-bold text-navy-700">
            Miselia
          </span>
        </div>
        {children}
      </div>
    </div>
  );
}
