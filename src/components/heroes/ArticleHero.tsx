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

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" as const } },
};

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
    <motion.article
      className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900"
      variants={container}
      initial="hidden"
      animate="show"
    >
      <motion.figure
        variants={item}
        className="relative aspect-[16/9] overflow-hidden"
      >
        <img
          src={thumbnail}
          alt={thumbnailAlt}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
      </motion.figure>

      <div className="flex flex-col gap-4 p-6">
        {tags.length > 0 && (
          <motion.div variants={item} className="flex flex-wrap gap-2">
            <span className="rounded-full bg-lime-400/10 px-3 py-1 text-xs font-semibold text-lime-400">
              Latest
            </span>
            {tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-zinc-800 px-3 py-1 text-xs font-medium text-zinc-400"
              >
                {tag}
              </span>
            ))}
          </motion.div>
        )}

        <motion.h1 variants={item} className="text-2xl font-bold leading-tight text-white md:text-3xl">
          {title}
        </motion.h1>

        {excerpt && (
          <motion.p variants={item} className="text-base leading-relaxed text-zinc-400">
            {excerpt}
          </motion.p>
        )}

        <motion.div variants={item} className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {author.avatar && (
              <img src={author.avatar} alt={author.name} className="h-8 w-8 rounded-full object-cover" />
            )}
            <div className="text-sm">
              <p className="font-medium text-zinc-200">{author.name}</p>
              <p className="text-zinc-500">{date}</p>
            </div>
          </div>
          {readingTime && (
            <span className="text-sm text-zinc-500">{readingTime} min read</span>
          )}
        </motion.div>

        <motion.div variants={item}>
          <a
            href={ctaHref}
            className="inline-block rounded-full bg-lime-400 px-6 py-2.5 text-sm font-bold text-zinc-900 transition-opacity hover:opacity-80"
          >
            {ctaText}
          </a>
        </motion.div>
      </div>
    </motion.article>
  );
}
