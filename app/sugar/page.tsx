"use client";

import Link from "next/link";
import { useState } from "react";

type Drink = { name: string; emoji: string; grams: number; note?: string };

// grams of sugar per typical serving (brands vary); 1 tsp ≈ 4 g
const DRINKS: Drink[] = [
  { name: "Soda (1 can)", emoji: "🥤", grams: 35 },
  { name: "Packaged juice", emoji: "🧃", grams: 30, note: "Often marketed as healthy — but close to soda." },
  { name: "Sweet chai (1 cup)", emoji: "🍵", grams: 16, note: "Two spoons of sugar is common — it adds up daily." },
  { name: "Energy drink", emoji: "⚡", grams: 38 },
  { name: "Flavoured yogurt drink", emoji: "🥛", grams: 22, note: "‘Healthy’ on the label, sugary inside." },
  { name: "Bottled iced tea", emoji: "🧋", grams: 24 },
  { name: "Fresh orange juice", emoji: "🍊", grams: 21, note: "Natural — but still concentrated sugar, no fibre." },
  { name: "Water", emoji: "💧", grams: 0, note: "The honest hero. Zero sugar, fills the gap." },
];

const GRAMS_PER_TSP = 4;

export default function SugarPage() {
  const [picked, setPicked] = useState<Drink | null>(null);

  const tsp = picked ? Math.round(picked.grams / GRAMS_PER_TSP) : 0;

  return (
    <main className="min-h-screen">
      <header style={{ background: "var(--ink)" }} className="px-5 py-4">
        <div className="max-w-5xl mx-auto flex items-center gap-3">
          <Link href="/think-again" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg flex items-center justify-center text-white font-serif-display text-xl font-bold" style={{ background: "var(--teal)" }}>+</div>
            <div className="text-white">
              <div className="font-bold leading-tight text-sm sm:text-base">The Weight-Loss System</div>
              <div className="text-[10px] sm:text-xs tracking-widest uppercase" style={{ color: "var(--mint)" }}>Think again</div>
            </div>
          </Link>
          <nav className="ml-auto flex gap-1.5">
            <Link href="/think-again" className="px-3 py-1.5 rounded-lg text-sm font-semibold" style={{ color: "#9FC4C8" }}>← All myths</Link>
          </nav>
        </div>
      </header>

      <section className="max-w-3xl mx-auto px-5 py-8 sm:py-12 rise">
        <div className="text-xs font-bold tracking-widest uppercase mb-2" style={{ color: "var(--teal)" }}>The myth</div>
        <h1 className="font-serif-display font-bold mb-3" style={{ color: "var(--ink)", fontSize: "clamp(1.8rem, 5vw, 2.8rem)" }}>
          &ldquo;It&apos;s just a drink.&rdquo;
        </h1>
        <p className="text-base sm:text-lg mb-8" style={{ color: "var(--muted)" }}>
          Pick a drink and watch the sugar pile up — one teaspoon at a time. Liquid sugar is the easiest to swallow and the easiest to miss.
        </p>

        {/* picker */}
        <div className="flex flex-wrap gap-2 mb-8">
          {DRINKS.map((d) => (
            <button key={d.name} onClick={() => setPicked(d)} className="rounded-full border px-3.5 py-2 text-sm font-medium"
              style={{ borderColor: picked?.name === d.name ? "var(--teal)" : "var(--hair)", background: picked?.name === d.name ? "var(--teal)" : "white", color: picked?.name === d.name ? "white" : "var(--text)" }}>
              {d.emoji} {d.name}
            </button>
          ))}
        </div>

        {/* result */}
        {picked ? (
          <div className="bg-white rounded-3xl border p-6 mb-6 text-center rise" style={{ borderColor: "var(--hair)" }}>
            <div className="text-5xl mb-2">{picked.emoji}</div>
            <div className="font-bold text-lg mb-1" style={{ color: "var(--ink)" }}>{picked.name}</div>

            {tsp === 0 ? (
              <div className="my-5">
                <div className="font-serif-display font-bold" style={{ color: "var(--green)", fontSize: "2.5rem" }}>0</div>
                <div className="font-semibold" style={{ color: "var(--ink)" }}>teaspoons of sugar</div>
              </div>
            ) : (
              <>
                {/* the teaspoons, visually piled */}
                <div className="flex flex-wrap justify-center gap-1.5 my-5 max-w-md mx-auto">
                  {Array.from({ length: tsp }).map((_, i) => (
                    <span key={i} className="text-2xl rise" style={{ animationDelay: `${i * 0.06}s` }}>🥄</span>
                  ))}
                </div>
                <div className="font-serif-display font-bold" style={{ color: "var(--coral)", fontSize: "2.5rem", lineHeight: 1 }}>
                  {tsp}
                </div>
                <div className="font-semibold mb-2" style={{ color: "var(--ink)" }}>teaspoons of sugar</div>
                <div className="text-sm" style={{ color: "var(--muted)" }}>≈ {picked.grams} g · would you spoon {tsp} into a cup yourself?</div>
              </>
            )}

            {picked.note && (
              <div className="rounded-2xl p-4 mt-4 text-sm" style={{ background: picked.grams === 0 ? "#E8F3EC" : "#FBF1E0", color: picked.grams === 0 ? "#2f6b46" : "#9a6a10" }}>
                {picked.note}
              </div>
            )}
          </div>
        ) : (
          <div className="rounded-2xl p-4 text-sm mb-6" style={{ background: "var(--paper)", color: "var(--muted)" }}>
            👆 Pick a drink above to see its sugar.
          </div>
        )}

        {/* the honest insight */}
        <div className="rounded-2xl p-4 text-sm mb-6" style={{ background: "#E4EEF0", color: "var(--ink)" }}>
          <b>Why drinks are sneaky:</b> sugar you drink doesn&apos;t fill you up like food — so the calories slip in on top of everything else. Swapping one sugary drink a day is one of the easiest wins there is.
        </div>

        <div className="rounded-2xl p-4 text-sm" style={{ background: "#E8F3EC", color: "#2f6b46" }}>
          <b>Not about fear:</b> an occasional treat is fine. The point is simply to <i>see</i> what&apos;s there, so it&apos;s a choice — not a surprise. Numbers vary by brand; these are typical.
        </div>

        <div className="mt-8"><Link href="/think-again" className="font-semibold" style={{ color: "var(--teal)" }}>← Back to all myths</Link></div>
      </section>
    </main>
  );
}