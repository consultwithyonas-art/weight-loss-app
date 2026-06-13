"use client";

import Link from "next/link";
import { useState } from "react";

type Journey = "lose" | "gain" | "maintain";

const CHOICES: { key: Journey; emoji: string; label: string; feeling: string; accent: string; glow: string }[] = [
  { key: "lose", emoji: "📉", label: "Lose weight", feeling: "I want to feel lighter", accent: "var(--teal)", glow: "rgba(27,127,140,0.18)" },
  { key: "gain", emoji: "📈", label: "Gain weight", feeling: "I want to build myself up", accent: "var(--green)", glow: "rgba(90,158,111,0.18)" },
  { key: "maintain", emoji: "⚖️", label: "Maintain", feeling: "I want to hold steady", accent: "var(--amber)", glow: "rgba(232,163,61,0.18)" },
];

const GUIDES: Record<Journey, {
  title: string; seen: string; intro: string; accent: string;
  tools: { href: string; label: string; why: string }[];
  flag?: string;
}> = {
  lose: {
    title: "losing weight",
    seen: "You&apos;re in the right place — this is our home ground.",
    intro: "Here&apos;s a good order to explore. Each tool is honest, free, and yours to use at your pace.",
    accent: "var(--teal)",
    tools: [
      { href: "/tools", label: "Check your food", why: "See honest calorie ranges for the foods you love." },
      { href: "/bmr", label: "Find your resting burn", why: "Know roughly how much energy your body uses." },
      { href: "/meals", label: "Plan a day", why: "Build meals and see how they sit against your burn." },
      { href: "/think-again", label: "Think Again", why: "Bust the myths that keep people stuck." },
    ],
  },
  gain: {
    title: "gaining weight",
    seen: "Just as real a goal — and one most weight sites ignore.",
    intro: "The same tools help; you&apos;re aiming for a gentle surplus instead of a deficit. Focus on enough energy and protein, from foods you enjoy.",
    accent: "var(--green)",
    tools: [
      { href: "/bmr", label: "Find your resting burn", why: "Your starting point — you&apos;ll want to eat a bit above this." },
      { href: "/tools", label: "Check your food", why: "Spot calorie- and protein-dense foods to add (groundnuts, avocado, beans, eggs)." },
      { href: "/meals", label: "Plan a fuller day", why: "Build meals that comfortably clear your resting burn." },
      { href: "/body-bank", label: "Your body bank", why: "See how a surplus builds — and what can quietly block gaining." },
    ],
    flag: "One honest note: struggling to gain weight, or losing it without trying, can sometimes signal a health issue (thyroid, gut absorption, and others). If that&apos;s you, please see a doctor first — gaining well starts with ruling that out.",
  },
  maintain: {
    title: "maintaining your weight",
    seen: "Maintenance takes real skill — most people underestimate it.",
    intro: "The aim is balance: energy in roughly matching energy out, with enough protein to protect muscle. The tools help you find and hold that line.",
    accent: "var(--amber)",
    tools: [
      { href: "/bmr", label: "Find your resting burn", why: "Your rough balance point to aim around." },
      { href: "/meals", label: "Plan a balanced day", why: "See your day sit near (not far below) your burn." },
      { href: "/tools", label: "Know your foods", why: "Stay aware of the foods and drinks that quietly add up." },
      { href: "/body-bank", label: "Your body bank", why: "See what &lsquo;balance&rsquo; really looks like over time." },
    ],
  },
};

