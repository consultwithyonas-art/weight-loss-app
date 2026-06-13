import Link from "next/link";
import MyJourney from "./MyJourney";

const CARDS = [
  { href: "/tools", pre: "Check", title: "your food", desc: "Honest calorie ranges for chapati, ugali, beans and more.", accent: "var(--teal)", soft: "#E4EEF0", emoji: "🍽️" },
  { href: "/bmr", pre: "Estimate", title: "your energy needs", desc: "Your resting burn (BMR) in seconds — shown as a range.", accent: "var(--green)", soft: "#E8F3EC", emoji: "🔥" },
  { href: "/meals", pre: "Plan", title: "your day", desc: "Build meals and see how they stack up — honestly.", accent: "var(--amber)", soft: "#FBF1E0", emoji: "🥗" },
];

export default function Home() {
  return (
    <main className="min-h-screen relative overflow-hidden">
      <div className="absolute inset-0 -z-10" style={{ background: "radial-gradient(1100px 600px at 15% -5%, #DDF0EC 0%, transparent 55%), radial-gradient(900px 500px at 95% 10%, #E9F3E9 0%, transparent 50%), linear-gradient(180deg, #FFFFFF 0%, var(--paper) 100%)" }} />

      <header className="px-5 py-5">
        <div className="max-w-5xl mx-auto flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg flex items-center justify-center text-white font-serif-display text-xl font-bold" style={{ background: "var(--teal)" }}>+</div>
          <div>
            <div className="font-bold leading-tight" style={{ color: "var(--ink)" }}>The Weight-Loss System</div>
            <div className="text-xs tracking-widest uppercase" style={{ color: "var(--teal)" }}>Free tools · by a doctor</div>
          </div>
        </div>
      </header>

      {/* HERO + PRIMARY ACTION */}
      <section className="max-w-5xl mx-auto px-5 pt-10 pb-8 rise">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-6" style={{ background: "rgba(27,127,140,0.08)" }}>
          <span style={{ fontSize: "1rem" }}>🩺</span>
          <span className="text-sm font-semibold" style={{ color: "var(--teal)" }}>Built by a doctor on the journey too</span>
        </div>
        <h1 className="font-serif-display font-bold mb-5" style={{ color: "var(--ink)", fontSize: "clamp(2.3rem, 7vw, 4rem)", lineHeight: 1.05 }}>
          Wondering if you&apos;re<br />eating okay?
        </h1>
        <p className="text-lg sm:text-xl max-w-2xl mb-8" style={{ color: "var(--muted)" }}>
          Honest answers about your food — no fads, no fear, no judgment. Start by telling us where you&apos;re headed.
        </p>

        {/* THE primary door — big, unmissable */}
        <Link href="/welcome" className="card-hover block rounded-3xl p-7 sm:p-9 text-white relative overflow-hidden" style={{ background: "linear-gradient(135deg, var(--teal) 0%, var(--ink) 100%)" }}>
          <div aria-hidden="true" className="absolute select-none" style={{ right: "20px", top: "50%", transform: "translateY(-50%)", fontSize: "5rem", opacity: 0.18 }}>🧭</div>
          <div className="relative">
            <div className="text-xs font-bold tracking-widest uppercase mb-2" style={{ color: "var(--mint)" }}>Start here</div>
            <div className="font-serif-display font-bold mb-2" style={{ fontSize: "clamp(1.5rem, 4vw, 2.1rem)", lineHeight: 1.1 }}>
              Tell us about your journey
            </div>
            <div className="text-base mb-5 max-w-lg" style={{ color: "#CFE6E8" }}>
              Losing, gaining, or maintaining? We&apos;ll point you to the right tools — and show you how your body really works.
            </div>
            <span className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold" style={{ background: "white", color: "var(--ink)" }}>
              Begin →
            </span>
          </div>
        </Link>
      </section>

      {/* SECONDARY — explore free tools */}
      <section className="max-w-5xl mx-auto px-5 pb-8 rise-2">
        <div className="flex items-baseline justify-between mb-4">
          <h2 className="text-sm font-bold tracking-widest uppercase" style={{ color: "var(--muted)" }}>Or explore the free tools</h2>
          <span className="text-xs" style={{ color: "var(--muted)" }}>no sign-up</span>
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          {CARDS.map((c) => (
            <Link key={c.href} href={c.href} className="card-hover rounded-2xl p-5 bg-white border flex flex-col" style={{ borderColor: "var(--hair)" }}>
              <div className="w-11 h-11 rounded-xl flex items-center justify-center text-2xl mb-3" style={{ background: c.soft }}>{c.emoji}</div>
              <div className="text-xs font-semibold" style={{ color: c.accent }}>{c.pre}</div>
              <div className="font-serif-display font-bold text-lg mb-1" style={{ color: "var(--ink)", lineHeight: 1.2 }}>{c.title}</div>
              <div className="text-sm mb-3" style={{ color: "var(--muted)" }}>{c.desc}</div>
              <div className="mt-auto text-sm font-semibold flex items-center gap-1" style={{ color: c.accent }}>Open →</div>
            </Link>
          ))}
        </div>
      </section>

      {/* TERTIARY — while you're here (showcases, demoted) */}
      <section className="max-w-5xl mx-auto px-5 pb-8">
        <h2 className="text-sm font-bold tracking-widest uppercase mb-4" style={{ color: "var(--muted)" }}>While you&apos;re here</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <Link href="/think-again" className="card-hover block rounded-2xl p-6 text-white relative overflow-hidden" style={{ background: "linear-gradient(135deg, var(--ink), var(--teal))" }}>
            <div aria-hidden="true" className="absolute font-serif-display font-bold select-none" style={{ right: "-5px", top: "-25px", fontSize: "8rem", lineHeight: 1, color: "rgba(255,255,255,0.08)" }}>?</div>
            <div className="relative">
              <div className="text-xs font-bold tracking-widest uppercase mb-2">🤔 Think Again</div>
              <div className="font-serif-display font-bold text-xl mb-1">Test what you know about weight</div>
              <div className="text-sm" style={{ color: "#CFE6E8" }}>Playful myth-busters from a doctor — belly fat, GLP-1, sugar and more.</div>
            </div>
          </Link>
          <Link href="/mutoni" className="card-hover block rounded-2xl p-6 relative overflow-hidden" style={{ background: "linear-gradient(135deg, #F3ECF5, #FBF1E0)", border: "1px solid var(--hair)" }}>
            <div className="text-4xl mb-2">👩🏾</div>
            <div className="text-xs font-bold tracking-widest uppercase mb-1" style={{ color: "#8a5c9e" }}>✨ Interactive story</div>
            <div className="font-serif-display font-bold text-xl mb-1" style={{ color: "var(--ink)" }}>Help Mutoni feel better</div>
            <div className="text-sm" style={{ color: "var(--muted)" }}>Make real-life choices with her — and see why small steps beat crash diets.</div>
          </Link>
        </div>
      </section>

      {/* My Journey — opt-in drop-down */}
      <MyJourney />

      {/* Learn — quiet */}
      <section className="max-w-5xl mx-auto px-5 pb-8">
        <Link href="/learn" className="block rounded-2xl p-5 bg-white border flex items-center gap-4 card-hover" style={{ borderColor: "var(--hair)" }}>
          <div className="w-11 h-11 rounded-xl flex items-center justify-center text-2xl shrink-0" style={{ background: "#F3ECF5" }}>📖</div>
          <div className="flex-1">
            <div className="font-serif-display font-bold text-lg" style={{ color: "var(--ink)" }}>Good to Know</div>
            <div className="text-sm" style={{ color: "var(--muted)" }}>Short, honest reads about food &amp; weight — no fads, no fear.</div>
          </div>
          <div className="text-sm font-semibold hidden sm:block" style={{ color: "#8a5c9e" }}>Read →</div>
        </Link>
      </section>

      {/* Program — coming soon, bottom */}
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
            See the journey &amp; be first to know →
          </div>
        </Link>
      </section>

      <footer className="max-w-5xl mx-auto px-5 pb-10 text-sm" style={{ color: "var(--muted)" }}>
        Honest estimates shown as ranges · educational only · not a personal medical plan · we don&apos;t sell your data.
      </footer>
    </main>
  );
}