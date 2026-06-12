import Link from "next/link";

// 👇 REPLACE with your WhatsApp number: country code + number, no + or spaces.
// Rwanda example: 250788123456
const WHATSAPP_NUMBER = "250793226526";

const waLink =
  `https://wa.me/${WHATSAPP_NUMBER}?text=` +
  encodeURIComponent("Hi! I tried the free tools and I'd love to be first to know when the full program opens. 🌱");

const JOURNEY = [
  { n: "1", t: "Health check", d: "A short, private safety check so a doctor can make sure weight loss is right for you.", c: "var(--teal)" },
  { n: "2", t: "We learn your normal", d: "Two weeks of simple logging — no changes yet — to find your true starting point.", c: "var(--mint)" },
  { n: "3", t: "Your plan, built with you", d: "Around the foods you love, a protein target, and a pace that's healthy and lasts.", c: "var(--green)" },
  { n: "4", t: "Coaching that adapts", d: "We track more than the scale and fine-tune as your body changes. A doctor in your corner.", c: "var(--amber)" },
];

export default function StartPage() {
  return (
    <main className="min-h-screen">
      <header style={{ background: "var(--ink)" }} className="px-5 py-4">
        <div className="max-w-3xl mx-auto flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg flex items-center justify-center text-white font-serif-display text-xl font-bold" style={{ background: "var(--teal)" }}>+</div>
            <div className="text-white">
              <div className="font-bold leading-tight">The Weight-Loss System</div>
              <div className="text-xs tracking-widest uppercase" style={{ color: "var(--mint)" }}>The program</div>
            </div>
          </Link>
        </div>
      </header>

      <section className="max-w-3xl mx-auto px-5 py-16 rise">
        {/* badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-6" style={{ background: "#FBF1E0" }}>
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-60" style={{ background: "var(--amber)" }}></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5" style={{ background: "var(--amber)" }}></span>
          </span>
          <span className="text-sm font-bold tracking-wide" style={{ color: "#9a6a10" }}>COMING SOON</span>
        </div>

        <h1 className="font-serif-display font-bold mb-5" style={{ color: "var(--ink)", fontSize: "clamp(2.1rem, 6vw, 3.2rem)", lineHeight: 1.1 }}>
          The free tools are just the beginning.
        </h1>
        <p className="text-lg mb-10" style={{ color: "var(--muted)" }}>
          A complete, physician-led program is on the way — screening, a plan built
          around your life, and coaching that actually adapts. Here&apos;s the journey
          you&apos;ll take.
        </p>

        {/* journey timeline */}
        <div className="relative mb-12">
          <div className="absolute left-[18px] top-2 bottom-2 w-0.5" style={{ background: "var(--hair)" }} />
          <div className="flex flex-col gap-6">
            {JOURNEY.map((step) => (
              <div key={step.n} className="flex gap-4 relative">
                <div className="w-9 h-9 rounded-full flex items-center justify-center text-white font-bold shrink-0 z-10" style={{ background: step.c }}>{step.n}</div>
                <div className="pt-1">
                  <div className="font-bold text-lg" style={{ color: "var(--ink)" }}>{step.t}</div>
                  <div style={{ color: "var(--muted)" }}>{step.d}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA card */}
        <div className="rounded-2xl p-7 text-white text-center" style={{ background: "linear-gradient(150deg, var(--teal), var(--ink))" }}>
          <div className="font-serif-display font-bold mb-2" style={{ fontSize: "1.6rem" }}>Want to be first in line?</div>
          <p className="mb-6" style={{ color: "#CFE6E8" }}>
            We&apos;re onboarding our first members now. Message us and we&apos;ll save
            you a spot when the program opens.
          </p>
          <a href={waLink} target="_blank" rel="noopener noreferrer"
            className="inline-block px-7 py-3.5 rounded-xl font-bold" style={{ background: "white", color: "var(--ink)" }}>
            Be first to know →
          </a>
          <div className="text-xs mt-4" style={{ color: "#9FC4C8" }}>Opens a WhatsApp message — no sign-up needed.</div>
        </div>

        <div className="mt-8 text-center">
          <Link href="/tools" className="font-semibold" style={{ color: "var(--teal)" }}>← Keep exploring the free tools</Link>
        </div>
      </section>
    </main>
  );
}