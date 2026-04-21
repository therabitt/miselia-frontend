// ═════════════════════════════════════════════════════════════════════════════
// File    : app/(dashboard)/layout.tsx
// Desc    : DashboardLayout — shell untuk semua protected pages.
//           Layout: Sidebar Left + main content area.
//           Style: F — Refined Professional (dark sidebar #18181B, Blueprint STEP 1).
//           Auth guard: middleware.ts menangani redirect ke /login.
//           Sidebar: DashboardSidebar component.
// Layer   : App / Layout / Dashboard
// Step    : STEP 11 — Frontend: Layout & Design System
// Ref     : Blueprint §2.3 (dashboard) route group, STEP 1 Dashboard Layout
// ═════════════════════════════════════════════════════════════════════════════

import { DashboardSidebar } from "@/components/layout/DashboardSidebar";
import { Navbar } from "@/components/layout/Navbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar kiri — dark #18181B, selalu visible di desktop */}
      <DashboardSidebar />

      {/* Main area: top navbar + scrollable content */}
      <div className="flex flex-1 flex-col">
        <Navbar variant="dashboard" />
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
