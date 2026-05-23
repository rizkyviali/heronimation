"use client";

import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

// ─── Availability badge ───────────────────────────────────────────────────────

function AvailabilityBadge({
  availableFrom,
  availableMessage = "Available now!",
}: {
  availableFrom: string;
  availableMessage?: string;
}) {
  const status = useMemo(() => {
    const now = new Date();
    const target = new Date(availableFrom);
    if (now >= target) {
      return {
        message: availableMessage,
        dot: "bg-green-400",
        text: "text-green-800",
        bg: "bg-green-50",
        pulse: false,
      };
    }
    const formatted = target.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
    });
    return {
      message: `Unavailable until ${formatted}`,
      dot: "bg-orange-400",
      text: "text-orange-800",
      bg: "bg-orange-50",
      pulse: true,
    };
  }, [availableFrom, availableMessage]);

  return (
    <span
      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium ${status.bg} ${status.text}`}
    >
      <span
        className={`w-1.5 h-1.5 rounded-full ${status.dot} ${
          status.pulse ? "animate-pulse" : ""
        }`}
      />
      {status.message}
    </span>
  );
}

// ─── Sliding metric cards ─────────────────────────────────────────────────────

export interface ShowcaseSlide {
  id: string;
  metric: string;
  title: string;
  description: string;
}

const SLIDE_H = 560;

function MetricsSlider({ slides }: { slides: ShowcaseSlide[] }) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(
      () => setCurrent((p) => (p + 1) % slides.length),
      5000,
    );
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <div
      className="relative w-full overflow-hidden bg-zinc-900 text-white"
      style={{ height: SLIDE_H }}
    >
      <div
        className="flex flex-col transition-transform duration-1000 ease-in-out"
        style={{ transform: `translateY(-${current * SLIDE_H}px)` }}
      >
        {slides.map((slide) => (
          <div
            key={slide.id}
            className="flex flex-shrink-0 flex-col gap-8 items-center justify-center p-8 w-full text-center"
            style={{ height: SLIDE_H }}
          >
            <p className="font-black text-[5rem] sm:text-[9rem] lg:text-[13rem] leading-none text-white/20 select-none">
              {slide.metric}
            </p>
            <div className="space-y-3 max-w-xs">
              <h3 className="font-semibold text-2xl">{slide.title}</h3>
              <p className="text-sm text-white/50 uppercase tracking-widest">
                {slide.description}
              </p>
            </div>
            <div className="h-px w-24 bg-white/10" />
          </div>
        ))}
      </div>

      {/* Dot navigation */}
      <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => setCurrent(i)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === current ? "w-8 bg-white" : "w-1.5 bg-white/30"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

// ─── Component ───────────────────────────────────────────────────────────────

export interface SplitShowcaseHeroProps {
  name: string;
  role: string;
  email?: string;
  availableFrom?: string;
  availableMessage?: string;
  slides: ShowcaseSlide[];
}

export default function SplitShowcaseHero({
  name,
  role,
  email,
  availableFrom,
  availableMessage,
  slides,
}: SplitShowcaseHeroProps) {
  const [emailLabel, setEmailLabel] = useState(email ?? "");

  const copyEmail = () => {
    if (!email || typeof window === "undefined" || !navigator.clipboard) return;
    navigator.clipboard.writeText(email);
    setEmailLabel("Copied!");
    setTimeout(() => setEmailLabel(email), 2000);
  };

  return (
    <section className="flex flex-col min-h-screen bg-stone-100 text-zinc-900">
      {/* Availability strip */}
      {availableFrom && (
        <div className="flex items-center justify-center py-2 bg-stone-50 border-b border-zinc-200">
          <AvailabilityBadge
            availableFrom={availableFrom}
            availableMessage={availableMessage}
          />
        </div>
      )}

      {/* Split layout */}
      <div className="flex flex-1 flex-col lg:flex-row">
        {/* Left: identity */}
        <div className="flex flex-col w-full lg:max-w-[50%] bg-stone-100 border-b lg:border-b-0 lg:border-r border-zinc-200">
          {/* Role row */}
          <div className="px-6 pt-5 pb-4 border-b border-zinc-200">
            <p className="text-xs text-zinc-400 uppercase tracking-widest font-mono">
              {role}
            </p>
          </div>

          {/* Name */}
          <div className="flex flex-1 items-center justify-start px-6 py-10 overflow-hidden">
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="font-black text-[clamp(3.5rem,10vw,8rem)] leading-[0.9] tracking-tight uppercase text-zinc-900 break-words"
            >
              {name}
            </motion.h1>
          </div>

          {/* Email */}
          {email && (
            <div className="px-6 py-4 border-t border-zinc-200">
              <motion.button
                type="button"
                onClick={copyEmail}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="flex gap-2 items-center font-semibold text-base text-zinc-900 hover:text-zinc-500 transition-colors"
              >
                {emailLabel}
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                  />
                </svg>
              </motion.button>
            </div>
          )}
        </div>

        {/* Right: auto-cycling metrics */}
        <div className="w-full lg:flex-1">
          <MetricsSlider slides={slides} />
        </div>
      </div>
    </section>
  );
}
