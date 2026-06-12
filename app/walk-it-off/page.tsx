"use client";

import Link from "next/link";
import { useState } from "react";

type Item = { name: string; emoji: string; kcalLo: number; kcalHi: number };

const ITEMS: Item[] = [
  { name: "Soda (1 can)", emoji: "🥤", kcalLo: 130, kcalHi: 155 },
  { name: "Mandazi", emoji: "🍩", kcalLo: 200, kcalHi: 260 },
  { name: "Chapati", emoji: "🫓", kcalLo: 240, kcalHi: 300 },
  { name: "Fried plantain (1 cup)", emoji: "🍌", kcalLo: 300, kcalHi: 360 },
  { name: "Sweet chai (1 cup)", emoji: "🍵", kcalLo: 90, kcalHi: 120 },
  { name: "Mandazi + soda", emoji: "🍩", kcalLo: 330, kcalHi: 415 },
  { name: "Packaged juice", emoji: "🧃", kcalLo: 110, kcalHi: 150 },
  { name: "Samosa", emoji: "🥟", kcalLo: 150, kcalHi: 200 },
  { name: "Groundnuts (handful)", emoji: "🥜", kcalLo: 160, kcalHi: 200 },
  { name: "Plate of fried rice", emoji: "🍚", kcalLo: 500, kcalHi: 650 },
];

// walking burns ~3.5–4 kcal/min for an average adult (varies with weight & pace)
const BURN_LO = 3.5;
const BURN_HI = 4.0;

export default function WalkItOffPage() {
  const [picked, setPicked] = useState<Item | null>(null);
  const [revealed, setRevealed] = useState(false);

  const pick = (it: Item) => { setPicked(it); setRevealed(false); };

  // minutes to walk it off (note: high kcal / low burn = MORE minutes, so swap)
  const minLo = picked ? Math.round(picked.kcalLo / BURN_HI) : 0;
  const minHi = picked ? Math.round(picked.kcalHi / BURN_LO) : 0;

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
          &ldquo;I&apos;ll just burn it off later.&rdquo;
        </h1>
        <p className="text-base sm:text-lg mb-8" style={{ color: "var(--muted)" }}>
          Pick something below and see how long you&apos;d have to <b>walk</b> to burn it off. The numbers surprise most people.
        </p>

        {/* picker */}
        <div className="flex flex-wrap gap-2 mb-8">
          {ITEMS.map((it) => (
            <button key={it.name} onClick={() => pick(it)} className="rounded-full border px-3.5 py-2 text-sm font-medium"
              style={{ borderColor: picked?.name === it.name ? "var(--teal)" : "var(--hair)", background: picked?.name === it.name ? "var(--teal)" : "white", color: picked?.name === it.name ? "white" : "var(--text)" }}>
              {it.emoji} {it.name}
            </button>
          ))}
        </div>

        {/* result */}
        {picked && (
          <div className="bg-white rounded-3xl border p-6 mb-6 text-center rise" style={{ borderColor: "var(--hair)" }}>
            <div className="text-5xl mb-3">{picked.emoji}</div>
            <div className="font-bold text-lg mb-1" style={{ color: "var(--ink)" }}>{picked.name}</div>
            <div className="text-sm mb-5" style={{ color: "var(--muted)" }}>≈ {picked.kcalLo}–{picked.kcalHi} kcal</div>

            {!revealed ? (
              <button onClick={() => setRevealed(true)} className="px-6 py-3 rounded-xl font-semibold text-white" style={{ background: "var(--teal)" }}>
                How long to walk it off? →
              </button>
            ) : (
              <div className="rise">
                <div className="text-sm" style={{ color: "var(--muted)" }}>You&apos;d need to walk about</div>
                <div className="font-serif-display font-bold my-1" style={{ color: "var(--coral)", fontSize: "3rem", lineHeight: 1 }}>
                  {minLo}–{minHi}
                </div>
                <div className="font-semibold mb-4" style={{ color: "var(--ink)" }}>minutes 🚶</div>
                <div className="rounded-2xl p-4 text-sm" style={{ background: "#FBF1E0", color: "#9a6a10" }}>
                  That&apos;s the honest catch: it takes <b>seconds to eat</b> and a <b>long walk to undo</b>. This is why you can&apos;t out-walk your fork — what you eat matters more than burning it off later.
                </div>
              </div>
            )}
          </div>
        )}

        {!picked && (
          <div className="rounded-2xl p-4 text-sm mb-6" style={{ background: "var(--paper)", color: "var(--muted)" }}>
            👆 Pick a food or drink above to start.
          </div>
        )}

        {/* honest balance — don't shame movement */}
        <div className="rounded-2xl p-4 text-sm mb-6" style={{ background: "#E8F3EC", color: "#2f6b46" }}>
          <b>To be clear:</b> walking is wonderful — for your heart, mood, sleep and health. The point isn&apos;t &ldquo;don&apos;t move.&rdquo; It&apos;s that movement is a poor <i>eraser</i> for food. Move because it&apos;s good for you; manage weight mainly through what&apos;s on the plate.
        </div>

        <div className="rounded-2xl p-4 text-sm" style={{ background: "#E4EEF0", color: "var(--ink)" }}>
          Numbers are estimates shown as ranges — walking burn varies with your weight and pace. A plan made for you accounts for that.
        </div>

        <div className="mt-8"><Link href="/think-again" className="font-semibold" style={{ color: "var(--teal)" }}>← Back to all myths</Link></div>
      </section>
    </main>
  );
}