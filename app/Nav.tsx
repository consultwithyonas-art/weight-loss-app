"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKS = [
  { href: "/tools", label: "Food" },
  { href: "/bmr", label: "BMR" },
  { href: "/meals", label: "Meals" },
  { href: "/learn", label: "Learn" },
  { href: "/think-again", label: "Think Again" },
];

export default function Nav({ tagline = "Open tools" }: { tagline?: string }) {
  const path = usePathname();
  return (
    <header style={{ background: "var(--ink)" }} className="px-5 py-4">
      <div className="max-w-5xl mx-auto flex items-center gap-3">
        <Link href="/" className="flex items-center gap-2.5 shrink-0">
          <div className="w-9 h-9 rounded-lg flex items-center justify-center text-white font-serif-display text-xl font-bold" style={{ background: "var(--teal)" }}>+</div>
          <div className="text-white">
            <div className="font-bold leading-tight text-sm sm:text-base">The Weight-Loss System</div>
            <div className="text-[10px] sm:text-xs tracking-widest uppercase" style={{ color: "var(--mint)" }}>{tagline}</div>
          </div>
        </Link>
        <nav className="ml-auto flex gap-1 flex-wrap justify-end">
          {LINKS.map((l) => {
            const active = path === l.href;
            return (
              <Link key={l.href} href={l.href} className="px-2.5 py-1.5 rounded-lg text-sm font-semibold"
                style={{ color: active ? "white" : "#9FC4C8", background: active ? "rgba(255,255,255,0.12)" : "transparent" }}>
                {l.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}