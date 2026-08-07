# 🔍 SEO Full Audit Report — porto-fathur

**URL audited:** https://porto-fathur.vercel.app/
**Audit date:** 2026-08-07
**Audit type:** Local project + live URL (evidence-backed)
**Method:** LLM-first analysis + deterministic scripts (robots, llms.txt, security headers, redirects, social meta, HTML parse, asset inventory, production build)

---

## Overall Score: 74/100 — 🟡 Good

| Category | Weight | Score | Rating |
|----------|--------|-------|--------|
| Technical SEO | 25% | 85 | ✅ Good |
| Content Quality | 20% | 65 | ⚠️ Needs Improvement |
| On-Page SEO | 15% | 85 | ✅ Good |
| Schema / Structured Data | 15% | 85 | ✅ Good |
| Performance (CWV) | 10% | 40 | 🔴 Poor |
| Image Optimization | 10% | 55 | ⚠️ Needs Improvement |
| AI Search Readiness (GEO) | 5% | 92 | ✅ Excellent |

**The one thing standing between this site and an "Excellent" score is performance** — specifically a **13.5 MB hero background image**. Everything else is well above average.

---

## Summary Table

| Element | Value | Severity |
|---------|-------|----------|
| Title tag | `Fathur — UI/UX Designer & Frontend Developer` (51 chars) | ✅ Pass |
| Meta description | ~156 chars, keyword-rich | ✅ Pass |
| Canonical | `https://porto-fathur.vercel.app/` | ✅ Pass |
| H1 | sr-only `Porto Folio — Agus Fathurrahman Rifai` (Hero) | ✅ Pass |
| H2s | sr-only `About Me`, `Projects`, `Experience` + real `Contact Me!` | ⚠️ Info |
| Structured data | Person + WebSite JSON-LD (valid, active types) | ✅ Pass |
| Open Graph | 7/7 complete | ✅ Pass |
| Twitter Card | 6/6 complete | ✅ Pass |
| HTTPS + HSTS | Yes, HSTS preload | ✅ Pass |
| Security headers | 100/100 (CSP, XFO, nosniff, Referrer, Permissions) | ✅ Pass |
| robots.txt | 12 UAs, AI crawlers blocked, sitemap declared | ✅ Pass |
| llms.txt | 90/100 + llms-full.txt present | ✅ Pass |
| Redirect chain | 0 hops, direct 200 | ✅ Pass |
| Favicon | `/logo1.png` (200 OK) | ✅ Pass |
| **Hero image (LCP)** | **`bg4.svg` = 13.5 MB, preloaded** | 🔴 **Critical** |
| **About/Skills SVGs** | `fathur.svg` 3.4 MB, `fathur2.svg` 3.8 MB | 🔴 Critical |
| **Orphaned assets** | ~38 files (~60 MB) incl. `bg.svg` 13.5 MB, `pantai.svg` 7 MB, `project/*.png` originals | ⚠️ Warning |
| PageSpeed (CWV) | ⛔ API rate-limited — lab data unavailable | ℹ️ Info |
| JS bundle | 431 KB (146 KB gzip) | ✅ Pass |

---

## 1. Technical SEO — 85/100 ✅

### Passes
- ✅ **HTTPS + HSTS** with `preload` and `includeSubDomains` — perfect.
- ✅ **Security headers 100/100**: CSP, `X-Frame-Options: SAMEORIGIN`, `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy` — all present via `vercel.json`. Excellent.
- ✅ **Clean redirect chain**: 0 hops, direct 200 in 79ms.
- ✅ **Canonical** points to the exact final URL (no trailing-slash conflict).
- ✅ **robots.txt**: `Allow: /` for `*`, AI crawlers (GPTBot, ClaudeBot, CCBot, Google-Extended, ChatGPT-User, Applebot-Extended, Bytespider, anthropic-ai, FacebookBot, Amazonbot) fully blocked, PerplexityBot allowed, and `Sitemap:` declared.
- ✅ **Sitemap**: valid XML, correct URL, fresh `lastmod` (2026-07-25).
- ✅ **Google Search Console verification** file present (`google7448662902336f6c.html`).
- ✅ **Status 200** for all key assets (og-image, logo, cv.pdf, preloaded bg4, crayon.ttf).

### Findings
- ⚠️ **Client-side rendered SPA** — the raw HTML contains only the `<noscript>` fallback. A parser sees 21 words, 1 heading, 0 images, 0 links. Googlebot does render JavaScript, but the initial HTML is thin. This adds render risk for indexing and is the root cause of the "empty" crawl signals.

  *Evidence:* `parse_html.py` on fetched HTML returned `h2: [], images: [], links: {internal: [], external: []}`. Only the noscript block has content.
