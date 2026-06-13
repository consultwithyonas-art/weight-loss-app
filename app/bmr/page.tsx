"use client";

import Link from "next/link";
import { useState } from "react";
import { saveBmr, markIntent } from "../favorites";
import JourneyNudge from "../JourneyNudge";

const ACTIVITY = [
  { key: "sed", mult: 1.2, label: "Mostly sitting", desc: "Desk work, little exercise" },
  { key: "light", mult: 1.375, label: "Lightly active", desc: "Some walking, light exercise 1–3 days" },
  { key: "mod", mult: 1.55, label: "Moderately active", desc: "Exercise or active work 3–5 days" },
  { key: "very", mult: 1.725, label: "Very active", desc: "Hard exercise or physical job 6–7 days" },
];

export default function BmrPage() {
  const [sex, setSex] = useState<"male" | "female">("female");
  const [age, setAge] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [activity, setActivity] = useState<string | null>(null);
  const [result, setResult] = useState<{ lo: number; hi: number } | null>(null);

  const calculate = () => {
    const a = parseFloat(age), h = parseFloat(height), w = parseFloat(weight);
    if (!(a > 0 && h > 0 && w > 0)) return;
    // Mifflin-St Jeor
    const base = 10 * w + 6.25 * h - 5 * a + (sex === "male" ? 5 : -161);
    const lo = Math.round((base * 0.95) / 10) * 10;
    const hi = Math.round((base * 1.05) / 10) * 10;
    setResult({ lo, hi });
    saveBmr({ lo, hi, weight: w });
    markIntent("usedBmr");
  };

  const act = ACTIVITY.find((a) => a.key === activity);
  const totalLo = result && act ? Math.round((result.lo * act.mult) / 10) * 10 : null;
  const totalHi = result && act ? Math.round((result.hi * act.mult) / 10) * 10 : null;

  return (
    <main className="min-h-screen">
      <header style={{ background: "var(--ink)" }} className="px-6 py-4">
        <div className="max-w-3xl mx-auto flex items-center gap-3">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg flex items-center justify-center text-white font-serif-display text-xl font-bold" style={{ background: "var(--teal)" }}>+</div>
            <div className="text-white">
              <div className="font-bold leading-tight">The Weight-Loss System</div>
              <div className="text-xs tracking-widest uppercase" style={{ color: "var(--mint)" }}>Open tools · free</div>
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

      <section className="max-w-3xl mx-auto px-6 py-10 sm:py-12 rise">
        <div className="text-sm font-bold tracking-widest uppercase mb-3" style={{ color: "var(--teal)" }}>Energy estimate · no sign-up</div>
        <h1 className="font-serif-display font-bold mb-3" style={{ color: "var(--ink)", fontSize: "clamp(1.8rem, 5vw, 2.6rem)" }}>
          How much energy does your body use?
        </h1>
        <p className="text-base sm:text-lg mb-2" style={{ color: "var(--muted)" }}>
          Your body burns energy just staying alive — breathing, pumping blood, keeping warm. That baseline is called your <b>resting burn</b> (or BMR). Add daily movement on top, and you get your <b>total daily burn</b>.
        </p>
        <p className="text-sm mb-8" style={{ color: "var(--muted)" }}>
          We show it as a <b>range</b>, not a single number — because every real body varies, and false precision helps no one.
        </p>
        <div className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 mb-8 text-xs" style={{ background: "#E8F3EC", color: "#2f6b46" }}>
          🔒 Your entries stay on your device — we don&apos;t store or see them unless you choose to message us.
        </div>

        {/* inputs */}
        <div className="bg-white rounded-3xl border p-6 mb-6" style={{ borderColor: "var(--hair)" }}>
          <div className="flex gap-2 mb-4">
            {(["female", "male"] as const).map((s) => (
              <button key={s} onClick={() => setSex(s)} className="flex-1 py-2.5 rounded-xl font-semibold border capitalize"
                style={{ background: sex === s ? "var(--ink)" : "white", color: sex === s ? "white" : "var(--text)", borderColor: sex === s ? "var(--ink)" : "var(--hair)" }}>
                {s}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-semibold mb-1" style={{ color: "var(--muted)" }}>Age</label>
              <input value={age} onChange={(e) => setAge(e.target.value)} type="number" placeholder="years" className="w-full px-3 py-2.5 rounded-xl border" style={{ borderColor: "var(--hair)" }} />
            </div>
            <div>
              <label className="block text-xs font-semibold mb-1" style={{ color: "var(--muted)" }}>Height</label>
              <input value={height} onChange={(e) => setHeight(e.target.value)} type="number" placeholder="cm" className="w-full px-3 py-2.5 rounded-xl border" style={{ borderColor: "var(--hair)" }} />
            </div>
            <div>
              <label className="block text-xs font-semibold mb-1" style={{ color: "var(--muted)" }}>Weight</label>
              <input value={weight} onChange={(e) => setWeight(e.target.value)} type="number" placeholder="kg" className="w-full px-3 py-2.5 rounded-xl border" style={{ borderColor: "var(--hair)" }} />
            </div>
          </div>
          <button onClick={calculate} className="w-full mt-4 py-3 rounded-xl font-semibold text-white" style={{ background: "var(--teal)" }}>
            Estimate my resting burn →
          </button>
        </div>

        {/* result */}
        {result && (
          <div className="rise">
            <div className="bg-white rounded-3xl border p-6 mb-4 text-center" style={{ borderColor: "var(--green)" }}>
              <div className="text-xs font-bold tracking-widest uppercase mb-1" style={{ color: "var(--muted)" }}>Your resting burn</div>
              <div className="font-serif-display font-bold" style={{ color: "var(--ink)", fontSize: "2.6rem", lineHeight: 1 }}>{result.lo}–{result.hi}</div>
              <div className="text-sm" style={{ color: "var(--muted)" }}>kcal/day, just to stay alive</div>
            </div>

            {/* activity step */}
            <div className="bg-white rounded-3xl border p-6 mb-4" style={{ borderColor: "var(--hair)" }}>
              <div className="font-semibold mb-1" style={{ color: "var(--ink)" }}>Now add your daily activity</div>
              <div className="text-sm mb-4" style={{ color: "var(--muted)" }}>This turns your resting burn into your <b>total daily burn</b> — closer to what you actually use.</div>
              <div className="grid sm:grid-cols-2 gap-2.5">
                {ACTIVITY.map((a) => (
                  <button key={a.key} onClick={() => setActivity(a.key)} className="text-left rounded-2xl border p-3.5"
                    style={{ borderColor: activity === a.key ? "var(--teal)" : "var(--hair)", background: "#fff", boxShadow: activity === a.key ? "inset 0 0 0 2px var(--teal)" : undefined }}>
                    <div className="font-semibold text-sm" style={{ color: "var(--ink)" }}>{a.label}</div>
                    <div className="text-xs" style={{ color: "var(--muted)" }}>{a.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {totalLo && (
              <div className="rounded-3xl p-6 mb-4 text-center text-white rise" style={{ background: "linear-gradient(150deg, var(--teal), var(--ink))" }}>
                <div className="text-xs font-bold tracking-widest uppercase mb-1" style={{ color: "var(--mint)" }}>Your total daily burn</div>
                <div className="font-serif-display font-bold" style={{ fontSize: "2.6rem", lineHeight: 1 }}>{totalLo}–{totalHi}</div>
                <div className="text-sm" style={{ color: "#CFE6E8" }}>kcal/day, resting + your movement</div>
              </div>
            )}

            {/* the honest "so what do I eat?" panel */}
            <div className="rounded-3xl p-6 mb-4" style={{ background: "#FBF1E0", border: "1px solid #EAD9B0" }}>
              <div className="font-serif-display font-bold mb-1" style={{ color: "#9a6a10", fontSize: "1.2rem" }}>&ldquo;So how much should I eat?&rdquo;</div>
              <p className="text-sm" style={{ color: "#7d5a1a" }}>
                The honest answer: that depends on <i>you</i>. In general, eating a little <b>below</b> your burn loses fat over time, and <b>above</b> it gains. But a number that&apos;s actually safe and right for you depends on your health, your history, your medications and more — which is exactly why a real target comes after a quick check, not from a calculator. This figure is here to <i>understand</i> your body, not to set your plate.
              </p>
            </div>

            <div className="rounded-2xl p-4 mb-6 text-sm" style={{ background: "#E4EEF0", color: "var(--ink)" }}>
              <b>General reference, not a personal target.</b> Your real, personalised plan comes after a short health check — <Link href="/start" className="font-semibold underline" style={{ color: "var(--teal)" }}>see how the program works →</Link>
            </div>

            <JourneyNudge nextHref="/meals" nextLabel="Plan a day and see how it compares" nextDesc="Build your meals and see how they sit against your burn." />
          </div>
        )}

        <div className="mt-8"><Link href="/" className="font-semibold" style={{ color: "var(--teal)" }}>← Back home</Link></div>
      </section>
    </main>
  );
}