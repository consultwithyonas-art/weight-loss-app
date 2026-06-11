import Link from "next/link";

export default function StartPage() {
  return (
    <main className="min-h-screen">
      <header style={{ background: "var(--ink)" }} className="px-6 py-4">
        <div className="max-w-3xl mx-auto flex items-center gap-3">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg flex items-center justify-center text-white font-serif-display text-xl font-bold" style={{ background: "var(--teal)" }}>+</div>
            <div className="text-white">
              <div className="font-bold leading-tight">The Weight-Loss System</div>
              <div className="text-xs tracking-widest uppercase" style={{ color: "var(--mint)" }}>Start the program</div>
            </div>
          </Link>
        </div>
      </header>

      <section className="max-w-3xl mx-auto px-6 py-16">
        <div className="text-sm font-bold tracking-widest uppercase mb-3" style={{ color: "var(--teal)" }}>Before we begin</div>
        <h1 className="font-serif-display font-bold mb-5" style={{ color: "var(--ink)", fontSize: "clamp(2rem, 5vw, 3rem)" }}>
          Let&apos;s make sure this is right for you.
        </h1>
        <p className="text-lg mb-8" style={{ color: "var(--muted)" }}>
          Weight loss is only safe once we&apos;ve ruled out other causes. The first
          step is a short, private health check — a few quick questions. A clinician
          reviews your answers before any plan is made. This isn&apos;t automatic
          medical clearance; it&apos;s the careful step that protects you.
        </p>

        <div className="bg-white rounded-2xl p-6 border mb-8" style={{ borderColor: "var(--hair)" }}>
          <div className="font-bold mb-3" style={{ color: "var(--ink)" }}>What happens next</div>
          {[
            ["1", "A short health check", "A few questions about your health and history."],
            ["2", "We learn your normal", "About two weeks of simple logging — no changes yet."],
            ["3", "Your plan, built with you", "Around the foods you love and a healthy, steady pace."],
          ].map(([n, t, d]) => (
            <div key={n} className="flex gap-3 py-2">
              <div className="w-7 h-7 rounded-full flex items-center justify-center text-white text-sm font-bold shrink-0" style={{ background: "var(--teal)" }}>{n}</div>
              <div>
                <div className="font-semibold" style={{ color: "var(--ink)" }}>{t}</div>
                <div className="text-sm" style={{ color: "var(--muted)" }}>{d}</div>
              </div>
            </div>
          ))}
        </div>

        <Link href="/screening" className="inline-block px-7 py-3.5 rounded-xl font-semibold text-white" style={{ background: "var(--teal)" }}>
          Begin the health check →
        </Link>
        <div className="mt-6">
          <Link href="/" className="font-semibold" style={{ color: "var(--teal)" }}>← Back home</Link>
        </div>
      </section>
    </main>
  );
}