"use client";

import Link from "next/link";
import { useState } from "react";

export default function BalancePage() {
  // energy IN (food) and OUT (activity) — relative units, educational only
  const [foodIn, setFoodIn] = useState(2000);
  const [activityOut, setActivityOut] = useState(2000);

  const diff = foodIn - activityOut;          // + = surplus, - = deficit
  const tilt = Math.max(-14, Math.min(14, -diff / 90)); // beam rotation, capped
  const tooLow = activityOut - foodIn > 1000;  // eating far too little

  let verdict: { title: string; body: string; color: string };
  if (tooLow) {
    verdict = {
      title: "Too steep — this backfires.",
      body: "A very large gap means eating far too little. The body fights back: energy drops, muscle is lost, and it rarely lasts. A gentle, livable gap wins.",
      color: "var(--coral)",
    };
  } else if (diff > 200) {
    verdict = {
      title: "Surplus — weight tends to rise.",
      body: "More energy in than out, over time, is stored. Not a moral failing — just physics. One day doesn't matter; the pattern over weeks does.",
      color: "var(--amber)",
    };
  } else if (diff < -200) {
    verdict = {
      title: "A sensible deficit — fat loss territory.",
      body: "Slightly less in than out, kept up over time, is what drives fat loss. Livable and steady beats drastic every time.",
      color: "var(--green)",
    };
  } else {
    verdict = {
      title: "Balanced — weight tends to hold.",
      body: "Energy in roughly matches energy out, so weight stays put. This is 'maintenance' — useful to know your starting point.",
      color: "var(--teal)",
    };
  }

  const Slider = ({ label, emoji, value, set, color }: { label: string; emoji: string; value: number; set: (n: number) => void; color: string }) => (
    <div className="bg-white rounded-2xl border p-4" style={{ borderColor: "var(--hair)" }}>
      <div className="flex items-center justify-between mb-2">
        <span className="font-semibold flex items-center gap-2" style={{ color: "var(--ink)" }}><span className="text-xl">{emoji}</span> {label}</span>
        <span className="font-serif-display font-bold" style={{ color }}>{value}</span>
      </div>
      <input type="range" min={1000} max={3500} step={50} value={value} onChange={(e) => set(+e.target.value)} className="w-full" style={{ accentColor: color }} />
    </div>
  );

  return (
    <main className="min-h-screen">
      <header style={{ background: "var(--ink)" }} className="px-5 py-4">
        <div className="max-w-5xl mx-auto flex items-center gap-3">
          <Link href="/learn" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg flex items-center justify-center text-white font-serif-display text-xl font-bold" style={{ background: "var(--teal)" }}>+</div>
            <div className="text-white">
              <div className="font-bold leading-tight text-sm sm:text-base">The Weight-Loss System</div>
              <div className="text-[10px] sm:text-xs tracking-widest uppercase" style={{ color: "var(--mint)" }}>Good to know</div>
            </div>
          </Link>
          <nav className="ml-auto flex gap-1.5">
            <Link href="/learn" className="px-3 py-1.5 rounded-lg text-sm font-semibold" style={{ color: "#9FC4C8" }}>← Learn</Link>
          </nav>
        </div>
      </header>

      <section className="max-w-3xl mx-auto px-5 py-8 sm:py-12 rise">
        <div className="text-sm font-bold tracking-widest uppercase mb-3" style={{ color: "var(--teal)" }}>Interactive · good to know</div>
        <h1 className="font-serif-display font-bold mb-3" style={{ color: "var(--ink)", fontSize: "clamp(1.8rem, 5vw, 2.8rem)" }}>
          The whole game, on one scale.
        </h1>
        <p className="text-base sm:text-lg mb-8" style={{ color: "var(--muted)" }}>
          Weight change isn&apos;t magic foods or willpower — it&apos;s energy <b>in</b> versus energy <b>out</b>, balanced over time. Slide each side and watch it tip.
        </p>

        {/* the balance */}
        <div className="bg-white rounded-3xl border p-6 mb-6" style={{ borderColor: "var(--hair)" }}>
          <svg viewBox="0 0 400 220" className="w-full" style={{ maxHeight: 240 }}>
            {/* fulcrum */}
            <polygon points="200,200 180,150 220,150" fill="var(--ink)" />
            {/* beam */}
            <g style={{ transform: `rotate(${tilt}deg)`, transformOrigin: "200px 150px", transition: "transform 0.4s ease" }}>
              <rect x="60" y="144" width="280" height="12" rx="6" fill="var(--teal)" />
              {/* left pan: food in */}
              <line x1="110" y1="150" x2="110" y2="110" stroke="var(--ink)" strokeWidth="2" />
              <circle cx="110" cy="100" r="26" fill="#FBF1E0" stroke="var(--ink)" strokeWidth="2" />
              <text x="110" y="107" fontSize="22" textAnchor="middle">🍽️</text>
              {/* right pan: activity out */}
              <line x1="290" y1="150" x2="290" y2="110" stroke="var(--ink)" strokeWidth="2" />
              <circle cx="290" cy="100" r="26" fill="#E8F3EC" stroke="var(--ink)" strokeWidth="2" />
              <text x="290" y="107" fontSize="22" textAnchor="middle">🏃</text>
            </g>
            <text x="110" y="215" fontSize="12" textAnchor="middle" fill="#5E7178" fontFamily="Arial">energy in</text>
            <text x="290" y="215" fontSize="12" textAnchor="middle" fill="#5E7178" fontFamily="Arial">energy out</text>
          </svg>
        </div>

        {/* verdict */}
        <div className="rounded-2xl p-4 mb-6" style={{ background: "#fff", border: `1.5px solid ${verdict.color}` }}>
          <div className="font-bold mb-1" style={{ color: verdict.color }}>{verdict.title}</div>
          <p className="text-sm" style={{ color: "var(--muted)" }}>{verdict.body}</p>
        </div>

        {/* sliders */}
        <div className="grid sm:grid-cols-2 gap-3 mb-6">
          <Slider label="Energy in (food)" emoji="🍽️" value={foodIn} set={setFoodIn} color="var(--amber)" />
          <Slider label="Energy out (activity)" emoji="🏃" value={activityOut} set={setActivityOut} color="var(--green)" />
        </div>

        <div className="rounded-2xl p-4 text-sm mb-6" style={{ background: "var(--paper)", color: "var(--muted)" }}>
          <b>The honest catch:</b> what matters is the balance <i>over weeks</i>, not one day. And the numbers here are illustrative — your real energy out is unique to you, which is exactly what the program measures.
        </div>

        <div className="rounded-2xl p-4 text-sm" style={{ background: "#E4EEF0", color: "var(--ink)" }}>
          These sliders teach the idea — they&apos;re not a personal target. Your own numbers come after a quick health check.
        </div>

        <div className="mt-8"><Link href="/learn" className="font-semibold" style={{ color: "var(--teal)" }}>← Back to Good to Know</Link></div>
      </section>
    </main>
  );
}