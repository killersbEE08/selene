# Selene — Marketing & Legal Site

A fast, static, dependency-free site for the **Selene** app (AI Palm, Tarot & Horoscope).
Built to match the app's cosmic-purple brand and ready to deploy to **Cloudflare Pages**.

## Pages

| File | URL | Purpose |
|------|-----|---------|
| `index.html` | `/` | Landing page (hero, features, how-it-works, privacy, get-the-app) |
| `privacy.html` | `/privacy` | Privacy Policy |
| `terms.html` | `/terms` | Terms of Service |
| `delete-account.html` | `/delete-account` | Account & data deletion (required by Google Play) |

Shared: `styles.css` (brand system), `main.js` (mobile nav + scroll reveal), `assets/` (brand images copied from the app).
Config: `_headers` (security headers + caching), `_redirects` (clean URLs).

## Design

Brand tokens mirror `lib/core/theme.dart` from the Flutter app:

- Background `#0B0620` → `#2A0E5C`, primary `#8B3DFF`, glow `#B26BFF`, magenta `#FF3DAE`, gold `#FFC94D`
- Fonts: **Outfit** (headings) + **Poppins** (body) via Google Fonts
- Dark, minimalist, mobile-first; subtle starfield + floating orb; animated on-scroll reveals; fully responsive; honours `prefers-reduced-motion`.

## Deploy to Cloudflare Pages

This is a pure static site — **no build step**.

### Option A — Dashboard (drag & drop)
1. Go to Cloudflare Dashboard → **Workers & Pages** → **Create** → **Pages** → **Upload assets**.
2. Drag the entire `seleneweb` folder (or a zip of its contents).
3. Deploy. Your site is live at `https://<project>.pages.dev`.

### Option B — Git integration
1. Push this folder to a GitHub/GitLab repo.
2. Cloudflare Pages → **Connect to Git** → select the repo.
3. Build settings: **Framework preset:** None · **Build command:** *(leave empty)* · **Build output directory:** `/` (or the subfolder if the site isn't at repo root).
4. Save and deploy.

### Option C — Wrangler CLI
```bash
npm install -g wrangler
wrangler pages deploy . --project-name selene
```

### Custom domain
Pages → your project → **Custom domains** → add e.g. `selene.app` and follow the DNS steps.

## ⚠️ Before you go live — update placeholders

These are placeholders and **must be replaced** with real values:

- [x] **Contact email** — set to `hello@princelabs.me` in the footer and all legal pages (help, privacy & account-deletion requests).
- [x] **Developer name** — legal pages (privacy, terms, delete-account) identify the developer as **one1 Eleven dev** for Google Play.
- [ ] **Governing law** — Terms §13 uses **India**. Change if your business is established elsewhere.
- [ ] **"Last updated" dates** — set to your actual publish date in `privacy.html`, `terms.html`.
- [ ] **App store links** — the "Coming soon" badges on the landing page link to `#`. Point them at your real App Store / Google Play listings when live.
- [ ] **Google Play Data Safety** — use `https://<your-domain>/delete-account` as the account-deletion URL in the Play Console.

## Local preview

Any static server works, e.g.:
```bash
python -m http.server 8080
# then open http://localhost:8080
```
