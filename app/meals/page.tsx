"use client";

import Link from "next/link";
import { useState } from "react";

type Food = { name: string; emoji: string; lo: number; hi: number; p: number };

const FOODS: Food[] = [
  { name: "Chapati", emoji: "🫓", lo: 240, hi: 300, p: 6 },
  { name: "Ugali", emoji: "🍚", lo: 180, hi: 220, p: 4 },
  { name: "Rice", emoji: "🍚", lo: 200, hi: 240, p: 4 },
  { name: "Beans", emoji: "🫘", lo: 220, hi: 260, p: 15 },
  { name: "Chicken", emoji: "🍗", lo: 160, hi: 185, p: 31 },
  { name: "Egg", emoji: "🥚", lo: 70, hi: 85, p: 6 },
  { name: "Tilapia", emoji: "🐟", lo: 120, hi: 145, p: 26 },
  { name: "Greek yogurt", emoji: "🥛", lo: 120, hi: 150, p: 17 },
  { name: "Sukuma wiki", emoji: "🥬", lo: 30, hi: 55, p: 3 },
  { name: "Avocado", emoji: "🥑", lo: 110, hi: 140, p: 1 },
  { name: "Banana", emoji: "🍌", lo: 90, hi: 115, p: 1 },
  { name: "Mango", emoji: "🥭", lo: 130, hi: 160, p: 1 },
  { name: "Groundnuts", emoji: "🥜", lo: 160, hi: 200, p: 7 },
  { name: "Mandazi", emoji: "🍩", lo: 200, hi: 260, p: 4 },
];

const SLOTS = ["Breakfast", "Lunch", "Dinner", "Snacks"] as const;
type Slot = (typeof SLOTS)[number];

