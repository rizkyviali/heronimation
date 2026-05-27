import fs from "fs";
import Link from "next/link";
import { notFound } from "next/navigation";
import path from "path";
import CodeBlock from "@/components/site/CodeBlock";
import FontSetupBlock from "@/components/site/FontSetupBlock";
import HeroPreview from "@/components/site/HeroPreview";
import Navbar from "@/components/site/Navbar";
import PropsTable from "@/components/site/PropsTable";
import { getVariant, heroVariants } from "@/lib/registry";

export function generateStaticParams() {
  return heroVariants.map((v) => ({ variant: v.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ variant: string }>;
}) {
  const { variant: slug } = await params;
  const variant = getVariant(slug);
  if (!variant) return {};
  return {
    title: `${variant.name} — Heronimation`,
    description: variant.description,
  };
}

export default async function VariantPage({
  params,
}: {
  params: Promise<{ variant: string }>;
}) {
  const { variant: slug } = await params;
  const variant = getVariant(slug);
  if (!variant) notFound();

  const filePath = path.join(
    process.cwd(),
    "src/components/heroes",
    variant.componentFile,
  );
  const sourceCode = fs.readFileSync(filePath, "utf-8");

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <Navbar />

      <main className="mx-auto max-w-7xl px-6 py-12">
        <nav className="mb-8 flex items-center gap-2 text-sm text-zinc-500">
          <Link href="/" className="hover:text-white transition-colors">
            Components
          </Link>
          <span>/</span>
          <span className="text-zinc-300">{variant.name}</span>
        </nav>

        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-bold">{variant.name}</h1>
          <p className="text-zinc-400">{variant.description}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {variant.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-zinc-800 px-2.5 py-0.5 text-xs font-medium text-zinc-400"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <section className="mb-10">
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-widest text-zinc-500">
            Preview
          </h2>
          <HeroPreview variant={variant} />
        </section>

        <section className="mb-10">
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-widest text-zinc-500">
            Source Code
          </h2>
          <p className="mb-4 text-sm text-zinc-500">
            Copy the file below into your project. Requires{" "}
            <code className="rounded bg-zinc-800 px-1.5 py-0.5 text-xs text-lime-400">
              framer-motion
            </code>
            ,{" "}
            <code className="rounded bg-zinc-800 px-1.5 py-0.5 text-xs text-lime-400">
              tailwindcss
            </code>
            , and{" "}
            <code className="rounded bg-zinc-800 px-1.5 py-0.5 text-xs text-lime-400">
              next/font/google
            </code>
            .
          </p>
          <div className="mb-4">
            <FontSetupBlock />
          </div>
          <CodeBlock code={sourceCode} language="tsx" />
        </section>

        <section>
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-widest text-zinc-500">
            Props
          </h2>
          <PropsTable props={variant.props} />
        </section>
      </main>
    </div>
  );
}
