"use client";

import Link from "next/link";
import { useState } from "react";

type Cat = "temporary" | "lifestyle" | "medical" | "lifestage";
type Factor = {
  key: string; label: string; emoji: string;
  bulge: number; drop: number; cat: Cat;
  cause: string; helps: string; accent: string;
};

const CAT_META: Record<Cat, { label: string; color: string }> = {
  temporary: { label: "Comes & goes", color: "var(--teal)" },
  lifestyle: { label: "You can change this", color: "var(--green)" },
  medical: { label: "Medical — see a doctor", color: "var(--coral)" },
  lifestage: { label: "Life stage", color: "#8a5c9e" },
};

const FACTORS: Factor[] = [
  {
    key: "fat", label: "Body fat", emoji: "🧈", bulge: 26, drop: 6, cat: "lifestyle", accent: "var(--amber)",
    cause: "Fat sits under the skin (subcutaneous) and deep around the organs (visceral). Visceral fat pushes the belly out firmly and matters most for health.",
    helps: "A sustained, livable calorie deficit — the only real fat lever. Fat leaves the whole body, not just the belly; you can't spot-reduce it.",
  },
  {
    key: "gas", label: "Gas", emoji: "🫧", bulge: 16, drop: 2, cat: "temporary", accent: "var(--teal)",
    cause: "Foods that ferment easily (beans, cabbage, onions), fizzy drinks, lactose if intolerant, and air swallowed while eating fast all build gas in the gut.",
    helps: "Eat slower (less swallowed air), spot your personal trigger foods, smaller portions of them. Persistent or painful? See a doctor.",
  },
  {
    key: "food", label: "Food volume", emoji: "🍲", bulge: 14, drop: 2, cat: "temporary", accent: "var(--mint)",
    cause: "Your gut is a long tube that fills and empties all day. A big or high-fibre meal simply takes up space while it's being digested.",
    helps: "Nothing needed — it empties on its own. This is the most temporary cause, and it isn't fat.",
  },
  {
    key: "stool", label: "Constipation", emoji: "🚽", bulge: 14, drop: 7, cat: "temporary", accent: "#b08968",
    cause: "Stool backing up — from low fibre, low water, or little movement — adds real volume low in the belly.",
    helps: "Enough fibre and water, daily movement, a regular toilet routine. A lasting change in bowel habit should be checked by a doctor.",
  },
  {
    key: "muscle", label: "Weak wall", emoji: "🩹", bulge: 18, drop: 8, cat: "lifestyle", accent: "var(--green)",
    cause: "Your deep abdominal muscles (the transversus abdominis) act like a natural corset. Weak or slack, the same contents push further forward.",
    helps: "Core and resistance training (planks, deep-core work). It won't burn fat, but it holds everything in — changing the shape.",
  },
  {
    key: "posture", label: "Posture", emoji: "🧍", bulge: 14, drop: -4, cat: "lifestyle", accent: "var(--teal)",
    cause: "When the pelvis tilts forward and the lower back arches (anterior tilt), the belly is pushed out front — even with little fat.",
    helps: "Posture awareness, stretching tight hip flexors, strengthening core and glutes. Changes the look in seconds — no fat lost.",
  },
  {
    key: "hormone", label: "Stress / hormones", emoji: "😣", bulge: 12, drop: 4, cat: "lifestyle", accent: "#c77d4a",
    cause: "Ongoing stress and poor sleep raise cortisol, which nudges the body to store more fat centrally — around the middle.",
    helps: "Protecting sleep and managing stress genuinely help; the calorie-deficit rule still applies underneath. No magic, but it matters.",
  },
  {
    key: "fluid", label: "Fluid (illness)", emoji: "💧", bulge: 30, drop: 10, cat: "medical", accent: "var(--coral)",
    cause: "Some liver, heart or kidney conditions cause fluid to collect in the abdomen (ascites) — making the belly large and tight.",
    helps: "This is a medical sign. It's treated by finding and treating the cause with a doctor — never by dieting or exercise.",
  },
  {
    key: "pregnancy", label: "Pregnancy", emoji: "🤰", bulge: 34, drop: 4, cat: "lifestage", accent: "#8a5c9e",
    cause: "Pregnancy grows the belly from the inside as the baby develops — a completely different cause.",
    helps: "Nothing to reduce — it isn't fat, and it's never a target for weight loss.",
  },
];

