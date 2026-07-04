# SEO Action Plan — porto-fathur.vercel.app

Prioritized by impact. See `FULL-AUDIT-REPORT.md` for full evidence per item.

---

## 🔴 Do first (Critical)

### 1. Add a real `<h1>` and fix heading hierarchy
- **Where:** Hero section renders "Porto Folio" as `<img src="/teks-porto.svg">` only — no text heading anywhere backs the page's identity. About/Skills/Experience/Projects section titles are also images-only.
- **Fix:** Add one visually-hidden `<h1>` in the Hero section, e.g.:
  ```jsx
  <h1 className="sr-only">Agus Fathurrahman Rifai — UI/UX Designer & Frontend Developer</h1>
  ```
  Then add a matching visually-hidden (or styled) `<h2>` next to each section's decorative title image (About, Skills, Experience, Projects) so the hierarchy becomes H1 → H2 (sections) → H3 (already-correct project card titles).
- **Effort:** Low (one line per section, `sr-only` utility already available via Tailwind).
- **Impact:** High — this is the single most consequential on-page SEO gap found.

---

## ⚠️ Do soon (Warnings)

### 2. Add missing security headers
- **Where:** Vercel deployment config.
- **Fix:** Add a `headers` block to `vercel.json`:
  ```json
  {
    "headers": [
      {
        "source": "/(.*)",
        "headers": [
          { "key": "X-Frame-Options", "value": "SAMEORIGIN" },
          { "key": "X-Content-Type-Options", "value": "nosniff" },
          { "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" },
          { "key": "Permissions-Policy", "value": "camera=(), microphone=(), geolocation=()" }
        ]
      }
    ]
  }
  ```
  CSP was left out of this snippet since it needs to be tailored to the site's actual script/style/image origins (Google Fonts, Vercel, self-hosted assets) to avoid breaking the page — worth a dedicated pass rather than a copy-paste value.
- **Effort:** Low–Medium (CSP needs testing against the real asset list).
- **Impact:** Medium (security/trust hardening, minor indirect ranking signal).

### 3. Fix inconsistent alt/aria-hidden treatment on decorative doodles
- **Where:** `src/components/About.jsx` — `ikan.svg` / `kapal.svg` images use `alt="ikan"` / `alt="kapal"` with no `aria-hidden`, while the same assets in `NavBar.jsx` correctly use `alt="" aria-hidden="true"`.
- **Fix:** Match the NavBar treatment in About.jsx for these purely decorative doodles: `alt="" aria-hidden="true"`.
- **Effort:** Trivial (attribute change on ~4 `<img>` tags).
- **Impact:** Low (a11y hygiene, negligible direct SEO effect).

### 4. Decide AI crawler policy for the remaining 6 bots
- **Where:** `public/robots.txt`.
- **Fix:** Explicitly add rules for `ChatGPT-User`, `Applebot-Extended`, `Bytespider`, `anthropic-ai`, `FacebookBot`, `Amazonbot` — either block them alongside GPTBot/ClaudeBot/CCBot for consistency, or explicitly allow them like PerplexityBot. Currently they silently inherit the wildcard `Allow: /`.
- **Effort:** Trivial (a few lines in robots.txt).
- **Impact:** Low–Medium depending on the user's actual preference on AI training/crawling.

---

## ℹ️ Nice to have (Low priority)

### 5. Add `llms.txt`
- **Where:** `public/llms.txt` (new file).
- **Fix:** Add a short llms.txt summarizing the site's purpose/content for AI answer engines, per the emerging convention.
- **Effort:** Low.
- **Impact:** Low (early-stage/optional standard, but cheap given the site's small scope).

### 6. Add `og:image:width` / `og:image:height`
- **Where:** `index.html`.
- **Fix:** Add `<meta property="og:image:width" content="1200" />` and `<meta property="og:image:height" content="630" />` (confirm `og-image.png`'s actual dimensions first and adjust values, or crop to that ratio if it isn't already).
- **Effort:** Trivial.
- **Impact:** Low (minor social-preview rendering reliability).

### 7. Add `WebSite` schema (optional)
- **Where:** `index.html`, alongside the existing `Person` JSON-LD.
- **Fix:** Add a `WebSite` schema block; skip `SearchAction` since the site has no internal search.
- **Effort:** Low.
- **Impact:** Low for a single-page personal portfolio.

---

## Not actionable right now

- **Core Web Vitals:** Could not be measured this session (PageSpeed API rate-limited without a key). Re-run `python3 <SEO_SKILL_DIR>/scripts/pagespeed.py https://porto-fathur.vercel.app/ --strategy mobile` later, or supply an API key.
- **Sitemap scope:** Single URL is correct as-is; no action needed unless the site grows beyond one page (e.g., individual project detail pages).

---

**Reminder:** Per instruction, none of these fixes have been applied or pushed yet — this is the plan for review before any code changes are made.
