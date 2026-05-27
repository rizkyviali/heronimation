"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

// ─── Hook ────────────────────────────────────────────────────────────────────

type TrailItem = {
  id: number;
  src: string;
  x: number;
  y: number;
  rotate: number;
};

const IDLE_MS = 2000;
const REMOVE_MS = 850;

function useTrailEffect(images: string[]) {
  const [trail, setTrail] = useState<TrailItem[]>([]);
  const [isIdle, setIsIdle] = useState(true);
  const sectionRef = useRef<HTMLElement>(null);
  const lastPos = useRef({ x: 0, y: 0 });
  const counter = useRef(0);
  const imgIdx = useRef(0);
  const idleTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || images.length === 0) return;

    const resetIdle = () => {
      setIsIdle(false);
      if (idleTimer.current) clearTimeout(idleTimer.current);
      idleTimer.current = setTimeout(() => setIsIdle(true), IDLE_MS);
    };

    const onMove = (e: MouseEvent) => {
      resetIdle();
      const rect = section.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const threshold = Math.max(window.innerWidth / 26, 36);

      if (Math.hypot(x - lastPos.current.x, y - lastPos.current.y) < threshold)
        return;
      lastPos.current = { x, y };

      const id = ++counter.current;
      const src = images[imgIdx.current % images.length];
      imgIdx.current++;

      setTrail((prev) => [
        ...prev.slice(-12),
        { id, src, x, y, rotate: (Math.random() - 0.5) * 28 },
      ]);
      setTimeout(
        () => setTrail((prev) => prev.filter((t) => t.id !== id)),
        REMOVE_MS,
      );
    };

    idleTimer.current = setTimeout(() => setIsIdle(true), IDLE_MS);
    section.addEventListener("mousemove", onMove);

    return () => {
      section.removeEventListener("mousemove", onMove);
      if (idleTimer.current) clearTimeout(idleTimer.current);
    };
  }, [images]);

  return { trail, isIdle, sectionRef };
}

// ─── Component ───────────────────────────────────────────────────────────────

export interface ImageTrailHeroProps {
  images: string[];
  title: string;
  subtitle?: string;
  description?: string;
  primaryButton?: { text: string; href: string };
  secondaryButton?: { text: string; href: string };
  theme?: "light" | "dark";
}

export default function ImageTrailHero({
  images,
  title,
  subtitle,
  description,
  primaryButton,
  secondaryButton,
  theme = "dark",
}: ImageTrailHeroProps) {
  const { trail, sectionRef } = useTrailEffect(images);
  const isDark = theme === "dark";

  return (
    <section
      ref={sectionRef}
      className={`relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 py-20 ${
        isDark ? "bg-zinc-950 text-white" : "bg-stone-50 text-zinc-900"
      }`}
    >
      <AnimatePresence>
        {trail.map((item) => (
          <motion.div
            key={item.id}
            aria-hidden="true"
            initial={{ opacity: 0, scale: 0.4 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ type: "spring", stiffness: 500, damping: 28 }}
            style={{
              left: item.x,
              top: item.y,
              rotate: item.rotate,
              translateX: "-50%",
              translateY: "-50%",
            }}
            className="pointer-events-none absolute h-36 w-36 overflow-hidden rounded-2xl shadow-2xl"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={item.src} alt="" className="h-full w-full object-cover" />
          </motion.div>
        ))}
      </AnimatePresence>

      <div className="relative z-10 flex flex-col items-center text-center">
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className={`mb-4 text-sm font-semibold uppercase tracking-widest ${
              isDark ? "text-zinc-400" : "text-zinc-500"
            }`}
          >
            {subtitle}
          </motion.p>
        )}

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-6 max-w-3xl text-5xl font-bold leading-tight tracking-tight lg:text-6xl"
        >
          {title}
        </motion.h1>

        {description && (
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className={`mb-10 max-w-xl text-lg leading-relaxed ${
              isDark ? "text-zinc-400" : "text-zinc-600"
            }`}
          >
            {description}
          </motion.p>
        )}

        {(primaryButton || secondaryButton) && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col gap-3 sm:flex-row"
          >
            {primaryButton && (
              <a
                href={primaryButton.href}
                className={`rounded-full px-8 py-3 text-sm font-semibold transition-opacity hover:opacity-80 ${
                  isDark ? "bg-white text-zinc-900" : "bg-zinc-900 text-white"
                }`}
              >
                {primaryButton.text}
              </a>
            )}
            {secondaryButton && (
              <a
                href={secondaryButton.href}
                className={`rounded-full border px-8 py-3 text-sm font-semibold transition-opacity hover:opacity-60 ${
                  isDark
                    ? "border-zinc-700 text-zinc-300"
                    : "border-zinc-300 text-zinc-700"
                }`}
              >
                {secondaryButton.text}
              </a>
            )}
          </motion.div>
        )}
      </div>
    </section>
  );
}
