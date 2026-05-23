# Heronimation

Animated hero sections extracted from real projects. Browse a variant, preview it live, and copy the code — no install needed.

## What it is

A personal component library of hero sections I've actually shipped. Each variant is a self-contained file: drop it into any Next.js + Tailwind + Framer Motion project and it works.

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

## Stack

- Next.js 16 (App Router)
- Tailwind CSS v4
- Framer Motion v12
- TypeScript

## Running locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Adding a variant

1. Create `src/components/heroes/YourHero.tsx` — self-contained, no internal imports
2. Add an entry to `src/lib/registry.ts`
3. Add a dynamic import to `src/components/site/HeroPreview.tsx`

The variant page at `src/app/[variant]/page.tsx` reads the source file directly and displays it as copyable code.
