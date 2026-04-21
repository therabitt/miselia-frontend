// ═════════════════════════════════════════════════════════════════════════════
// File    : components/providers/PostHogProvider.tsx
// Desc    : Client Component wrapper untuk PostHog init.
//           Harus "use client" agar bisa akses window/localStorage.
//           Track pageview setiap kali pathname berubah.
// Layer   : Components / Providers
// Deps    : posthog-js, next/navigation
// Step    : STEP 11 — Frontend: Layout & Design System
// Ref     : Blueprint §14.0
// ═════════════════════════════════════════════════════════════════════════════

"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { initPostHog, trackPageView } from "@/lib/posthog";

interface PostHogProviderProps {
  children: React.ReactNode;
}

export function PostHogProvider({ children }: PostHogProviderProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Init PostHog sekali saat mount
  useEffect(() => {
    initPostHog();
  }, []);

  // Track pageview setiap route change
  useEffect(() => {
    if (pathname) {
      const url =
        pathname +
        (searchParams.toString() ? `?${searchParams.toString()}` : "");
      trackPageView(url);
    }
  }, [pathname, searchParams]);

  return <>{children}</>;
}