export default function WelcomePage() {
  const [journey, setJourney] = useState<Journey | null>(null);
  const g = journey ? GUIDES[journey] : null;

  return (
    <main className="min-h-screen relative overflow-hidden" style={{ background: "linear-gradient(180deg, #fff 0%, var(--paper) 100%)" }}>
      {/* ambient glow shifts with hover/selection feel */}
      <div className="absolute inset-0 -z-10" style={{ background: "radial-gradient(800px 500px at 50% -10%, #E1F0EC 0%, transparent 60%)" }} />

      {/* minimal corner mark — no competing nav */}
      <div className="px-6 py-5">
        <Link href="/" className="inline-flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-serif-display text-lg font-bold" style={{ background: "var(--teal)" }}>+</div>
          <span className="text-sm font-semibold" style={{ color: "var(--muted)" }}>The Weight-Loss System</span>
        </Link>
      </div>

      {!journey ? (
        /* ===== THE QUESTION — full attention ===== */
        <section className="min-h-[78vh] flex flex-col items-center justify-center px-6 text-center rise">
          <div className="text-xs font-bold tracking-[0.2em] uppercase mb-6" style={{ color: "var(--teal)" }}>First, one question</div>
          <h1 className="font-serif-display font-bold mb-4" style={{ color: "var(--ink)", fontSize: "clamp(2.2rem, 7vw, 3.6rem)", lineHeight: 1.05, maxWidth: "16ch" }}>
            Where are you headed?
          </h1>
          <p className="text-lg mb-14 max-w-md" style={{ color: "var(--muted)" }}>
            The same honest tools can help whichever way you&apos;re going. Tell us your journey.
          </p>

          <div className="grid sm:grid-cols-3 gap-5 w-full max-w-3xl">
            {CHOICES.map((c, i) => (
              <button
                key={c.key}
                onClick={() => setJourney(c.key)}
                className={`group relative rounded-[1.75rem] bg-white border px-6 py-9 transition-all duration-300 ${i === 0 ? "rise" : i === 1 ? "rise-2" : "rise-3"}`}
                style={{ borderColor: "var(--hair)" }}
                onMouseEnter={(e) => { e.currentTarget.style.boxShadow = `0 18px 40px -16px ${c.glow}`; e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.borderColor = c.accent; }}
                onMouseLeave={(e) => { e.currentTarget.style.boxShadow = ""; e.currentTarget.style.transform = ""; e.currentTarget.style.borderColor = "var(--hair)"; }}
              >
                <div className="text-5xl mb-4 transition-transform duration-300 group-hover:scale-110">{c.emoji}</div>
                <div className="font-serif-display font-bold text-xl mb-1" style={{ color: c.accent }}>{c.label}</div>
                <div className="text-sm" style={{ color: "var(--muted)" }}>&ldquo;{c.feeling}&rdquo;</div>
              </button>
            ))}
          </div>

          <Link href="/body-bank" className="mt-12 text-sm font-semibold inline-flex items-center gap-1.5" style={{ color: "var(--teal)" }}>
            🏦 Or first, see how the body works — explained as money →
          </Link>
          <Link href="/tools" className="mt-4 text-sm" style={{ color: "var(--muted)" }}>just explore the tools →</Link>
        </section>
      ) : (
        /* ===== THE GUIDE — a beat of being seen, then the path ===== */
        <section className="max-w-2xl mx-auto px-6 py-10 sm:py-14 rise">
          <button onClick={() => setJourney(null)} className="text-sm mb-8 inline-flex items-center gap-1" style={{ color: "var(--muted)" }}>← choose again</button>

          {/* the recognition beat */}
          <div className="mb-10">
            <div className="text-xs font-bold tracking-[0.2em] uppercase mb-3" style={{ color: g!.accent }}>Your journey · {g!.title}</div>
            <h1 className="font-serif-display font-bold mb-3" style={{ color: "var(--ink)", fontSize: "clamp(1.8rem, 5vw, 2.6rem)", lineHeight: 1.1 }}
                dangerouslySetInnerHTML={{ __html: g!.seen }} />
            <p className="text-lg" style={{ color: "var(--muted)" }} dangerouslySetInnerHTML={{ __html: g!.intro }} />
          </div>

          {g!.flag && (
            <div className="rounded-2xl p-4 mb-8 text-sm" style={{ background: "#FBEEEA", color: "#9a3a23" }} dangerouslySetInnerHTML={{ __html: g!.flag }} />
          )}

          <div className="flex flex-col gap-3 mb-10">
            {g!.tools.map((t, i) => (
              <Link key={t.href} href={t.href} className="card-hover rounded-2xl p-5 bg-white border flex items-center gap-4" style={{ borderColor: "var(--hair)" }}>
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold shrink-0" style={{ background: g!.accent }}>{i + 1}</div>
                <div className="flex-1">
                  <div className="font-bold" style={{ color: "var(--ink)" }} dangerouslySetInnerHTML={{ __html: t.label + " →" }} />
                  <div className="text-sm" style={{ color: "var(--muted)" }} dangerouslySetInnerHTML={{ __html: t.why }} />
                </div>
              </Link>
            ))}
          </div>

          <div className="rounded-3xl p-6 text-white" style={{ background: "linear-gradient(150deg, var(--teal), var(--ink))" }}>
            <div className="font-serif-display font-bold mb-1" style={{ fontSize: "1.3rem" }}>Want a plan made for you?</div>
            <p className="text-sm mb-4" style={{ color: "#CFE6E8" }}>The full program — screened by a doctor, built around your body and your goal — is coming soon.</p>
            <Link href="/start" className="inline-block px-5 py-2.5 rounded-xl font-semibold" style={{ background: "white", color: "var(--ink)" }}>See the program →</Link>
          </div>

          <div className="mt-8 text-center">
            <Link href="/" className="font-semibold" style={{ color: "var(--teal)" }}>← Home</Link>
          </div>
        </section>
      )}
    </main>
  );
}