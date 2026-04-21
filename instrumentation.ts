// ═════════════════════════════════════════════════════════════════════════════
// File    : instrumentation.ts
// Desc    : Next.js 14 Instrumentation hook — entry point Sentry init.
//           Dieksekusi saat server startup dan untuk setiap runtime.
//           Memilih config yang sesuai (client / server / edge) berdasarkan
//           runtime environment saat ini.
//           Ref: Next.js docs — instrumentation.ts (diaktifkan otomatis di Next.js 14.2+)
// Layer   : Config / Monitoring
// Deps    : @sentry/nextjs
// Step    : STEP 12 — Monitoring: Sentry Setup
// Ref     : Blueprint §17 Monitoring
// ═════════════════════════════════════════════════════════════════════════════

export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    await import("./sentry.server.config");
  }

  if (process.env.NEXT_RUNTIME === "edge") {
    await import("./sentry.edge.config");
  }
}

/**
 * onRequestError — dipanggil Next.js saat ada unhandled error di server.
 * Teruskan ke Sentry untuk capture.
 */
export const onRequestError = async (
  err: unknown,
  request: Request,
  context: {
    routerKind: string;
    routePath: string;
    routeType: string;
  }
) => {
  const Sentry = await import("@sentry/nextjs");

  Sentry.captureRequestError(err, {
  path: request.url,
  method: request.method,
  headers: Object.fromEntries(request.headers),
}, context);

};
