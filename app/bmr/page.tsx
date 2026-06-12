"use client";

import Link from "next/link";
import { useState } from "react";
import { saveBmr, markIntent } from "../favorites";
import JourneyNudge from "../JourneyNudge";

export default function BmrPage() {
  const [sex, setSex] = useState<"male" | "female" | "">("");
  const [age, setAge] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [bodyFat, setBodyFat] = useState("");
  const [result, setResult] = useState<{ lo: number; hi: number; eqn: string } | null>(null);

  function calculate() {
    const a = parseFloat(age);
    const h = parseFloat(height);
    const w = parseFloat(weight);
    const bf = parseFloat(bodyFat);
    if (!sex || !(a > 0) || !(h > 0) || !(w > 0)) { setResult(null); return; }
    let bmr: number; let eqn: string;
    if (bf > 0 && bf < 60) {
      const lbm = w * (1 - bf / 100);
      bmr = 370 + 21.6 * lbm;
      eqn = "Katch–McArdle (uses your lean mass)";
    } else {
      bmr = sex === "male" ? 10 * w + 6.25 * h - 5 * a + 5 : 10 * w + 6.25 * h - 5 * a - 161;
      eqn = "Mifflin–St Jeor";
    }
    const lo = Math.round((bmr * 0.9) / 10) * 10;
    const hi = Math.round((bmr * 1.1) / 10) * 10;
    setResult({ lo, hi, eqn });
    saveBmr({ lo, hi });
    markIntent("usedBmr");
  }

  const inputStyle = "w-full px-3 py-2.5 rounded-lg border bg-white";

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
            <Link href="/bmr" className="px-3 py-1.5 rounded-lg text-sm font-semibold text-white" style={{ background: "rgba(255,255,255,0.12)" }}>BMR</Link>
            <Link href="/meals" className="px-3 py-1.5 rounded-lg text-sm font-semibold" style={{ color: "#9FC4C8" }}>Meals</Link>
            <Link href="/learn" className="px-3 py-1.5 rounded-lg text-sm font-semibold" style={{ color: "#9FC4C8" }}>Learn</Link>
          </nav>
        </div>
      </header>

      <section className="max-w-5xl mx-auto px-6 py-12">
        <div className="text-sm font-bold tracking-widest uppercase mb-3" style={{ color: "var(--teal)" }}>Estimate · educational</div>
        <h1 className="font-serif-display font-bold mb-3" style={{ color: "var(--ink)", fontSize: "clamp(1.8rem, 4vw, 2.6rem)" }}>Your silent, resting burn.</h1>
        <p className="text-lg max-w-2xl mb-8" style={{ color: "var(--muted)" }}>
          BMR is the energy your body uses at rest — before any movement. This is a general estimate, not a personal plan. We show it as a range on purpose.
        </p>

        <div className="grid gap-6" style={{ gridTemplateColumns: "minmax(280px, 340px) 1fr" }}>
          <div className="bg-white rounded-2xl p-6 border" style={{ borderColor: "var(--hair)" }}>
            <label className="block text-sm font-semibold mb-1.5" style={{ color: "var(--ink)" }}>Sex</label>
            <div className="flex gap-2 mb-4">
              {(["male", "female"] as const).map((s) => (
                <button key={s} onClick={() => setSex(s)} className="flex-1 py-2.5 rounded-lg border capitalize"
                  style={{ background: sex === s ? "var(--teal)" : "white", color: sex === s ? "white" : "var(--text)", borderColor: sex === s ? "var(--teal)" : "var(--hair)" }}>
                  {s}
                </button>
              ))}
            </div>

            <label className="block text-sm font-semibold mb-1.5" style={{ color: "var(--ink)" }}>Age</label>
            <input className={inputStyle} style={{ borderColor: "var(--hair)" }} type="number" value={age} onChange={(e) => setAge(e.target.value)} placeholder="e.g. 34" />

            <label className="block text-sm font-semibold mb-1.5 mt-4" style={{ color: "var(--ink)" }}>Height (cm)</label>
            <input className={inputStyle} style={{ borderColor: "var(--hair)" }} type="number" value={height} onChange={(e) => setHeight(e.target.value)} placeholder="e.g. 170" />

            <label className="block text-sm font-semibold mb-1.5 mt-4" style={{ color: "var(--ink)" }}>Weight (kg)</label>
            <input className={inputStyle} style={{ borderColor: "var(--hair)" }} type="number" value={weight} onChange={(e) => setWeight(e.target.value)} placeholder="e.g. 82" />

            <label className="block text-sm font-semibold mb-1.5 mt-4" style={{ color: "var(--ink)" }}>Body fat % <span className="font-normal" style={{ color: "var(--muted)" }}>(optional)</span></label>
            <input className={inputStyle} style={{ borderColor: "var(--hair)" }} type="number" value={bodyFat} onChange={(e) => setBodyFat(e.target.value)} placeholder="leave blank if unknown" />

            <button onClick={calculate} className="w-full mt-6 py-3 rounded-xl font-semibold text-white" style={{ background: "var(--teal)" }}>
              Estimate
            </button>
          </div>

          <div className="rounded-2xl p-7 text-white" style={{ background: "var(--ink)" }}>
            <div className="text-sm" style={{ color: "var(--mint)" }}>Your estimated resting burn</div>
            <div className="font-serif-display font-bold my-2" style={{ fontSize: "2.6rem" }}>
              {result ? `${result.lo.toLocaleString()}–${result.hi.toLocaleString()}` : "—"}
              {result && <span className="text-base font-sans font-normal" style={{ color: "var(--mint)" }}> kcal/day</span>}
            </div>
            <div className="text-sm" style={{ color: "#9FC4C8" }}>
              {result ? `${result.eqn} · shown as a ±10% range` : "Fill in the form to see your range."}
            </div>

            {result && (
              <>
                <p className="text-sm mt-5" style={{ color: "#CFE6E8" }}>
                  That&apos;s your engine idling. It&apos;s a starting estimate, not a verdict — your real number is calibrated from how you actually respond.
                </p>
                <div className="mt-5 rounded-xl p-4 flex flex-wrap gap-3 items-center" style={{ background: "#FBEEEA" }}>
                  <span className="text-sm flex-1" style={{ color: "#9a3a23", minWidth: "200px" }}>
                    <b>This is a general estimate.</b> Your own calorie target — and a plan that&apos;s safe for you — needs a quick health check first.
                  </span>
                  <Link href="/start" className="px-4 py-2 rounded-lg font-semibold text-white text-sm" style={{ background: "var(--teal)" }}>
                    Start the program →
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>

        <JourneyNudge nextHref="/meals" nextLabel="Plan a day with your number" nextDesc="See how a day of meals sits against the burn you just estimated." />

        <div className="mt-8">
          <Link href="/tools" className="font-semibold" style={{ color: "var(--teal)" }}>← Back to tools</Link>
        </div>
      </section>
    </main>
  );
}