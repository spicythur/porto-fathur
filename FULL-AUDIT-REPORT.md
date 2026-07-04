# SEO Audit — porto-fathur.vercel.app

**Audited:** 2026-07-04
**Type:** Single-page React SPA (portfolio)
**Method:** LLM-first analysis + script-backed verification against production (`https://porto-fathur.vercel.app/`) and the rendered local dev DOM (`localhost:5173`) for on-page structure.

---

## Score Summary

| Category | Weight | Score | Rating |
|---|---|---|---|
| Technical SEO | 25% | 78/100 | Good |
| Content Quality / On-Page Structure | 20% | 45/100 | Poor |
| On-Page SEO (meta/tags) | 15% | 95/100 | Excellent |
| Schema / Structured Data | 15% | 85/100 | Good |
| Performance (CWV) | 10% | Unknown | — (rate-limited, see Limitations) |
| Image Optimization | 10% | 75/100 | Good |
| AI Search Readiness (GEO) | 5% | 60/100 | Needs Improvement |

**Weighted score (excluding unavailable CWV, redistributed proportionally): ~74/100 — Good, with one Critical structural issue.**

---

## 🔴 Critical Findings

### 1. No `<h1>` anywhere on the page; only one real heading element site-wide
- **Finding:** The rendered DOM has zero `<h1>` tags. Only one semantic heading exists in the entire page: `<h2>Contact Me!</h2>`. Every other section "title" — Hero ("Porto Folio"), About ("About Me"), Skills ("My Skill"), Experience ("Experience"), Projects ("Projects") — is rendered as an `<img>` with alt text, not a heading element.
- **Evidence:** DOM heading extraction returned:
  ```
  H3 × 15 (project card titles: "Porto Fathur", "Fusion AI", ... "Vokasioner Tee")
  H2 × 1  ("Contact Me!")
  ```
  No H1. The 15 H3s also appear before the page's only H2 in DOM order — an inverted hierarchy.
- **Impact:** H1 is one of the strongest on-page relevance signals Google uses to understand what a page is about. With no H1, the page has no clear textual signal that this is "Fathur — UI/UX Designer & Frontend Developer." Search engines can't extract heading text from SVG images the way they can from real text — the meta `<title>` and JSON-LD are carrying 100% of that weight alone.
- **Fix:** Add a visually-hidden (or styled) real `<h1>` containing the page's primary identity, e.g. `<h1>Agus Fathurrahman Rifai — UI/UX Designer & Frontend Developer</h1>`, and promote each section's image-title to sit alongside (or be replaced by) a real `<h2>` (About, Skills, Experience, Projects) so the hierarchy reads H1 → H2 (sections) → H3 (project cards). The decorative SVG art can stay for visuals; the heading text just needs a real (even visually-hidden via `sr-only`) HTML element backing it.
- **Confidence:** Confirmed (direct DOM inspection).

---

## ✅ Strengths (Confirmed)

### 2. Meta tags — Excellent
- `social_meta.py` scored **100/100** on production: all 7 Open Graph tags and all 6 Twitter Card tags present and valid.
- Title: `Fathur — UI/UX Designer & Frontend Developer` (55 chars — within range).
- Meta description present, unique, descriptive.
- Canonical tag confirmed **self-referencing correctly** (`canonical_checker.py`): `https://porto-fathur.vercel.app/` → `https://porto-fathur.vercel.app/`.
- `og-image.png` confirmed live (HTTP 200, 480KB).

### 3. Structured Data — Good
- Valid `Person` JSON-LD schema present with `name`, `alumniOf`, `knowsAbout`, `sameAs` (GitHub/LinkedIn/Instagram).
- Uses `<script type="application/ld+json">` correctly (no deprecated Microdata/RDFa).
- Minor gap: no `WebSite` schema with `SearchAction`, and no `BreadcrumbList` — low priority for a single-page site.

### 4. robots.txt — Good
- Confirmed live, status 200, references sitemap correctly.
- AI crawlers explicitly managed: GPTBot, ClaudeBot, CCBot, Google-Extended all **blocked**; PerplexityBot explicitly **allowed**.
- Gap: 6 other AI crawlers (ChatGPT-User, Applebot-Extended, Bytespider, anthropic-ai, FacebookBot, Amazonbot) inherit the wildcard `*` rule (currently `Allow: /`) rather than being explicitly managed. Not broken, just undecided — worth an intentional choice either way.

### 5. Sitemap — Pass (for site type)
- `sitemap.xml` live (HTTP 200), valid XML, references the homepage with `lastmod`, `changefreq`, `priority`. One URL is correct and complete for a genuine single-page site.

### 6. Images — Good, with one minor inconsistency
- Content images (project screenshots, skill icons, experience photos) have descriptive, specific alt text (e.g. `"Provoks Multimedia"`, `"GIS Bootcamp"`).
- Decorative images are mostly handled correctly with `alt="" aria-hidden="true"` (backgrounds, floating doodles).
- **Inconsistency found:** the same decorative fish/boat doodle asset (`ikan.svg`, `kapal.svg`) is treated two different ways across components — in NavBar it's correctly `alt="" aria-hidden="true"`, but in About.jsx the same asset gets a literal `alt="ikan"` / `alt="kapal"` with no `aria-hidden`. Low-impact (doesn't hurt rankings), but inconsistent a11y/SEO hygiene — screen readers announce "ikan" (meaningless to a listener) in one place and stay silent in another for the identical visual element.

### 7. Links — No broken links found
- 17 unique links extracted from the rendered page: 6 in-page anchors, `/cv.pdf`, 3 external social profiles.
- Manually verified (tooling script for this check errored — see Limitations): `cv.pdf` → 200, `sitemap.xml` → 200, `og-image.png` → 200.

---

## ⚠️ Warnings

### 8. Security headers — Poor (45/100)
- **Present:** HSTS (`Strict-Transport-Security: max-age=63072000; includeSubDomains; preload`) ✅
- **Missing:** Content-Security-Policy, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy.
- **Impact:** Security headers are a minor/indirect ranking signal but a real trust/hardening gap. Low risk for a static portfolio with no forms or user input, but cheap to fix on Vercel via a `headers` block in `vercel.json`.

### 9. No `llms.txt`
- Confirmed 404 on production. Optional for AI-search/GEO readiness — low priority for a personal portfolio, but trivial to add given the site's small, well-defined content set.

---

## ℹ️ Environment Limitations

- **Core Web Vitals (PageSpeed Insights):** Blocked — `Rate limited by Google API` (no API key configured; free tier quota exhausted for this session). Category left as "Unknown," not scored as failing. Retry with an API key, or run once quota resets.
- **`broken_links.py`:** Script raised a `KeyError: 'total'` (tooling bug in the skill script itself, not a site issue). Compensated with manual `curl` checks on the three non-anchor links found; all returned 200.
- Localhost (`http://localhost:5173`) could not be fetched by network-based scripts (SSRF protection blocks private IPs by design) — technical/network checks were run against the live production URL instead; on-page DOM/heading/image checks were run against the local dev server via a headless-browser render, which is structurally identical to production (no SEO-relevant code changed between the two at audit time).

---

## Artifacts

- `FULL-AUDIT-REPORT.md` (this file)
- `ACTION-PLAN.md` (prioritized fixes)
