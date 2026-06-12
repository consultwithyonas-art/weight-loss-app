"use client";

import Link from "next/link";
import { useState } from "react";

type Mod = {
  key: string; label: string; emoji: string; group: "modifier" | "disease";
  inMult?: number; outMult?: number; dir: string; note: string;
};

const MODS: Mod[] = [
  { key: "muscle", label: "More muscle", emoji: "💪", group: "modifier", outMult: 1.08, dir: "↑ OUT",
    note: "Muscle is metabolically active — it raises your resting burn. More muscle = a bigger OUT, even at rest." },
  { key: "sleep", label: "Poor sleep", emoji: "😴", group: "modifier", outMult: 0.97, inMult: 1.06, dir: "↓ OUT · ↑ IN",
    note: "Short sleep lowers daily movement (NEAT) and raises appetite hormones — nudging OUT down and IN up." },
  { key: "stress", label: "High stress", emoji: "😣", group: "modifier", inMult: 1.05, dir: "↑ IN",
    note: "Chronic stress raises cortisol and appetite, and centralises fat storage. It tips the terms, not the law." },
  { key: "neat", label: "Active lifestyle (NEAT)", emoji: "🚶", group: "modifier", outMult: 1.12, dir: "↑ OUT",
    note: "Non-exercise movement — walking, chores, fidgeting — varies by hundreds of kcal between people. Often bigger than the gym." },
  { key: "protein", label: "High-protein diet", emoji: "🍗", group: "modifier", outMult: 1.05, dir: "↑ OUT",
    note: "Protein costs the most energy to digest (the thermic effect of food) and preserves muscle — gently raising OUT." },
  { key: "hyper", label: "Hyperthyroidism", emoji: "🔥", group: "disease", outMult: 1.2, dir: "↑ OUT",
    note: "An overactive thyroid raises BMR — OUT climbs, often with unintentional weight loss. A medical sign, not a goal. See a doctor." },
  { key: "hypo", label: "Hypothyroidism", emoji: "🦋", group: "disease", outMult: 0.85, dir: "↓ OUT",
    note: "An underactive thyroid lowers BMR — the OUT side shrinks. Weight can rise on the same intake. Needs medical care." },
  { key: "malabsorption", label: "Malabsorption (coeliac, IBD)", emoji: "🌾", group: "disease", inMult: 0.8, dir: "↓ IN",
    note: "When the gut lining is damaged, food eaten isn't fully absorbed — energy IN is less than energy eaten. Needs diagnosis." },
  { key: "fluid", label: "Fluid retention (nephrotic, heart/liver)", emoji: "💧", group: "disease", dir: "water, not fat",
    note: "Some diseases retain water — the scale rises with no change in energy balance at all. This is weight, not fat. See a doctor." },
];

