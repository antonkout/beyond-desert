# Beyond the Desert — Exhibition Website

Companion site for the temporary exhibition *Beyond the Desert: Stones of people and discoveries*, hosted at Biblioteca Salaborsa, Bologna (13 July – 1 August 2026), in occasion of the 59th Seminar for Arabian Studies.

## Stack

- **Next.js 14** (App Router, static export)
- **TypeScript** + **Tailwind CSS**
- **next-intl** for trilingual content (EN → IT → AR)
- **MapLibre GL JS** for the interactive GIS map (no API token needed)
- **`<model-viewer>`** web component for 3D + AR
- **Framer Motion** for tasteful section transitions

## Why these choices

| Priority | Choice | Why |
|---|---|---|
| Multilingual | `next-intl` with route-based locales (`/en`, `/it`, `/ar`) | RTL works out-of-box; JSON files easy to hand to translators |
| GIS map | MapLibre + OpenStreetMap raster tiles | Free, no vendor lock-in, archaeological-site pins via GeoJSON |
| 3D viewer | `<model-viewer>` | Native AR on iOS/Android, accessible keyboard controls, no Three.js boilerplate |
| One-time site | Static export (`output: 'export'`) | Deploy anywhere, no server costs, fast |

## Brand tokens

From `Brand_identity2.pdf`:

| Token | Hex | Use |
|---|---|---|
| `desert-sand` | `#E7D6B9` | backgrounds, light surfaces |
| `petroleum-blue` | `#1F3F4D` | primary text, hero bg |
| `deep-basalt` | `#163039` | dark surfaces, footer |
| `unibo-red` | `#A32D2D` | accents, CTAs |

Fonts: **Outfit ExtraBold** (display) · **IBM Plex Sans** (body) · **Noto Sans Arabic** (AR).

## Setup

```bash
npm install
npm run dev          # localhost:3000
npm run build        # static export → /out
```

## Roadmap

- [x] Project skeleton + brand tokens
- [x] Homepage hero
- [x] Site shell + nav + footer
- [ ] Geography page with MapLibre + GeoJSON of mission sites
- [ ] History timeline (Bronze → Iron → Pre-Islamic)
- [ ] Research / UniBo missions pages
- [ ] 3D archive page (placeholders until GLB files arrive)
- [ ] Oral history audio player + transcripts
- [ ] Italian translation (JSON)
- [ ] Arabic translation + RTL pass
- [ ] DNS + hosting handoff

## Content provenance

- Panel texts: `Oltre_il_deserto__storie_di_civilta_.docx`
- Site structure: `Website_structure.docx`
- Brand guide: `Brand_identity2.pdf`
- Museum-panel accessibility rules: `Approfondimenti-per-la-redazione-di-didascalie-e-pannelli.pdf` (applied to font sizes, contrast, audio readings)
