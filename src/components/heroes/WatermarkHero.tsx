"use client";

import { motion } from "framer-motion";

export interface Stat {
  value: string;
  label: string;
}

export interface WatermarkHeroProps {
  watermarkText: string;
  title: string;
  subtitle?: string;
  description?: string;
  stats?: Stat[];
  primaryButton?: { text: string; href: string };
  theme?: "light" | "dark";
}

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

export default function WatermarkHero({
  watermarkText,
  title,
  subtitle,
  description,
  stats = [],
  primaryButton,
  theme = "dark",
}: WatermarkHeroProps) {
  const isDark = theme === "dark";

  return (
    <section
      className={`relative flex min-h-screen flex-col items-center justify-center overflow-hidden py-20 ${
        isDark ? "bg-zinc-950 text-white" : "bg-white text-zinc-900"
      }`}
    >
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden select-none">
        <span
          className={`text-[18vw] font-black uppercase leading-none tracking-tighter blur-sm ${
            isDark ? "text-zinc-800" : "text-zinc-100"
          }`}
        >
          {watermarkText}
        </span>
      </div>

      <motion.div
        className="relative z-10 mx-auto max-w-4xl px-4 text-center"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {subtitle && (
          <motion.p
            variants={item}
            className="mb-4 text-sm font-semibold uppercase tracking-widest text-lime-400"
          >
            {subtitle}
          </motion.p>
        )}

        <motion.h1
          variants={item}
          className="mb-6 text-4xl font-bold leading-tight sm:text-5xl lg:text-7xl"
        >
          {title}
        </motion.h1>

        {description && (
          <motion.p
            variants={item}
            className={`mx-auto mb-10 max-w-2xl text-base leading-relaxed ${isDark ? "text-zinc-400" : "text-zinc-600"}`}
          >
            {description}
          </motion.p>
        )}

        {primaryButton && (
          <motion.div variants={item}>
            <a
              href={primaryButton.href}
              className="inline-block rounded-full bg-lime-400 px-8 py-3 text-sm font-bold text-zinc-900 transition-opacity hover:opacity-80"
            >
              {primaryButton.text}
            </a>
          </motion.div>
        )}
      </motion.div>

      {stats.length > 0 && (
        <motion.div
          className="absolute bottom-10 left-0 right-0 z-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <div className="mx-auto flex max-w-2xl justify-center gap-12 px-4">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <p className="text-2xl font-bold">{s.value}</p>
                <p
                  className={`text-sm ${isDark ? "text-zinc-500" : "text-zinc-500"}`}
                >
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </section>
  );
}
