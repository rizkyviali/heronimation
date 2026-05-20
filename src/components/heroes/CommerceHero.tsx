"use client";

import { motion } from "framer-motion";

export interface CommerceHeroProps {
  socialProof?: string;
  backgroundText?: string;
  title: string;
  subtitle?: string;
  valuePoints?: string[];
  urgencyText?: string;
  buttonText?: string;
  buttonHref?: string;
  trustSignals?: string[];
}

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" as const } },
};

function SocialProofBadge({ text }: { text: string }) {
  return (
    <motion.div variants={item} className="inline-flex items-center gap-2 rounded-full border border-lime-400/30 bg-lime-400/10 px-4 py-1.5">
      <span className="h-2 w-2 rounded-full bg-lime-400 animate-pulse" />
      <span className="text-sm font-medium text-lime-400">{text}</span>
    </motion.div>
  );
}

function ValuePoints({ points }: { points: string[] }) {
  return (
    <motion.ul variants={item} className="flex flex-wrap justify-center gap-x-6 gap-y-2">
      {points.map((p) => (
        <li key={p} className="flex items-center gap-2 text-sm text-zinc-400">
          <span className="text-lime-400">✓</span>
          {p}
        </li>
      ))}
    </motion.ul>
  );
}

function TrustSignals({ signals }: { signals: string[] }) {
  return (
    <motion.div variants={item} className="flex flex-wrap justify-center gap-4">
      {signals.map((s) => (
        <span key={s} className="text-xs text-zinc-500">{s}</span>
      ))}
    </motion.div>
  );
}

export default function CommerceHero({
  socialProof,
  backgroundText,
  title,
  subtitle,
  valuePoints = [],
  urgencyText,
  buttonText = "Get Started",
  buttonHref = "#",
  trustSignals = [],
}: CommerceHeroProps) {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-zinc-950 py-20 text-white">
      {backgroundText && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center select-none overflow-hidden">
          <span className="text-[20vw] font-black uppercase leading-none tracking-tighter text-zinc-800/60 blur-[2px]">
            {backgroundText}
          </span>
        </div>
      )}

      <motion.div
        className="relative z-10 mx-auto flex max-w-3xl flex-col items-center gap-6 px-4 text-center"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {socialProof && <SocialProofBadge text={socialProof} />}

        <motion.h1 variants={item} className="text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
          {title}
        </motion.h1>

        {subtitle && (
          <motion.p variants={item} className="max-w-xl text-base leading-relaxed text-zinc-400 font-mono">
            {subtitle}
          </motion.p>
        )}

        {valuePoints.length > 0 && <ValuePoints points={valuePoints} />}

        <motion.div variants={item} className="flex flex-col items-center gap-3">
          {urgencyText && (
            <p className="text-sm font-medium text-orange-400">{urgencyText}</p>
          )}
          <a
            href={buttonHref}
            className="rounded-full bg-lime-400 px-10 py-3.5 text-sm font-bold text-zinc-900 transition-opacity hover:opacity-80"
          >
            {buttonText}
          </a>
        </motion.div>

        {trustSignals.length > 0 && <TrustSignals signals={trustSignals} />}
      </motion.div>
    </section>
  );
}
