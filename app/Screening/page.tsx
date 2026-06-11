"use client";

import Link from "next/link";
import { useState } from "react";

// red-flag conditions/answers route OUT; amber conditions proceed with review
const CONDITIONS = [
  { v: "Thyroid disorder", bucket: "amber" },
  { v: "Type 2 diabetes / prediabetes", bucket: "amber" },
  { v: "PCOS", bucket: "amber" },
  { v: "Fatty liver (NAFLD)", bucket: "amber" },
  { v: "High blood pressure", bucket: "amber" },
  { v: "Kidney disease", bucket: "red", reason: "Kidney disease changes protein needs and requires specialist guidance." },
  { v: "Type 1 diabetes", bucket: "red", reason: "Type 1 diabetes needs specialist supervision for any change in intake." },
  { v: "Heart condition", bucket: "red", reason: "A heart condition should be reviewed by your doctor before a weight-loss plan." },
  { v: "None of these", bucket: "green" },
];

export default function ScreeningPage() {
  const [step, setStep] = useState(0);
  const [conditions, setConditions] = useState<string[]>([]);
  const [unintentional, setUnintentional] = useState<boolean | null>(null);
  const [eating, setEating] = useState<boolean | null>(null);
  const [pregnant, setPregnant] = useState<boolean | null>(null);
  const [outcome, setOutcome] = useState<{ bucket: string; reasons: string[] } | null>(null);

  const toggleCondition = (v: string) =>
    setConditions((c) => (c.includes(v) ? c.filter((x) => x !== v) : [...c, v]));

  const evaluate = () => {
    const reasons: string[] = [];
    let bucket: "green" | "amber" | "red" = "green";

    if (unintentional) { bucket = "red"; reasons.push("Unintentional weight loss needs a medical cause ruled out first."); }
    if (eating) { bucket = "red"; reasons.push("A history of disordered eating needs specialist care, not a calorie target."); }
    if (pregnant) { bucket = "red"; reasons.push("Pregnancy and breastfeeding are not times for a weight-loss deficit."); }

    conditions.forEach((c) => {
      const found = CONDITIONS.find((x) => x.v === c);
      if (!found) return;
      if (found.bucket === "red") { bucket = "red"; if (found.reason) reasons.push(found.reason); }
      else if (found.bucket === "amber" && bucket !== "red") { bucket = "amber"; }
    });

    setOutcome({ bucket, reasons });
    setStep(4);
  };

  const card = "bg-white rounded-2xl p-6 border";
  const Header = () => (
    <header style={{ background: "var(--ink)" }} className="px-6 py-4">
      <div className="max-w-3xl mx-auto flex items-center gap-3">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg flex items-center justify-center text-white font-serif-display text-xl font-bold" style={{ background: "var(--teal)" }}>+</div>
          <div className="text-white">
            <div className="font-bold leading-tight">The Weight-Loss System</div>
            <div className="text-xs tracking-widest uppercase" style={{ color: "var(--mint)" }}>Health check</div>
          </div>
        </Link>
      </div>
    </header>
  );

  const YesNo = ({ value, set }: { value: boolean | null; set: (b: boolean) => void }) => (
    <div className="flex gap-2 mt-2">
      {[["Yes", true], ["No", false]].map(([label, val]) => (
        <button key={label as string} onClick={() => set(val as boolean)} className="px-6 py-2.5 rounded-lg border font-medium"
          style={{ background: value === val ? "var(--teal)" : "white", color: value === val ? "white" : "var(--text)", borderColor: value === val ? "var(--teal)" : "var(--hair)" }}>
          {label}
        </button>
      ))}
    </div>
  );

  // ---------- OUTCOME SCREENS ----------
  if (step === 4 && outcome) {
    if (outcome.bucket === "red") {
      return (
        <main className="min-h-screen">
          <Header />
          <section className="max-w-3xl mx-auto px-6 py-16">
            <div className="rounded-2xl p-8 text-white" style={{ background: "linear-gradient(160deg,#7a2c1a,#0B3A4A)" }}>
              <div className="text-3xl mb-4">⚠</div>
              <h1 className="font-serif-display font-bold mb-4" style={{ fontSize: "2rem" }}>Let&apos;s pause — a doctor should see this first.</h1>
              <p className="mb-5" style={{ color: "#F2D9CF" }}>
                Based on your answers, starting a weight-loss plan now wouldn&apos;t be safe until a clinician reviews things with you. This isn&apos;t a rejection — it&apos;s the careful step that protects you.
              </p>
              <ul className="mb-6 space-y-1.5">
                {outcome.reasons.map((r, i) => <li key={i} style={{ color: "#FBE6DD" }}>• {r}</li>)}
              </ul>
              <button className="px-6 py-3 rounded-xl font-semibold" style={{ background: "white", color: "var(--ink)" }}>Book a clinician review</button>
            </div>
            <div className="mt-6"><Link href="/" className="font-semibold" style={{ color: "var(--teal)" }}>← Back home</Link></div>
          </section>
        </main>
      );
    }
    // green or amber → proceed
    return (
      <main className="min-h-screen">
        <Header />
        <section className="max-w-3xl mx-auto px-6 py-16">
          <div className={card} style={{ borderColor: "var(--green)" }}>
            <div className="text-3xl mb-3">✓</div>
            <h1 className="font-serif-display font-bold mb-3" style={{ color: "var(--ink)", fontSize: "2rem" }}>You&apos;re good to begin.</h1>
            <p className="mb-4" style={{ color: "var(--muted)" }}>
              {outcome.bucket === "amber"
                ? "Thanks — a couple of your answers mean a clinician will review and tailor your plan before it starts. You can begin the baseline logging in the meantime."
                : "Nothing here needs special review. The next step is two weeks of simple logging so we learn your starting point — no changes yet."}
            </p>
            <div className="rounded-xl p-4 mb-5" style={{ background: "var(--paper)" }}>
              <div className="text-sm font-semibold" style={{ color: "var(--ink)" }}>Next: Discovery Week</div>
              <div className="text-sm" style={{ color: "var(--muted)" }}>Log what you already eat, move and sleep for ~2 weeks. (Coming soon in your account.)</div>
            </div>
            <p className="text-xs" style={{ color: "var(--muted)" }}>
              Note: this demo doesn&apos;t save your answers yet — accounts and secure storage are the next phase.
            </p>
          </div>
          <div className="mt-6"><Link href="/" className="font-semibold" style={{ color: "var(--teal)" }}>← Back home</Link></div>
        </section>
      </main>
    );
  }

  // ---------- QUESTION STEPS ----------
  return (
    <main className="min-h-screen">
      <Header />
      <section className="max-w-3xl mx-auto px-6 py-12">
        <div className="text-sm font-bold tracking-widest uppercase mb-2" style={{ color: "var(--teal)" }}>
          Health check · step {step + 1} of 4
        </div>

        {step === 0 && (
          <div>
            <h1 className="font-serif-display font-bold mb-3" style={{ color: "var(--ink)", fontSize: "1.8rem" }}>Have you been diagnosed with any of these?</h1>
            <p className="mb-5" style={{ color: "var(--muted)" }}>Select any that apply. Some conditions change how — or whether — you should lose weight.</p>
            <div className="flex flex-wrap gap-2 mb-8">
              {CONDITIONS.map((c) => {
                const on = conditions.includes(c.v);
                return (
                  <button key={c.v} onClick={() => toggleCondition(c.v)} className="px-4 py-2.5 rounded-full border text-sm font-medium"
                    style={{ background: on ? "var(--teal)" : "white", color: on ? "white" : "var(--text)", borderColor: on ? "var(--teal)" : "var(--hair)" }}>
                    {c.v}
                  </button>
                );
              })}
            </div>
            <button onClick={() => setStep(1)} className="px-6 py-3 rounded-xl font-semibold text-white" style={{ background: "var(--teal)" }}>Continue</button>
          </div>
        )}

        {step === 1 && (
          <div>
            <h1 className="font-serif-display font-bold mb-5" style={{ color: "var(--ink)", fontSize: "1.8rem" }}>Have you lost weight recently without trying to?</h1>
            <YesNo value={unintentional} set={setUnintentional} />
            <div className="mt-8 flex gap-3">
              <button onClick={() => setStep(0)} className="px-5 py-3 rounded-xl font-semibold border" style={{ borderColor: "var(--hair)", color: "var(--muted)" }}>Back</button>
              <button onClick={() => setStep(2)} disabled={unintentional === null} className="px-6 py-3 rounded-xl font-semibold text-white" style={{ background: unintentional === null ? "#AFC9CD" : "var(--teal)" }}>Continue</button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div>
            <h1 className="font-serif-display font-bold mb-5" style={{ color: "var(--ink)", fontSize: "1.8rem" }}>Do you have a current or past eating disorder, or feel your eating is often out of control?</h1>
            <YesNo value={eating} set={setEating} />
            <div className="mt-8 flex gap-3">
              <button onClick={() => setStep(1)} className="px-5 py-3 rounded-xl font-semibold border" style={{ borderColor: "var(--hair)", color: "var(--muted)" }}>Back</button>
              <button onClick={() => setStep(3)} disabled={eating === null} className="px-6 py-3 rounded-xl font-semibold text-white" style={{ background: eating === null ? "#AFC9CD" : "var(--teal)" }}>Continue</button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div>
            <h1 className="font-serif-display font-bold mb-5" style={{ color: "var(--ink)", fontSize: "1.8rem" }}>Are you currently pregnant or breastfeeding?</h1>
            <YesNo value={pregnant} set={setPregnant} />
            <div className="mt-8 flex gap-3">
              <button onClick={() => setStep(2)} className="px-5 py-3 rounded-xl font-semibold border" style={{ borderColor: "var(--hair)", color: "var(--muted)" }}>Back</button>
              <button onClick={evaluate} disabled={pregnant === null} className="px-6 py-3 rounded-xl font-semibold text-white" style={{ background: pregnant === null ? "#AFC9CD" : "var(--teal)" }}>See my result</button>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}