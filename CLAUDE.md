# NAYAN — landing page

A landing page for NAYAN (نيــــان), a luxury real estate developer in Riyadh (nayan.sa).
This is a pitch: cinematic, calm, premium.

## Reference
`/reference/01.jpg` → `13.jpg` are frames, in order, from a site called "FIND".
Model the layout, pacing and motion of the sections AFTER the scroll film on them.
Never copy their text, images or branding.

## Stack (non-negotiable — the repo is imported into Lovable via GitHub)
- Vite + React + TypeScript + Tailwind CSS
- GSAP + ScrollTrigger, Lenis for smooth scroll
- Arabic, `dir="rtl"` on <html> from the start. Mirror every horizontal motion and arrow.
- Font: IBM Plex Sans Arabic (Google Fonts), with a system Arabic fallback.
- All Arabic copy lives in `src/content.ts`. Components never hard-code text.

## Motion rules
- Slow and smooth. Long easings (power2/power3.out), no bounce, no elastic.
- Respect `prefers-reduced-motion`: show frame 0001 as a still, text fades only.

---

## Section 1 — The scroll film (the heart of the page)

One continuous camera move, played frame by frame by the scroll:
exterior of building A → through the entrance → the living room → out through the window
→ across the street to building B → through its entrance → B's double-height interior.

### Frames
- `/public/frames/desktop/0001.webp` → `0240.webp` — 1280×720 (16:9)
- `/public/frames/mobile/0001.webp` → `0240.webp` — 720×1280 (9:16)
- Both sets have 240 frames and the SAME beats at the same frame numbers.
- Pick the set by viewport orientation: portrait (height > width) → mobile, otherwise desktop.
  Re-check on resize / orientation change, keep the current frame index when switching.

### Implementation
- A section ~700vh tall containing a sticky fullscreen `<canvas>`.
- ScrollTrigger on that section, `scrub: 0.6`. progress 0→1 maps to frame 1→240.
- Draw with "cover" fitting (centre crop, no stretching). Cap devicePixelRatio at 2.
- Only redraw when the frame index changes (requestAnimationFrame).
- Progressive preload, in this order: frame 1 → every 8th frame → every 4th → every 2nd → all.
  Always draw the nearest frame that has loaded, so scrolling never shows a blank.
- Minimal loader (the Nayan logo + a thin progress line) until frame 1 and every 8th frame are in.
- Subtle dark gradient at the bottom of the canvas so overlay text stays readable.

### Chapters (text overlaid on the film, timed by frame number)
Each line fades + rises in, holds, then fades out before the next. Large, light, centred-start.

| frames | what the camera shows | overlay |
|---|---|---|
| 1–64 | approaching building A | Logo + headline + subline + "احجز استشارة" button (visible at frame 1, fades out by ~40) |
| 65–96 | entering through the door | (no text — let it breathe) |
| 97–144 | the living room | statement 1 |
| 145–192 | out through the window, crossing to building B | statement 2 |
| 193–224 | approaching B's entrance | (no text) |
| 225–240 | B's interior | statement 3, then the film unpins into section 2 |

A small scroll hint ("اسحب للأسفل" + thin animated line) shows only at frame 1.

---

## Sections after the film (see /reference for style)

2. **Statement + chevrons** — large line; chevron shapes (pointing LEFT, RTL) filled with stills
   from the film (use frames 0100, 0170, 0235 from the desktop set).
3. **Three points** — text colour reveals grey → near-black as it scrolls into view.
4. **Project specs** — PLACEHOLDER values, clearly marked, to be confirmed with the client.
5. **Testimonial** — one quote, PLACEHOLDER (to be supplied by the client).
6. **Services (dark)** — four services as huge text rows with an arrow each; on hover a still
   reveals behind the row.
7. **Amenities** — cards, PLACEHOLDER list, marked "to confirm with client".
8. **CTA** — over frame 0240 of the active set (desktop or mobile), dark overlay; button opens WhatsApp.
9. **Footer (dark)** — contact details, links, ending in a giant "نيــــان" wordmark.

## Nav
Transparent over the film; hides on scroll down, shows on scroll up; blurred translucent
background once past the film. Logo: `/public/assets/logowhite.webp`.

## Copy (put in src/content.ts)
- Brand: نيــــان (keep the kashida — it is part of the brand)
- Hero headline: لكل منزل قصة.
- Hero subline: نساعدك في كتابتها.
- Primary button: احجز استشارة
- Film statement 1: نهتم بتفاصيل مسكنك
- Film statement 2: أكثر من 20 عامًا من الخبرة في سوق العقارات
- Film statement 3: حيث التفاصيل تصنع الفرق.
- Section 2 statement: اكتشف مشاريع نيان… حيث التفاصيل تصنع الفرق.
- Section 3 points:
  - أكثر من 20 عامًا من الخبرة — أكثر من عقدين من الخبرة العملية في سوق العقارات.
  - الشفافية — نلتزم بالوضوح والمصداقية في جميع مراحل العمل.
  - ما بعد البيع — نقدّم إدارة وخدمات بعد البيع للحفاظ على قيمة العقار.
- Section 6 services: التطوير والتنفيذ · تصميم وتنفيذ المشاريع المخصصة ·
  إدارة العقارات وخدمات ما بعد البيع · الاستشارات الاستثمارية العقارية
- Section 8 headline: هل أنت مستعد لاكتشاف منزل أحلامك مع نيــــان؟
- Section 8 button: تواصل عبر واتساب → https://wa.me/966561291512
- Footer: admin@nayan.sa · +966 56 129 1512 · حي الملقا، الرياض 13525، المملكة العربية السعودية

## How we work
- Build ONLY what the current message asks for, then stop so I can review in the browser.
- First task: project setup + the nav + Section 1 (the scroll film). Nothing else.
- After that, one section at a time.
- If an asset is missing, use a neutral placeholder and tell me which file is missing.
