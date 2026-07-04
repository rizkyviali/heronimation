"use client";

import { useEffect, useMemo, useRef, useState } from "react";

export interface ClientLogo {
  name: string;
  src: string;
  alt: string;
  branches?: string[];
  darkBackground?: boolean;
}

export interface ClientLogoMarqueeProps {
  eyebrow?: string;
  title?: string;
  description?: string;
  logos: ClientLogo[];
  repetitions?: number;
  speed?: {
    left?: number;
    right?: number;
  };
  className?: string;
}

interface TooltipPosition {
  x: number;
  y: number;
}

const logoRepetitions = 5;
const logoPositionOffset = 15;
const animationSpeeds = {
  desktop: {
    left: 120,
    right: 110,
  },
  mobile: {
    left: 140,
    right: 130,
  },
} as const;

function shuffleArray<T>(array: T[]): T[] {
  return [...array].sort(() => Math.random() - 0.5);
}

function createRepeatedLogos(logos: ClientLogo[], repetitions: number) {
  return Array.from({ length: repetitions }, () => logos).flat();
}

function MarqueeStyles({
  leftSpeed,
  rightSpeed,
}: {
  leftSpeed: number;
  rightSpeed: number;
}) {
  return (
    <style>{`
      .scrollbar-hide {
        -ms-overflow-style: none;
        scrollbar-width: none;
      }

      .scrollbar-hide::-webkit-scrollbar {
        display: none;
      }

      @media (min-width: 768px) {
        .animate-scroll-left {
          animation: scroll-left ${leftSpeed}s linear infinite;
        }

        .animate-scroll-right {
          animation: scroll-right ${rightSpeed}s linear infinite;
        }

        .animate-scroll-left:hover,
        .animate-scroll-right:hover {
          animation-play-state: paused;
        }
      }

      @media (max-width: 767px) {
        .animate-scroll-left {
          animation: scroll-left ${animationSpeeds.mobile.left}s linear infinite;
        }

        .animate-scroll-right {
          animation: scroll-right ${animationSpeeds.mobile.right}s linear infinite;
        }
      }

      @keyframes scroll-left {
        0% { transform: translateX(0); }
        100% { transform: translateX(-20%); }
      }

      @keyframes scroll-right {
        0% { transform: translateX(-20%); }
        100% { transform: translateX(0); }
      }
    `}</style>
  );
}

function LogoButton({
  logo,
  itemId,
  isActive,
  onActivate,
  onDeactivate,
}: {
  logo: ClientLogo;
  itemId: string;
  isActive: boolean;
  onActivate: (
    itemId: string,
    event:
      | React.MouseEvent<HTMLButtonElement>
      | React.KeyboardEvent<HTMLButtonElement>
      | React.TouchEvent<HTMLButtonElement>,
  ) => void;
  onDeactivate: () => void;
}) {
  const hasTooltip = Boolean(logo.branches?.length);
  const needsBlackBg = logo.darkBackground || logo.name === "Assa Rent";
  const isRasterWithHardEdge =
    logo.src.endsWith(".jpg") ||
    logo.src.endsWith(".jpeg") ||
    logo.src.endsWith(".webp");

  const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (!hasTooltip || (event.key !== "Enter" && event.key !== " ")) return;
    event.preventDefault();
    onActivate(itemId, event);
  };

  const handleTouchStart = (event: React.TouchEvent<HTMLButtonElement>) => {
    if (!hasTooltip) return;
    event.preventDefault();
    onActivate(itemId, event);
  };

  return (
    <button
      type="button"
      className={`relative mx-8 flex h-24 w-36 flex-shrink-0 items-center justify-center rounded-lg p-2 transition-all duration-300 ease-in-out ${
        needsBlackBg ? "bg-black" : ""
      } ${
        isActive ? "scale-105" : "hover:scale-[1.02] focus:outline-none"
      } ${hasTooltip ? "cursor-pointer" : "cursor-default"}`}
      onBlur={onDeactivate}
      onKeyDown={handleKeyDown}
      onMouseEnter={(event) => {
        if (hasTooltip) onActivate(itemId, event);
      }}
      onMouseLeave={onDeactivate}
      onTouchEnd={onDeactivate}
      onTouchStart={handleTouchStart}
      tabIndex={hasTooltip ? 0 : -1}
      aria-label={
        hasTooltip ? `View ${logo.name} locations` : logo.alt || logo.name
      }
    >
      <img
        src={logo.src}
        alt={logo.alt}
        width={144}
        height={96}
        loading="lazy"
        className={`max-h-full max-w-full object-contain transition-all duration-300 ${
          isActive ? "grayscale-0" : "grayscale hover:grayscale-0"
        } ${isRasterWithHardEdge ? "rounded-lg" : ""}`}
      />
    </button>
  );
}

function LogoRow({
  logos,
  direction,
  rowId,
  activeId,
  onActivate,
  onDeactivate,
}: {
  logos: ClientLogo[];
  direction: "left" | "right";
  rowId: string;
  activeId: string | null;
  onActivate: (
    itemId: string,
    event:
      | React.MouseEvent<HTMLButtonElement>
      | React.KeyboardEvent<HTMLButtonElement>
      | React.TouchEvent<HTMLButtonElement>,
  ) => void;
  onDeactivate: () => void;
}) {
  return (
    <div
      className={`flex py-4 ${
        direction === "left" ? "animate-scroll-left" : "animate-scroll-right"
      }`}
    >
      {logos.map((logo, index) => {
        const itemId = `${rowId}::${index}::${logo.name}`;

        return (
          <LogoButton
            key={itemId}
            logo={logo}
            itemId={itemId}
            isActive={activeId === itemId}
            onActivate={onActivate}
            onDeactivate={onDeactivate}
          />
        );
      })}
    </div>
  );
}

