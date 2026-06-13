"use client";

import { useState } from "react";

const POINTS = [
  { t: 0, w: 72, label: "~10 yrs ago" },
  { t: 1.2, w: 60 },
  { t: 2.5, w: 76 },
  { t: 6, w: 80 },
  { t: 7, w: 70 },
  { t: 8, w: 83 },
  { t: 9, w: 83 },
  { t: 10, w: 73, label: "now" },
];

export default function MyJourney() {
  const [open, setOpen] = useState(false);

  const W = 600, H = 260, padX = 40, padY = 30;
  const tMin = 0, tMax = 10, wMin = 55, wMax = 88;
  const x = (t: number) => padX + (t - tMin) / (tMax - tMin) * (W - padX * 2);
  const y = (w: number) => padY + (wMax - w) / (wMax - wMin) * (H - padY * 2);
  const path = POINTS.map((p, i) => `${i === 0 ? "M" : "L"} ${x(p.t).toFixed(1)} ${y(p.w).toFixed(1)}`).join(" ");
  const lastIdx = POINTS.length - 1;

  return (
    <section className="max-w-5xl mx-auto px-5 pb-8">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full text-left rounded-2xl px-5 py-4 bg-white border flex items-center gap-4 card-hover"
        style={{ borderColor: "var(--hair)" }}
      >
        <span className="text-2xl shrink-0">🩺</span>
        <span className="flex-1">
          <span className="block text-xs font-bold tracking-widest uppercase" style={{ color: "var(--coral)" }}>My own journey · honestly</span>
          <span className="block text-sm" style={{ color: "var(--muted)" }}>
            The doctor&apos;s real 10-year weight graph — including the regains. {open ? "Tap to hide." : "Tap to read."}
          </span>
        </span>
        <span className="text-xl shrink-0" style={{ color: "var(--teal)", transform: open ? "rotate(180deg)" : "none", transition: "transform 0.3s" }}>⌄</span>
      </button>

      {open && (
        <div className="rounded-3xl p-6 sm:p-9 bg-white border mt-3 rise" style={{ borderColor: "var(--hair)" }}>
          <h2 className="font-serif-display font-bold mb-4" style={{ color: "var(--ink)", fontSize: "clamp(1.5rem, 5vw, 2.2rem)", lineHeight: 1.1 }}>
            This graph is why this program exists.
          </h2>

          <p className="text-base sm:text-lg mb-2" style={{ color: "var(--text)" }}>
            I&apos;m a doctor — and I&apos;ve lost about 10 kg three times. As you can see, each time it came back, a little higher than before. The diets worked. The <i>keeping it off</i> didn&apos;t.
          </p>
          <p className="text-base sm:text-lg mb-6" style={{ color: "var(--muted)" }}>
            Most weight advice stops exactly where the real struggle begins. So I built something that starts there instead — screening, sustainability, and support for the part that actually fails.
          </p>

          <div className="rounded-2xl p-4 mb-5" style={{ background: "var(--paper)" }}>
            <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ maxHeight: 280 }}>
              {[60, 70, 80].map((w) => (
                <g key={w}>
                  <line x1={padX} y1={y(w)} x2={W - padX} y2={y(w)} stroke="#DBE7E9" strokeWidth="1" strokeDasharray="3 4" />
                  <text x={padX - 8} y={y(w) + 4} fontSize="11" textAnchor="end" fill="#5E7178" fontFamily="Arial">{w}</text>
                </g>
              ))}
              <path d={path} fill="none" stroke="var(--teal)" strokeWidth="3" strokeLinejoin="round" strokeLinecap="round" />
              {POINTS.map((p, i) => (
                <g key={i}>
                  <circle cx={x(p.t)} cy={y(p.w)} r={i === lastIdx ? 6 : 4} fill={i === lastIdx ? "var(--coral)" : "var(--teal)"} />
                  {p.label && (
                    <text x={x(p.t)} y={y(p.w) - 12} fontSize="11" textAnchor="middle" fill="var(--ink)" fontFamily="Arial" fontWeight="bold">{p.label}</text>
                  )}
                </g>
              ))}
              <text x={x(POINTS[lastIdx].t)} y={y(POINTS[lastIdx].w) + 20} fontSize="11" textAnchor="middle" fill="var(--coral)" fontFamily="Arial">still going →</text>
            </svg>
            <div className="text-xs text-center mt-1" style={{ color: "var(--muted)" }}>weight (kg) over about ten years · rounded</div>
          </div>

          <p className="text-base mb-2" style={{ color: "var(--text)" }}>
            I&apos;m in the middle of the third one now. I&apos;m <b>not</b> telling you it&apos;s the one that finally worked — I don&apos;t know that yet, and I&apos;d rather be honest than sell you a finish line.
          </p>
          <p className="text-sm" style={{ color: "var(--muted)" }}>
            What works for me may not work for everyone. But I&apos;d rather walk this with you than talk down to you.
          </p>
        </div>
      )}
    </section>
  );
}