export default function MealsPage() {
  const [meal, setMeal] = useState<Record<Slot, Food[]>>({
    Breakfast: [], Lunch: [], Dinner: [], Snacks: [],
  });

  const add = (slot: Slot, food: Food) =>
    setMeal((m) => ({ ...m, [slot]: [...m[slot], food] }));
  const remove = (slot: Slot, idx: number) =>
    setMeal((m) => ({ ...m, [slot]: m[slot].filter((_, i) => i !== idx) }));

  const all = SLOTS.flatMap((s) => meal[s]);
  const lo = all.reduce((sum, f) => sum + f.lo, 0);
  const hi = all.reduce((sum, f) => sum + f.hi, 0);
  const protein = all.reduce((sum, f) => sum + f.p, 0);
  const mid = Math.round((lo + hi) / 2);
  const kcalPct = Math.min(100, (mid / 2000) * 100);
  const protPct = Math.min(100, (protein / 100) * 100);

  return (
    <main className="min-h-screen">
      <header style={{ background: "var(--ink)" }} className="px-6 py-4">
        <div className="max-w-5xl mx-auto flex items-center gap-3">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg flex items-center justify-center text-white font-serif-display text-xl font-bold" style={{ background: "var(--teal)" }}>+</div>
            <div className="text-white">
              <div className="font-bold leading-tight">The Weight-Loss System</div>
              <div className="text-xs tracking-widest uppercase" style={{ color: "var(--mint)" }}>Open tools · free to explore</div>
            </div>
          </Link>
          <nav className="ml-auto flex gap-2">
            <Link href="/tools" className="px-3 py-1.5 rounded-lg text-sm font-semibold" style={{ color: "#9FC4C8" }}>Food</Link>
            <Link href="/bmr" className="px-3 py-1.5 rounded-lg text-sm font-semibold" style={{ color: "#9FC4C8" }}>BMR</Link>
            <Link href="/meals" className="px-3 py-1.5 rounded-lg text-sm font-semibold text-white" style={{ background: "rgba(255,255,255,0.12)" }}>Meals</Link>
          </nav>
        </div>
      </header>

      <section className="max-w-5xl mx-auto px-6 py-12">
        <div className="text-sm font-bold tracking-widest uppercase mb-3" style={{ color: "var(--teal)" }}>Play · educational</div>
        <h1 className="font-serif-display font-bold mb-3" style={{ color: "var(--ink)", fontSize: "clamp(1.8rem, 4vw, 2.6rem)" }}>Build a day, see how it stacks up.</h1>
        <p className="text-lg max-w-2xl mb-8" style={{ color: "var(--muted)" }}>
          Tap foods into meals and watch the totals. This compares against a <em>generic</em> reference day — not a target made for you.
        </p>

        <div className="grid gap-6" style={{ gridTemplateColumns: "1fr minmax(260px, 320px)" }}>
          {/* Slots */}
          <div className="flex flex-col gap-4">
            {SLOTS.map((slot) => (
              <div key={slot} className="bg-white rounded-2xl p-4 border" style={{ borderColor: "var(--hair)" }}>
                <h3 className="font-serif-display font-bold mb-2" style={{ color: "var(--ink)" }}>{slot}</h3>
                <div className="flex flex-col gap-1.5 mb-3">
                  {meal[slot].length === 0 && <span className="text-sm" style={{ color: "var(--muted)" }}>tap foods below to add</span>}
                  {meal[slot].map((f, i) => (
                    <div key={i} className="flex justify-between items-center text-sm rounded-lg px-3 py-2" style={{ background: "var(--paper)" }}>
                      <span>{f.emoji} {f.name}</span>
                      <span className="flex items-center gap-2">
                        {f.lo}–{f.hi} kcal
                        <button onClick={() => remove(slot, i)} style={{ color: "var(--coral)" }} aria-label="Remove">✕</button>
                      </span>
                    </div>
                  ))}
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {FOODS.map((f) => (
                    <button key={f.name} onClick={() => add(slot, f)} className="rounded-full border px-2.5 py-1 text-xs" style={{ borderColor: "var(--hair)", background: "white" }}>
                      {f.emoji} {f.name}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="bg-white rounded-2xl p-6 border h-fit sticky top-4" style={{ borderColor: "var(--hair)" }}>
            <div className="text-xs font-bold tracking-widest uppercase" style={{ color: "var(--teal)" }}>Day total</div>
            <div className="font-serif-display font-bold mb-4" style={{ color: "var(--ink)", fontSize: "1.8rem" }}>
              {lo === hi ? lo : `${lo}–${hi}`} <span className="text-sm font-sans font-normal" style={{ color: "var(--muted)" }}>kcal</span>
            </div>

            <div className="mb-4">
              <div className="flex justify-between text-sm mb-1.5"><span>Calories</span><span>{mid} / ~2000</span></div>
              <div className="h-3 rounded-full overflow-hidden" style={{ background: "#EDF3F4" }}>
                <div className="h-full rounded-full" style={{ width: `${kcalPct}%`, background: mid > 2200 ? "var(--coral)" : "var(--teal)" }} />
              </div>
            </div>
            <div className="mb-4">
              <div className="flex justify-between text-sm mb-1.5"><span>Protein</span><span>{protein} g / ~100 g</span></div>
              <div className="h-3 rounded-full overflow-hidden" style={{ background: "#EDF3F4" }}>
                <div className="h-full rounded-full" style={{ width: `${protPct}%`, background: "var(--green)" }} />
              </div>
            </div>

            <p className="text-xs" style={{ color: "var(--muted)" }}>
              Bars compare to a generic ~2000 kcal / ~100 g protein reference day — a teaching aid, not your plan.
            </p>
            <Link href="/" className="block text-center mt-4 py-2.5 rounded-xl font-semibold text-white" style={{ background: "var(--teal)" }}>
              Start the program →
            </Link>
          </div>
        </div>

        <div className="mt-10">
          <Link href="/tools" className="font-semibold" style={{ color: "var(--teal)" }}>← Back to tools</Link>
        </div>
      </section>
    </main>
  );
}