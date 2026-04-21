import sharp from 'sharp';
import fs from 'fs';

const SVG = './public/favicons/favicon-source.svg';
const svgBuffer = fs.readFileSync(SVG);

// Sizes Next.js and browsers look for
const targets = [
  { size: 16,  out: './public/favicons/favicon-16.png' },
  { size: 32,  out: './public/favicons/favicon-32.png' },
  { size: 48,  out: './public/favicons/favicon-48.png' },
  { size: 180, out: './src/app/apple-icon.png' },    // iOS home screen
  { size: 192, out: './public/favicons/icon-192.png' },
  { size: 512, out: './public/favicons/icon-512.png' },
  { size: 32,  out: './src/app/icon.png' },           // Next.js auto-detected
];

console.log('🔄 Generating icon sizes...\n');

for (const { size, out } of targets) {
  await sharp(svgBuffer)
    .resize(size, size)
    .png()
    .toFile(out);
  console.log(`  ✓ ${size}x${size}  →  ${out}`);
}

// Build favicon.ico (multi-resolution) — Next.js looks for this in src/app/
// sharp can't produce .ico directly, so we use the 32x32 PNG renamed
// (modern browsers accept PNG in .ico position)
const ico32 = await sharp(svgBuffer).resize(32, 32).png().toBuffer();
fs.writeFileSync('./src/app/favicon.ico', ico32);
console.log('  ✓ 32x32    →  ./src/app/favicon.ico (PNG format, .ico extension)');

console.log('\n✅ Favicon build complete.');
