"use client";

import Link from "next/link";
import { useState } from "react";

type Effect = {
  key: string; label: string; emoji: string;
  what: string; accent: string;
};

const EFFECTS: Effect[] = [
  { key: "stomach", label: "Slows the stomach", emoji: "🫃", accent: "var(--teal)",
    what: "GLP-1 slows how fast the stomach empties. Food stays longer, so you feel full sooner and for longer — and naturally eat less." },
  { key: "brain", label: "Quiets appetite", emoji: "🧠", accent: "var(--green)",
    what: "It acts on the brain's appetite centres, reducing hunger and the constant 'food noise.' Many people simply stop thinking about food as much." },
  { key: "sugar", label: "Steadies blood sugar", emoji: "🩸", accent: "var(--amber)",
    what: "It helps the body release insulin when needed and steadies blood sugar — which is why this class started as a diabetes treatment." },
];

const SIDE_EFFECTS = [
  { e: "🤢", t: "Nausea", d: "The most common — especially early or after a dose increase." },
  { e: "💩", t: "GI upset", d: "Constipation, diarrhoea, bloating — the slowed gut has a cost." },
  { e: "🍽️", t: "Loss of appetite", d: "Usually the point — but can become too much, with poor intake." },
  { e: "💪", t: "Muscle loss risk", d: "Rapid loss without enough protein + activity can strip muscle, not just fat." },
];

