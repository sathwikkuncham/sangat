#!/usr/bin/env node
// Generates PWA icons (any + maskable) and an apple-touch-icon from the Sakhi mark.
// Run via `npm run generate:pwa-assets` (also part of `npm run build`).

import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const outDir = path.join(root, 'public', 'pwa');

// We render the icon programmatically instead of resizing the wordmark SVG so
// the result reads at small sizes (lotus on a rose-tinted square).
const baseSvg = ({ background, accent, glyphFill, glyphStroke }) => `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${background[0]}" />
      <stop offset="100%" stop-color="${background[1]}" />
    </linearGradient>
  </defs>
  <rect width="512" height="512" fill="url(#bg)" />
  <g transform="translate(256 296) scale(7.4)" fill="none" stroke="${glyphStroke}" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M-14 4 Q-14 18 0 18 Q14 18 14 4 Z" fill="${glyphFill}" />
    <path d="M-14 4 L14 4" />
    <path d="M0 4 Q-10 -8 -14 4" />
    <path d="M0 4 Q10 -8 14 4" />
    <path d="M0 4 Q-3 -10 0 -14 Q3 -10 0 4" />
    <circle cx="0" cy="-15" r="2.6" fill="${accent}" stroke="none" />
  </g>
</svg>`;

const palette = {
  background: ['#FBF4F2', '#F4E7E4'],
  accent: '#8E2244',
  glyphFill: '#F8D7DC',
  glyphStroke: '#B8385A',
};

const maskablePalette = {
  // Maskable variant gets a full-bleed solid rose so the safe-area is unmistakable.
  background: ['#B8385A', '#8E2244'],
  accent: '#FBF4F2',
  glyphFill: 'rgba(255,255,255,0.18)',
  glyphStroke: '#FBF4F2',
};

async function emit(buffer, name) {
  await writeFile(path.join(outDir, name), buffer);
  // eslint-disable-next-line no-console
  console.log('  ↳', name);
}

async function rasterise(svgString, size) {
  return sharp(Buffer.from(svgString))
    .resize(size, size, { fit: 'contain' })
    .png({ compressionLevel: 9 })
    .toBuffer();
}

async function main() {
  await mkdir(outDir, { recursive: true });
  // eslint-disable-next-line no-console
  console.log('Generating PWA assets in', path.relative(root, outDir));

  const standardSvg = baseSvg(palette);
  const maskableSvg = baseSvg(maskablePalette);

  await emit(await rasterise(standardSvg, 192), 'icon-192.png');
  await emit(await rasterise(standardSvg, 512), 'icon-512.png');
  await emit(await rasterise(maskableSvg, 512), 'icon-maskable-512.png');
  await emit(await rasterise(standardSvg, 180), 'apple-touch-icon.png');
}

main().catch((error) => {
  console.error('PWA asset generation failed:', error);
  process.exit(1);
});
