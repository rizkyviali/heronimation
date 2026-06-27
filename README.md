# Heronimation

Animated hero sections and components extracted from real projects. Copy a source file into your project and adapt it to your stack.

## What it is

A source-only component library of hero sections I've actually shipped. Heronimation is not meant to be installed as a runtime package: preview a variant, copy the TSX file, then keep or replace its listed requirements. The live preview lives at [dev.rizkyviali.com/heronimation](https://dev.rizkyviali.com/heronimation).

## Variants

| Slug | Description |
|---|---|
| `centered` | Simple centered hero for one message and one or two CTAs |
| `split` | Two-column hero for copy beside a product image or brand asset |
| `ticker` | Bold launch or portfolio hero with a scrolling terms strip |
| `watermark` | High-impact hero with a large background word and proof points |
| `commerce` | Sales-focused hero with proof, value points, urgency, and trust signals |
| `portfolio` | Creative portfolio hero with a scrolling skill marquee |
| `split-showcase` | Personal profile hero with availability and cycling highlight cards |
| `collage` | Editorial or product hero with a four-card media/stat collage |
| `image-trail` | Interactive visual hero where images follow the cursor path |
| `article` | Magazine-style article header with full-bleed imagery and metadata |
| `hacker-button` | Text button that scrambles on hover without Framer Motion |

## Requirements

Each variant lists its exact requirements in `src/lib/registry.ts`. Most hero sections expect:

- React 19+
- Tailwind CSS v4
- Framer Motion v12

Some demos also reference local image paths or project-specific font classes such as `font-themadi`. Replace those with assets and fonts from your own app.

## Usage

1. Pick a variant in the live preview.
2. Check its requirements and props in `src/lib/registry.ts`.
3. Copy `src/components/heroes/YourHero.tsx` into your project.
4. Replace demo assets, fonts, and copy with your own.

## Adding a variant

1. Create `src/components/heroes/YourHero.tsx` — self-contained, no internal imports.
2. Add an entry to `src/lib/registry.ts`.

The showcase site (`packages/web`) imports both from this package, so a new variant shows up there automatically once it's registered.
