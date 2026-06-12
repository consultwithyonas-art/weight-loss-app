"use client";

import Link from "next/link";
import { useState } from "react";

export default function SpotReductionPage() {
  const [crunches, setCrunches] = useState(0);

  // each "set" of crunches burns a tiny bit of fat — from EVERYWHERE, evenly
  const totalFatBurned = crunches * 0.4; // arbitrary teaching units
  // belly only loses its *share* of total fat, same as every other area
  const bellyShrink = Math.min(10, totalFatBurned * 0.18);
  const armShrink = Math.min(10, totalFatBurned * 0.18);
  const legShrink = Math.min(10, totalFatBurned * 0.18);

  const doCrunches = () => setCrunches((c) => c + 50);
  const reset = () => setCrunches(0);

  const bellyW = 64 - bellyShrink;
  const armW = 14 - armShrink * 0.5;
  const legW = 20 - legShrink * 0.5;

  return (
    <main className="min-h-screen">
      <header style={{ background: "var(--ink)" }} className="px-5 py-4">
        <div className="max-w-5xl mx-auto flex items-center gap-3">
          <Link href="/think-again" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg flex items-center justify-center text-white font-serif-display text-xl font-bold" style={{ background: "var(--teal)" }}>+</div>
            <div className="text-white">
              <div className="font-bold leading-tight text-sm sm:text-base">The Weight-Loss System</div>
              <div className="text-[10px] sm:text-xs tracking-widest uppercase" style={{ color: "var(--mint)" }}>Think again</div>
            </div>
          </Link>
          <nav className="ml-auto flex gap-1.5">
            <Link href="/think-again" className="px-3 py-1.5 rounded-lg text-sm font-semibold" style={{ color: "#9FC4C8" }}>← All myths</Link>
          </nav>
        </div>
      </header>

      <section className="max-w-3xl mx-auto px-5 py-8 sm:py-12 rise">
        <div className="text-xs font-bold tracking-widest uppercase mb-2" style={{ color: "var(--teal)" }}>The myth</div>
        <h1 className="font-serif-display font-bold mb-3" style={{ color: "var(--ink)", fontSize: "clamp(1.8rem, 5vw, 2.8rem)" }}>
          &ldquo;Crunches burn belly fat.&rdquo;
        </h1>
        <p className="text-base sm:text-lg mb-8" style={{ color: "var(--muted)" }}>
          Tap to do crunches and watch what happens. Spoiler: the belly does shrink a little — but so does everywhere else. You can&apos;t choose where fat leaves.
        </p>

        <div className="bg-white rounded-3xl border p-6 mb-6" style={{ borderColor: "var(--hair)" }}>
          {/* figure with three fat zones */}
          <svg viewBox="0 0 200 260" className="w-full" style={{ maxHeight: 280 }}>
            {/* head */}
            <circle cx="100" cy="34" r="22" fill="#E4EEF0" stroke="var(--ink)" strokeWidth="2.5" />
            {/* arms (fat zone) */}
            <path d={`M70 70 Q${70 - armW} 110 74 150`} fill="none" stroke="var(--coral)" strokeWidth={armW} strokeLinecap="round" opacity="0.5" style={{ transition: "stroke-width 0.4s ease" }} />
            <path d={`M130 70 Q${130 + armW} 110 126 150`} fill="none" stroke="var(--coral)" strokeWidth={armW} strokeLinecap="round" opacity="0.5" style={{ transition: "stroke-width 0.4s ease" }} />
            {/* torso + belly */}
            <path
              d={`M76 64 L124 64
                  M76 64 Q${100 - bellyW / 2} 90 ${100 - bellyW / 2} 140 Q${100 - bellyW / 2} 170 86 186
                  M124 64 Q${100 + bellyW / 2} 90 ${100 + bellyW / 2} 140 Q${100 + bellyW / 2} 170 114 186`}
              fill="#FBF1E0" stroke="var(--ink)" strokeWidth="2.5" style={{ transition: "d 0.4s ease" }}
            />
            {/* legs (fat zone) */}
            <path d={`M90 186 Q${90 - legW * 0.4} 220 88 250`} fill="none" stroke="var(--coral)" strokeWidth={legW} strokeLinecap="round" opacity="0.5" style={{ transition: "stroke-width 0.4s ease" }} />
            <path d={`M110 186 Q${110 + legW * 0.4} 220 112 250`} fill="none" stroke="var(--coral)" strokeWidth={legW} strokeLinecap="round" opacity="0.5" style={{ transition: "stroke-width 0.4s ease" }} />
          </svg>

          <div className="text-center mt-2">
            <div className="font-serif-display font-bold" style={{ color: "var(--teal)", fontSize: "2rem" }}>{crunches}</div>
            <div className="text-sm mb-4" style={{ color: "var(--muted)" }}>crunches done</div>
            <div className="flex gap-3 justify-center">
              <button onClick={doCrunches} className="px-6 py-3 rounded-xl font-semibold text-white" style={{ background: "var(--teal)" }}>
                Do 50 crunches 💪
              </button>
              {crunches > 0 && <button onClick={reset} className="px-4 py-3 rounded-xl font-semibold border" style={{ borderColor: "var(--hair)", color: "var(--muted)" }}>Reset</button>}
            </div>
          </div>
        </div>

        {/* the reveal — appears once they've done some */}
        {crunches >= 150 && (
          <div className="rounded-2xl p-5 mb-6 rise" style={{ background: "#FBF1E0", color: "#9a6a10" }}>
            <div className="font-bold mb-1">Notice what happened?</div>
            <p className="text-sm">The belly shrank a little — but so did the arms and legs, by the same share. That&apos;s the truth: <b>fat leaves the whole body evenly</b>, in an order your genes mostly decide. No exercise drains fat from one chosen spot.</p>
          </div>
        )}

        {/* the honest nuance */}
        <div className="rounded-2xl p-4 text-sm mb-6" style={{ background: "#E8F3EC", color: "#2f6b46" }}>
          <b>But crunches aren&apos;t useless:</b> they build the muscle <i>underneath</i> the fat — which firms the wall and improves posture and shape (remember &ldquo;Build a Belly&rdquo;). They just don&apos;t burn the fat sitting on top. For that, you need an overall energy deficit.
        </div>

        <div className="rounded-2xl p-4 text-sm" style={{ background: "#E4EEF0", color: "var(--ink)" }}>
          <b>The takeaway:</b> train muscles to shape your body; manage fat through what&apos;s on the plate. Two different jobs — and that&apos;s why a plan combines both.
        </div>

        <div className="mt-8 flex flex-wrap gap-4">
          <Link href="/belly" className="font-semibold" style={{ color: "var(--teal)" }}>→ Try &ldquo;Build a Belly&rdquo;</Link>
          <Link href="/think-again" className="font-semibold" style={{ color: "var(--teal)" }}>← Back to all myths</Link>
        </div>
      </section>
    </main>
  );
}