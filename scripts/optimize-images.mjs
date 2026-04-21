#!/usr/bin/env node
// 1. Drop raw images (JPG/PNG/HEIC) into ./raw-images
// 2. Run: node scripts/optimize-images.mjs
// 3. Upload ./public/gallery/*.webp to Supabase Storage → gallery bucket
// 4. Paste public URLs into src/lib/eventData.ts gallery array

import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const INPUT = './raw-images';
const OUTPUT = './public/gallery';
const MAX_WIDTH = 1600;
const QUALITY = 82;

if (!fs.existsSync(INPUT)) {
  fs.mkdirSync(INPUT, { recursive: true });
  console.log(`📁 Created ${INPUT} — drop images there and run again.`);
  process.exit(0);
}
if (!fs.existsSync(OUTPUT)) fs.mkdirSync(OUTPUT, { recursive: true });

const files = fs.readdirSync(INPUT).filter(f => /\.(jpe?g|png|tiff?|heic)$/i.test(f));
if (files.length === 0) {
  console.log('No images found in ./raw-images');
  process.exit(0);
}

console.log(`🔄 Optimizing ${files.length} image(s) to WebP...\n`);

for (const file of files) {
  const input = path.join(INPUT, file);
  const base = path.basename(file, path.extname(file));
  const output = path.join(OUTPUT, `${base}.webp`);
  const { size: originalSize } = fs.statSync(input);
  await sharp(input)
    .resize({ width: MAX_WIDTH, withoutEnlargement: true })
    .webp({ quality: QUALITY })
    .toFile(output);
  const { size: newSize } = fs.statSync(output);
  const pct = Math.round((1 - newSize / originalSize) * 100);
  console.log(`  ✓ ${file} → ${base}.webp (${pct}% smaller)`);
}

console.log(`\n✅ Done. Upload ${OUTPUT}/*.webp to Supabase Storage.`);
