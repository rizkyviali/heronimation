"use client";

import { motion } from "framer-motion";

export interface SplitHeroProps {
  title: string;
  subtitle?: string;
  description?: string;
  image: string;
  imageAlt?: string;
  spinImage?: boolean;
  imagePosition?: "left" | "right";
  primaryButton?: { text: string; href: string };
  secondaryButton?: { text: string; href: string };
}

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.14 } },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" as const } },
};

const imageAnim = {
  hidden: { opacity: 0, scale: 0.92 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.7, ease: "easeOut" as const } },
};

export default function SplitHero({
  title,
  subtitle,
  description,
  image,
  imageAlt = "",
  spinImage = false,
  imagePosition = "right",
  primaryButton,
  secondaryButton,
}: SplitHeroProps) {
  const textCol = (
    <motion.div
      className="flex flex-col justify-center gap-6"
      variants={container}
      initial="hidden"
      animate="show"
    >
      {subtitle && (
        <motion.p variants={item} className="text-sm font-semibold uppercase tracking-widest text-zinc-500">
          {subtitle}
        </motion.p>
      )}
      <motion.h1 variants={item} className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
        {title}
      </motion.h1>
      {description && (
        <motion.p variants={item} className="max-w-md text-base leading-relaxed text-zinc-500">
          {description}
        </motion.p>
      )}
      {(primaryButton || secondaryButton) && (
        <motion.div variants={item} className="flex flex-wrap gap-3">
          {primaryButton && (
            <a href={primaryButton.href} className="rounded-full bg-lime-400 px-7 py-3 text-sm font-semibold text-zinc-900 transition-opacity hover:opacity-80">
              {primaryButton.text}
            </a>
          )}
          {secondaryButton && (
            <a href={secondaryButton.href} className="rounded-full border border-zinc-700 px-7 py-3 text-sm font-semibold transition-colors hover:border-zinc-500">
              {secondaryButton.text}
            </a>
          )}
        </motion.div>
      )}
    </motion.div>
  );

  const imageCol = (
    <motion.div
      className="flex items-center justify-center"
      variants={imageAnim}
      initial="hidden"
      animate="show"
    >
      <img
        src={image}
        alt={imageAlt}
        className={`max-w-sm w-full rounded-2xl object-cover ${spinImage ? "animate-spin-slow" : ""}`}
      />
    </motion.div>
  );

  return (
    <section className="flex min-h-screen items-center bg-zinc-950 text-white">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 lg:grid-cols-2">
        {imagePosition === "left" ? (
          <>{imageCol}{textCol}</>
        ) : (
          <>{textCol}{imageCol}</>
        )}
      </div>
    </section>
  );
}
