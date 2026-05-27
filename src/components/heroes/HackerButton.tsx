"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const CHARSETS = {
  symbols: "!<>_=*^#@&|;~",
  letters: "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
};

export interface HackerButtonProps {
  children: string;
  onClick?: () => void;
  href?: string;
  className?: string;
  scrambleDuration?: number;
  variant?: "symbols" | "letters";
}

interface CharState {
  display: string;
  resolved: boolean;
}

export function HackerButton({
  children,
  onClick,
  href,
  className = "",
  scrambleDuration = 600,
  variant = "symbols",
}: HackerButtonProps) {
  const original = children;
  const charset = CHARSETS[variant];

  const toResolved = (text: string): CharState[] =>
    text.split("").map((ch) => ({ display: ch, resolved: true }));

  const [chars, setChars] = useState<CharState[]>(() => toResolved(original));
  const [hovered, setHovered] = useState(false);

  const rafRef = useRef<number | null>(null);
  const animatingRef = useRef(false);

  useEffect(() => {
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const startScramble = useCallback(() => {
    setHovered(true);
    if (animatingRef.current) return;
    animatingRef.current = true;

    const startTime = performance.now();
    const INITIAL_DELAY = 80;

    const tick = (now: number) => {
      const elapsed = now - startTime;

      setChars(
        original.split("").map((ch, i) => {
          if (ch === " ") return { display: " ", resolved: true };
          const resolveAt =
            INITIAL_DELAY +
            (i / Math.max(original.length - 1, 1)) * scrambleDuration;
          if (elapsed >= resolveAt) return { display: ch, resolved: true };
          return {
            display: charset[Math.floor(Math.random() * charset.length)],
            resolved: false,
          };
        }),
      );

      if (elapsed < INITIAL_DELAY + scrambleDuration) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        setChars(toResolved(original));
        animatingRef.current = false;
      }
    };

    rafRef.current = requestAnimationFrame(tick);
  }, [original, scrambleDuration, charset]);

  const cancelScramble = useCallback(() => {
    setHovered(false);
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    setChars(toResolved(original));
    animatingRef.current = false;
  }, [original]);

  const bracketStyle = (direction: "left" | "right") => ({
    display: "inline-block" as const,
    color: "#4ade80",
    opacity: hovered ? 1 : 0,
    transform: hovered
      ? "translateX(0)"
      : direction === "left"
        ? "translateX(-6px)"
        : "translateX(6px)",
    transition: "opacity 180ms ease, transform 180ms ease",
    userSelect: "none" as const,
  });

  const content = (
    <span className="inline-flex items-center gap-1.5">
      <span style={bracketStyle("left")}>[</span>
      <span aria-label={original} className="inline-flex">
        {chars.map((c, i) => (
          <span
            key={i}
            style={{
              color: c.resolved ? "currentColor" : "#4ade80",
              transition: c.resolved ? "color 80ms ease" : "none",
            }}
          >
            {c.display}
          </span>
        ))}
      </span>
      <span style={bracketStyle("right")}>]</span>
    </span>
  );

  const shared = {
    onMouseEnter: startScramble,
    onMouseLeave: cancelScramble,
    className,
  };

  if (href) {
    return (
      <a href={href} {...shared} onClick={onClick}>
        {content}
      </a>
    );
  }

  return (
    <button type="button" {...shared} onClick={onClick}>
      {content}
    </button>
  );
}

// Demo layout shown in the preview
export default function HackerButtonDemo() {
  return (
    <div className="flex min-h-[500px] flex-col items-center justify-center gap-10 bg-zinc-950 px-8 py-16">
      <p className="mb-2 font-mono text-xs uppercase tracking-widest text-zinc-600">
        hover to scramble
      </p>

      <HackerButton
        className="cursor-pointer font-mono text-4xl font-bold uppercase tracking-widest text-white"
        variant="symbols"
      >
        Get Started
      </HackerButton>

      <HackerButton
        className="cursor-pointer font-mono text-base tracking-wider text-zinc-400"
        variant="letters"
        scrambleDuration={500}
      >
        Read the Documentation
      </HackerButton>

      <HackerButton
        className="cursor-pointer font-mono text-sm text-zinc-600"
        variant="letters"
        scrambleDuration={800}
      >
        contact@example.com
      </HackerButton>
    </div>
  );
}
