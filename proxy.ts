// ═════════════════════════════════════════════════════════════════════════════
// File    : proxy.ts
// Desc    : Next.js middleware — dua fungsi utama:
//           1. Session refresh: perpanjang Supabase JWT sebelum expired
//              (wajib — tanpa ini session expire tidak di-handle di server)
//           2. Auth guard: redirect ke /login jika akses (dashboard)
//              tanpa session aktif
//           find-papers/ adalah PUBLIC route — tidak di-guard.
// Layer   : Proxy
// Deps    : @supabase/ssr, next/server
// Step    : STEP 11 — Frontend: Layout & Design System
// Ref     : Blueprint §2.3 — (dashboard) protected routes, find-papers public
// ═════════════════════════════════════════════════════════════════════════════

import { createServerClient } from "@supabase/ssr";
import { type NextRequest, NextResponse } from "next/server";

export async function proxy(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  // ── Buat Supabase client dengan cookie dari request ─────────────────────
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) => {
            supabaseResponse.cookies.set(name, value, options);
          });
        },
      },
    }
  );

  // ── Session refresh — WAJIB ada sebelum getUser() ──────────────────────
  // Jangan hapus ini — session tidak akan di-refresh tanpa pemanggilan ini
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // ── Auth guard untuk dashboard routes ───────────────────────────────────
  // (dashboard) group: /library, /chat, /projects, /subscription, /settings
  // Juga guard untuk root dashboard page (/)
  const pathname = request.nextUrl.pathname;

  const isDashboardRoute =
    pathname.startsWith("/library") ||
    pathname.startsWith("/chat") ||
    pathname.startsWith("/projects") ||
    pathname.startsWith("/subscription") ||
    pathname.startsWith("/settings") ||
    pathname === "/";

  if (isDashboardRoute && !user) {
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = "/login";
    // Simpan intended URL untuk redirect setelah login
    loginUrl.searchParams.set("redirectTo", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // ── Redirect logged-in user dari auth pages ─────────────────────────────
  // Jika user sudah login dan akses /login atau /register → redirect ke dashboard
  const isAuthPage =
    pathname === "/login" || pathname === "/register";

  if (isAuthPage && user) {
    const dashboardUrl = request.nextUrl.clone();
    dashboardUrl.pathname = "/find-papers";
    return NextResponse.redirect(dashboardUrl);
  }

  return supabaseResponse;
}

export const config = {
  matcher: [
    /*
     * Match semua request path KECUALI:
     * - _next/static (static files)
     * - _next/image (image optimization)
     * - favicon.ico, sitemap.xml, robots.txt
     * - api routes (tidak perlu proxy auth)
     */
    "/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|api/).*)",
  ],
};
