"use client";

import { motion } from "framer-motion";

export interface CenteredHeroProps {
  badge?: string;
  title: string;
  subtitle?: string;
  description?: string;
  primaryButton?: { text: string; href: string };
  secondaryButton?: { text: string; href: string };
  theme?: "light" | "dark" | "stone";
}

const themes = {
  light: "bg-white text-zinc-900",
  dark: "bg-zinc-950 text-white",
  stone: "bg-gradient-to-br from-stone-50 to-stone-100 text-stone-900",
};

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

export default function CenteredHero({
  badge,
  title,
  subtitle,
  description,
  primaryButton,
  secondaryButton,
  theme = "stone",
}: CenteredHeroProps) {
  return (
    <section className={`${themes[theme]} flex min-h-screen items-center justify-center py-20`}>
      <motion.div
        className="mx-auto max-w-4xl px-4 text-center"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {badge && (
          <motion.span
            variants={item}
            className="mb-6 inline-block rounded-full border border-current px-4 py-1 text-sm font-medium opacity-60"
          >
            {badge}
          </motion.span>
        )}

        <motion.h1
          variants={item}
          className="mb-4 text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl"
        >
          {title}
        </motion.h1>

        {subtitle && (
          <motion.p variants={item} className="mb-4 text-xl opacity-70 sm:text-2xl">
            {subtitle}
          </motion.p>
        )}

        {description && (
          <motion.p
            variants={item}
            className="mx-auto mb-10 max-w-2xl text-base leading-relaxed opacity-50"
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
                className="rounded-full bg-zinc-900 px-8 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-80"
              >
                {primaryButton.text}
              </a>
            )}
            {secondaryButton && (
              <a
                href={secondaryButton.href}
                className="rounded-full border border-current px-8 py-3 text-sm font-semibold transition-opacity hover:opacity-60"
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
