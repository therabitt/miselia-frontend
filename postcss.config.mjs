// ═════════════════════════════════════════════════════════════════════════════
// File    : postcss.config.mjs
// Desc    : PostCSS config untuk Tailwind CSS.
// Step    : STEP 10 — Frontend: Struktur Direktori & Setup
// ═════════════════════════════════════════════════════════════════════════════

/** @type {import('postcss-load-config').Config} */
const config = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};

export default config;
