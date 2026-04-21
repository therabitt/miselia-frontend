// ═════════════════════════════════════════════════════════════════════════════
// File    : lib/supabase/client.ts
// Desc    : Supabase browser-side client — singleton untuk Client Components.
//           Digunakan di hooks (useSession, useAuth) dan client-side mutations.
//           JANGAN gunakan di Server Components atau middleware.
// Layer   : Lib / Auth
// Deps    : @supabase/supabase-js, @supabase/ssr
// Step    : STEP 11 — Frontend: Layout & Design System
// Ref     : Blueprint §3.1
// ═════════════════════════════════════════════════════════════════════════════

import { createBrowserClient } from "@supabase/ssr";

/**
 * Buat Supabase browser client.
 * Dipanggil di Client Components — setiap pemanggilan membuat instance baru
 * tapi @supabase/ssr menangani singleton secara internal per tab.
 */
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
