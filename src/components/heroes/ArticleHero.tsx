"use client";

import { motion } from "framer-motion";

export interface ArticleHeroProps {
  thumbnail: string;
  thumbnailAlt?: string;
  tags?: string[];
  title: string;
  excerpt?: string;
  author: { name: string; avatar?: string };
  date: string;
  readingTime?: number;
  ctaText?: string;
  ctaHref?: string;
}

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: "easeOut" as const },
});

export default function ArticleHero({
  thumbnail,
  thumbnailAlt = "",
  tags = [],
  title,
  excerpt,
  author,
  date,
  readingTime,
  ctaText = "Read Article",
  ctaHref = "#",
}: ArticleHeroProps) {
  return (
    <section className="relative flex min-h-screen flex-col justify-end overflow-hidden bg-zinc-950">
      {/* Full-bleed background image */}
      <img
        src={thumbnail}
        alt={thumbnailAlt}
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/10" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />

      {/* Top metadata row */}
      <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-8 py-6">
        <motion.div {...fadeUp(0)} className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm"
            >
              {tag}
            </span>
          ))}
        </motion.div>
        {readingTime && (
          <motion.span
            {...fadeUp(0.1)}
            className="text-xs font-medium text-white/60 tabular-nums"
          >
            {readingTime} min read
          </motion.span>
        )}
      </div>

      {/* Main content — anchored to the bottom */}
      <div className="relative z-10 px-8 pb-10 pt-48">
        <motion.h1
          {...fadeUp(0.15)}
          className="mb-5 max-w-4xl text-4xl font-black leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl xl:text-7xl"
        >
          {title}
        </motion.h1>

        {excerpt && (
          <motion.p
            {...fadeUp(0.25)}
            className="mb-8 max-w-2xl text-base leading-relaxed text-white/60 sm:text-lg"
          >
            {excerpt}
          </motion.p>
        )}

        <motion.div
          {...fadeUp(0.35)}
          className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between"
        >
          {/* Author */}
          <div className="flex items-center gap-3">
            {author.avatar ? (
              <img
                src={author.avatar}
                alt={author.name}
                className="h-10 w-10 rounded-full object-cover ring-2 ring-white/20"
              />
            ) : (
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-sm font-bold text-white ring-2 ring-white/20">
                {author.name.charAt(0)}
              </div>
            )}
            <div>
              <p className="text-sm font-semibold text-white">{author.name}</p>
              <p className="text-xs text-white/50">{date}</p>
            </div>
          </div>

          {/* CTA */}
          <a
            href={ctaHref}
            className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-bold text-zinc-900 transition-opacity hover:opacity-80 self-start sm:self-auto"
          >
            {ctaText}
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              strokeWidth={2.5}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
