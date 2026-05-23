"use client";

export interface PortfolioHeroProps {
  title: string;
  tagline: string;
  description?: string;
  tags?: string[];
  theme?: "light" | "dark";
}

export default function PortfolioHero({
  title,
  tagline,
  description,
  tags = [],
  theme = "dark",
}: PortfolioHeroProps) {
  const isDark = theme === "dark";
  const repeated = [...tags, ...tags];

  return (
    <section
      className={`relative flex flex-col items-center justify-center min-h-screen gap-12 overflow-hidden ${
        isDark
          ? "bg-gradient-to-b from-zinc-800 to-zinc-950 text-white"
          : "bg-gradient-to-b from-stone-100 to-stone-200 text-zinc-900"
      }`}
    >
      <style>{`
        @keyframes portfolio-hero-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-portfolio-hero-scroll {
          animation: portfolio-hero-scroll 20s linear infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-portfolio-hero-scroll { animation: none; }
        }
      `}</style>

      {/* Fading icon / tag marquee */}
      {repeated.length > 0 && (
        <div className="absolute top-8 w-full overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]">
          <div className="flex whitespace-nowrap animate-portfolio-hero-scroll">
            {repeated.map((tag, i) => (
              <span
                key={i}
                className={`flex-shrink-0 mx-6 text-xs font-mono uppercase tracking-widest ${
                  isDark ? "text-zinc-500" : "text-zinc-400"
                }`}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Asymmetric text layout */}
      <div className="relative w-full max-w-7xl px-6 flex flex-col gap-4">
        <p
          className={`lg:absolute left-6 md:top-[40%] md:max-w-sm font-black text-3xl uppercase max-md:text-center sm:text-5xl md:text-7xl leading-none tracking-tight`}
        >
          {title}
        </p>
        <p
          className={`lg:absolute right-6 md:top-[45%] lg:max-w-md xl:max-w-3xl text-right max-md:text-center sm:text-lg leading-relaxed ${
            isDark ? "text-zinc-300" : "text-zinc-600"
          }`}
        >
          {tagline}
        </p>
      </div>

      {description && (
        <p
          className={`absolute bottom-8 md:left-6 px-4 max-w-xl text-justify text-xs leading-relaxed ${
            isDark ? "text-zinc-500" : "text-zinc-400"
          }`}
        >
          {description}
        </p>
      )}
    </section>
  );
}
