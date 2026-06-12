import Link from "next/link";

const CARDS = [
  {
    href: "/tools",
    pre: "I want to know",
    title: "what's in the food I love",
    desc: "Search chapati, ugali, beans and more — honest calorie ranges, no guesswork.",
    accent: "var(--teal)",
    soft: "#E4EEF0",
    emoji: "🍽️",
  },
  {
    href: "/bmr",
    pre: "I want to know",
    title: "how much energy my body needs",
    desc: "Estimate your resting burn (BMR) in seconds — shown as an honest range.",
    accent: "var(--green)",
    soft: "#E8F3EC",
    emoji: "🔥",
  },
  {
    href: "/meals",
    pre: "I want to",
    title: "plan my day and see how it stacks up",
    desc: "Build your meals and check them against a healthy calorie and protein reference.",
    accent: "var(--amber)",
    soft: "#FBF1E0",
    emoji: "🥗",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen relative overflow-hidden">
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(1100px 600px at 15% -5%, #DDF0EC 0%, transparent 55%)," +
            "radial-gradient(900px 500px at 95% 10%, #E9F3E9 0%, transparent 50%)," +
            "linear-gradient(180deg, #FFFFFF 0%, var(--paper) 100%)",
        }}
      />
      <svg className="absolute inset-0 -z-10 w-full h-full" style={{ opacity: 0.05 }} aria-hidden="true">
        <g stroke="#0B3A4A" strokeWidth="2" fill="none" transform="translate(90,120)" className="float">
          <path d="M20 90 L20 10" /><path d="M20 28 q14 -6 18 -20" /><path d="M20 28 q-14 -6 -18 -20" />
          <path d="M20 48 q14 -6 18 -20" /><path d="M20 48 q-14 -6 -18 -20" />
          <path d="M20 68 q14 -6 18 -20" /><path d="M20 68 q-14 -6 -18 -20" />
        </g>
        <g stroke="#0B3A4A" strokeWidth="2" fill="none" transform="translate(1180,300)" className="float">
          <ellipse cx="0" cy="0" rx="34" ry="46" /><circle cx="0" cy="10" r="16" />
        </g>
        <g stroke="#0B3A4A" strokeWidth="2" fill="none" transform="translate(150,640)" className="float">
          <path d="M0 40 Q40 -20 80 40 Q40 60 0 40 Z" /><path d="M10 42 Q40 20 72 40" />
        </g>
        <g stroke="#0B3A4A" strokeWidth="2" fill="none" transform="translate(1120,640)" className="float">
          <path d="M-40 0 Q0 60 40 0" /><path d="M-48 0 L48 0" />
        </g>
      </svg>

      <header className="px-5 py-5">
        <div className="max-w-5xl mx-auto flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg flex items-center justify-center text-white font-serif-display text-xl font-bold" style={{ background: "var(--teal)" }}>+</div>
          <div>
            <div className="font-bold leading-tight" style={{ color: "var(--ink)" }}>The Weight-Loss System</div>
            <div className="text-xs tracking-widest uppercase" style={{ color: "var(--teal)" }}>Free tools · by a doctor</div>
          </div>
        </div>
      </header>

      <section className="max-w-5xl mx-auto px-5 pt-8 pb-6 rise">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-6" style={{ background: "rgba(27,127,140,0.08)" }}>
          <span style={{ fontSize: "1rem" }}>🩺</span>
          <span className="text-sm font-semibold" style={{ color: "var(--teal)" }}>
            Built by a doctor on the journey too — who&apos;s lost some weight along the way
          </span>
        </div>
        <h1 className="font-serif-display font-bold mb-5" style={{ color: "var(--ink)", fontSize: "clamp(2.3rem, 7vw, 4rem)", lineHeight: 1.05 }}>
          Wondering if you&apos;re<br />eating okay?
        </h1>
        <p className="text-lg sm:text-xl max-w-2xl" style={{ color: "var(--muted)" }}>
          Get honest answers about your food — no fads, no fear, no judgment. Start by testing what you think you know.
        </p>
      </section>

      {/* THINK AGAIN band */}
      <section className="max-w-5xl mx-auto px-5 pb-5 rise-2">
        <Link href="/think-again" className="card-hover block rounded-3xl p-7 sm:p-10 text-white relative overflow-hidden" style={{ background: "linear-gradient(135deg, var(--ink) 0%, var(--teal) 55%, var(--mint) 130%)" }}>
          <div aria-hidden="true" className="absolute font-serif-display font-bold select-none" style={{ right: "-10px", top: "-30px", fontSize: "16rem", lineHeight: 1, color: "rgba(255,255,255,0.07)" }}>?</div>
          <div className="relative">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-4" style={{ background: "rgba(255,255,255,0.16)" }}>
              <span className="text-xs font-bold tracking-widest">🤔 THINK AGAIN</span>
            </div>
            <h2 className="font-serif-display font-bold mb-3" style={{ fontSize: "clamp(1.7rem, 5vw, 2.6rem)", lineHeight: 1.1 }}>
              Test what you think you know about weight.
            </h2>
            <p className="text-base sm:text-lg max-w-xl mb-6" style={{ color: "#DCEFEC" }}>
              Six playful, eye-opening myth-busters from a doctor. Is a belly really just fat? Can you burn off that soda? Tap, play, and find out.
            </p>
            <span className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold" style={{ background: "white", color: "var(--ink)" }}>
              Start playing →
            </span>
          </div>
        </Link>
      </section>

      {/* MUTONI band */}
      <section className="max-w-5xl mx-auto px-5 pb-8 rise-2">
        <Link href="/mutoni" className="card-hover block rounded-3xl p-7 sm:p-10 relative overflow-hidden" style={{ background: "linear-gradient(135deg, #F3ECF5 0%, #FBF1E0 100%)", border: "1px solid var(--hair)" }}>
          <div className="flex items-center gap-5">
            <div className="text-6xl shrink-0">👩🏾</div>
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-3" style={{ background: "rgba(138,92,158,0.14)" }}>
                <span className="text-xs font-bold tracking-widest" style={{ color: "#8a5c9e" }}>✨ INTERACTIVE STORY</span>
              </div>
              <h2 className="font-serif-display font-bold mb-2" style={{ color: "var(--ink)", fontSize: "clamp(1.5rem, 5vw, 2.3rem)", lineHeight: 1.1 }}>
                Help Mutoni feel better.
              </h2>
              <p className="text-base sm:text-lg max-w-xl mb-4" style={{ color: "var(--muted)" }}>
                A busy office worker who loves food. Make real-life choices with her week by week — and see why small, livable steps beat crash diets every time.
              </p>
              <span className="font-bold flex items-center gap-1" style={{ color: "#8a5c9e" }}>Play her story →</span>
            </div>
          </div>
        </Link>
      </section>

      <section className="max-w-5xl mx-auto px-5 pb-3">
        <div className="text-sm font-bold tracking-widest uppercase" style={{ color: "var(--teal)" }}>Or jump into a tool</div>
      </section>

      <section className="max-w-5xl mx-auto px-5 pb-6">
        <div className="grid gap-5 sm:grid-cols-3">
          {CARDS.map((c, i) => (
            <Link key={c.href} href={c.href} className={`card-hover rounded-3xl p-6 bg-white border flex flex-col ${i === 0 ? "rise" : i === 1 ? "rise-2" : "rise-3"}`} style={{ borderColor: "var(--hair)" }}>
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl mb-5" style={{ background: c.soft }}>{c.emoji}</div>
              <div className="text-sm font-semibold mb-1" style={{ color: c.accent }}>{c.pre}</div>
              <div className="font-serif-display font-bold text-xl mb-2" style={{ color: "var(--ink)", lineHeight: 1.2 }}>{c.title}</div>
              <div className="text-sm mb-5" style={{ color: "var(--muted)" }}>{c.desc}</div>
              <div className="mt-auto font-semibold flex items-center gap-1" style={{ color: c.accent }}>Open <span aria-hidden="true">→</span></div>
            </Link>
          ))}
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-5 pb-6">
        <Link href="/learn" className="card-hover rise-3 block rounded-3xl p-6 sm:p-7 bg-white border" style={{ borderColor: "var(--hair)" }}>
          <div className="flex items-center gap-5">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl shrink-0" style={{ background: "#F3ECF5" }}>📖</div>
            <div className="flex-1">
              <div className="text-sm font-semibold mb-1" style={{ color: "#8a5c9e" }}>I want to learn</div>
              <div className="font-serif-display font-bold text-xl mb-1" style={{ color: "var(--ink)", lineHeight: 1.2 }}>the honest truth about food &amp; weight</div>
              <div className="text-sm" style={{ color: "var(--muted)" }}>Short, myth-busting reads from a doctor — no fads, no fear.</div>
            </div>
            <div className="font-semibold hidden sm:flex items-center gap-1" style={{ color: "#8a5c9e" }}>Read <span aria-hidden="true">→</span></div>
          </div>
        </Link>
      </section>

      <section className="max-w-5xl mx-auto px-5 pb-20">
        <Link href="/start" className="card-hover block rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden" style={{ background: "linear-gradient(150deg, var(--teal), var(--ink))" }}>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-3" style={{ background: "rgba(255,255,255,0.15)" }}>
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-70" style={{ background: "var(--mint)" }}></span>
              <span className="relative inline-flex rounded-full h-2 w-2" style={{ background: "var(--mint)" }}></span>
            </span>
            <span className="text-xs font-bold tracking-widest">COMING SOON</span>
          </div>
          <div className="font-serif-display font-bold mb-1" style={{ fontSize: "clamp(1.4rem, 4vw, 1.9rem)" }}>
            The full program — screening, your plan, and a doctor in your corner.
          </div>
          <div className="flex items-center gap-1 font-semibold mt-2" style={{ color: "var(--mint)" }}>
            See the journey &amp; be first to know <span aria-hidden="true">→</span>
          </div>
        </Link>
      </section>

      <footer className="max-w-5xl mx-auto px-5 pb-10 text-sm" style={{ color: "var(--muted)" }}>
        Honest estimates shown as ranges · educational only · not a personal medical plan · we don&apos;t sell your data.
      </footer>
    </main>
  );
}