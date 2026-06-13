"use client";

import Link from "next/link";
import { useState } from "react";

type Journey = "lose" | "gain" | "maintain";

const GUIDES: Record<Journey, {
  title: string; intro: string; accent: string;
  tools: { href: string; label: string; why: string }[];
  flag?: string;
}> = {
  lose: {
    title: "Losing weight",
    intro: "You're in the right place — this is what the whole toolkit is built around. Here's a good order to explore.",
    accent: "var(--teal)",
    tools: [
      { href: "/tools", label: "Check your food", why: "See honest calorie ranges for the foods you love." },
      { href: "/bmr", label: "Find your resting burn", why: "Know roughly how much energy your body uses." },
      { href: "/meals", label: "Plan a day", why: "Build meals and see how they sit against your burn." },
      { href: "/think-again", label: "Think Again", why: "Bust the myths that keep people stuck." },
    ],
  },
  gain: {
    title: "Gaining weight",
    intro: "Just as real, and often overlooked. The same tools help — you're just aiming for a gentle surplus instead of a deficit. Focus on enough energy and protein, from foods you enjoy.",
    accent: "var(--green)",
    tools: [
      { href: "/bmr", label: "Find your resting burn", why: "Your starting point — you'll want to eat a bit above this." },
      { href: "/tools", label: "Check your food", why: "Spot calorie- and protein-dense foods to add (groundnuts, avocado, beans, eggs)." },
      { href: "/meals", label: "Plan a fuller day", why: "Build meals that comfortably clear your resting burn." },
      { href: "/energy", label: "How the body works", why: "See how a surplus builds — and what can quietly block gaining." },
    ],
    flag: "One honest note: struggling to gain weight, or losing it without trying, can sometimes signal a health issue (thyroid, gut absorption, and others). If that's you, please see a doctor first — gaining well starts with ruling that out.",
  },
  maintain: {
    title: "Keeping your weight",
    intro: "Maintenance is a real goal — and a skill. The aim is balance: energy in roughly matching energy out, with enough protein to protect muscle. The tools help you find and hold that line.",
    accent: "var(--amber)",
    tools: [
      { href: "/bmr", label: "Find your resting burn", why: "Your rough balance point to aim around." },
      { href: "/meals", label: "Plan a balanced day", why: "See your day sit near (not far below) your burn." },
      { href: "/tools", label: "Know your foods", why: "Stay aware of the foods and drinks that quietly add up." },
      { href: "/think-again", label: "Think Again", why: "Understand your body so balance feels easy, not anxious." },
    ],
  },
};

