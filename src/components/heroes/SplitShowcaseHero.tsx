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
    <div className="relative h-[34rem] w-full overflow-hidden bg-lime-300 text-center text-zinc-950 lg:h-full lg:min-h-0">
      <div
        className="flex h-full flex-col transition-transform duration-1000 ease-in-out"
        style={{ transform: `translateY(-${current * 100}%)` }}
      >
        {slides.map((slide) => (
          <div
            key={slide.id}
            className="flex h-full w-full flex-shrink-0 flex-col items-center justify-center gap-7 p-8 text-center"
          >
            <div className="overflow-visible">
              <h2 className="select-none font-themadi text-[clamp(7rem,17vw,15rem)] leading-[1.08] text-zinc-950/35">
                {slide.metric}
              </h2>
            </div>
            <div className="mx-auto max-w-3xl space-y-4">
              <h3 className="font-mono text-2xl text-zinc-950 sm:text-3xl">
                {slide.title}
              </h3>
              <p className="font-mono text-sm uppercase leading-relaxed tracking-widest text-zinc-950/70 sm:text-lg">
                {slide.description}
              </p>
            </div>
            <div className="mx-auto h-1 w-28 bg-zinc-950" />
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
            className={`h-2 rounded-full transition-all duration-300 ${
              i === current ? "w-8 bg-zinc-950" : "w-2 bg-zinc-950/30"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

function SourceIntroTitle({ name, role }: { name: string; role: string }) {
  const roleWords = role.split(" ");
  const firstLine = roleWords[0] ?? role;
  const secondLine = roleWords.slice(1).join(" ");

  return (
    <div className="flex w-max animate-text-scroll items-center py-10">
      <span className="flex shrink-0 items-center px-8 sm:px-12">
        <span className="font-themadi text-[clamp(4.5rem,10vw,8rem)] leading-[1.35] tracking-wide">
          {name}
        </span>
        <span className="ml-4 flex flex-col text-start font-mono font-light text-[clamp(2rem,3.6vw,3.25rem)] italic leading-[0.9] tracking-normal">
          <span>{firstLine}</span>
          {secondLine && <span>{secondLine}</span>}
        </span>
      </span>
      <span className="flex shrink-0 items-center px-8 sm:px-12" aria-hidden>
        <span className="font-themadi text-[clamp(4.5rem,10vw,8rem)] leading-[1.35] tracking-wide">
          {name}
        </span>
        <span className="ml-4 flex flex-col text-start font-mono font-light text-[clamp(2rem,3.6vw,3.25rem)] italic leading-[0.9] tracking-normal">
          <span>{firstLine}</span>
          {secondLine && <span>{secondLine}</span>}
        </span>
      </span>
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
    <section className="flex min-h-screen flex-col bg-stone-100 text-zinc-950 lg:h-screen lg:min-h-0 lg:overflow-hidden">
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
      <div className="flex flex-1 flex-col lg:min-h-0 lg:flex-row">
        {/* Left: identity */}
        <div className="flex w-full flex-col border-zinc-200 border-b bg-stone-100 text-zinc-950 lg:h-full lg:max-w-[50%] lg:border-r lg:border-b-0">
          {/* Role row */}
          <div className="border-zinc-200 border-b px-6 pt-5 pb-4">
            <p className="font-mono text-zinc-500 text-xs uppercase tracking-widest">
              {role}
            </p>
          </div>

          {/* Name */}
          <div className="flex flex-1 items-center overflow-hidden py-4">
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="w-full overflow-hidden font-bold text-zinc-950 uppercase"
            >
              <SourceIntroTitle name={name} role={role} />
            </motion.h1>
          </div>

          {/* Email */}
          {email && (
            <div className="border-zinc-200 border-t px-6 py-4">
              <motion.button
                type="button"
                onClick={copyEmail}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="flex items-center gap-2 font-mono font-semibold text-base text-zinc-950 transition-colors hover:text-lime-600 md:text-xl"
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
        <div className="flex w-full lg:h-full lg:flex-1">
          <MetricsSlider slides={slides} />
        </div>
      </div>
    </section>
  );
}
