# 🛠 SEO Action Plan — porto-fathur

Prioritized by **impact × effort**. Fixing items 1–2 alone should take the site from 74 → ~85/100.

---

## 🔴 P0 — Critical (fix immediately, highest impact)

### 1. Replace the 13.5 MB hero background (`bg4.svg`)
- **What:** `public/bg4.svg` is **13,499,054 bytes** and is preloaded via `<link rel="preload" as="image" href="/bg4.svg">` in `index.html`. It's almost certainly the LCP element → LCP of several seconds on mobile, failing Core Web Vitals.
- **Evidence:** `curl -sI https://porto-fathur.vercel.app/bg4.svg` → `content-length: 13499054`.
- **Fix (choose one):**
  - **Best:** Export the hero background as **WebP** at 1728px wide, quality 80 (`bg4.webp`, expect ≤ 300 KB — a ~97% reduction), and swap the `<img src>` in `Hero.jsx`. Keep the preload, but point it at the WebP.
  - Or compress the SVG with `svgo` (path-data SVGs of photos usually still end up huge — WebP is the reliable win).
- **Files:** `index.html` (preload), `src/components/Hero.jsx` (img src), delete or archive `bg4.svg`.

### 2. Compress `fathur.svg` (3.4 MB) and `fathur2.svg` (3.8 MB)
- **What:** About + Skills photos are multi-MB SVGs in the DOM.
- **Evidence:** HEAD checks → `fathur.svg` 3,373,160 B; `fathur2.svg` 3,813,477 B.
- **Fix:** Convert both to **WebP** (or AVIF if Safari support permits your audience) at rendered size ×2 DPR. Expect ~200–400 KB each. Update `src/components/About.jsx` and `src/components/skill.jsx` img sources.
- **Optional bonus:** add `loading="lazy"` + `decoding="async"` to these below-the-fold photos (keep the hero eager).

---

## 🟠 P1 — High (fix within 1 month)

### 3. Delete ~38 orphaned assets from `public/` (saves ~60 MB)
- **What:** Files never referenced in `src/` or `index.html` (verified via grep against all sources).
  - **Top level (~22):** `bg.svg` (13.5 MB), `pantai.svg` (7 MB), `fatur.svg` (4 MB), `pantai.jpg` (2.5 MB), `bawah.png` (882 KB), `magang.png` (745 KB), `yuwa.png` (457 KB), `reborn.png` (547 KB), `propok.png` (221 KB), `logo.png` (277 KB), `Group 81.png` (214 KB), `Group 81.webp`, `bawah.svg`, `navbar.svg`, `loading.svg`, `portofolio.svg`, `icons.svg`, `favicon.svg`, `bebek.svg`, `bg2.svg`, `ai.svg`, `ps.svg`
  - **`public/project/` (16 PNG originals):** `porto.png` (**7.3 MB**), `ShimaGold.png` (2.2 MB), `Fusion.png` (1.05 MB), `Plantropic.png` (868 KB), `Purvo.png` (742 KB), `Hasil1.png` … `Hasil10.png` — each has a `.webp` twin that IS used. Delete only the `.png` files, keep all `.webp`.
- **⚠️ Do NOT delete:** `bg3.svg` (used by `skill.jsx` line 139), `skill.svg` (referenced in source), `bg4.svg` (until P0 done), all `project/*.webp` files, `teks-porto.svg`, `crayon.ttf`, `cv.pdf`, `og-image.png`, `logo1.png`, `robots.txt`, `sitemap.xml`, `llms*.txt`, `google*.html`.
- **Why:** ~68 MB `public/` slows Vercel deploys, bloats the repo, and risks accidental inclusion in build output.

### 4. Add real visible HTML text to the hero
- **What:** The H1 is `sr-only` and the visible brand is an SVG image.
- **Fix (small):** Add a one-line real-text subtitle under the CTA, e.g. `<p>UI/UX Designer & Frontend Developer crafting playful, animated web experiences with React & GSAP.</p>` This gives bots + users + AI search engines the page's actual topic as crawlable text.

### 5. Align H1 with the title
- **What:** H1 says "Porto Folio — Agus Fathurrahman Rifai"; title says "Fathur — UI/UX Designer & Frontend Developer".
- **Fix:** Update the sr-only H1 in `Hero.jsx` to match the title: `Fathur — UI/UX Designer & Frontend Developer` (keeps one consistent primary keyword phrase).

---

## 🟡 P2 — Nice to have

### 6. Reconsider blocking Google-Extended
- **What:** `Google-Extended` is disallowed, so AI Overviews / Gemini won't cite the site even though `llms.txt` exists.
- **Action:** Only change if you *want* AI Overview citations. Your current "block training, allow Perplexity" stance is coherent — no change required if intentional.

### 7. Verify CWV in PageSpeed after P0 fixes
- **What:** The API was rate-limited during audit (no key). After deploying P0/P1, run: `python3 <seo-skill>/scripts/pagespeed.py https://porto-fathur.vercel.app/ --strategy mobile` to confirm LCP < 2.5s.

### 8. Remove the obsolete `keywords` meta tag
- **What:** `index.html` has ~30 keywords. Ignored by Google since 2009.
- **Fix:** Delete the line. Trivial cleanup.

### 9. Keep sitemap fresh
- **What:** `lastmod` is 2026-07-25. Update on meaningful content changes. Remove `changefreq` (ignored by Google).

### 10. (Optional) Rich schema
- **What:** Upgrade `Person` → `ProfilePage` with `mainEntity: Person` for richer personal-brand SERPs. JSON-LD only (never microdata/RDFa).

---

## Quick win checklist (5 min)

- [ ] Point the `preload` + hero img from `bg4.svg` → WebP (P0 #1)
- [ ] WebP-ify `fathur.svg` / `fathur2.svg` (P0 #2)
- [ ] `rm` orphaned assets listed in P1 #3
- [ ] Add hero subtitle text (P1 #4)
- [ ] Align sr-only H1 with title (P1 #5)

**Expected impact:** Performance 40 → ~80, Images 55 → ~85 → **overall ~85/100 (Good → Excellent edge).**
