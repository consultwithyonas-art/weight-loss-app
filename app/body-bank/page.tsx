"use client";

import Link from "next/link";
import { useState } from "react";

export default function BodyBankPage() {
  const [income, setIncome] = useState(2000);
  const [spending, setSpending] = useState(1800);
  const [weeks, setWeeks] = useState<number[]>([5000]); // fat reserve history (energy units)
  const [toggles, setToggles] = useState<Record<string, boolean>>({});

  const t = (k: string) => setToggles((s) => ({ ...s, [k]: !s[k] }));

  let effIncome = income;
  let effSpending = spending;
  const notes: string[] = [];

  if (toggles.home) { effSpending = Math.round(effSpending * 0.8); notes.push("🏠 Quiet week — less moving, so less is spent. The reserve grows faster."); }
  if (toggles.hyper) { effSpending = Math.round(effSpending * 1.25); notes.push("🔥 High-spender (like an overactive thyroid) — the body burns through energy fast."); }
  if (toggles.malabsorb) { effIncome = Math.round(effIncome * 0.7); notes.push("🚫 Eaten but not absorbed (gut/malabsorption) — taken in, but the body never received it all."); }

  const drawingDown = effIncome < effSpending;
  let adaptiveSpending = effSpending;
  let adaptiveNote = "";
  if (toggles.adaptive && drawingDown && (effSpending - effIncome) > 400) {
    adaptiveSpending = Math.round(effSpending * 0.88);
    adaptiveNote = "📉 The body noticed the reserve dropping fast — so it cut its own spending to protect itself. This is why aggressive deficits stall: the body fights back.";
  }

  const dailyNet = effIncome - adaptiveSpending;
  const weeklyNet = dailyNet * 7; // ← each click is a WEEK
  const reserve = weeks[weeks.length - 1];

  // honest floor only (starvation danger). NO upper ceiling — gaining never magically stops.
  const FLOOR = 1500;
  const lowDanger = reserve <= FLOOR + 500;

  const advanceWeek = () => {
    setWeeks((w) => {
      const next = Math.max(FLOOR, w[w.length - 1] + weeklyNet);
      return [...w, next].slice(-16);
    });
  };
  const reset = () => setWeeks([5000]);

  // body width: grows with reserve. Visual softly approaches a max so the SVG stays on-screen,
  // but the NUMBER keeps climbing — so we never imply gaining stops.
  // map reserve(1500..15000+) → width(44..96) with gentle easing, capped visually at 100.
  const norm = Math.min(1, (reserve - 1500) / 13500);
  const eased = 1 - Math.pow(1 - norm, 1.5);
  const bellyW = 44 + eased * 56;
  const visuallyMaxed = reserve > 15000;

  const growing = dailyNet > 30;
  const shrinking = dailyNet < -30;
  const bodyColor = growing ? "var(--amber)" : shrinking ? "var(--green)" : "var(--teal)";

  return (
    <main className="min-h-screen">
      <header style={{ background: "var(--ink)" }} className="px-5 py-4">
        <div className="max-w-3xl mx-auto flex items-center gap-3">
          <Link href="/welcome" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg flex items-center justify-center text-white font-serif-display text-xl font-bold" style={{ background: "var(--teal)" }}>+</div>
            <div className="text-white">
              <div className="font-bold leading-tight text-sm sm:text-base">The Weight-Loss System</div>
              <div className="text-[10px] sm:text-xs tracking-widest uppercase" style={{ color: "var(--mint)" }}>Your body bank</div>
            </div>
          </Link>
          <nav className="ml-auto"><Link href="/welcome" className="px-3 py-1.5 rounded-lg text-sm font-semibold" style={{ color: "#9FC4C8" }}>← Back</Link></nav>
        </div>
      </header>

      <section className="max-w-3xl mx-auto px-5 py-8 sm:py-12 rise">
        <div className="text-xs font-bold tracking-widest uppercase mb-2" style={{ color: "var(--teal)" }}>Understand your body · as a bank</div>
        <h1 className="font-serif-display font-bold mb-3" style={{ color: "var(--ink)", fontSize: "clamp(1.8rem, 5vw, 2.8rem)" }}>
          Your body keeps an energy account.
        </h1>
        <p className="text-base sm:text-lg mb-8" style={{ color: "var(--muted)" }}>
          Food is your <b>income</b>. Living and moving is your <b>spending</b>. What&apos;s left over is stored on your body as a <b>fat reserve</b> — so when the reserve grows, <i>you</i> grow. Each step here is <b>one week</b>, because real change shows over weeks, not days.
        </p>

        {/* THE BODY — the star */}
        <div className="bg-white rounded-3xl border p-6 mb-6 flex flex-col items-center" style={{ borderColor: "var(--hair)" }}>
          <svg viewBox="0 0 200 230" className="w-full" style={{ maxHeight: 230 }}>
            <circle cx="100" cy="34" r="21" fill="#E4EEF0" stroke="var(--ink)" strokeWidth="2.5" />
            <path
              d={`M77 57 L123 57
                  M77 57 Q${100 - bellyW / 2} 74 ${100 - bellyW / 2} 128 Q${100 - bellyW / 2} 160 85 182 L89 212
                  M123 57 Q${100 + bellyW / 2} 74 ${100 + bellyW / 2} 128 Q${100 + bellyW / 2} 160 115 182 L111 212`}
              fill="#FBF1E0" stroke="var(--ink)" strokeWidth="2.5" style={{ transition: "d 0.5s ease" }}
            />
          </svg>
          <div className="font-serif-display font-bold text-lg" style={{ color: bodyColor }}>
            {growing ? "Reserve building — the body is growing" : shrinking ? "Reserve drawing down — the body is shrinking" : "Holding steady"}
          </div>
          <div className="text-sm" style={{ color: "var(--muted)" }}>Week {weeks.length}</div>
          {visuallyMaxed && (
            <div className="text-xs mt-2 text-center" style={{ color: "var(--coral)" }}>
              (The figure can only get so big on screen — but notice the reserve number keeps climbing. In real life, a steady surplus keeps adding weight. There&apos;s no point where gaining just stops on its own.)
            </div>
          )}
        </div>

        {/* the reserve — neutral readout */}
        <div className="bg-white rounded-2xl border p-4 mb-6" style={{ borderColor: "var(--hair)" }}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold tracking-widest uppercase" style={{ color: "var(--muted)" }}>Fat reserve (stored energy)</span>
            <span className="text-sm font-semibold" style={{ color: dailyNet > 0 ? "var(--amber)" : dailyNet < 0 ? "var(--green)" : "var(--muted)" }}>
              {weeklyNet > 0 ? `+${weeklyNet}/week` : weeklyNet < 0 ? `${weeklyNet}/week` : "balanced"}
            </span>
          </div>
          <div className="flex items-end gap-1 h-16">
            {weeks.map((b, i) => (
              <div key={i} className="flex-1 rounded-t" style={{ height: `${Math.min(100, (b / 15000) * 100)}%`, background: i === weeks.length - 1 ? "var(--ink)" : "#CDD8DB", transition: "height 0.3s ease", minHeight: "2px" }} />
            ))}
          </div>
          <div className="flex justify-between items-center mt-2">
            <span className="text-xs" style={{ color: "var(--muted)" }}>A bigger reserve means a bigger body, not a richer one.</span>
            <span className="text-xs font-semibold" style={{ color: "var(--ink)" }}>{reserve.toLocaleString()}</span>
          </div>
          {lowDanger && (
            <div className="rounded-lg p-2.5 mt-2 text-xs" style={{ background: "#FBEEEA", color: "#9a3a23" }}>
              ⚠ The reserve is running dangerously low. In a real body this is starvation territory — the goal is never to empty the tank. Losing fat should always be gentle and have a floor.
            </div>
          )}
        </div>

        <div className="flex gap-3 mb-6">
          <button onClick={advanceWeek} className="flex-1 py-3 rounded-xl font-semibold text-white" style={{ background: "var(--teal)" }}>
            Live another week →
          </button>
          {weeks.length > 1 && <button onClick={reset} className="px-4 py-3 rounded-xl font-semibold border" style={{ borderColor: "var(--hair)", color: "var(--muted)" }}>Reset</button>}
        </div>

        {/* income / spending (per day, the underlying rate) */}
        <div className="grid sm:grid-cols-2 gap-3 mb-6">
          <div className="bg-white rounded-2xl border p-4" style={{ borderColor: "var(--hair)" }}>
            <div className="flex items-center justify-between mb-2"><span className="font-semibold flex items-center gap-2" style={{ color: "var(--ink)" }}>💰 Income (food/day)</span><span className="font-serif-display font-bold" style={{ color: "var(--amber)" }}>{effIncome}</span></div>
            <input type="range" min={1000} max={3500} step={50} value={income} onChange={(e) => setIncome(+e.target.value)} className="w-full" style={{ accentColor: "var(--amber)" }} />
            {effIncome !== income && <div className="text-xs mt-1" style={{ color: "var(--coral)" }}>actually absorbed: {effIncome} (you ate {income})</div>}
          </div>
          <div className="bg-white rounded-2xl border p-4" style={{ borderColor: "var(--hair)" }}>
            <div className="flex items-center justify-between mb-2"><span className="font-semibold flex items-center gap-2" style={{ color: "var(--ink)" }}>🏃 Spending (living/day)</span><span className="font-serif-display font-bold" style={{ color: "var(--green)" }}>{adaptiveSpending}</span></div>
            <input type="range" min={1000} max={3500} step={50} value={spending} onChange={(e) => setSpending(+e.target.value)} className="w-full" style={{ accentColor: "var(--green)" }} />
            {adaptiveSpending !== spending && <div className="text-xs mt-1" style={{ color: "var(--coral)" }}>body adjusted to: {adaptiveSpending}</div>}
          </div>
        </div>

        {/* toggles */}
        <div className="text-sm font-bold tracking-widest uppercase mb-3" style={{ color: "var(--teal)" }}>Life happens — toggle these</div>
        <div className="grid sm:grid-cols-2 gap-2.5 mb-4">
          {([
            ["home", "🏠 Quiet week (less moving)"],
            ["hyper", "🔥 High-spender (overactive thyroid)"],
            ["malabsorb", "🚫 Eaten but not absorbed (gut)"],
            ["adaptive", "📉 Let the body fight back"],
          ] as const).map(([key, label]) => (
            <button key={key} onClick={() => t(key)} className="text-left rounded-2xl border p-3.5 font-semibold text-sm"
              style={{ borderColor: toggles[key] ? "var(--teal)" : "var(--hair)", background: "#fff", color: "var(--ink)", boxShadow: toggles[key] ? "inset 0 0 0 2px var(--teal)" : undefined }}>
              {label}
            </button>
          ))}
        </div>

        {(notes.length > 0 || adaptiveNote) && (
          <div className="flex flex-col gap-2 mb-6">
            {notes.map((n, i) => (
              <div key={i} className="rounded-xl p-3 text-sm" style={{ background: "var(--paper)", color: "var(--text)" }}>{n}</div>
            ))}
            {adaptiveNote && <div className="rounded-xl p-3 text-sm" style={{ background: "#FBF1E0", color: "#9a6a10" }}>{adaptiveNote}</div>}
          </div>
        )}

        <div className="rounded-3xl p-6 text-white" style={{ background: "linear-gradient(150deg, var(--teal), var(--ink))" }}>
          <div className="font-serif-display font-bold mb-1" style={{ fontSize: "1.3rem" }}>The honest takeaway</div>
          <p className="text-sm" style={{ color: "#CFE6E8" }}>
            Keep taking in more than you spend, and the reserve keeps growing — there&apos;s no point where it just stops on its own. To lose fat, spend a little more than you take in, week after week. But draw down too hard and the body cuts its own spending to protect itself — which is why <b>slow and steady, over weeks,</b> beats crash efforts.
          </p>
        </div>

        <div className="mt-4 rounded-2xl p-4 text-sm" style={{ background: "#E4EEF0", color: "var(--ink)" }}>
          These numbers teach the idea — they&apos;re not your personal figures. Your real body is unique, which is what the program measures.
        </div>

        <div className="mt-8"><Link href="/welcome" className="font-semibold" style={{ color: "var(--teal)" }}>← Back to your journey</Link></div>
      </section>
    </main>
  );
}