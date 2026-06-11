import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Header */}
      <header style={{ background: "var(--ink)" }} className="px-6 py-4">
        <div className="max-w-5xl mx-auto flex items-center gap-3">
          <div
            className="w-9 h-9 rounded-lg flex items-center justify-center text-white font-serif-display text-xl font-bold"
            style={{ background: "var(--teal)" }}
          >
            +
          </div>
          <div className="text-white">
            <div className="font-bold leading-tight">The Weight-Loss System</div>
            <div className="text-xs tracking-widest uppercase" style={{ color: "var(--mint)" }}>
              A clinical framework
            </div>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-5xl mx-auto px-6 py-20">
        <div
          className="text-sm font-bold tracking-widest uppercase mb-4"
          style={{ color: "var(--teal)" }}
        >
          Understand the system. Control what you can.
        </div>
        <h1
          className="font-serif-display font-bold leading-tight mb-6"
          style={{ color: "var(--ink)", fontSize: "clamp(2.2rem, 5vw, 3.5rem)" }}
        >
          Lose fat. Preserve muscle.<br />Improve health.
        </h1>
        <p className="text-lg max-w-2xl mb-10" style={{ color: "var(--muted)" }}>
          A physician-led, evidence-based approach. We screen first, then build a
          plan around your body, your health, and the foods you love.
        </p>

        <div className="flex flex-wrap gap-4">
          <button
            className="px-7 py-3.5 rounded-xl font-semibold text-white"
            style={{ background: "var(--teal)" }}
          >
            Start the program
          </button>
          <Link
            href="/tools"
            className="px-7 py-3.5 rounded-xl font-semibold border-2"
            style={{ borderColor: "var(--hair)", color: "var(--text)" }}
          >
            Explore the free tools
          </Link>
        </div>
      </section>
    </main>
  );
}