#!/usr/bin/env node
/**
 * Generate per-route HTML files with customized OG meta tags.
 *
 * Social-media crawlers (WhatsApp, Telegram, Twitter, Facebook …) do NOT
 * execute JavaScript, so they only see the raw HTML. For an SPA deployed on
 * GitHub Pages the only HTML the crawler receives for sub-routes is the
 * 404.html fallback — which always carries the *root* OG tags.
 *
 * This script copies the built dist/index.html into each route directory
 * (e.g. dist/en/index.html, dist/kn/bride/index.html) and patches the OG
 * tags so every shareable URL produces a rich link preview.
 *
 * Run AFTER `npm run build` and AFTER `update-og-urls.cjs`.
 */

const fs = require("fs");
const path = require("path");

const DIST = path.join(__dirname, "..", "dist");
const SITE_URL =
  process.env.VITE_SITE_URL || "https://l-akshmikanth.github.io/lakshmaan";

// ---------- route definitions ----------
const routes = [
  {
    path: "en",
    lang: "en",
    ogTitle: "Lakshmikanth & Maanya — Wedding Invitation",
    ogDescription:
      "Join us for the wedding celebration of Lakshmikanth & Maanya — March 7-8, 2026 at Surabhi Kalyana Mantapa, Mandya",
    pageTitle: "Lakshmikanth & Maanya — Wedding Invitation",
  },
  {
    path: "kn",
    lang: "kn",
    ogTitle: "ಲಕ್ಷ್ಮೀಕಾಂತ್ & ಮಾನ್ಯ — ಮದುವೆ ಆಹ್ವಾನ",
    ogDescription:
      "ಲಕ್ಷ್ಮೀಕಾಂತ್ ಮತ್ತು ಮಾನ್ಯ ಅವರ ವಿವಾಹ ಸಮಾರಂಭಕ್ಕೆ ತಮ್ಮನ್ನು ಆದರದಿಂದ ಆಹ್ವಾನಿಸಲಾಗಿದೆ — ಮಾರ್ಚ್ 7-8, 2026",
    pageTitle: "ಲಕ್ಷ್ಮೀಕಾಂತ್ & ಮಾನ್ಯ — ಮದುವೆ ಆಹ್ವಾನ",
  },
  {
    path: "en/bride",
    lang: "en",
    ogTitle: "Maanya & Lakshmikanth — Wedding Invitation",
    ogDescription:
      "You're cordially invited to the wedding celebration of Maanya & Lakshmikanth — March 7-8, 2026 at Surabhi Kalyana Mantapa, Mandya",
    pageTitle: "Maanya & Lakshmikanth — Wedding Invitation",
  },
  {
    path: "kn/bride",
    lang: "kn",
    ogTitle: "ಮಾನ್ಯ & ಲಕ್ಷ್ಮೀಕಾಂತ್ — ಮದುವೆ ಆಹ್ವಾನ",
    ogDescription:
      "ಮಾನ್ಯ ಮತ್ತು ಲಕ್ಷ್ಮೀಕಾಂತ್ ಅವರ ವಿವಾಹ ಸಮಾರಂಭಕ್ಕೆ ತಮ್ಮನ್ನು ಆದರದಿಂದ ಆಹ್ವಾನಿಸಲಾಗಿದೆ — ಮಾರ್ಚ್ 7-8, 2026",
    pageTitle: "ಮಾನ್ಯ & ಲಕ್ಷ್ಮೀಕಾಂತ್ — ಮದುವೆ ಆಹ್ವಾನ",
  },
];

// ---------- main ----------
const templatePath = path.join(DIST, "index.html");
if (!fs.existsSync(templatePath)) {
  console.error("ERROR: dist/index.html not found. Run `npm run build` first.");
  process.exit(1);
}
const template = fs.readFileSync(templatePath, "utf-8");

for (const route of routes) {
  let html = template;

  const canonicalUrl = `${SITE_URL}/${route.path}`;

  // 1. <title>
  html = html.replace(
    /<title>[^<]*<\/title>/,
    `<title>${route.pageTitle}</title>`
  );

  // 2. <meta name="description">
  html = html.replace(
    /<meta name="description" content="[^"]*" \/>/,
    `<meta name="description" content="${route.ogDescription}" />`
  );

  // 3. og:title
  html = html.replace(
    /<meta property="og:title" content="[^"]*" \/>/,
    `<meta property="og:title" content="${route.ogTitle}" />`
  );

  // 4. og:description
  html = html.replace(
    /<meta property="og:description" content="[^"]*" \/>/,
    `<meta property="og:description" content="${route.ogDescription}" />`
  );

  // 5. og:url
  html = html.replace(
    /<meta property="og:url" content="[^"]*" \/>/,
    `<meta property="og:url" content="${canonicalUrl}" />`
  );

  // 6. og:image:alt
  html = html.replace(
    /<meta property="og:image:alt" content="[^"]*" \/>/,
    `<meta property="og:image:alt" content="${route.ogTitle}" />`
  );

  // 7. html lang attribute
  html = html.replace(
    /<html lang="[^"]*">/,
    `<html lang="${route.lang}">`
  );

  // Write to dist/<route>/index.html
  const dir = path.join(DIST, route.path);
  fs.mkdirSync(dir, { recursive: true });
  const outPath = path.join(dir, "index.html");
  fs.writeFileSync(outPath, html, "utf-8");
  console.log(`  ✓ ${route.path}/index.html → og:title="${route.ogTitle}"`);
}

console.log(`\n✓ Generated ${routes.length} route-specific HTML files`);
