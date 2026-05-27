import Link from "next/link";
import Navbar from "@/components/site/Navbar";
import { heroVariants } from "@/lib/registry";

function VariantCard({ variant }: { variant: (typeof heroVariants)[number] }) {
  return (
    <Link
      href={`/${variant.slug}`}
      className="group flex flex-col gap-4 rounded-2xl border border-zinc-800 bg-zinc-900 p-6 transition-colors hover:border-zinc-600"
    >
      <div className="flex items-start justify-between">
        <div>
          <h2 className="mb-1 font-semibold text-white group-hover:text-lime-400 transition-colors">
            {variant.name}
          </h2>
          <p className="text-sm leading-relaxed text-zinc-500">
            {variant.description}
          </p>
        </div>
        <span className="ml-4 flex-shrink-0 text-zinc-600 group-hover:text-lime-400 transition-colors">
          →
        </span>
      </div>

      <div className="flex flex-wrap gap-2">
        {variant.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full bg-zinc-800 px-2.5 py-0.5 text-xs font-medium text-zinc-400"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="mt-auto flex items-center gap-3 text-xs text-zinc-600">
        <span>{variant.props.length} props</span>
        <span>·</span>
        <span>Tailwind</span>
      </div>
    </Link>
  );
}

export default function HomePage() {
  const heroes = heroVariants.filter((v) => v.type !== "component");
  const components = heroVariants.filter((v) => v.type === "component");

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <Navbar />

      <main className="mx-auto max-w-7xl px-6 py-16">
        <div className="mb-14 max-w-2xl">
          <span className="mb-4 inline-block rounded-full border border-lime-400/30 bg-lime-400/10 px-3 py-1 text-xs font-semibold text-lime-400 uppercase tracking-widest">
            Component Library
          </span>
          <h1 className="mb-4 text-4xl font-black tracking-tight sm:text-5xl">
            Hero<span className="text-lime-400">nimation</span>
          </h1>
          <p className="text-lg leading-relaxed text-zinc-400">
            Animated hero sections extracted from real projects. Browse a
            variant, preview it live, and copy the code — no install needed.
          </p>
        </div>

        <section className="mb-16">
          <h2 className="mb-6 text-xs font-semibold uppercase tracking-widest text-zinc-500">
            Hero Sections
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {heroes.map((variant) => (
              <VariantCard key={variant.slug} variant={variant} />
            ))}
          </div>
        </section>

        {components.length > 0 && (
          <section>
            <h2 className="mb-6 text-xs font-semibold uppercase tracking-widest text-zinc-500">
              UI Components
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {components.map((variant) => (
                <VariantCard key={variant.slug} variant={variant} />
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