export default function WelcomePage() {
  const [journey, setJourney] = useState<Journey | null>(null);
  const g = journey ? GUIDES[journey] : null;

  return (
    <main className="min-h-screen relative overflow-hidden">
      <div className="absolute inset-0 -z-10" style={{ background: "radial-gradient(900px 500px at 20% -5%, #DDF0EC 0%, transparent 55%), linear-gradient(180deg, #fff 0%, var(--paper) 100%)" }} />

      <header className="px-5 py-5">
        <div className="max-w-3xl mx-auto flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg flex items-center justify-center text-white font-serif-display text-xl font-bold" style={{ background: "var(--teal)" }}>+</div>
            <div>
              <div className="font-bold leading-tight" style={{ color: "var(--ink)" }}>The Weight-Loss System</div>
              <div className="text-xs tracking-widest uppercase" style={{ color: "var(--teal)" }}>Free tools · by a doctor</div>
            </div>
          </Link>
        </div>
      </header>

      <section className="max-w-3xl mx-auto px-5 py-10 sm:py-16 rise">
        {!journey ? (
          <>
            <h1 className="font-serif-display font-bold mb-4" style={{ color: "var(--ink)", fontSize: "clamp(2rem, 6vw, 3rem)", lineHeight: 1.1 }}>
              First — tell us about your journey.
            </h1>
            <p className="text-lg mb-10" style={{ color: "var(--muted)" }}>
              Most people come to lose weight, and that&apos;s our home ground. But not everyone — and the same honest tools can help whichever way you&apos;re headed. Which is you?
            </p>

            <div className="grid sm:grid-cols-3 gap-4">
              {([
                ["lose", "📉", "I want to lose weight", "var(--teal)"],
                ["gain", "📈", "I want to gain weight", "var(--green)"],
                ["maintain", "⚖️", "I want to keep my weight", "var(--amber)"],
              ] as const).map(([key, emoji, label, color]) => (
                <button key={key} onClick={() => setJourney(key)} className="card-hover rounded-3xl p-6 bg-white border text-center" style={{ borderColor: "var(--hair)" }}>
                  <div className="text-4xl mb-3">{emoji}</div>
                  <div className="font-serif-display font-bold text-lg" style={{ color: color }}>{label}</div>
                </button>
              ))}
            </div>

            <Link href="/body-bank" className="card-hover block rounded-3xl p-6 mt-8 text-white" style={{ background: "linear-gradient(150deg, #5b8fb0, var(--ink))" }}>
              <div className="text-xs font-bold tracking-widest uppercase mb-2" style={{ color: "rgba(255,255,255,0.8)" }}>🏦 First, understand the basics</div>
              <div className="font-serif-display font-bold text-lg mb-1">Your body keeps a savings account</div>
              <div className="text-sm" style={{ color: "rgba(255,255,255,0.9)" }}>See how food, movement, and your fat stores work — explained as money. Works for any journey.</div>
            </Link>

            <div className="mt-6 text-center">
              <Link href="/tools" className="text-sm" style={{ color: "var(--muted)" }}>or just explore the tools →</Link>
            </div>
          </>
        ) : (
          <>
            <button onClick={() => setJourney(null)} className="text-sm mb-6" style={{ color: "var(--muted)" }}>← choose again</button>
            <div className="text-sm font-bold tracking-widest uppercase mb-2" style={{ color: g!.accent }}>Your journey · {g!.title}</div>
            <h1 className="font-serif-display font-bold mb-4" style={{ color: "var(--ink)", fontSize: "clamp(1.8rem, 5vw, 2.6rem)", lineHeight: 1.1 }}>
              Here&apos;s how to use these tools for {g!.title.toLowerCase()}.
            </h1>
            <p className="text-lg mb-8" style={{ color: "var(--muted)" }}>{g!.intro}</p>

            {g!.flag && (
              <div className="rounded-2xl p-4 mb-8 text-sm" style={{ background: "#FBEEEA", color: "#9a3a23" }}>
                {g!.flag}
              </div>
            )}

            <div className="flex flex-col gap-3 mb-10">
              {g!.tools.map((t, i) => (
                <Link key={t.href} href={t.href} className="card-hover rounded-2xl p-5 bg-white border flex items-center gap-4" style={{ borderColor: "var(--hair)" }}>
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold shrink-0" style={{ background: g!.accent }}>{i + 1}</div>
                  <div>
                    <div className="font-bold" style={{ color: "var(--ink)" }}>{t.label} →</div>
                    <div className="text-sm" style={{ color: "var(--muted)" }}>{t.why}</div>
                  </div>
                </Link>
              ))}
            </div>

            <div className="rounded-3xl p-6 text-white" style={{ background: "linear-gradient(150deg, var(--teal), var(--ink))" }}>
              <div className="font-serif-display font-bold mb-1" style={{ fontSize: "1.3rem" }}>Want a plan made for you?</div>
              <p className="text-sm mb-4" style={{ color: "#CFE6E8" }}>The full program — screened by a doctor, built around your body and your goal — is coming soon.</p>
              <Link href="/start" className="inline-block px-5 py-2.5 rounded-xl font-semibold" style={{ background: "white", color: "var(--ink)" }}>See the program →</Link>
            </div>
          </>
        )}

        <div className="mt-8 text-center">
          <Link href="/" className="font-semibold" style={{ color: "var(--teal)" }}>← Home</Link>
        </div>
      </section>
    </main>
  );
}