- ℹ️ `changefreq` in sitemap is ignored by Google (harmless, but unnecessary).

---

## 2. Content Quality — 65/100 ⚠️

### Passes
- ✅ Clear, accurate **title & meta description** with the person's real name — strong for personal-brand queries.
- ✅ **About section has genuine, useful copy** ("I am Agus Fathurrahman Rifai... IT student at Universitas Brawijaya... bridging functionality and aesthetics through UI/UX Design").
- ✅ **Project descriptions** in the modal are specific and useful (14 projects with tech stacks, descriptions, live/GitHub links).
- ✅ **E-E-A-T signals**: real name, photo, LinkedIn, GitHub, Instagram, X, university — strong for a personal portfolio.
- ✅ Semantic structure exists (sr-only H1/H2s + real `Contact Me!` H2).

### Findings
- 🔴 **Visible text is mostly image-based**: The brand ("Porto Folio"), section titles ("About Me", "Projects", "Experience", "My Skill") and many labels are **SVG/WebP images**, not HTML text. Bots + screen readers depend on the sr-only equivalents. Estimated visible HTML text on the page: ~100–200 words.
- ⚠️ **Hero H1 says "Porto Folio"** while the title tag says "Fathur — UI/UX Designer & Frontend Developer". Mismatch between H1 and title is a missed keyword-consistency signal.
- ℹ️ Static-content readability flagged as "Extremely Difficult" (Flesch 18.9) — this measurement covers only the tiny noscript block, so treat as low-confidence.
- ℹ️ `keywords` meta tag is present (~30 keywords). Harmless, but obsolete since 2009 — safe to remove.

---

## 3. On-Page SEO — 85/100 ✅

| Element | Status |
|---------|--------|
| Title (51 chars, 1 keyword) | ✅ |
| Meta description (156 chars) | ✅ |
| Canonical | ✅ |
| H1 present (sr-only) | ✅ |
| H2 section markers (sr-only) | ✅ |
| lang="en" | ✅ |
| Viewport | ✅ |
| Alt text on content images (project titles) | ✅ |
| Alt="" + aria-hidden on decorative | ✅ |
| Favicon | ✅ |
| Preload hints (bg4, crayon.ttf) | ✅ but see Performance |
| Preconnect (fonts.googleapis/gstatic) | ✅ |
| Internal anchor links (nav `#about`, `#projects`, …) | ✅ |
| `rel="noopener noreferrer"` on external links | ✅ |

### Findings
- ⚠️ **H1/H2 are `sr-only`** — invisible to users. Google renders them, but the visible page communicates section names via images. Recommend keeping sr-only (better than nothing) and adding a sentence of real text where cheap to do so.
- ℹ️ Single-page site with anchor navigation — every section reachable from the nav. Good for crawlability within one URL.

---

## 4. Schema / Structured Data — 85/100 ✅

- ✅ **Person** JSON-LD — name, alternateName, url, image, description, jobTitle, knowsAbout, alumniOf, sameAs. Excellent, complete.
- ✅ **WebSite** JSON-LD — name + url.
- ✅ Valid JSON (`@context` + `@type` present), both types **active** in schema.org.

### Recommendations (optional)
- ➕ Consider `ProfilePage` (with `mainEntity: Person`) — richer for personal-brand SERPs.
- ➕ Consider `WebSite` with `SearchAction` — not needed for a single-page portfolio (skip).
- ⛔ Do **not** add FAQPage schema (restricted to gov/health sites since Aug 2023) or HowTo (deprecated).

---

## 5. Performance (Core Web Vitals) — 40/100 🔴

> ⛔ **Environment limitation:** PageSpeed Insights API was rate-limited (no API key), so lab CWV numbers (LCP/INP/CLS) are unavailable. The findings below are **direct evidence from asset analysis**, confidence: **Likely**.

