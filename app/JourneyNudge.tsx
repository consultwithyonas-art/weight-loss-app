"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { isStarter } from "./favorites";

type Props = {
  // the tailored "next step" for THIS page
  nextHref: string;
  nextLabel: string;     // e.g. "Plan a full day"
  nextDesc: string;      // one line about why
};

export default function JourneyNudge({ nextHref, nextLabel, nextDesc }: Props) {
  const [starter, setStarter] = useState(false);
  useEffect(() => { setStarter(isStarter()); }, []);

  return (
    <div className="mt-10 grid gap-4 sm:grid-cols-2">
      {/* tailored next step */}
      <Link href={nextHref} className="card-hover rounded-2xl p-5 bg-white border block" style={{ borderColor: "var(--hair)" }}>
        <div className="text-xs font-bold tracking-widest uppercase mb-1" style={{ color: "var(--teal)" }}>Next step</div>
        <div className="font-serif-display font-bold text-lg" style={{ color: "var(--ink)" }}>{nextLabel} →</div>
        <div className="text-sm mt-1" style={{ color: "var(--muted)" }}>{nextDesc}</div>
      </Link>

      {/* program nudge — stronger if Starter */}
      <Link href="/start" className="card-hover rounded-2xl p-5 block text-white" style={{ background: starter ? "linear-gradient(150deg, var(--amber), var(--coral))" : "linear-gradient(150deg, var(--teal), var(--ink))" }}>
        <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full mb-2" style={{ background: "rgba(255,255,255,0.18)" }}>
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-70" style={{ background: "white" }}></span>
            <span className="relative inline-flex rounded-full h-2 w-2" style={{ background: "white" }}></span>
          </span>
          <span className="text-[11px] font-bold tracking-widest">{starter ? "YOU'RE READY" : "COMING SOON"}</span>
        </div>
        <div className="font-serif-display font-bold text-lg">
          {starter ? "Ready for a plan made for you?" : "The full program is coming."}
        </div>
        <div className="text-sm mt-1" style={{ color: "#EAF4F2" }}>
          {starter
            ? "You've explored the tools — the next step is a plan built around your body and your food."
            : "Screening, your plan, and a doctor in your corner."}
        </div>
      </Link>
    </div>
  );
}