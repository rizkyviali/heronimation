"use client";

import { useId } from "react";

export interface SeamlessMarqueeProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  getKey?: (item: T, index: number) => string | number;
  direction?: "left" | "right";
  duration?: number;
  gap?: string;
  pauseOnHover?: boolean;
  ariaLabel?: string;
  className?: string;
  trackClassName?: string;
  groupClassName?: string;
}

const defaultDuration = 40;
const defaultGap = "2rem";

export default function SeamlessMarquee<T>({
  items,
  renderItem,
  getKey,
  direction = "left",
  duration = defaultDuration,
  gap = defaultGap,
  pauseOnHover = true,
  ariaLabel,
  className = "",
  trackClassName = "",
  groupClassName = "",
}: SeamlessMarqueeProps<T>) {
  const id = useId().replace(/:/g, "");
  const marqueeClassName = `seamless-marquee-${id}`;
  const animationName =
    direction === "left" ? "seamless-marquee-left" : "seamless-marquee-right";

  const renderGroup = (group: "primary" | "duplicate") => (
    <div
      className={`flex shrink-0 items-center ${groupClassName}`}
      style={{ gap, paddingRight: gap }}
      aria-hidden={group === "duplicate"}
    >
      {items.map((item, index) => (
        <div
          key={`${group}-${getKey ? getKey(item, index) : String(index)}`}
          className="shrink-0"
        >
          {renderItem(item, index)}
        </div>
      ))}
    </div>
  );

  return (
    <div
      className={`overflow-hidden ${className}`}
      aria-label={ariaLabel}
      role={ariaLabel ? "region" : undefined}
    >
      <div
        className={`flex w-max ${marqueeClassName} ${marqueeClassName}-motion ${
          pauseOnHover ? `${marqueeClassName}-pause` : ""
        } ${trackClassName}`}
        style={
          {
            "--seamless-marquee-duration": `${duration}s`,
            animation: `${animationName} var(--seamless-marquee-duration) linear infinite`,
          } as React.CSSProperties
        }
      >
        {renderGroup("primary")}
        {renderGroup("duplicate")}
      </div>

      <style>{`
        @keyframes seamless-marquee-left {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }

        @keyframes seamless-marquee-right {
          from { transform: translateX(-50%); }
          to { transform: translateX(0); }
        }

        ${
          pauseOnHover
            ? `
              @media (hover: hover) {
                .${marqueeClassName}-pause:hover {
                  animation-play-state: paused;
                }
              }
            `
            : ""
        }

        @media (prefers-reduced-motion: reduce) {
          .${marqueeClassName}-motion {
            animation: none !important;
            transform: translateX(0) !important;
          }
        }
      `}</style>
    </div>
  );
}

export function SeamlessMarqueeDemo() {
  const signals = [
    "Survey Corps",
    "Wall Maria",
    "ODM Gear",
    "Basement Key",
    "Paths",
    "The Ocean",
    "Founding Titan",
    "Rumbling",
    "Hange Zoe",
    "Eren Yeager",
    "Zeke Yeager",
    "World Map",
  ];

  return (
    <section className="flex min-h-[420px] flex-col justify-center gap-10 bg-zinc-950 py-16 text-zinc-50">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-cyan-300">
          Seamless Primitive
        </p>
        <h2 className="text-3xl font-black tracking-tight sm:text-5xl">
          Reusable Infinite Marquee
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-zinc-400 sm:text-base">
          Duplicate one identical group, animate the track by half its width,
          and the reset disappears.
        </p>
      </div>

      <div className="space-y-4">
        <SeamlessMarquee
          items={[...signals, ...signals]}
          getKey={(item, index) => `${item}-${index}`}
          duration={16}
          gap="1rem"
          pauseOnHover={false}
          ariaLabel="Example marquee moving left"
          renderItem={(item) => (
            <span className="rounded-full border border-cyan-300/30 bg-cyan-300/10 px-7 py-3 text-sm font-semibold uppercase tracking-wider text-cyan-100 shadow-lg shadow-cyan-950/40">
              {item}
            </span>
          )}
        />
        <SeamlessMarquee
          items={[...signals].reverse().concat(signals)}
          getKey={(item, index) => `${item}-${index}`}
          direction="right"
          duration={18}
          gap="1rem"
          pauseOnHover={false}
          ariaLabel="Example marquee moving right"
          renderItem={(item) => (
            <span className="rounded-full border border-amber-300/30 bg-amber-300/10 px-7 py-3 text-sm font-semibold uppercase tracking-wider text-amber-100 shadow-lg shadow-amber-950/40">
              {item}
            </span>
          )}
        />
      </div>
    </section>
  );
}
