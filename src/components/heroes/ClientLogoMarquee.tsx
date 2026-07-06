"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import SeamlessMarquee from "./SeamlessMarquee";

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
const animationDurations = {
  left: 120,
  right: 110,
} as const;

function shuffleArray<T>(array: T[]): T[] {
  return [...array].sort(() => Math.random() - 0.5);
}

function createRepeatedLogos(logos: ClientLogo[], repetitions: number) {
  return Array.from({ length: repetitions }, () => logos).flat();
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
        draggable={false}
        loading="lazy"
        className={`max-h-full max-w-full object-contain transition-all duration-300 ${
          isActive ? "grayscale-0" : "grayscale hover:grayscale-0"
        } ${isRasterWithHardEdge ? "rounded-lg" : ""}`}
        onDragStart={(event) => event.preventDefault()}
      />
    </button>
  );
}

function DraggableMarqueeRow({ children }: { children: React.ReactNode }) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const dragStateRef = useRef({
    isDragging: false,
    startX: 0,
    scrollLeft: 0,
  });

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    const container = scrollContainerRef.current;
    if (!container) return;

    dragStateRef.current = {
      isDragging: true,
      startX: event.clientX,
      scrollLeft: container.scrollLeft,
    };
    container.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const container = scrollContainerRef.current;
    const dragState = dragStateRef.current;
    if (!container || !dragState.isDragging) return;

    const deltaX = event.clientX - dragState.startX;
    container.scrollLeft = dragState.scrollLeft - deltaX;
  };

  const handlePointerEnd = (event: React.PointerEvent<HTMLDivElement>) => {
    const container = scrollContainerRef.current;
    dragStateRef.current.isDragging = false;
    if (container?.hasPointerCapture(event.pointerId)) {
      container.releasePointerCapture(event.pointerId);
    }
  };

  return (
    <div
      ref={scrollContainerRef}
      className="relative cursor-grab overflow-x-auto overflow-y-hidden active:cursor-grabbing [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      onPointerCancel={handlePointerEnd}
      onPointerDown={handlePointerDown}
      onPointerLeave={handlePointerEnd}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerEnd}
    >
      {children}
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
  speed = animationDurations,
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

      <div className="flex flex-col" aria-label="Client logo marquee">
        <DraggableMarqueeRow>
          <SeamlessMarquee
            items={rows.first}
            getKey={(logo, index) => `${logo.name}-${index}`}
            duration={speed.left ?? 120}
            gap="0"
            pauseOnHover={false}
            ariaLabel="Client logo row moving left"
            className="w-max overflow-visible"
            groupClassName="py-4"
            renderItem={(logo, index) => {
              const itemId = `row-1::${index}::${logo.name}`;

              return (
                <LogoButton
                  logo={logo}
                  itemId={itemId}
                  isActive={activeId === itemId}
                  onActivate={handleActivate}
                  onDeactivate={handleDeactivate}
                />
              );
            }}
          />
        </DraggableMarqueeRow>
        <DraggableMarqueeRow>
          <SeamlessMarquee
            items={rows.second}
            getKey={(logo, index) => `${logo.name}-${index}`}
            direction="right"
            duration={speed.right ?? 110}
            gap="0"
            pauseOnHover={false}
            ariaLabel="Client logo row moving right"
            className="w-max overflow-visible"
            groupClassName="py-4"
            renderItem={(logo, index) => {
              const itemId = `row-2::${index}::${logo.name}`;

              return (
                <LogoButton
                  logo={logo}
                  itemId={itemId}
                  isActive={activeId === itemId}
                  onActivate={handleActivate}
                  onDeactivate={handleDeactivate}
                />
              );
            }}
          />
        </DraggableMarqueeRow>
      </div>

      <LogoTooltip
        logo={activeLogo}
        position={tooltipPosition}
        onMouseEnter={clearCloseTimeout}
        onMouseLeave={() => setActiveId(null)}
      />
    </section>
  );
}
