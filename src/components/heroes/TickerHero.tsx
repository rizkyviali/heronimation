"use client";

import { motion } from "framer-motion";

export interface TickerItem {
  label: string;
}

export interface TickerHeroProps {
  title: string;
  tagline?: string;
  description?: string;
  ticker: TickerItem[];
  primaryButton?: { text: string; href: string };
  secondaryButton?: { text: string; href: string };
}

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.13 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

function TickerTrack({ items }: { items: TickerItem[] }) {
  const doubled = [...items, ...items];
  return (
    <div className="overflow-hidden w-full [mask-image:_linear-gradient(to_right,transparent_0,_black_80px,_black_calc(100%-80px),transparent_100%)]">
      <div className="flex animate-ticker whitespace-nowrap">
        {doubled.map((t, i) => (
          <span
            key={i}
            className="mx-6 flex-shrink-0 text-sm font-medium text-zinc-500 uppercase tracking-widest"
          >
            {t.label}
            <span className="ml-6 text-lime-400">·</span>
          </span>
        ))}
      </div>
    </div>
  );
}

export default function TickerHero({
  title,
  tagline,
  description,
  ticker,
  primaryButton,
  secondaryButton,
}: TickerHeroProps) {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center gap-10 bg-zinc-950 text-white py-20">
      <div className="absolute top-10 w-full">
        <TickerTrack items={ticker} />
      </div>

      <motion.div
        className="mx-auto max-w-4xl px-4 text-center"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {tagline && (
          <motion.p
            variants={item}
            className="mb-4 text-sm font-semibold uppercase tracking-widest text-lime-400"
          >
            {tagline}
          </motion.p>
        )}

        <motion.h1
          variants={item}
          className="mb-6 text-4xl font-black uppercase leading-none tracking-tight sm:text-6xl lg:text-8xl"
        >
          {title}
        </motion.h1>

        {description && (
          <motion.p
            variants={item}
            className="mx-auto mb-10 max-w-xl text-base leading-relaxed text-zinc-400"
          >
            {description}
          </motion.p>
        )}

        {(primaryButton || secondaryButton) && (
          <motion.div
            variants={item}
            className="flex flex-col gap-3 sm:flex-row sm:justify-center"
          >
            {primaryButton && (
              <a
                href={primaryButton.href}
                className="rounded-full bg-lime-400 px-8 py-3 text-sm font-bold text-zinc-900 transition-opacity hover:opacity-80"
              >
                {primaryButton.text}
              </a>
            )}
            {secondaryButton && (
              <a
                href={secondaryButton.href}
                className="rounded-full border border-zinc-700 px-8 py-3 text-sm font-semibold transition-colors hover:border-zinc-400"
              >
                {secondaryButton.text}
              </a>
            )}
          </motion.div>
        )}
      </motion.div>
    </section>
  );
}
