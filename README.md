# Yemisi Matesun 60th — Invitation Page

Custom single-event invitation built with Next.js 14 + Supabase.

## Setup
```bash
npm run dev   # http://localhost:3000
```

## Environment
Fill `.env.local` with Supabase credentials.

## Content updates
All text content in `src/lib/eventData.ts`. Edit → commit → push (Vercel auto-deploys).

## Gallery photos
1. Drop originals into `./raw-images/`
2. `node scripts/optimize-images.mjs` (converts to WebP, auto-resizes)
3. Upload `/public/gallery/*.webp` to Supabase Storage → gallery bucket
4. Paste public URLs into `event.gallery` array in `src/lib/eventData.ts`

## RSVPs
View at Supabase Dashboard → Table Editor → rsvps
