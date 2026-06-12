"use client";

import Link from "next/link";
import { useState } from "react";

type Stat = { energy: number; mood: number; sleep: number; weight: number; burnout: number };

type Choice = {
  label: string;
  sub: string;
  good: boolean;        // sustainable & kind?
  drastic?: boolean;    // aggressive — spikes then backfires
  effect: Partial<Stat>;
  reaction: string;     // Mutoni's voice
};

type Week = { theme: string; prompt: string; choices: Choice[] };

const WEEKS: Week[] = [
  {
    theme: "Sleep", prompt: "Mutoni's been staying up late scrolling. Bedtime tonight?",
    choices: [
      { label: "Wind down by 10:30", sub: "Phone away, lights low", good: true,
        effect: { sleep: 25, energy: 12, mood: 8 }, reaction: "“I actually woke up before my alarm. Strange feeling — a good one.”" },
      { label: "One more episode… or three", sub: "Bed at 1am again", good: false,
        effect: { sleep: -12, energy: -10, mood: -6 }, reaction: "“Tired and cranky again. I keep doing this to myself.”" },
    ],
  },
  {
    theme: "Breakfast", prompt: "Rushing out the door. What does she grab?",
    choices: [
      { label: "Eggs + a banana", sub: "Protein to stay full", good: true,
        effect: { energy: 14, mood: 6, weight: -2 }, reaction: "“I wasn't starving by 11am for once. That never happens.”" },
      { label: "Skip it, mandazi later", sub: "Then a sugar crash", good: false,
        effect: { energy: -8, mood: -4, weight: 2 }, reaction: "“By mid-morning I was so hungry I ate two mandazi. Oops.”" },
    ],
  },
  {
    theme: "Movement", prompt: "She's been sitting all day. The plan for evenings?",
    choices: [
      { label: "A 20-min walk after work", sub: "Something she'll actually keep", good: true,
        effect: { energy: 12, mood: 14, weight: -3, sleep: 6 }, reaction: "“The walk clears my head. I look forward to it now, oddly.”" },
      { label: "Sign up for daily 2-hour gym", sub: "Go hard, all in", good: false, drastic: true,
        effect: { energy: 18, mood: 10, weight: -5, burnout: 30 }, reaction: "“Week one I felt unstoppable! …Ask me again in a few weeks.”" },
    ],
  },
  {
    theme: "The office snacks", prompt: "Cake in the break room, third time this week.",
    choices: [
      { label: "A small slice, enjoyed", sub: "No guilt, no spiral", good: true,
        effect: { mood: 10, weight: 1 }, reaction: "“I had a slice, enjoyed it, moved on. I didn't 'ruin' anything.”" },
      { label: "Swear off all sweets forever", sub: "Total ban, willpower only", good: false, drastic: true,
        effect: { mood: -8, burnout: 20, weight: -1 }, reaction: "“I lasted two days then ate half the cake. All-or-nothing never works for me.”" },
    ],
  },
  {
    theme: "Drinks", prompt: "She drinks 2–3 sodas a day without thinking.",
    choices: [
      { label: "Swap one soda for water", sub: "Just one, to start", good: true,
        effect: { weight: -3, energy: 6 }, reaction: "“Didn't even miss it. Funny how it was just habit.”" },
      { label: "Keep them, plus evening wine", sub: "It's been a long week", good: false,
        effect: { sleep: -10, weight: 3, mood: -2 }, reaction: "“The wine helps me unwind but I sleep worse. Trade-off I keep making.”" },
    ],
  },
  {
    theme: "A hard week", prompt: "Work blew up. She's stressed and exhausted.",
    choices: [
      { label: "Be kind to herself, keep the basics", sub: "Sleep, a walk, don't quit", good: true,
        effect: { mood: 12, energy: 8, sleep: 8 }, reaction: "“I didn't have a perfect week — but I didn't give up either. That's new.”" },
      { label: "Throw in the towel this week", sub: "Stress-eat, skip everything", good: false,
        effect: { mood: -12, energy: -10, weight: 3, burnout: 10 }, reaction: "“One bad day became a bad week. I'm learning that's the real trap.”" },
    ],
  },
];

const START: Stat = { energy: 30, mood: 35, sleep: 30, weight: 92, burnout: 0 };

