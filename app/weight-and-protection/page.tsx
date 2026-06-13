import Link from "next/link";

const WHATSAPP_NUMBER = "250793226526";
const waLink = `https://wa.me/${WHATSAPP_NUMBER}?text=` + encodeURIComponent("Hi, I read the page on weight and protection, and I'd like to talk.");

export default function WeightProtectionPage() {
  return (
    <main className="min-h-screen" style={{ background: "linear-gradient(180deg, #FBF8F4 0%, var(--paper) 100%)" }}>
      <header style={{ background: "var(--ink)" }} className="px-5 py-4">
        <div className="max-w-3xl mx-auto flex items-center gap-3">
          <Link href="/learn" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg flex items-center justify-center text-white font-serif-display text-xl font-bold" style={{ background: "var(--teal)" }}>+</div>
            <div className="text-white">
              <div className="font-bold leading-tight text-sm sm:text-base">The Weight-Loss System</div>
              <div className="text-[10px] sm:text-xs tracking-widest uppercase" style={{ color: "var(--mint)" }}>A gentle read</div>
            </div>
          </Link>
          <nav className="ml-auto"><Link href="/learn" className="px-3 py-1.5 rounded-lg text-sm font-semibold" style={{ color: "#9FC4C8" }}>← Learn</Link></nav>
        </div>
      </header>

      <article className="max-w-2xl mx-auto px-6 py-12 sm:py-20 rise">
        <div className="text-sm font-bold tracking-widest uppercase mb-4" style={{ color: "var(--teal)" }}>A gentle read · take your time</div>

        <h1 className="font-serif-display font-bold mb-8" style={{ color: "var(--ink)", fontSize: "clamp(2rem, 6vw, 3rem)", lineHeight: 1.1 }}>
          Sometimes the weight wasn&apos;t the problem.<br />It was the solution.
        </h1>

        <div className="space-y-6 text-lg" style={{ color: "var(--text)", lineHeight: 1.7 }}>
          <p>
            Most weight advice assumes the same thing: that your body is a problem to be fixed, and you simply haven&apos;t tried hard enough. For many people, that&apos;s not the truth — and it never was.
          </p>
          <p>
            Sometimes weight is something the body built for a reason. After difficult experiences — especially in childhood, especially abuse — the body and mind look for ways to feel safe. For some people, that has meant food: comfort, steadiness, a way to soothe something that had no other outlet. For some, body size itself became a quiet kind of armour — a way to feel less seen, less vulnerable, less of a target.
          </p>
          <p>
            If that resonates, please hear this clearly: <b>that was not weakness. It was survival.</b> Your body did something intelligent with what it had. The weight may have been protecting you.
          </p>
          <p>
            And this may <i>not</i> be your story at all — many people carry weight for reasons that have nothing to do with this. Take only what fits, and leave the rest.
          </p>
          <p>
            But if it does fit, it changes the conversation. Because you cannot shame your way out of something that was keeping you safe. The path forward isn&apos;t a stricter diet — it&apos;s gently, and often with help, building <i>new</i> ways to feel safe, so the old protection isn&apos;t needed as much. That is slow, compassionate work. And it is not work you have to do alone.
          </p>
        </div>

        <div className="mt-12 rounded-3xl p-7" style={{ background: "#fff", border: "1.5px solid var(--hair)" }}>
          <div className="font-serif-display font-bold text-xl mb-2" style={{ color: "var(--ink)" }}>If this opened something for you</div>
          <p className="mb-5" style={{ color: "var(--muted)" }}>
            You deserve real support — from a person, not a website. Talking to someone who understands trauma can change everything. Please consider reaching out:
          </p>

          <div className="space-y-3 mb-5">
            <div className="rounded-xl p-4" style={{ background: "var(--paper)" }}>
              <div className="font-semibold" style={{ color: "var(--ink)" }}>A doctor or mental-health professional</div>
              <div className="text-sm" style={{ color: "var(--muted)" }}>Your nearest health centre or hospital can connect you with mental-health support, or refer you to someone who works with trauma. You don&apos;t need to explain everything — just that you&apos;d like to talk to someone.</div>
            </div>
            <div className="rounded-xl p-4" style={{ background: "var(--paper)" }}>
              <div className="font-semibold" style={{ color: "var(--ink)" }}>Someone you trust</div>
              <div className="text-sm" style={{ color: "var(--muted)" }}>A friend, family member, or faith leader who makes you feel safe. Saying it out loud, once, to one person, can be the first step.</div>
            </div>
          </div>

          <a href={waLink} target="_blank" rel="noopener noreferrer" className="inline-block px-6 py-3 rounded-xl font-semibold text-white" style={{ background: "var(--teal)" }}>
            Or message me directly →
          </a>
          <p className="text-xs mt-3" style={{ color: "var(--muted)" }}>
            I&apos;m a doctor, not a trauma therapist — but I can listen, and help you find the right support.
          </p>
        </div>

        <div className="mt-10 text-center">
          <Link href="/learn" className="font-semibold" style={{ color: "var(--teal)" }}>← Back to Good to Know</Link>
        </div>

        <footer className="mt-12 pt-6 text-xs text-center" style={{ color: "var(--muted)", borderTop: "1px solid var(--hair)" }}>
          This page is for reflection and is not a substitute for professional mental-health care. If you are in crisis or thinking of harming yourself, please reach out to a trusted person or local emergency services now.
        </footer>
      </article>
    </main>
  );
}