### Critical findings
- 🔴 **`bg4.svg` (hero background) is 13,499,054 bytes (~13.5 MB) and is `<link rel="preload">`'d.** This image is almost certainly the **LCP element**. A 13.5 MB LCP image will produce an **LCP in the multiple seconds** on mobile — a hard failure against Google's 2.5s threshold. This is the single biggest issue on the site.
- 🔴 **`fathur.svg` (About) = 3.4 MB** and **`fathur2.svg` (Skills) = 3.8 MB** — both in the DOM as full-size SVGs. Likely base64/photo-embedded SVGs; convert to optimized WebP/AVIF or compress the SVG paths.
- ⚠️ These SVGs are likely embedded raster photos wrapped in SVG (the `head -c 300` shows pure path data, but 13.5 MB of path data is effectively a raster trace). Regardless of format, the byte weight is what hurts.
- ✅ **Good news:** many images already have WebP twins (`bawah.webp` 98 KB vs `bawah.png` 882 KB; `pantai.webp` 418 KB vs `pantai.svg` 7 MB; `magang.webp` 105 KB vs `magang.png` 745 KB). The pattern exists — it just wasn't applied to `bg4.svg`, `fathur.svg`, `fathur2.svg`.
- ✅ JS bundle 431 KB (146 KB gzip) — fine for an animated React site.

---

## 6. Image Optimization — 55/100 ⚠️

- ✅ **Good alt-text hygiene**: content images use project titles, decorative images use `alt=""` + `aria-hidden` (best practice).
- ✅ WebP versions exist for many images (see above).
- 🔴 **Huge SVGs served to browsers**: `bg4.svg` 13.5 MB, `fathur.svg` 3.4 MB, `fathur2.svg` 3.8 MB.
- ⚠️ **~38 orphaned files** in `public/` (never referenced in `src/` or `index.html`), totaling **~60 MB** of dead weight:
  - **Top level (~22):** `bg.svg` (13.5 MB), `pantai.svg` (7 MB), `fatur.svg` (4 MB), `pantai.jpg` (2.5 MB), `logo.png` (277 KB), `ai.svg`, `ps.svg`, `bawah.png` (882 KB), `magang.png` (745 KB), `yuwa.png` (457 KB), `reborn.png` (547 KB), `propok.png` (221 KB), `Group 81.png` (214 KB), `Group 81.webp`, `bawah.svg`, `navbar.svg`, `loading.svg`, `portofolio.svg`, `icons.svg`, `favicon.svg`, `bebek.svg`, `bg2.svg`
  - **`public/project/` (16):** every `.png` original — `porto.png` (**7.3 MB**), `ShimaGold.png` (2.2 MB), `Fusion.png` (1.05 MB), `Plantropic.png` (868 KB), `Purvo.png` (742 KB), `Hasil1–10.png` (~200–370 KB each) — all have `.webp` twins that ARE used.
  - ⚠️ Do NOT delete: `bg3.svg` (used by `skill.jsx` line 139) and `skill.svg` (referenced in source) — verified as in-use, excluded from the orphan list.

---

## 7. AI Search Readiness (GEO) — 92/100 ✅

- ✅ **llms.txt: 90/100 quality score** — title, description, 6 section links, clean structure. Excellent.
- ✅ **llms-full.txt present** with rich detail (skills, projects, experience, tech details).
- ✅ **AI crawler management**: GPTBot, ClaudeBot, CCBot, Google-Extended, ChatGPT-User, Applebot-Extended, Bytespider, anthropic-ai, FacebookBot, Amazonbot all blocked; PerplexityBot allowed (consistent with publishing llms.txt — an intentional, coherent strategy).
- ℹ️ PerplexityBot is allowed while llms.txt exists — good synergy (Perplexity reads llms.txt).
- ℹ️ Consider also allowing **Google-Extended** if you want AI Overviews to cite the site — currently blocked by design. No change needed if that's intentional.

---

## Environment Limitations

- ⛔ **PageSpeed Insights API** rate-limited (no key configured) — no lab CWV numbers. Performance scores are derived from direct asset-weight evidence.
- ⛔ **broken_links.py** crashed with a script bug (`KeyError: 'total'`) — manual HEAD checks were performed instead (all key assets returned 200).
- ⛔ **Visual/screenshot analysis** (Playwright) not run — not needed for this audit.
- ℹ️ **internal_links.py** found 0 internal links — expected, since the SPA renders nav via JS; verified from source that anchor links exist.

---

## Score Breakdown (weighted)

```
Technical   85 × 0.25 = 21.25
Content     65 × 0.20 = 13.00
On-Page     85 × 0.15 = 12.75
Schema      85 × 0.15 = 12.75
Performance 40 × 0.10 =  4.00
Images      55 × 0.10 =  5.50
GEO         92 × 0.05 =  4.60
─────────────────────────────
TOTAL               = 73.85 → 74/100 (Good)
```

---

*Generated with the SEO skill (LLM-first + script-backed evidence). Full prioritized fixes: see `ACTION-PLAN.md`.*
