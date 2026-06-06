# Heronimation

Animated hero sections and components extracted from real projects. Copy a file into your project and go — no install, no build step.

## What it is

A source-only component library of hero sections I've actually shipped. Each variant is a self-contained file: drop it into any React + Tailwind + Framer Motion project and it works. There's no demo app in this repo — the live preview lives at [dev.rizkyviali.com/heronimation](https://dev.rizkyviali.com/heronimation).

## Variants

| Slug | Description |
|---|---|
| `centered` | Clean centered layout with title, subtitle, and CTA buttons |
| `split` | Two-column layout with text and image, optional spin animation |
| `ticker` | Scrolling marquee strip with bold centered content below |
| `watermark` | Giant blurred background text with centered content and stats |
| `commerce` | Conversion-optimized with social proof, value points, and trust signals |
| `portfolio` | Scrolling tag marquee + asymmetric headline/tagline layout |
| `split-showcase` | Split: identity left, auto-cycling metric cards right |
| `collage` | Headline + 4-card photo/stat collage with fan-spread hover |
| `image-trail` | Images spawn along the cursor trail as you move across the section |
| `article` | Full-screen magazine cover with full-bleed image and overlaid headline |
| `hacker-button` | Plain-text button that scrambles each letter on hover (no framer-motion) |

## Requirements

Each file expects these in the consuming project:

- React 19+
- Tailwind CSS v4
- Framer Motion v12 (except `hacker-button`, which is dependency-free)
- `next/font/google` for the display fonts (or swap for your own)

## Usage

1. Copy `src/components/heroes/YourHero.tsx` into your project.
2. Pass props as documented in `src/lib/registry.ts` (each variant lists its props and defaults).

## Adding a variant

1. Create `src/components/heroes/YourHero.tsx` — self-contained, no internal imports.
2. Add an entry to `src/lib/registry.ts`.

The showcase site (`packages/web`) imports both from this package, so a new variant shows up there automatically once it's registered.
