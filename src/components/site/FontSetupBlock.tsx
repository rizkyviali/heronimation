"use client";

import { useState } from "react";
import CodeBlock from "./CodeBlock";

const FONT_SNIPPET = `// app/layout.tsx
import { Geist } from "next/font/google";

const geist = Geist({ subsets: ["latin"] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={geist.className}>
      <body>{children}</body>
    </html>
  );
}`;

export default function FontSetupBlock() {
  const [open, setOpen] = useState(false);

  return (
    <div className="rounded-lg border border-zinc-800 bg-zinc-900/50">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between px-4 py-3 text-sm text-zinc-400 hover:text-white transition-colors"
      >
        <span>
          Font setup{" "}
          <code className="rounded bg-zinc-800 px-1.5 py-0.5 text-xs text-lime-400">
            next/font/google
          </code>
        </span>
        <span className="text-xs">{open ? "▲" : "▼"}</span>
      </button>
      {open && (
        <div className="border-t border-zinc-800 px-4 pb-4 pt-3">
          <p className="mb-3 text-xs text-zinc-500">
            This component uses the{" "}
            <span className="text-zinc-300">Geist</span> font. Add the following
            to your <code className="text-lime-400">app/layout.tsx</code> if you
            haven&apos;t already.
          </p>
          <CodeBlock code={FONT_SNIPPET} language="tsx" />
        </div>
      )}
    </div>
  );
}