export default function BellyPage() {
  const [on, setOn] = useState<Record<string, boolean>>({});
  const toggle = (k: string) => setOn((s) => ({ ...s, [k]: !s[k] }));

  const active = FACTORS.filter((f) => on[f.key]);
  const bulge = active.reduce((s, f) => s + f.bulge, 0);
  const drop = active.reduce((s, f) => s + f.drop, 0);
  const count = active.length;

  const cx = 150 + bulge;
  const cy = 250 + Math.min(40, drop);

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

      <section className="max-w-5xl mx-auto px-5 py-8 sm:py-12 rise">
        <div className="text-sm font-bold tracking-widest uppercase mb-3" style={{ color: "var(--teal)" }}>Interactive · good to know</div>
        <h1 className="font-serif-display font-bold mb-3" style={{ color: "var(--ink)", fontSize: "clamp(1.8rem, 5vw, 2.8rem)" }}>
          A belly is rarely just fat.
        </h1>
        <p className="text-base sm:text-lg max-w-2xl mb-8" style={{ color: "var(--muted)" }}>
          Tap each thing to build a belly — then see <b>what actually helps</b> for each. The lesson: different causes need different answers. You can&apos;t diet away gas, or crunch away fluid.
        </p>

        <div className="grid gap-6 lg:grid-cols-[340px_1fr] items-start">
          {/* figure */}
          <div className="bg-white rounded-3xl border p-4 lg:sticky lg:top-4" style={{ borderColor: "var(--hair)" }}>
            <svg viewBox="0 0 320 470" className="w-full" style={{ maxHeight: 400 }}>
              <circle cx="120" cy="60" r="30" fill="#E4EEF0" stroke="var(--ink)" strokeWidth="3" />
              <path d="M120 90 L120 300 L120 430" fill="none" stroke="var(--ink)" strokeWidth="3" />
              <path
                d={`M120 95 Q140 110 142 150 Q${cx} ${cy - 40} ${cx} ${cy} Q${cx} ${cy + 40} 140 320 Q132 360 130 430`}
                fill="#FBF1E0" stroke="var(--ink)" strokeWidth="3" style={{ transition: "d 0.4s ease" }}
              />
              <path d="M120 430 L110 452" stroke="var(--ink)" strokeWidth="3" />
              <path d="M130 430 L140 452" stroke="var(--ink)" strokeWidth="3" />
              <text x="158" y="455" fontSize="13" fill="#5E7178" fontFamily="Arial">side view</text>
            </svg>
            <div className="text-center text-sm font-semibold" style={{ color: "var(--ink)" }}>
              {count === 0 ? "Tap factors to build a belly" : `${count} factor${count > 1 ? "s" : ""} active`}
            </div>
          </div>

          {/* controls + explanations */}
          <div>
            <div className="grid sm:grid-cols-2 gap-3 mb-6">
              {FACTORS.map((f) => {
                const isOn = !!on[f.key];
                return (
                  <button key={f.key} onClick={() => toggle(f.key)} className="text-left rounded-2xl border p-3.5"
                    style={{ borderColor: isOn ? f.accent : "var(--hair)", background: "#fff", boxShadow: isOn ? `inset 0 0 0 2px ${f.accent}` : undefined }}>
                    <div className="flex items-center justify-between">
                      <span className="font-semibold flex items-center gap-2" style={{ color: "var(--ink)" }}>
                        <span className="text-xl">{f.emoji}</span> {f.label}
                      </span>
                      <span className="text-xs font-bold px-2 py-0.5 rounded-full" style={{ background: isOn ? f.accent : "var(--hair)", color: isOn ? "#fff" : "var(--muted)" }}>
                        {isOn ? "ON" : "off"}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="flex flex-col gap-3">
              {count === 0 && (
                <div className="rounded-2xl p-4 text-sm" style={{ background: "var(--paper)", color: "var(--muted)" }}>
                  Tap a factor above to see how it changes the belly — and what actually helps.
                </div>
              )}
              {active.map((f) => (
                <div key={f.key} className="rounded-2xl p-4" style={{ background: "#fff", border: `1.5px solid ${f.accent}` }}>
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="font-bold flex items-center gap-2" style={{ color: "var(--ink)" }}><span>{f.emoji}</span>{f.label}</div>
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded-full" style={{ background: CAT_META[f.cat].color, color: "#fff" }}>
                      {CAT_META[f.cat].label}
                    </span>
                  </div>
                  <p className="text-sm mb-2" style={{ color: "var(--muted)" }}>{f.cause}</p>
                  <div className="rounded-lg p-2.5 text-sm" style={{ background: "#EFF6F2" }}>
                    <span className="font-semibold" style={{ color: "var(--green)" }}>What helps → </span>
                    <span style={{ color: "var(--text)" }}>{f.helps}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {count >= 2 && (
          <div className="mt-8 rounded-3xl p-6 text-white rise" style={{ background: "linear-gradient(150deg, var(--teal), var(--ink))" }}>
            <div className="font-serif-display font-bold text-xl mb-1">That belly is {count} different things — each with its own answer.</div>
            <p style={{ color: "#CFE6E8" }}>
              This is why one-size advice fails. Fat needs a deficit, gas needs slower eating, fluid needs a doctor. Understanding which is which is the first honest step.
            </p>
          </div>
        )}

        <div className="mt-6 rounded-2xl p-4 text-sm" style={{ background: "#FBEEEA", color: "#9a3a23" }}>
          <b>When to see a doctor:</b> a belly that grows quickly, feels tight or firm, or comes with pain, breathlessness or feeling unwell is not &quot;just fat&quot; — it needs medical attention, not a diet.
        </div>

        <div className="mt-8"><Link href="/learn" className="font-semibold" style={{ color: "var(--teal)" }}>← Back to Good to Know</Link></div>
      </section>
    </main>
  );
}