function LogoTooltip({
  logo,
  position,
  onMouseEnter,
  onMouseLeave,
}: {
  logo: ClientLogo | null;
  position: TooltipPosition;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}) {
  const adjustedPosition = useMemo(() => {
    const tooltipWidth = 384;
    const viewportWidth =
      typeof window === "undefined" ? 1200 : window.innerWidth;
    let x = position.x;

    if (x + tooltipWidth / 2 > viewportWidth - 16) {
      x = viewportWidth - tooltipWidth / 2 - 16;
    }

    if (x - tooltipWidth / 2 < 16) {
      x = tooltipWidth / 2 + 16;
    }

    return { x, y: position.y };
  }, [position]);

  if (!logo?.branches?.length) return null;

  return (
    <div
      className="fixed z-50 max-w-md space-y-3 rounded-xl border border-gray-200 bg-white p-4 text-zinc-900 shadow-2xl"
      style={{
        left: `${adjustedPosition.x}px`,
        top: `${adjustedPosition.y}px`,
        transform: "translate(-50%, 0)",
      }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      role="tooltip"
    >
      <div className="text-center">
        <h3 className="text-lg font-semibold text-gray-800">
          {logo.branches.length === 1 ? logo.branches[0] : logo.name}
        </h3>
      </div>

      {logo.branches.length > 1 && (
        <div className="space-y-2">
          {logo.branches.map((branch) => (
            <div
              key={branch}
              className="flex items-center gap-2 rounded-md bg-gray-50 p-2"
            >
              <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-blue-500" />
              <span className="text-sm text-gray-700">{branch}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function ClientLogoMarquee({
  eyebrow,
  title,
  description,
  logos,
  repetitions = logoRepetitions,
  speed = animationSpeeds.desktop,
  className = "",
}: ClientLogoMarqueeProps) {
  const [isClient, setIsClient] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState<TooltipPosition>({
    x: 0,
    y: 0,
  });
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setIsClient(true);
    return () => {
      if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    };
  }, []);

  const rows = useMemo(() => {
    const firstRow = isClient ? shuffleArray(logos) : logos;
    const secondRow = isClient ? shuffleArray(logos) : logos;

    return {
      first: createRepeatedLogos(firstRow, repetitions),
      second: createRepeatedLogos(secondRow, repetitions),
    };
  }, [isClient, logos, repetitions]);

  const activeLogo = useMemo(() => {
    if (!activeId) return null;
    const name = activeId.split("::").slice(2).join("::");
    return logos.find((logo) => logo.name === name) ?? null;
  }, [activeId, logos]);

  const clearCloseTimeout = () => {
    if (!closeTimeoutRef.current) return;
    clearTimeout(closeTimeoutRef.current);
    closeTimeoutRef.current = null;
  };

  const handleActivate = (
    itemId: string,
    event:
      | React.MouseEvent<HTMLButtonElement>
      | React.KeyboardEvent<HTMLButtonElement>
      | React.TouchEvent<HTMLButtonElement>,
  ) => {
    clearCloseTimeout();
    const rect = event.currentTarget.getBoundingClientRect();

    setTooltipPosition({
      x: rect.left + rect.width / 2,
      y: rect.bottom + logoPositionOffset,
    });
    setActiveId(itemId);
  };

  const handleDeactivate = () => {
    clearCloseTimeout();
    closeTimeoutRef.current = setTimeout(() => setActiveId(null), 150);
  };

  return (
    <section className={`relative mx-auto py-8 ${className}`}>
      {(eyebrow || title || description) && (
        <div className="mx-auto mb-8 max-w-3xl px-6 text-center">
          {eyebrow && (
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-sky-700">
              {eyebrow}
            </p>
          )}
          {title && (
            <h2 className="text-3xl font-black tracking-tight text-zinc-950 sm:text-5xl">
              {title}
            </h2>
          )}
          {description && (
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-zinc-600 sm:text-base">
              {description}
            </p>
          )}
        </div>
      )}

      <div className="scrollbar-hide relative overflow-x-auto overflow-y-hidden">
        <div
          className="flex flex-col"
          style={{ width: "max-content" }}
          aria-label="Client logo marquee"
        >
          <LogoRow
            logos={rows.first}
            rowId="row-1"
            direction="left"
            activeId={activeId}
            onActivate={handleActivate}
            onDeactivate={handleDeactivate}
          />
          <LogoRow
            logos={rows.second}
            rowId="row-2"
            direction="right"
            activeId={activeId}
            onActivate={handleActivate}
            onDeactivate={handleDeactivate}
          />
        </div>
      </div>

      <LogoTooltip
        logo={activeLogo}
        position={tooltipPosition}
        onMouseEnter={clearCloseTimeout}
        onMouseLeave={() => setActiveId(null)}
      />

      <MarqueeStyles
        leftSpeed={speed.left ?? 120}
        rightSpeed={speed.right ?? 110}
      />
    </section>
  );
}
