# ekRank website (ekrank.com)

Conversion-focused marketing site for the ekRank Teacher App, aimed at schools, coaching institutes and colleges.
Built from the Claude Design file **"ekRank Website - Home v11"** as plain HTML/CSS/JS — no build step, no framework.

## Run it locally

Use any static server from this folder (the product film needs `http://`, not `file://`):

```bash
npx serve .            # or
python -m http.server 8080
```

Then open http://localhost:8080 (or the port shown).

## What's in here

| Path | What it is |
|---|---|
| `index.html` | The home page (all sections) |
| `css/styles.css` | All styles — responsive breakpoints at 560 / 640 / 760 / 900 / 960 / 1000 / 1100px |
| `js/config.js` | **Settings you edit**: lead email, WhatsApp number, store links, optional webhook |
| `js/main.js` | Header/sticky CTA, "One school day" tabs, FAQ accordion, product film, demo form |
| `film.html` + `support.js`, `*.jsx`, `vendor/` | The 45-second animated product film (Claude Design runtime; React + Babel are self-hosted in `vendor/`, no CDN needed) |
| `assets/`, `screenshots/web/` | Logos, favicons, OG image, film music, app screenshots |
| `404.html`, `robots.txt`, `sitemap.xml`, `site.webmanifest` | Site basics |
| `vercel.json`, `netlify.toml` | Hosting config (caching + security headers) |
| `_design-source/` | Original design files, for reference only (not deployed on Vercel) |

## What works

- **Book-a-demo form** — validates institution, contact name and Indian mobile (10 digits, starts 6–9; accepts +91/0 prefix).
  On submit it: emails the lead via FormSubmit to `leadEmail`, optionally POSTs to `leadWebhook`, opens WhatsApp
  with the details pre-filled, fires a GTM `generate_lead` event, and shows a confirmation. Honeypot field blocks simple bots.
- **"One school day" tabs** — auto-advance every 6s with progress bars; stop on click; arrow-key navigation; pause off-screen; respect reduced-motion.
- **Product film** — plays inline over the hero screenshot and always starts from the beginning. It keeps playing while the visitor scrolls; the sound fades as it leaves the screen, and once it's fully out of view the music and voice-over fade out and it closes. Also closes on ✕ or Esc. At the end it holds on the pricing/demo end card.
- **FAQ accordion**, **sticky mobile CTA** (phones only, hides near the form), **header** that turns light on scroll.
- **Analytics** — GTM container `GTM-MKQQ5BG4`; every `[data-cta]` click pushes `cta_click`; also `video_start`, `faq_open`, `generate_lead`.
- SEO: title/description, canonical, Open Graph/Twitter cards, JSON-LD (Organization + SoftwareApplication), sitemap.

## Before going live — checklist

1. **Activate FormSubmit**: submit the form once; FormSubmit emails `hello@ekrank.com` an activation link. Click it. Until then leads only arrive via WhatsApp.
2. **App store links**: add `appStoreUrl` / `playStoreUrl` in `js/config.js` when the apps are published (they currently open the web app).
3. Confirm the GTM container has GA4 tags for `generate_lead` and `cta_click`.
4. Deploy: drag the folder into Netlify, or `vercel` from this folder, and point `ekrank.com` at it.
