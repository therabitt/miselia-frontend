// ═════════════════════════════════════════════════════════════════════════════
// File    : lib/hooks/useSession.ts
// Desc    : Hook untuk membaca Supabase session di Client Components.
//           Returns: { user, session, isLoading, isAuthenticated }
//           Subscribe ke onAuthStateChange untuk reactive updates.
//           Digunakan oleh Navbar, DashboardSidebar, dan auth-gated components.
// Layer   : Lib / Hooks
// Deps    : @supabase/supabase-js (browser client)
// Step    : STEP 11 — Frontend: Layout & Design System
// Ref     : Blueprint §2.3 hooks/useAuth.ts
// ═════════════════════════════════════════════════════════════════════════════

"use client";

import { useEffect, useState } from "react";
import { type Session, type User } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/client";

interface UseSessionReturn {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

/**
 * Hook untuk akses session Supabase di Client Components.
 * Subscribe ke auth state changes — reactive terhadap login/logout.
 *
 * Penggunaan:
 *   const { user, isAuthenticated, isLoading } = useSession();
 */
export function useSession(): UseSessionReturn {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient();

    // Ambil session awal
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setIsLoading(false);
    });

    // Subscribe ke perubahan auth state
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      setIsLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return {
    user,
    session,
    isLoading,
    isAuthenticated: !!user,
  };
}
