import Link from "next/link";

export default function ToolsPage() {
  return (
    <main className="min-h-screen">
      {/* Header */}
      <header style={{ background: "var(--ink)" }} className="px-6 py-4">
        <div className="max-w-5xl mx-auto flex items-center gap-3">
          <Link href="/" className="flex items-center gap-3">
            <div
              className="w-9 h-9 rounded-lg flex items-center justify-center text-white font-serif-display text-xl font-bold"
              style={{ background: "var(--teal)" }}
            >
              +
            </div>
            <div className="text-white">
              <div className="font-bold leading-tight">The Weight-Loss System</div>
              <div className="text-xs tracking-widest uppercase" style={{ color: "var(--mint)" }}>
                Open tools · free to explore
              </div>
            </div>
          </Link>
        </div>
      </header>

      {/* Body */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <div className="text-sm font-bold tracking-widest uppercase mb-3" style={{ color: "var(--teal)" }}>
          Free to explore · no sign-up
        </div>
        <h1 className="font-serif-display font-bold mb-4" style={{ color: "var(--ink)", fontSize: "clamp(1.8rem, 4vw, 2.6rem)" }}>
          Open Tools
        </h1>
        <p className="text-lg max-w-2xl mb-10" style={{ color: "var(--muted)" }}>
          Explore food calories, estimate your resting burn, and play with a day
          of meals. General information — your personal plan comes after a quick
          health check.
        </p>

        {/* Three tool cards */}
        <div className="grid gap-5 sm:grid-cols-3">
          {[
            { t: "Food playground", d: "Search foods you love and see calorie ranges.", c: "var(--teal)" },
            { t: "Generic BMR", d: "Estimate your resting energy burn.", c: "var(--mint)" },
            { t: "Meal explorer", d: "Build a day and see how it stacks up.", c: "var(--green)" },
          ].map((tool) => (
            <div
              key={tool.t}
              className="bg-white rounded-2xl p-6 border"
              style={{ borderColor: "var(--hair)" }}
            >
              <div className="w-10 h-10 rounded-xl mb-4" style={{ background: tool.c }} />
              <div className="font-bold text-lg mb-1" style={{ color: "var(--ink)" }}>
                {tool.t}
              </div>
              <div style={{ color: "var(--muted)" }}>{tool.d}</div>
            </div>
          ))}
        </div>

        <div className="mt-10">
          <Link href="/" className="font-semibold" style={{ color: "var(--teal)" }}>
            ← Back home
          </Link>
        </div>
      </section>
    </main>
  );
}