// ═════════════════════════════════════════════════════════════════════════════
// File    : lib/supabase/server.ts
// Desc    : Supabase server-side client — untuk Server Components dan
//           middleware. Membaca/menulis cookie via Next.js cookies() API.
//           Wajib digunakan di semua server-side auth operations.
// Layer   : Lib / Auth
// Deps    : @supabase/ssr, next/headers
// Step    : STEP 11 — Frontend: Layout & Design System
// Ref     : Blueprint §3.1
// ═════════════════════════════════════════════════════════════════════════════

import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

/**
 * Buat Supabase server client.
 * Dipanggil di Server Components, Route Handlers, dan Server Actions.
 * Menggunakan next/headers cookies() untuk read/write session cookie.
 */
export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => {
              cookieStore.set(name, value, options);
            });
          } catch {
            // setAll dipanggil dari Server Component — aman untuk diabaikan
            // karena middleware sudah menangani session refresh
          }
        },
      },
    }
  );
}
