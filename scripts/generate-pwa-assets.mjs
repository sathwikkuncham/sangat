#!/usr/bin/env node
// Generates PWA icons (any + maskable) and an apple-touch-icon for Sangat.
// Run via `npm run generate:pwa-assets` (also part of `npm run build`).

import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const outDir = path.join(root, 'public', 'pwa');

const outerPetals = [0, 45, 90, 135, 180, 225, 270, 315];
const innerPetals = [22.5, 67.5, 112.5, 157.5, 202.5, 247.5, 292.5, 337.5];

const baseSvg = ({ background, accent, petalOuter, petalInner, core }) => `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${background[0]}" />
      <stop offset="100%" stop-color="${background[1]}" />
    </linearGradient>
  </defs>
  <rect width="512" height="512" fill="url(#bg)" />
  <g transform="translate(256 256)">
    <g fill="${petalOuter}">
${outerPetals.map((rotate) =>
  `      <ellipse cx="0" cy="-110" rx="40" ry="74" transform="rotate(${rotate})"/>`,
).join('\n')}
    </g>
    <g fill="${petalInner}" opacity="0.92">
${innerPetals.map((rotate) =>
  `      <ellipse cx="0" cy="-55" rx="24" ry="42" transform="rotate(${rotate})"/>`,
).join('\n')}
    </g>
    <circle cx="0" cy="0" r="36" fill="${core}" />
    <circle cx="0" cy="0" r="16" fill="${accent}" />
  </g>
</svg>`;

const lightPalette = {
  background: ['#FBF4F2', '#F4E7E4'],
  petalOuter: '#B8385A',
  petalInner: '#8E2244',
  core: '#511025',
  accent: '#FBD0D9',
};

const maskablePalette = {
  // Maskable variant gets a full-bleed solid rose so the safe-area is unmistakable.
  background: ['#B8385A', '#8E2244'],
  petalOuter: '#FBF4F2',
  petalInner: '#FBD0D9',
  core: '#FBD0D9',
  accent: '#511025',
};

async function emit(buffer, name) {
  await writeFile(path.join(outDir, name), buffer);
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
  console.log('Generating PWA assets in', path.relative(root, outDir));

  const lightSvg = baseSvg(lightPalette);
  const maskableSvg = baseSvg(maskablePalette);

  await emit(await rasterise(lightSvg, 192), 'icon-192.png');
  await emit(await rasterise(lightSvg, 512), 'icon-512.png');
  await emit(await rasterise(maskableSvg, 512), 'icon-maskable-512.png');
  await emit(await rasterise(lightSvg, 180), 'apple-touch-icon.png');
}

main().catch((error) => {
  console.error('PWA asset generation failed:', error);
  process.exit(1);
});
