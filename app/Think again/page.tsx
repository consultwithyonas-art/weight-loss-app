"use client";

import Link from "next/link";

type Myth = {
  href: string;
  emoji: string;
  myth: string;
  truth: string;
  grad: string;
  live: boolean;
};

const MYTHS: Myth[] = [
  {
    href: "/belly", emoji: "🫃", live: true,
    myth: "“A belly is just fat.”",
    truth: "It's often fat, gas, food, fluid, posture and weak muscle — stacked. Tap to see.",
    grad: "linear-gradient(150deg, var(--green), var(--ink))",
  },
  {
    href: "/balance", emoji: "⚖️", live: true,
    myth: "“Losing weight is all willpower.”",
    truth: "It's energy in vs out, balanced over time — not a moral test. Slide and see.",
    grad: "linear-gradient(150deg, var(--teal), var(--ink))",
  },
  {
    href: "/energy", emoji: "🔬", live: true,
    myth: "“Calories are the whole story.”",
    truth: "Hormones, sleep, the gut and disease move the dials — without breaking the rule.",
    grad: "linear-gradient(150deg, #5b6cb0, var(--ink))",
  },
  {
    href: "/walk-it-off", emoji: "🚶", live: true,
    myth: "“I'll just burn it off later.”",
    truth: "See how long you'd really have to walk off a soda. It's longer than you think.",
    grad: "linear-gradient(150deg, var(--amber), var(--ink))",
  },
  {
    href: "/sugar", emoji: "🥄", live: true,
    myth: "“It's just a drink.”",
    truth: "Watch the teaspoons of sugar pile up — that ‘healthy’ juice may shock you.",
    grad: "linear-gradient(150deg, var(--coral), var(--ink))",
  },
  {
    href: "", emoji: "🎯", live: false,
    myth: "“Crunches burn belly fat.”",
    truth: "Coming soon — why you can't choose where fat leaves.",
    grad: "linear-gradient(150deg, #b0685b, var(--ink))",
  },
];

export default function ThinkAgainPage() {
  return (
    <main className="min-h-screen">
      <header style={{ background: "var(--ink)" }} className="px-5 py-4">
        <div className="max-w-5xl mx-auto flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg flex items-center justify-center text-white font-serif-display text-xl font-bold" style={{ background: "var(--teal)" }}>+</div>
            <div className="text-white">
              <div className="font-bold leading-tight text-sm sm:text-base">The Weight-Loss System</div>
              <div className="text-[10px] sm:text-xs tracking-widest uppercase" style={{ color: "var(--mint)" }}>Think again</div>
            </div>
          </Link>
          <nav className="ml-auto flex gap-1.5">
            <Link href="/learn" className="px-3 py-1.5 rounded-lg text-sm font-semibold" style={{ color: "#9FC4C8" }}>Learn</Link>
            <Link href="/tools" className="px-3 py-1.5 rounded-lg text-sm font-semibold" style={{ color: "#9FC4C8" }}>Food</Link>
          </nav>
        </div>
      </header>

      <section className="max-w-5xl mx-auto px-5 py-8 sm:py-12 rise">
        <div className="text-sm font-bold tracking-widest uppercase mb-3" style={{ color: "var(--teal)" }}>Think again · by a doctor</div>
        <h1 className="font-serif-display font-bold mb-3" style={{ color: "var(--ink)", fontSize: "clamp(2rem, 6vw, 3rem)" }}>
          Most of what we &ldquo;know&rdquo; about weight is half-true.
        </h1>
        <p className="text-base sm:text-lg max-w-2xl mb-10" style={{ color: "var(--muted)" }}>
          Pick a belief below and play with it. Each one looks simple — until you see what&apos;s really going on. No fear, no fads, just the honest fuller picture.
        </p>

        <div className="grid gap-5 sm:grid-cols-2">
          {MYTHS.map((m, i) =>
            m.live ? (
              <Link key={i} href={m.href} className="card-hover block rounded-3xl p-6 text-white" style={{ background: m.grad }}>
                <div className="flex items-start gap-4">
                  <div className="text-4xl">{m.emoji}</div>
                  <div>
                    <div className="text-xs font-bold tracking-widest uppercase mb-1" style={{ color: "rgba(255,255,255,0.8)" }}>The myth</div>
                    <div className="font-serif-display font-bold text-xl mb-2" style={{ lineHeight: 1.2 }}>{m.myth}</div>
                    <div className="text-sm" style={{ color: "rgba(255,255,255,0.9)" }}>{m.truth}</div>
                    <div className="mt-3 text-sm font-bold">Think again →</div>
                  </div>
                </div>
              </Link>
            ) : (
              <div key={i} className="rounded-3xl p-6 border-2 border-dashed relative" style={{ borderColor: "var(--hair)", background: "#fff" }}>
                <div className="flex items-start gap-4 opacity-70">
                  <div className="text-4xl grayscale">{m.emoji}</div>
                  <div>
                    <div className="text-xs font-bold tracking-widest uppercase mb-1" style={{ color: "var(--muted)" }}>The myth</div>
                    <div className="font-serif-display font-bold text-xl mb-2" style={{ color: "var(--ink)", lineHeight: 1.2 }}>{m.myth}</div>
                    <div className="text-sm" style={{ color: "var(--muted)" }}>{m.truth}</div>
                  </div>
                </div>
                <span className="absolute top-4 right-4 text-[11px] font-bold tracking-widest px-2 py-1 rounded-full" style={{ background: "#FBF1E0", color: "#9a6a10" }}>SOON</span>
              </div>
            )
          )}
        </div>

        <div className="mt-10 rounded-3xl p-6 sm:p-8 text-white" style={{ background: "linear-gradient(150deg, var(--teal), var(--ink))" }}>
          <div className="font-serif-display font-bold mb-1" style={{ fontSize: "1.4rem" }}>The real lesson behind every myth</div>
          <p className="mb-4" style={{ color: "#CFE6E8" }}>Your body is more complex than the advice you&apos;ve been given. That&apos;s exactly why a plan made for <i>you</i> — screened by a doctor — works where generic rules fail.</p>
          <Link href="/start" className="inline-block px-6 py-3 rounded-xl font-semibold" style={{ background: "white", color: "var(--ink)" }}>See the program →</Link>
        </div>

        <div className="mt-8"><Link href="/learn" className="font-semibold" style={{ color: "var(--teal)" }}>← Back to Good to Know</Link></div>
      </section>

      <footer className="max-w-5xl mx-auto px-5 pb-10 text-xs" style={{ color: "var(--muted)" }}>
        Educational only — general information, not medical advice for your specific situation. For personal concerns, see a doctor.
      </footer>
    </main>
  );
}