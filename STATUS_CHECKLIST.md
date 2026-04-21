# Yemisi 60th — Status Checklist

## ✅ Received from client

- [x] Celebrant name: **Yemisi Matesun**
- [x] Event title: **60th Birthday Celebration**
- [x] Date: **7 June 2026**
- [x] Church segment time: **12:00 PM – 2:00 PM**
- [x] Reception segment time: **3:00 PM – 9:00 PM**
- [x] Welcome message
- [x] Bible verse (Psalm 118:24)
- [x] Thank you message
- [x] Closing blessing (Numbers 6:24-26)
- [x] Credit name: **Olatilewa Matesun**
- [x] Design direction: brown floral elegant (mood board received)
- [x] Design adjustment: lightweight brown, not too dark
- [x] Afro-Nigerian vibe
- [x] 7 gallery photos (5 recent, 2 vintage)
- [x] Amazon wishlist link: `https://www.amazon.co.uk/registries/gl/guest-view/1PKVQDDJVC77S`
- [x] RSVP required, no plus-ones, private guest list
- [x] Upfront payment ₦90,000

## ❌ Still outstanding

- [ ] **Church venue name + full address**
- [ ] **Reception venue name + full address**
- [ ] **Bank name, account name, account number** (for monetary gifts)
- [ ] **Voucher email address** (optional — if she wants vouchers)
- [ ] **Video animation reference** (mp4 mentioned, description needed in text/screenshots since I can't view videos)

---

## Photo Curation (my suggestion)

Order to tell a visual story:

**Row 1 — Vintage / heritage:**
1. Vintage solo portrait (white outfit, young Yemisi — Image 8)
2. Vintage couple photo (Image 7)

**Row 2 — Recent portraits:**
3. Royal blue asoke outside UK home (Image 5 — good hero candidate too)
4. Black + teal sequined (Image 4)

**Row 3 — Recent aso-ebi:**
5. Green aso-ebi with sunglasses (Image 3)
6. Green aso-ebi seated (Image 1)

**Row 4 — Couple today:**
7. With husband (Image 6)

Confirm order with Olatilewa before finalising.

---

## Critical WebP naming convention

When dropping images into `./raw-images/`, name them in order so gallery displays correctly:

```
raw-images/
  01-vintage-solo.jpg
  02-vintage-couple.jpg
  03-royal-blue.jpg
  04-black-teal.jpg
  05-green-sunglasses.jpg
  06-green-seated.jpg
  07-couple-today.jpg
```

After `node scripts/optimize-images.mjs`, they become:
```
public/gallery/01-vintage-solo.webp
public/gallery/02-vintage-couple.webp
... etc
```

Then upload all to Supabase Storage → `gallery` bucket, and paste the public URLs in order into `src/lib/eventData.ts`:

```ts
gallery: [
  { url: "https://xxx.supabase.co/storage/v1/object/public/gallery/01-vintage-solo.webp", alt: "Vintage portrait" },
  { url: "https://xxx.supabase.co/storage/v1/object/public/gallery/02-vintage-couple.webp", alt: "Young couple" },
  // ... etc
],
```

---

## Build Order (Today → Wednesday)

### Today (Monday)
- [ ] Run `bash setup.sh`
- [ ] Create Supabase project, paste `schema.sql`
- [ ] Drop all 7 photos into `./raw-images/` with naming convention above
- [ ] Run `node scripts/optimize-images.mjs`
- [ ] Create Supabase Storage `gallery` bucket (auto-created by schema), upload WebP files
- [ ] Paste URLs into `src/lib/eventData.ts`
- [ ] `npm run dev` → visual check on localhost
- [ ] Push to GitHub, deploy to Vercel → get `yemisi60.vercel.app`
- [ ] Send preview link to Olatilewa end-of-day

### Tuesday
- [ ] Get venue addresses + bank details from her
- [ ] Paste into `eventData.ts`, commit, push (auto-deploys)
- [ ] Implement animation per her video reference (once described)
- [ ] Create `og-image.jpg` (1200×630) for WhatsApp preview
- [ ] Test WhatsApp preview by sending link to yourself
- [ ] Mobile responsiveness pass on real phone
- [ ] Send revised preview to Olatilewa

### Wednesday
- [ ] Apply her final revisions
- [ ] Confirm RSVP flow works end-to-end
- [ ] Send final link + handover message
- [ ] Invoice for remaining ₦90,000

---

## Supabase Storage Upload — step by step

1. Go to Supabase Dashboard → your project → **Storage** (sidebar)
2. The `gallery` bucket should already exist (created by `schema.sql`)
3. Click `gallery` → **Upload files** button
4. Select all files from `./public/gallery/*.webp`
5. Once uploaded, click each file → **Copy URL** → paste into `eventData.ts`

The URL format will look like:
```
https://xxxxxxxxxxxx.supabase.co/storage/v1/object/public/gallery/01-vintage-solo.webp
```
