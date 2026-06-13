"use client";

import Link from "next/link";
import { useState } from "react";

type Card = {
  kind: "myth" | "know" | "plate";
  tag: string;
  title: string;
  body: string;
  accent: string;
  soft: string;
};

const CARDS: Card[] = [
  {
    kind: "myth", tag: "Myth vs fact", accent: "var(--coral)", soft: "#FBECE8",
    title: "“Eating late at night makes you fat.”",
    body: "What matters far more is how much you eat across the whole day, not the clock. A late meal isn't stored differently — total intake over time is what moves weight. (Late eating can affect sleep and snacking, which is the real thing to watch.)",
  },
  {
    kind: "myth", tag: "Myth vs fact", accent: "var(--coral)", soft: "#FBECE8",
    title: "“Carbs are the enemy.”",
    body: "Ugali, rice and matoke aren't the problem by themselves. Portion size and what's alongside them matter more. Carbs with protein, vegetables and a bit of fat make a balanced, filling plate. No food group is the villain.",
  },
  {
    kind: "know", tag: "Good to know", accent: "var(--teal)", soft: "#E4EEF0",
    title: "Why the scale “lies” day to day.",
    body: "Your weight swings 1–2 kg in a day from water, salt and food still in your gut — not fat. That's why a single weigh-in means little. A two-week trend tells the truth; one morning's number doesn't.",
  },
  {
    kind: "know", tag: "Good to know", accent: "var(--teal)", soft: "#E4EEF0",
    title: "Protein protects your muscle.",
    body: "When you lose weight, you want to lose fat — not muscle. Eating enough protein (beans, eggs, fish, chicken, groundnuts) while losing weight helps keep the muscle and lose the fat. It also keeps you fuller for longer.",
  },
  {
    kind: "know", tag: "Good to know", accent: "var(--teal)", soft: "#E4EEF0",
    title: "Fibre keeps you full.",
    body: "Vegetables, beans and whole grains add fibre — it fills you up for very few calories and steadies your energy. A big serving of sukuma wiki or cabbage is one of the easiest ways to feel satisfied on less.",
  },
  {
    kind: "plate", tag: "Balanced plate", accent: "var(--green)", soft: "#E8F3EC",
    title: "What a balanced plate looks like.",
    body: "A simple guide: half your plate vegetables (sukuma, cabbage, tomato), a quarter protein (beans, fish, chicken, eggs), and a quarter starch (ugali, rice, matoke). Add a little healthy fat like avocado. Local food, sensible balance.",
  },
  {
    kind: "plate", tag: "Balanced plate", accent: "var(--green)", soft: "#E8F3EC",
    title: "Drinks count too.",
    body: "Soda, juice and sweet chai add calories without filling you up — they're easy to overlook. Water, or unsweetened drinks, leave room for actual food. A simple swap that adds up over a week.",
  },
  {
    kind: "know", tag: "Good to know", accent: "var(--teal)", soft: "#E4EEF0",
    title: "Sleep and stress shape your weight.",
    body: "Too little sleep and high stress raise hunger and cravings the next day — it's biology, not weak willpower. Protecting your sleep is one of the most underrated tools for managing appetite.",
  },
];

const FILTERS = [
  { v: "all", label: "All" },
  { v: "myth", label: "Myth vs fact" },
  { v: "know", label: "Good to know" },
  { v: "plate", label: "Balanced plate" },
];

