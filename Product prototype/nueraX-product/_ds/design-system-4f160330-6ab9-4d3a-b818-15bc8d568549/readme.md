# NueraX Design System

NueraX is an AI study companion for Indian competitive-exam aspirants (**NEET** — medical, and **JEE** — engineering). Tagline: "Your NEET/JEE Rank. Simplified." Product narrative: *where am I now → what to focus today → path to potential rank*. The AI mentor persona is **Arjun AI** — a friendly, encouraging study buddy who reviews mock tests, flags weak topics, builds adaptive study plans, and answers doubts in chat.

## Sources
This system was built from a mounted reference codebase: `NueraX design system/` (local folder, read-only), containing a working DC-based reference (`index.dc.html`, `Foundations.dc.html`, `Components.dc.html`, `Patterns.dc.html`, `ArjunAI.dc.html`, `CLAUDE.md`), plus brand assets (`assets/nuerax-logo.png`, `assets/nuerax-mark.png`, `assets/arjun-avatar.jpg`) and product screenshots (`screenshots/chat.png`, `charts.png`, `modules.png`). No Figma or GitHub links were provided. Treat the mounted folder as ground truth for all values below — copy exact numbers, never round to a framework default.

## Index
- `styles.css` — root stylesheet, imports everything under `tokens/`
- `tokens/colors.css`, `tokens/typography.css`, `tokens/effects.css` — design tokens
- `assets/` — logo lockup, butterfly mark, Arjun AI avatar
- `guidelines/` — foundation specimen cards (Brand, Colors, Type, Spacing, Icons, A11y)
- `components/` — reusable primitives: `buttons/`, `forms/`, `surfaces/` (cards, stats), `feedback/` (badge, tag), `data-viz/` (line + donut chart), `chat/` (chat bubble, avatar)
- `ui_kits/student-app/` — the NueraX Student App: dashboard shell, Arjun AI doubt-solver chat, onboarding flow
- `SKILL.md` — Claude-Code-compatible skill wrapper

## Content fundamentals
- **Voice**: warm, encouraging mentor — never clinical or corporate. Arjun speaks in first person as a study buddy ("Let's break it down", "Great question!", "I front-loaded Physics today — it's your biggest rank lever this week. 💪").
- **Address**: second person ("Your NEET/JEE Rank", "You're improving steadily"). Greetings are personalized and time-aware: "Good evening, Arjun 👋".
- **Casing**: sentence case for UI copy and headings ("Master concepts", "Build confidence"); titles are short, punchy, benefit-led rather than feature-led.
- **Numbers over adjectives**: copy leans on concrete stats and deltas ("78% accuracy", "+310 rank impact", "12-day streak") rather than vague praise.
- **Emoji**: used sparingly and only in warm/casual/celebratory moments — waving hand, party popper, fire streak, flexed bicep (👋🎉🔥💪) — never in UI chrome, labels, or buttons. Never used to replace an icon.
- **Empty states never dead-end**: every empty view pairs a plain-language line with one clear next action ("Upload your first mock and Arjun will turn it into a personalized plan in ~30 seconds" → *Upload mock test*).
- **Errors are reassuring, not alarming**: "This one's on us — try again in a moment."
- **Tone examples**: "Here's a nudge, not the answer 🙂" · "You're above 70% mastery everywhere. Keep the streak alive with a fresh challenge." · "Master Concepts. Build Confidence. Improve Rank."

