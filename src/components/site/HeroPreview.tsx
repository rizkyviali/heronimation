"use client";

import dynamic from "next/dynamic";
import type { HeroVariant } from "@/lib/registry";

const heroComponents = {
  "hacker-button": dynamic(() => import("@/components/heroes/HackerButton")),
  centered: dynamic(() => import("@/components/heroes/CenteredHero")),
  split: dynamic(() => import("@/components/heroes/SplitHero")),
  ticker: dynamic(() => import("@/components/heroes/TickerHero")),
  watermark: dynamic(() => import("@/components/heroes/WatermarkHero")),
  commerce: dynamic(() => import("@/components/heroes/CommerceHero")),
  article: dynamic(() => import("@/components/heroes/ArticleHero")),
  portfolio: dynamic(() => import("@/components/heroes/PortfolioHero")),
  "split-showcase": dynamic(
    () => import("@/components/heroes/SplitShowcaseHero"),
  ),
  collage: dynamic(() => import("@/components/heroes/CollageHero")),
  "image-trail": dynamic(() => import("@/components/heroes/ImageTrailHero")),
} as const;

type HeroSlug = keyof typeof heroComponents;

interface HeroPreviewProps {
  variant: HeroVariant;
}

export default function HeroPreview({ variant }: HeroPreviewProps) {
  const Component = heroComponents[variant.slug as HeroSlug];

  if (!Component)
    return (
      <div className="flex h-64 items-center justify-center text-zinc-500">
        Component not found
      </div>
    );

  return (
    <div className="overflow-hidden rounded-xl border border-zinc-800">
      {/* @ts-expect-error — defaultProps shape matches each component */}
      <Component {...variant.defaultProps} />
    </div>
  );
}
