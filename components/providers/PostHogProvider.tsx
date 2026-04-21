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

import { useEffect, Suspense } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { initPostHog, trackPageView } from "@/lib/posthog";

interface PostHogProviderProps {
  children: React.ReactNode;
}

/**
 * Separate tracker component to safely use useSearchParams() 
 * which requires a Suspense boundary during static pre-rendering.
 * Ref: https://nextjs.org/docs/messages/missing-suspense-with-csr-bailout
 */
function PostHogPageviewTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (pathname) {
      const url =
        pathname +
        (searchParams.toString() ? `?${searchParams.toString()}` : "");
      trackPageView(url);
    }
  }, [pathname, searchParams]);

  return null;
}

export function PostHogProvider({ children }: PostHogProviderProps) {
  // Init PostHog sekali saat mount
  useEffect(() => {
    initPostHog();
  }, []);

  return (
    <>
      <Suspense fallback={null}>
        <PostHogPageviewTracker />
      </Suspense>
      {children}
    </>
  );
}
