"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const CHARSET = "!<>-_\\/[]{}=+*^?#@$%&~|;:";

export interface HackerButtonProps {
  children: string;
  onClick?: () => void;
  href?: string;
  className?: string;
  scrambleDuration?: number;
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
}: HackerButtonProps) {
  const original = children;

  const toResolved = (text: string): CharState[] =>
    text.split("").map((ch) => ({ display: ch, resolved: true }));

  const [chars, setChars] = useState<CharState[]>(() => toResolved(original));

  const rafRef = useRef<number | null>(null);
  const animatingRef = useRef(false);

  useEffect(() => {
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const startScramble = useCallback(() => {
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
            INITIAL_DELAY + (i / Math.max(original.length - 1, 1)) * scrambleDuration;
          if (elapsed >= resolveAt) return { display: ch, resolved: true };
          return {
            display: CHARSET[Math.floor(Math.random() * CHARSET.length)],
            resolved: false,
          };
        })
      );

      if (elapsed < INITIAL_DELAY + scrambleDuration) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        setChars(toResolved(original));
        animatingRef.current = false;
      }
    };

    rafRef.current = requestAnimationFrame(tick);
  }, [original, scrambleDuration]);

  const cancelScramble = useCallback(() => {
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    setChars(toResolved(original));
    animatingRef.current = false;
  }, [original]);

  const content = (
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
    <div className="flex min-h-[500px] flex-col items-center justify-center gap-8 bg-zinc-950 px-8 py-16">
      <p className="mb-2 font-mono text-xs uppercase tracking-widest text-zinc-600">
        hover to scramble
      </p>

      <HackerButton className="cursor-pointer font-mono text-4xl font-bold uppercase tracking-widest text-white">
        Get Started
      </HackerButton>

      <HackerButton
        className="cursor-pointer font-mono text-base tracking-wider text-zinc-400"
        scrambleDuration={500}
      >
        Read the Documentation →
      </HackerButton>

      <HackerButton
        className="cursor-pointer font-mono text-sm text-zinc-600"
        scrambleDuration={800}
      >
        contact@example.com
      </HackerButton>
    </div>
  );
}
