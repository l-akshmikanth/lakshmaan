#!/usr/bin/env node
/**
 * Update OG meta tags with absolute URLs for production deployment
 * Reads VITE_SITE_URL from environment or uses default
 */
const fs = require('fs');
const path = require('path');

const indexPath = path.join(__dirname, '..', 'index.html');
const siteUrl = process.env.VITE_SITE_URL || 'https://l-akshmikanth.github.io/lakshmaan';

console.log(`Updating OG meta tags with site URL: ${siteUrl}`);

let html = fs.readFileSync(indexPath, 'utf-8');

// Update og:url
html = html.replace(
  /<meta property="og:url" content="[^"]*" \/>/,
  `<meta property="og:url" content="${siteUrl}/" />`
);

// Update og:image to use absolute URL
html = html.replace(
  /<meta property="og:image" content="\/lakshmaan\/og\/site-og\.png" \/>/,
  `<meta property="og:image" content="${siteUrl}/og/site-og.png" />`
);

// Update twitter:image to use absolute URL
html = html.replace(
  /<meta name="twitter:image" content="\/lakshmaan\/og\/site-og\.png" \/>/,
  `<meta name="twitter:image" content="${siteUrl}/og/site-og.png" />`
);

fs.writeFileSync(indexPath, html);
console.log('✓ OG meta tags updated with absolute URLs');