export default function Glp1Page() {
  const [onDrug, setOnDrug] = useState(false);
  const [active, setActive] = useState<Record<string, boolean>>({});

  const toggle = (k: string) => setActive((s) => ({ ...s, [k]: !s[k] }));

  // when "on drug", body narrows a bit (eats less); fullness shown
  const bellyW = onDrug ? 52 : 66;

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
        <div className="text-xs font-bold tracking-widest uppercase mb-2" style={{ color: "var(--teal)" }}>How it works · educational</div>
        <h1 className="font-serif-display font-bold mb-3" style={{ color: "var(--ink)", fontSize: "clamp(1.8rem, 5vw, 2.8rem)" }}>
          The truth about GLP-1 medications.
        </h1>
        <p className="text-base sm:text-lg mb-3" style={{ color: "var(--muted)" }}>
          GLP-1 medications — like <b>Ozempic</b> and <b>Wegovy</b> — are everywhere. They genuinely work for many people. But how do they actually work, and what&apos;s the catch? Toggle the medication and explore.
        </p>
        <div className="rounded-2xl p-3 mb-8 text-sm" style={{ background: "#FBEEEA", color: "#9a3a23" }}>
          <b>This is education, not medical advice.</b> Whether a medication is right for anyone is a decision for them and their doctor — never a website.
        </div>

        {/* the body + toggle */}
        <div className="bg-white rounded-3xl border p-6 mb-6 flex flex-col items-center" style={{ borderColor: "var(--hair)" }}>
          <svg viewBox="0 0 160 220" className="w-full" style={{ maxHeight: 220 }}>
            <circle cx="80" cy="34" r="20" fill="#E4EEF0" stroke="var(--ink)" strokeWidth="2.5" />
            <path
              d={`M58 56 L102 56
                  M58 56 Q${80 - bellyW / 2} 72 ${80 - bellyW / 2} 124 Q${80 - bellyW / 2} 156 66 178 L70 206
                  M102 56 Q${80 + bellyW / 2} 72 ${80 + bellyW / 2} 124 Q${80 + bellyW / 2} 156 94 178 L90 206`}
              fill={onDrug ? "#E8F3EC" : "#FBF1E0"} stroke="var(--ink)" strokeWidth="2.5"
              style={{ transition: "d 0.5s ease, fill 0.3s ease" }}
            />
            {/* fullness dot in stomach when on drug */}
            {onDrug && <circle cx="80" cy="100" r="9" fill="var(--teal)" opacity="0.5" />}
          </svg>
          <div className="font-semibold mb-4" style={{ color: onDrug ? "var(--green)" : "var(--muted)" }}>
            {onDrug ? "Less hungry · eating less · feeling full" : "Baseline appetite"}
          </div>
          <button onClick={() => setOnDrug((v) => !v)} className="px-6 py-3 rounded-xl font-semibold text-white"
            style={{ background: onDrug ? "var(--coral)" : "var(--teal)" }}>
            {onDrug ? "Stop the medication" : "Take GLP-1 medication 💉"}
          </button>
        </div>

        {/* mechanisms — only meaningful when on */}
        {onDrug && (
          <div className="mb-6 rise">
            <div className="text-sm font-bold tracking-widest uppercase mb-3" style={{ color: "var(--teal)" }}>What it&apos;s doing — tap to learn</div>
            <div className="grid sm:grid-cols-3 gap-2.5 mb-3">
              {EFFECTS.map((e) => {
                const isOn = !!active[e.key];
                return (
                  <button key={e.key} onClick={() => toggle(e.key)} className="text-left rounded-2xl border p-3.5"
                    style={{ borderColor: isOn ? e.accent : "var(--hair)", background: "#fff", boxShadow: isOn ? `inset 0 0 0 2px ${e.accent}` : undefined }}>
                    <div className="text-2xl mb-1">{e.emoji}</div>
                    <div className="font-semibold text-sm" style={{ color: "var(--ink)" }}>{e.label}</div>
                  </button>
                );
              })}
            </div>
            {EFFECTS.filter((e) => active[e.key]).map((e) => (
              <div key={e.key} className="rounded-2xl p-4 mb-2" style={{ background: "#fff", border: `1.5px solid ${e.accent}` }}>
                <div className="font-bold mb-1 flex items-center gap-2" style={{ color: "var(--ink)" }}><span>{e.emoji}</span>{e.label}</div>
                <p className="text-sm" style={{ color: "var(--muted)" }}>{e.what}</p>
              </div>
            ))}
            <div className="rounded-2xl p-4 mt-3 text-sm" style={{ background: "#E4EEF0", color: "var(--ink)" }}>
              <b>The honest core:</b> notice it works <i>through</i> the energy balance — it makes you eat less by reducing hunger. It doesn&apos;t break the rules of the body; it changes how hungry you feel.
            </div>
          </div>
        )}

        {/* side effects — always visible, the balance */}
        <div className="mb-6">
          <div className="text-sm font-bold tracking-widest uppercase mb-3" style={{ color: "var(--coral)" }}>The other side — real costs</div>
          <div className="grid sm:grid-cols-2 gap-2.5">
            {SIDE_EFFECTS.map((s) => (
              <div key={s.t} className="rounded-2xl border p-4" style={{ borderColor: "var(--hair)", background: "#fff" }}>
                <div className="font-semibold flex items-center gap-2 mb-1" style={{ color: "var(--ink)" }}><span className="text-lg">{s.e}</span>{s.t}</div>
                <p className="text-sm" style={{ color: "var(--muted)" }}>{s.d}</p>
              </div>
            ))}
          </div>
        </div>

        {/* the habits punchline (teaser for the timeline pass) */}
        <div className="rounded-3xl p-6 text-white" style={{ background: "linear-gradient(150deg, var(--teal), var(--ink))" }}>
          <div className="font-serif-display font-bold mb-1" style={{ fontSize: "1.3rem" }}>So is it a magic fix?</div>
          <p className="text-sm mb-2" style={{ color: "#CFE6E8" }}>
            It&apos;s a powerful tool — but when people stop, appetite returns. Without habits built underneath, the weight often comes back. The medication can open the door; <b>habits are what keep you through it.</b>
          </p>
          <p className="text-xs" style={{ color: "#9FC4C8" }}>A timeline of this — on it, and after — is coming next.</p>
        </div>

        <div className="mt-8"><Link href="/think-again" className="font-semibold" style={{ color: "var(--teal)" }}>← Back to all myths</Link></div>
      </section>
    </main>
  );
}