export default function EnergyPage() {
  const [foodIn, setFoodIn] = useState(2200);
  const [baseOut, setBaseOut] = useState(2200);
  const [on, setOn] = useState<Record<string, boolean>>({});
  const toggle = (k: string) => setOn((s) => ({ ...s, [k]: !s[k] }));

  const active = MODS.filter((m) => on[m.key]);
  const inMult = active.reduce((p, m) => p * (m.inMult ?? 1), 1);
  const outMult = active.reduce((p, m) => p * (m.outMult ?? 1), 1);

  const absorbedIn = Math.round(foodIn * inMult);
  const realOut = Math.round(baseOut * outMult);
  const diff = absorbedIn - realOut;            // + surplus, - deficit
  const fluidOn = !!on["fluid"];

  // body: widens with surplus, narrows with deficit; fluid adds water width separately
  const fatWidth = Math.max(-26, Math.min(42, diff / 16));
  const waterWidth = fluidOn ? 24 : 0;
  const bellyW = 64 + fatWidth + waterWidth;

  // bars: scale each side to a max for display
  const maxSide = Math.max(absorbedIn, realOut, 1);
  const inBar = (absorbedIn / maxSide) * 100;
  const outBar = (realOut / maxSide) * 100;

  const state = diff > 200 ? "surplus" : diff < -200 ? "deficit" : "balanced";
  const STATE: Record<string, { word: string; color: string; net: string }> = {
    surplus:  { word: "gaining fat",   color: "var(--amber)", net: "net energy → stored as fat" },
    deficit:  { word: "losing fat",    color: "var(--green)", net: "net energy → fat is burned" },
    balanced: { word: "holding steady", color: "var(--teal)", net: "in ≈ out → weight holds" },
  };

  return (
    <main className="min-h-screen">
      <header style={{ background: "var(--ink)" }} className="px-5 py-4">
        <div className="max-w-5xl mx-auto flex items-center gap-3">
          <Link href="/learn" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg flex items-center justify-center text-white font-serif-display text-xl font-bold" style={{ background: "var(--teal)" }}>+</div>
            <div className="text-white">
              <div className="font-bold leading-tight text-sm sm:text-base">The Weight-Loss System</div>
              <div className="text-[10px] sm:text-xs tracking-widest uppercase" style={{ color: "var(--mint)" }}>Deep dive</div>
            </div>
          </Link>
          <nav className="ml-auto flex gap-1.5">
            <Link href="/balance" className="px-3 py-1.5 rounded-lg text-sm font-semibold" style={{ color: "#9FC4C8" }}>Simple version</Link>
            <Link href="/learn" className="px-3 py-1.5 rounded-lg text-sm font-semibold" style={{ color: "#9FC4C8" }}>← Learn</Link>
          </nav>
        </div>
      </header>

      <section className="max-w-3xl mx-auto px-5 py-8 sm:py-12 rise">
        <div className="inline-block text-xs font-bold tracking-widest uppercase mb-3 px-3 py-1 rounded-full" style={{ background: "#E4EEF0", color: "var(--teal)" }}>Deep dive · how the body really works</div>
        <h1 className="font-serif-display font-bold mb-3" style={{ color: "var(--ink)", fontSize: "clamp(1.8rem, 5vw, 2.8rem)" }}>
          The balance is the law. Everything else sets its terms.
        </h1>
        <p className="text-base sm:text-lg mb-8" style={{ color: "var(--muted)" }}>
          Energy in vs out is still physics. Hormones, sleep, muscle, the gut and disease <b>move the dials</b> — they change how big each side is. Toggle them and watch the body respond.
        </p>

        {/* THE BODY — the star */}
        <div className="bg-white rounded-3xl border p-6 mb-4 flex flex-col items-center" style={{ borderColor: "var(--hair)" }}>
          <div className="text-xs font-bold tracking-widest uppercase mb-2" style={{ color: "var(--muted)" }}>What happens to the body over time</div>
          <svg viewBox="0 0 160 230" className="w-full" style={{ maxHeight: 230 }}>
            <circle cx="80" cy="36" r="22" fill="#E4EEF0" stroke="var(--ink)" strokeWidth="2.5" />
            <path
              d={`M58 60 L102 60
                  M58 60 Q${80 - bellyW / 2} 78 ${80 - bellyW / 2} 130 Q${80 - bellyW / 2} 162 66 182 L70 212
                  M102 60 Q${80 + bellyW / 2} 78 ${80 + bellyW / 2} 130 Q${80 + bellyW / 2} 162 94 182 L90 212`}
              fill={fluidOn ? "#E4EFF2" : "#FBF1E0"} stroke="var(--ink)" strokeWidth="2.5"
              style={{ transition: "d 0.45s ease, fill 0.3s ease" }}
            />
          </svg>
          <div className="font-serif-display font-bold text-lg" style={{ color: fluidOn ? "var(--coral)" : STATE[state].color }}>
            {fluidOn ? "wider — but water, not fat" : STATE[state].word}
          </div>
        </div>

        {/* THE COMPARISON — minor */}
        <div className="bg-white rounded-3xl border p-5 mb-4" style={{ borderColor: "var(--hair)" }}>
          <div className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: "var(--muted)" }}>Which side is bigger right now</div>
          <div className="flex items-end justify-center gap-8" style={{ height: 120 }}>
            <div className="flex flex-col items-center justify-end h-full">
              <span className="text-sm font-bold mb-1" style={{ color: "#9a6a10" }}>{absorbedIn}</span>
              <div className="w-16 rounded-t-lg" style={{ height: `${inBar}%`, background: "var(--amber)", transition: "height 0.4s ease" }} />
              <span className="text-xs font-semibold mt-1" style={{ color: "var(--muted)" }}>🍽️ IN</span>
            </div>
            <div className="flex flex-col items-center justify-end h-full">
              <span className="text-sm font-bold mb-1" style={{ color: "#2f6b46" }}>{realOut}</span>
              <div className="w-16 rounded-t-lg" style={{ height: `${outBar}%`, background: "var(--green)", transition: "height 0.4s ease" }} />
              <span className="text-xs font-semibold mt-1" style={{ color: "var(--muted)" }}>🔥 OUT</span>
            </div>
          </div>
          <div className="text-center mt-3 text-sm font-semibold" style={{ color: STATE[state].color }}>
            {STATE[state].net}
          </div>
        </div>

        {fluidOn && (
          <div className="rounded-2xl p-4 mb-6 text-sm font-semibold" style={{ background: "#FBEEEA", color: "var(--coral)" }}>
            Fluid retention widened the body without changing the IN/OUT bars at all — proof the scale isn&apos;t always fat.
          </div>
        )}

        {/* base sliders */}
        <div className="grid sm:grid-cols-2 gap-3 mb-6">
          <div className="bg-white rounded-2xl border p-4" style={{ borderColor: "var(--hair)" }}>
            <div className="flex items-center justify-between mb-2"><span className="font-semibold flex items-center gap-2" style={{ color: "var(--ink)" }}>🍽️ Food eaten</span><span className="font-serif-display font-bold" style={{ color: "var(--amber)" }}>{foodIn}</span></div>
            <input type="range" min={1200} max={3500} step={50} value={foodIn} onChange={(e) => setFoodIn(+e.target.value)} className="w-full" style={{ accentColor: "var(--amber)" }} />
          </div>
          <div className="bg-white rounded-2xl border p-4" style={{ borderColor: "var(--hair)" }}>
            <div className="flex items-center justify-between mb-2"><span className="font-semibold flex items-center gap-2" style={{ color: "var(--ink)" }}>🔥 Base burn</span><span className="font-serif-display font-bold" style={{ color: "var(--green)" }}>{baseOut}</span></div>
            <input type="range" min={1200} max={3500} step={50} value={baseOut} onChange={(e) => setBaseOut(+e.target.value)} className="w-full" style={{ accentColor: "var(--green)" }} />
          </div>
        </div>

        <div className="text-sm font-bold tracking-widest uppercase mb-2" style={{ color: "var(--teal)" }}>Everyday modifiers</div>
        <div className="grid sm:grid-cols-2 gap-2.5 mb-6">
          {MODS.filter((m) => m.group === "modifier").map((m) => {
            const isOn = !!on[m.key];
            return (
              <button key={m.key} onClick={() => toggle(m.key)} className="text-left rounded-2xl border p-3.5 flex items-center justify-between"
                style={{ borderColor: isOn ? "var(--teal)" : "var(--hair)", background: "#fff", boxShadow: isOn ? "inset 0 0 0 2px var(--teal)" : undefined }}>
                <span className="font-semibold flex items-center gap-2" style={{ color: "var(--ink)" }}><span className="text-lg">{m.emoji}</span>{m.label}</span>
                <span className="text-[11px] font-bold" style={{ color: "var(--teal)" }}>{m.dir}</span>
              </button>
            );
          })}
        </div>

        <div className="text-sm font-bold tracking-widest uppercase mb-2" style={{ color: "var(--coral)" }}>Disease states (medical)</div>
        <div className="grid sm:grid-cols-2 gap-2.5 mb-6">
          {MODS.filter((m) => m.group === "disease").map((m) => {
            const isOn = !!on[m.key];
            return (
              <button key={m.key} onClick={() => toggle(m.key)} className="text-left rounded-2xl border p-3.5 flex items-center justify-between"
                style={{ borderColor: isOn ? "var(--coral)" : "var(--hair)", background: "#fff", boxShadow: isOn ? "inset 0 0 0 2px var(--coral)" : undefined }}>
                <span className="font-semibold flex items-center gap-2" style={{ color: "var(--ink)" }}><span className="text-lg">{m.emoji}</span>{m.label}</span>
                <span className="text-[11px] font-bold" style={{ color: "var(--coral)" }}>{m.dir}</span>
              </button>
            );
          })}
        </div>

        {active.length > 0 && (
          <div className="flex flex-col gap-2.5 mb-6">
            {active.map((m) => (
              <div key={m.key} className="rounded-2xl p-4" style={{ background: "#fff", border: `1.5px solid ${m.group === "disease" ? "var(--coral)" : "var(--teal)"}` }}>
                <div className="font-bold mb-1 flex items-center gap-2" style={{ color: "var(--ink)" }}><span>{m.emoji}</span>{m.label}</div>
                <p className="text-sm" style={{ color: "var(--muted)" }}>{m.note}</p>
              </div>
            ))}
          </div>
        )}

        <div className="rounded-2xl p-4 text-sm" style={{ background: "#E4EEF0", color: "var(--ink)" }}>
          <b>The takeaway:</b> none of these repeal the energy balance — they change its <i>terms</i>. That&apos;s why a real plan screens for them first, then works <i>with</i> your body. This board teaches the idea; it isn&apos;t a personal calculation.
        </div>

        <div className="mt-8"><Link href="/learn" className="font-semibold" style={{ color: "var(--teal)" }}>← Back to Good to Know</Link></div>
      </section>
    </main>
  );
}