## Visual foundations
- **Palette**: light-first UI on a cool slate-50 background (`#F8FAFC`) with a full dark theme (`data-theme="dark"`, near-black navy `#0A0F1E`) toggled via a header button and persisted to `localStorage('nuerax-theme')`. Brand accents are a saturated purple/violet/blue/cyan/pink/green/orange set — used as single-color tints, never blended within one element except the signature gradient.
- **Signature gradient**: `linear-gradient(135deg,#6366F1 0%,#A855F7 50%,#EC4899 100%)` — reserved for primary CTAs, the "X" in the wordmark, active nav states, hero rings, and rank-impact moments. Never placed behind body text. Secondary approved gradients: Blue→Cyan, Purple→Blue, Pink→Orange, used for chart fills and thin accent bars.
- **Type**: Poppins (display/headings, 400–700) paired with Inter (body/UI, 400–700). Headings are tight-tracked (`-0.02em` to `-0.03em`) and bold; body text is relaxed at 1.55–1.6 line-height.
- **Spacing**: 4px base scale — 4/8/12/16/24/32/48/64 — generous, airy padding (cards typically 24–28px).
- **Radius**: 8 (sm, inputs/small chips) · 12 (md, buttons) · 16 (lg, most cards) · 20 (xl, section panels/hero cards) · 999 (pill, badges/switches). Nothing is sharp-cornered.
- **Elevation**: three soft, low-opacity shadow tiers (sm/md/lg) — no hard drop shadows, no borders-as-shadows. Cards combine a 1px `--border` hairline *with* `--shadow-sm` (never one or the other alone).
- **Cards**: white/near-black surface, 1px border in `--border`, `shadow-sm` at rest, `shadow-md` + `translateY(-3px/-4px)` lift on hover — used consistently for stat cards, foundation panels, chat, onboarding phone frames.
- **Backgrounds**: mostly flat surface colors; no photography or full-bleed imagery in the product UI itself. The only decorative background moves are soft blurred radial-gradient glows behind hero art and a very light gradient wash behind celebratory empty states.
- **Motion**: purposeful and quick, never bouncy — 120ms (fast, micro-interactions) / 200ms (base, most transitions) / 300ms (slow, larger layout shifts), `cubic-bezier(.4,0,.2,1)` easing throughout. Entrances use a small fade-up (`translateY(14px)→0`, opacity 0→1). A slow (5s) gentle float animates the hero mark; a conic-gradient ring spins slowly (8s) around Arjun's avatar to signal "AI".
- **Hover states**: buttons brighten slightly (`filter:brightness(1.06)`) and lift 1px with a stronger shadow; ghost/secondary buttons gain a faint tinted background wash (`rgba(99,102,241,.08)`); nav items get a flat `--surface-2` fill.
- **Press states**: buttons shift down 1px and dim slightly (`brightness(.96)`) — no scale/shrink effect.
- **Borders**: hairline 1px `--border` almost everywhere; `--border-strong` (1.5–2px) reserved for focused/selected form controls and the signature dashed upload dropzone.
- **Focus ring**: always-visible 3px ring in `--ring` (a translucent brand purple) with a surface-colored 3px offset — never remove `:focus-visible`.
- **Transparency/blur**: the sticky header uses `color-mix(surface 82%, transparent)` + `backdrop-filter: blur(12px)` — the only blur usage in the system. Disabled buttons drop to 45% opacity rather than changing color.
- **Imagery**: no product photography; the only photographic asset is Arjun's avatar (warm, friendly headshot), always circular, often ringed in the brand gradient or a spinning conic gradient.
- **Iconography style**: see below.
- **Layout**: persistent left sidebar (250px, collapsible to a 76px icon rail) + sticky top bar + scrollable content canvas is the core app shell; onboarding and chat are presented in true-to-device phone frames (46px outer radius, dark bezel).
- **Corner radii recap**: sm 8 / md 12 / lg 16 / xl 20 / pill 999 — see `radius.card.html`.

## Iconography
- Hand-drawn-in-code line icons (inline SVG paths), **24px grid, 1.8px stroke, rounded caps and joins** — no filled icon style, no icon font, no third-party icon set. Each glyph is tinted with exactly **one** brand color (never two brand colors mixed in a single icon).
- No emoji used as icon replacements in UI chrome; emoji appear only in copy/celebratory contexts (see Content fundamentals).
- Because the source icons are bespoke inline SVGs authored per-glyph (not a swappable icon font/sprite set), there is nothing to extract into `assets/` — reuse the exact `<path>` markup shown in `guidelines/icons.card.html` and the components rather than redrawing new glyphs from scratch.
- The only non-vector image assets are the logo lockup, the butterfly mark, and Arjun's avatar photo (all in `assets/`).

## Logo
`assets/nuerax-logo.png` is the primary lockup (wordmark: "nuera" in `--ink`/white + gradient "X"). `assets/nuerax-mark.png` is the butterfly symbol alone, used below 32px and as an app icon / favicon source (ship at 512/192/180/144/96/32/16). Minimum clear space equals the height of one wing; minimum width 120px digital / 24mm print. Never stretch, rotate, recolor, or add shadows/outlines to the mark.

## Components
`buttons/Button` · `forms/Input`, `forms/Select`, `forms/Switch`, `forms/Checkbox`, `forms/Radio` · `surfaces/Card`, `surfaces/StatCard` (same file) · `feedback/Badge`, `feedback/Tag` · `data-viz/LineChart`, `data-viz/DonutChart` · `chat/ChatBubble`, `chat/Avatar` (same file)

## Intentional additions
None — every component below has a direct counterpart in the reference system (buttons, inputs/select/switch/checkbox/radio, cards/stat cards, badges/tags, line+donut charts, chat bubbles, Arjun avatar). No component families were invented.

## Caveats
- Fonts are loaded from Google Fonts (`@import` in `tokens/typography.css`) rather than self-hosted binaries — Poppins and Inter are already the correct fonts per the source `CLAUDE.md`, so no substitution was needed, but if you need fully offline/self-hosted fonts, say so and I'll fetch and vendor the `.woff2` files.
- Icons are inline SVG per the source pattern (not a font/sprite); if you'd prefer a swappable icon set, flag it.
