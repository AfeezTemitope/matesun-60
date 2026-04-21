import sharp from 'sharp';
import fs from 'fs';

const SRC = './public/gallery/03-royal-blue.webp';
const OUT = './public/og-image.jpg';

const W = 1200;
const H = 630;
const LEFT_PANEL_W = 540;  // 45% for photo
const RIGHT_PANEL_X = LEFT_PANEL_W;
const RIGHT_PANEL_W = W - LEFT_PANEL_W;

// ---- 1. Base canvas: chocolate brown background ----
const baseSvg = `
<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${W}" height="${H}" fill="#5d3720"/>
  <!-- Subtle grain texture overlay -->
  <defs>
    <pattern id="grain" x="0" y="0" width="4" height="4" patternUnits="userSpaceOnUse">
      <circle cx="1" cy="1" r="0.4" fill="#fff" opacity="0.03"/>
    </pattern>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#grain)"/>
</svg>
`;

// ---- 2. Process the photo: resize, crop to fit left panel ----
// Extend the image slightly taller, crop to fill the panel
const photo = await sharp(SRC)
  .resize({
    width: LEFT_PANEL_W + 40,  // slightly wider than panel (we'll fade the right edge)
    height: H,
    fit: 'cover',
    position: 'top',  // bias toward the face (top of portrait)
  })
  .toBuffer();

// ---- 3. Fade mask — soft gradient on the right edge of the photo ----
// This creates a smooth transition from photo → brown background
const fadeMaskSvg = `
<svg width="${LEFT_PANEL_W + 40}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="fade" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="white" stop-opacity="1"/>
      <stop offset="75%" stop-color="white" stop-opacity="1"/>
      <stop offset="100%" stop-color="white" stop-opacity="0"/>
    </linearGradient>
  </defs>
  <rect width="100%" height="100%" fill="url(#fade)"/>
</svg>
`;

const photoWithFade = await sharp(photo)
  .composite([{
    input: Buffer.from(fadeMaskSvg),
    blend: 'dest-in',
  }])
  .png()
  .toBuffer();

// ---- 4. Text overlay SVG (right panel) ----
// Note: using web-safe serif since custom fonts don't embed reliably in sharp SVG.
// The look is calibrated to approximate Great Vibes + Cormorant Garamond vibes.
const textSvg = `
<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <style>
    .label {
      font-family: 'Helvetica', 'Arial', sans-serif;
      font-size: 16px;
      letter-spacing: 6px;
      fill: #f9f3e3;
      opacity: 0.85;
    }
    .cursive {
      font-family: 'Brush Script MT', 'Lucida Handwriting', cursive;
      font-style: italic;
      fill: #d4af37;
    }
    .serif {
      font-family: 'Georgia', 'Times New Roman', serif;
      fill: #f9f3e3;
    }
    .date {
      font-family: 'Helvetica', 'Arial', sans-serif;
      font-size: 20px;
      letter-spacing: 4px;
      fill: #f9f3e3;
    }
  </style>

  <!-- Eucalyptus accent top-right corner -->
  <g transform="translate(${W - 100}, 40) rotate(15)" opacity="0.5">
    <path d="M0,0 Q20,20 35,50 Q45,75 50,100" stroke="#d4af37" stroke-width="1" fill="none"/>
    <ellipse cx="10" cy="15" rx="7" ry="3" fill="#d4af37" opacity="0.7" transform="rotate(-20 10 15)"/>
    <ellipse cx="22" cy="32" rx="8" ry="3.5" fill="#d4af37" opacity="0.7" transform="rotate(-10 22 32)"/>
    <ellipse cx="35" cy="55" rx="9" ry="4" fill="#d4af37" opacity="0.7" transform="rotate(5 35 55)"/>
    <ellipse cx="45" cy="80" rx="9" ry="4" fill="#d4af37" opacity="0.7" transform="rotate(20 45 80)"/>
  </g>

  <!-- Text centered in right panel (center-x of right panel = LEFT_PANEL_W + RIGHT_PANEL_W/2) -->
  <text x="${RIGHT_PANEL_X + RIGHT_PANEL_W/2}" y="140" text-anchor="middle" class="label">CELEBRATING</text>

  <!-- Big "60th" in cursive gold -->
  <text x="${RIGHT_PANEL_X + RIGHT_PANEL_W/2}" y="290" text-anchor="middle" class="cursive" font-size="170">60th</text>

  <!-- "Birthday Celebration" -->
  <text x="${RIGHT_PANEL_X + RIGHT_PANEL_W/2}" y="340" text-anchor="middle" class="serif" font-size="32" font-weight="300">Birthday Celebration</text>

  <!-- Gold divider -->
  <line x1="${RIGHT_PANEL_X + RIGHT_PANEL_W/2 - 40}" y1="375" x2="${RIGHT_PANEL_X + RIGHT_PANEL_W/2 + 40}" y2="375" stroke="#d4af37" stroke-width="1" opacity="0.7"/>

  <!-- "Yemisi Matesun" in cursive -->
  <text x="${RIGHT_PANEL_X + RIGHT_PANEL_W/2}" y="450" text-anchor="middle" class="cursive" font-size="64" fill="#f9f3e3">Yemisi Matesun</text>

  <!-- Date -->
  <text x="${RIGHT_PANEL_X + RIGHT_PANEL_W/2}" y="530" text-anchor="middle" class="date">7 JUNE 2026</text>
</svg>
`;

// ---- 5. Composite everything ----
await sharp(Buffer.from(baseSvg))
  .composite([
    { input: photoWithFade, left: 0, top: 0 },
    { input: Buffer.from(textSvg), left: 0, top: 0 },
  ])
  .jpeg({ quality: 90 })
  .toFile(OUT);

const { size } = fs.statSync(OUT);
console.log(`\n✅ Generated ${OUT} (${(size / 1024).toFixed(0)} KB)`);
console.log(`   Dimensions: ${W}×${H}`);
console.log(`   Preview by opening the file directly.`);