export default function MutoniPage() {
  const [step, setStep] = useState(-1); // -1 = intro, 0..n weeks, n = ending
  const [stat, setStat] = useState<Stat>(START);
  const [reaction, setReaction] = useState<string>("");
  const [history, setHistory] = useState<number[]>([START.weight]);

  const clamp = (n: number) => Math.max(0, Math.min(100, n));

  const choose = (c: Choice) => {
    setStat((s) => {
      let next: Stat = {
        energy: clamp(s.energy + (c.effect.energy ?? 0)),
        mood: clamp(s.mood + (c.effect.mood ?? 0)),
        sleep: clamp(s.sleep + (c.effect.sleep ?? 0)),
        weight: s.weight + (c.effect.weight ?? 0) * 0.1,
        burnout: clamp(s.burnout + (c.effect.burnout ?? 0)),
      };
      // burnout backfire: if drastic choices pile up, the next week crashes
      if (next.burnout >= 40) {
        next = { ...next, energy: clamp(next.energy - 22), mood: clamp(next.mood - 20), weight: next.weight + 0.4, burnout: clamp(next.burnout - 20) };
        setReaction(c.reaction + "  …But it caught up with her — she crashed and bounced back up. Going too hard rarely lasts.");
      } else {
        setReaction(c.reaction);
      }
      setHistory((h) => [...h, +next.weight.toFixed(1)]);
      return next;
    });
    setStep((s) => s + 1);
  };

  const Meter = ({ label, val, color }: { label: string; val: number; color: string }) => (
    <div>
      <div className="flex justify-between text-xs mb-1"><span style={{ color: "var(--muted)" }}>{label}</span><span className="font-semibold" style={{ color }}>{Math.round(val)}</span></div>
      <div className="h-2.5 rounded-full overflow-hidden" style={{ background: "#EDF3F4" }}>
        <div className="h-full rounded-full" style={{ width: `${val}%`, background: color, transition: "width 0.5s ease" }} />
      </div>
    </div>
  );

  const Header = () => (
    <header style={{ background: "var(--ink)" }} className="px-5 py-4">
      <div className="max-w-3xl mx-auto flex items-center gap-3">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-lg flex items-center justify-center text-white font-serif-display text-xl font-bold" style={{ background: "var(--teal)" }}>+</div>
          <div className="text-white">
            <div className="font-bold leading-tight text-sm sm:text-base">The Weight-Loss System</div>
            <div className="text-[10px] sm:text-xs tracking-widest uppercase" style={{ color: "var(--mint)" }}>Mutoni&apos;s story</div>
          </div>
        </Link>
        <nav className="ml-auto"><Link href="/think-again" className="px-3 py-1.5 rounded-lg text-sm font-semibold" style={{ color: "#9FC4C8" }}>← Back</Link></nav>
      </div>
    </header>
  );

  // INTRO
  if (step === -1) {
    return (
      <main className="min-h-screen">
        <Header />
        <section className="max-w-3xl mx-auto px-5 py-10 sm:py-16 rise">
          <div className="text-sm font-bold tracking-widest uppercase mb-3" style={{ color: "var(--teal)" }}>Interactive story</div>
          <h1 className="font-serif-display font-bold mb-5" style={{ color: "var(--ink)", fontSize: "clamp(2rem, 6vw, 3rem)" }}>Help Mutoni feel better.</h1>
          <div className="bg-white rounded-3xl border p-6 mb-6" style={{ borderColor: "var(--hair)" }}>
            <div className="text-5xl mb-3">👩🏾</div>
            <p className="mb-3" style={{ color: "var(--text)" }}>
              Meet <b>Mutoni</b>. She&apos;s 34, works long days at a desk, and is always a little tired. She <b>loves food</b> — and shouldn&apos;t have to give that up. She&apos;s tried crash diets before; they never lasted.
            </p>
            <p style={{ color: "var(--muted)" }}>
              She doesn&apos;t need to become a gym fanatic or eat plain salad forever. She needs small, livable changes. Over the next weeks, <b>you&apos;ll make choices with her</b> — and see what really helps.
            </p>
          </div>
          <p className="text-sm mb-6" style={{ color: "var(--muted)" }}>One honest note: this is a story to show how sustainable change works. Real people are unique — which is exactly why a real plan is personal.</p>
          <button onClick={() => setStep(0)} className="px-7 py-3.5 rounded-xl font-bold text-white" style={{ background: "var(--teal)" }}>Start Mutoni&apos;s journey →</button>
        </section>
      </main>
    );
  }

  // ENDING
  if (step >= WEEKS.length) {
    const lost = (START.weight - stat.weight).toFixed(1);
    const thriving = stat.energy > 55 && stat.mood > 55;
    return (
      <main className="min-h-screen">
        <Header />
        <section className="max-w-3xl mx-auto px-5 py-10 sm:py-16 rise">
          <div className="text-sm font-bold tracking-widest uppercase mb-3" style={{ color: "var(--teal)" }}>{WEEKS.length} weeks later</div>
          <h1 className="font-serif-display font-bold mb-5" style={{ color: "var(--ink)", fontSize: "clamp(1.8rem, 5vw, 2.6rem)" }}>
            {thriving ? "Mutoni feels like herself again." : "Mutoni made a start — and learned a lot."}
          </h1>
          <div className="bg-white rounded-3xl border p-6 mb-6" style={{ borderColor: "var(--hair)" }}>
            <div className="grid sm:grid-cols-2 gap-3 mb-5">
              <Meter label="Energy" val={stat.energy} color="var(--amber)" />
              <Meter label="Mood" val={stat.mood} color="var(--coral)" />
              <Meter label="Sleep" val={stat.sleep} color="var(--teal)" />
              <div>
                <div className="flex justify-between text-xs mb-1"><span style={{ color: "var(--muted)" }}>Weight trend</span><span className="font-semibold" style={{ color: "var(--green)" }}>{lost > "0" ? `−${lost} kg` : "steady"}</span></div>
                <div className="text-xs" style={{ color: "var(--muted)" }}>slow and steady — the kind that stays</div>
              </div>
            </div>
            <p style={{ color: "var(--text)" }}>
              {thriving
                ? "“I have more energy, I sleep better, and I didn't give up the foods I love. The weight is following — slowly — and for once I think it'll last.”"
                : "“It wasn't perfect, and that's okay. I learned that going too hard backfires, and small steps actually stick. I'm still going.”"}
            </p>
          </div>
          <div className="rounded-3xl p-6 sm:p-8 text-white" style={{ background: "linear-gradient(150deg, var(--teal), var(--ink))" }}>
            <div className="font-serif-display font-bold mb-1" style={{ fontSize: "1.4rem" }}>This is what a livable plan looks like.</div>
            <p className="mb-4" style={{ color: "#CFE6E8" }}>Built around her life, not against it. The real program does this for <i>you</i> — screened by a doctor, tailored to your body and the food you love.</p>
            <Link href="/start" className="inline-block px-6 py-3 rounded-xl font-semibold" style={{ background: "white", color: "var(--ink)" }}>See the program →</Link>
          </div>
          <div className="mt-6"><button onClick={() => { setStat(START); setHistory([START.weight]); setReaction(""); setStep(-1); }} className="font-semibold" style={{ color: "var(--teal)" }}>↺ Play again</button></div>
        </section>
      </main>
    );
  }

  // A WEEK
  const w = WEEKS[step];
  return (
    <main className="min-h-screen">
      <Header />
      <section className="max-w-3xl mx-auto px-5 py-8 sm:py-12 rise">
        <div className="flex items-center justify-between mb-4">
          <div className="text-sm font-bold tracking-widest uppercase" style={{ color: "var(--teal)" }}>Week {step + 1} of {WEEKS.length} · {w.theme}</div>
          <div className="text-sm" style={{ color: "var(--muted)" }}>👩🏾 Mutoni</div>
        </div>

        {/* meters */}
        <div className="bg-white rounded-2xl border p-4 mb-5 grid grid-cols-3 gap-3" style={{ borderColor: "var(--hair)" }}>
          <Meter label="Energy" val={stat.energy} color="var(--amber)" />
          <Meter label="Mood" val={stat.mood} color="var(--coral)" />
          <Meter label="Sleep" val={stat.sleep} color="var(--teal)" />
        </div>

        {/* last reaction */}
        {reaction && (
          <div className="rounded-2xl p-4 mb-5 text-sm" style={{ background: "#F3ECF5", color: "var(--ink)" }}>
            {reaction}
          </div>
        )}

        <div className="bg-white rounded-3xl border p-6" style={{ borderColor: "var(--hair)" }}>
          <h2 className="font-serif-display font-bold text-xl mb-4" style={{ color: "var(--ink)" }}>{w.prompt}</h2>
          <div className="grid gap-3">
            {w.choices.map((c, i) => (
              <button key={i} onClick={() => choose(c)} className="text-left rounded-2xl border p-4 card-hover" style={{ borderColor: "var(--hair)", background: "#fff" }}>
                <div className="font-semibold" style={{ color: "var(--ink)" }}>{c.label}</div>
                <div className="text-sm" style={{ color: "var(--muted)" }}>{c.sub}</div>
              </button>
            ))}
          </div>
        </div>
        <p className="text-xs mt-4" style={{ color: "var(--muted)" }}>Choose what feels realistic for a busy life — not what sounds most &ldquo;disciplined.&rdquo;</p>
      </section>
    </main>
  );
}