# NueraX Design System — binding visual reference

This project defines the **NueraX** design system (AI study companion for NEET/JEE). All visuals in this project must follow it. Live reference pages: `index.dc.html`, `Foundations.dc.html`, `Components.dc.html`, `Patterns.dc.html`, `ArjunAI.dc.html`.

## Fonts
- **Poppins** — display & headings (400/500/600/700)
- **Inter** — body & UI (400/500/600/700)
- Load: `https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&family=Inter:wght@400;500;600;700&display=swap`

## Color tokens (CSS custom properties)
Light (`:root`) / Dark (`[data-theme="dark"]`):
```
--bg:#F8FAFC / #0A0F1E        --surface:#FFFFFF / #111A2E
--surface-2:#F1F5F9 / #182238 --surface-3:#E9EEF5 / #1E293B
--border:#E2E8F0 / #22304A    --border-strong:#CBD5E1 / #33425F
--ink:#0F172A / #F1F5F9       --text:#334155 / #CBD5E1
--muted:#64748B / #94A3B8     --faint:#94A3B8 / #64748B
```
Brand (theme-independent): `--purple:#6366F1  --purple-2:#885CF6  --violet:#7C3AED  --blue:#06B6D4  --cyan:#22D3EE  --pink:#EC4899  --green:#10B981  --orange:#F59E0B`

## Gradient (CTA signature — always on primary buttons)
`--grad: linear-gradient(135deg,#6366F1 0%,#A855F7 50%,#EC4899 100%)`
Other approved gradients: Blue→Cyan, Purple→Blue, Pink→Orange.

## Tokens
- **Spacing** 4px base: 4 8 12 16 24 32 48 64. Generous spacing.
- **Radius** 8 sm / 12 md / 16 lg / 20 xl / 999 pill
- **Elevation** sm `0 1px 2px rgba(15,23,42,.06)` · md `0 6px 20px rgba(15,23,42,.08)` · lg `0 18px 50px rgba(15,23,42,.14)`
- **Motion** fast 120ms / base 200ms / slow 300ms · ease `cubic-bezier(.4,0,.2,1)`
- **Focus ring** `--ring` 3px, surface-colored offset; never remove `:focus-visible`.

## Iconography
Modern line icons, 24px grid, **1.8px stroke**, rounded caps/joins. Tint each glyph with a single brand color — never mix two brand colors in one icon. No emoji in UI chrome (streak/mood emoji in playful content only).

## Rules
- CTAs use `--grad`. Secondary = 1.5px purple border; ghost = transparent; icon buttons ≥44×44.
- Accessibility: WCAG AA (body ≥4.5:1, large/UI ≥3:1). Ink text on pink/cyan/green/orange fills. Label every icon button.
- Light + dark mode via `data-theme`, persisted in `localStorage('nuerax-theme')`.
- Mobile-first, fully responsive. Minimalistic & modern.
- Arjun AI avatar: `assets/arjun-avatar.jpg`. Logo: `assets/nuerax-logo.png` (lockup) / `assets/nuerax-mark.png` (butterfly symbol). Wordmark: "nuera" in ink + gradient "X".
- Tagline: "Your NEET/JEE Rank. Simplified." Product narrative: where am I now → what to focus today → path to potential rank.