export default function LearnPage() {
  const [filter, setFilter] = useState("all");
  const shown = CARDS.filter((c) => filter === "all" || c.kind === filter);

  return (
    <main className="min-h-screen">
      <header style={{ background: "var(--ink)" }} className="px-5 py-4">
        <div className="max-w-5xl mx-auto flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg flex items-center justify-center text-white font-serif-display text-xl font-bold" style={{ background: "var(--teal)" }}>+</div>
            <div className="text-white">
              <div className="font-bold leading-tight text-sm sm:text-base">The Weight-Loss System</div>
              <div className="text-[10px] sm:text-xs tracking-widest uppercase" style={{ color: "var(--mint)" }}>Open tools</div>
            </div>
          </Link>
          <nav className="ml-auto flex gap-1.5">
            <Link href="/tools" className="px-3 py-1.5 rounded-lg text-sm font-semibold" style={{ color: "#9FC4C8" }}>Food</Link>
            <Link href="/bmr" className="px-3 py-1.5 rounded-lg text-sm font-semibold" style={{ color: "#9FC4C8" }}>BMR</Link>
            <Link href="/meals" className="px-3 py-1.5 rounded-lg text-sm font-semibold" style={{ color: "#9FC4C8" }}>Meals</Link>
            <Link href="/think-again" className="px-3 py-1.5 rounded-lg text-sm font-semibold" style={{ color: "#9FC4C8" }}>Think Again</Link>
          </nav>
        </div>
      </header>

      <section className="max-w-5xl mx-auto px-5 py-8 sm:py-12 rise">
        <div className="text-sm font-bold tracking-widest uppercase mb-3" style={{ color: "var(--teal)" }}>Good to know · by a doctor</div>
        <h1 className="font-serif-display font-bold mb-3" style={{ color: "var(--ink)", fontSize: "clamp(1.8rem, 5vw, 2.8rem)" }}>
          The honest truth about food &amp; weight.
        </h1>
        <p className="text-base sm:text-lg max-w-2xl mb-8" style={{ color: "var(--muted)" }}>
          Short, honest reads — no fads, no fear. Just clear facts to help you understand your body and what you put into it.
        </p>

        {/* Play & learn — Think Again hub */}
        <Link href="/think-again" className="card-hover block rounded-3xl p-6 mb-10 text-white" style={{ background: "linear-gradient(150deg, var(--teal), var(--ink))" }}>
          <div className="text-xs font-bold tracking-widest uppercase mb-2" style={{ color: "#CFE6E8" }}>🤔 Play &amp; learn · interactive</div>
          <div className="font-serif-display font-bold text-xl mb-1">Think Again — test what you know</div>
          <div className="text-sm" style={{ color: "#CFE6E8" }}>Pick a belief about weight and play with it — most of what we ‘know’ is half-true.</div>
        </Link>

        <div className="flex flex-wrap gap-2 mb-8">
          {FILTERS.map((f) => {
            const active = filter === f.v;
            return (
              <button key={f.v} onClick={() => setFilter(f.v)} className="px-4 py-2 rounded-full text-sm font-medium border"
                style={{ background: active ? "var(--ink)" : "white", color: active ? "white" : "var(--text)", borderColor: active ? "var(--ink)" : "var(--hair)" }}>
                {f.label}
              </button>
            );
          })}
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          {shown.map((c, i) => (
            <div key={i} className="card-hover bg-white rounded-3xl p-6 border" style={{ borderColor: "var(--hair)" }}>
              <span className="inline-block text-xs font-bold tracking-wide uppercase px-3 py-1 rounded-full mb-4" style={{ background: c.soft, color: c.accent }}>
                {c.tag}
              </span>
              <h3 className="font-serif-display font-bold text-xl mb-2" style={{ color: "var(--ink)", lineHeight: 1.25 }}>{c.title}</h3>
              <p className="text-sm sm:text-base" style={{ color: "var(--muted)" }}>{c.body}</p>
            </div>
          ))}
        </div>

        {/* gentle prime to the program */}
        <div className="mt-10 rounded-3xl p-6 sm:p-8 text-white" style={{ background: "linear-gradient(150deg, var(--teal), var(--ink))" }}>
          <div className="font-serif-display font-bold mb-1" style={{ fontSize: "1.4rem" }}>Want guidance made for you?</div>
          <p className="mb-4" style={{ color: "#CFE6E8" }}>General knowledge is a great start. A plan built around your body, your health and your food is the next step.</p>
          <Link href="/start" className="inline-block px-6 py-3 rounded-xl font-semibold" style={{ background: "white", color: "var(--ink)" }}>Explore the program →</Link>
        </div>

        {/* gentle, soft-gated reflective read */}
        <div className="mt-10 text-center">
          <Link href="/weight-and-protection" className="text-sm inline-block pb-0.5" style={{ color: "var(--muted)", borderBottom: "1px solid var(--hair)" }}>
            A gentle read: when weight has been a kind of protection →
          </Link>
        </div>

        <div className="mt-8"><Link href="/" className="font-semibold" style={{ color: "var(--teal)" }}>← Back home</Link></div>
      </section>

      <footer className="max-w-5xl mx-auto px-5 pb-10 text-xs" style={{ color: "var(--muted)" }}>
        Educational only — general information, not medical advice for your specific situation. For personal concerns, see a doctor.
      </footer>
    </main>
  );
}