"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import {
  Food, Line, DayPlan, getFavorites, getCustomFoods, saveCustomFoods,
  getBmr, BmrSaved, todayKey, getDay, saveDay, getStreak, bumpStreak, markIntent,
} from "../favorites";
import JourneyNudge from "../JourneyNudge";

const BASE: Food[] = [
  { name: "Chapati", emoji: "🫓", cat: "staple", portion: "1 piece", lo: 240, hi: 300, p: 6, c: 40, f: 9 },
  { name: "Ugali", emoji: "🍚", cat: "staple", portion: "1 cup", lo: 180, hi: 220, p: 4, c: 42, f: 1 },
  { name: "Rice", emoji: "🍚", cat: "staple", portion: "1 cup", lo: 200, hi: 240, p: 4, c: 45, f: 0 },
  { name: "Beans", emoji: "🫘", cat: "protein", portion: "1 cup", lo: 220, hi: 260, p: 15, c: 40, f: 1 },
  { name: "Chicken", emoji: "🍗", cat: "protein", portion: "100 g", lo: 160, hi: 185, p: 31, c: 0, f: 4 },
  { name: "Egg", emoji: "🥚", cat: "protein", portion: "1 large", lo: 70, hi: 85, p: 6, c: 1, f: 5 },
  { name: "Tilapia", emoji: "🐟", cat: "protein", portion: "100 g", lo: 120, hi: 145, p: 26, c: 0, f: 3 },
  { name: "Greek yogurt", emoji: "🥛", cat: "protein", portion: "1 cup", lo: 120, hi: 150, p: 17, c: 9, f: 4 },
  { name: "Sukuma wiki", emoji: "🥬", cat: "veg", portion: "1 cup", lo: 30, hi: 55, p: 3, c: 6, f: 1 },
  { name: "Avocado", emoji: "🥑", cat: "veg", portion: "½ fruit", lo: 110, hi: 140, p: 1, c: 6, f: 11 },
  { name: "Banana", emoji: "🍌", cat: "fruit", portion: "1 medium", lo: 90, hi: 115, p: 1, c: 27, f: 0 },
  { name: "Mango", emoji: "🥭", cat: "fruit", portion: "1 fruit", lo: 130, hi: 160, p: 1, c: 35, f: 1 },
  { name: "Groundnuts", emoji: "🥜", cat: "snack", portion: "handful", lo: 160, hi: 200, p: 7, c: 6, f: 14 },
  { name: "Mandazi", emoji: "🍩", cat: "snack", portion: "1 piece", lo: 200, hi: 260, p: 4, c: 30, f: 9 },
];

const SLOTS = ["Breakfast", "Lunch", "Dinner", "Snacks"] as const;
type Slot = (typeof SLOTS)[number];

const claudeLink = "https://claude.ai/new?q=" + encodeURIComponent("Estimate the calories and protein for this food and portion: ");
const emptyDay = (): Record<Slot, Line[]> => ({ Breakfast: [], Lunch: [], Dinner: [], Snacks: [] });

function prettyDate(key: string) {
  const d = new Date(key + "T00:00:00");
  return d.toLocaleDateString(undefined, { weekday: "long", month: "short", day: "numeric" });
}

type Verdict = { tone: "neutral" | "good" | "note"; title: string; body: string };
function buildVerdict(itemCount: number, mid: number, protein: number, bmr: BmrSaved | null): Verdict | null {
  if (itemCount === 0) return null;
  const ref = bmr ? Math.round((bmr.lo + bmr.hi) / 2) : null;
  const lowProtein = protein < 50;
  if (ref) {
    if (mid > ref * 1.25) {
      return { tone: "note", title: "This is a fuller day.", body: `Around ${mid} kcal sits above your resting burn of ~${ref}. With an active day that can still be fine — but it&apos;s worth knowing.${lowProtein ? " Protein is also a little low; a protein source at each meal helps." : ""}` };
    }
    if (mid < ref * 0.6) {
      return { tone: "note", title: "This is on the light side.", body: `Around ${mid} kcal is well below your resting burn of ~${ref}. Eating too little backfires — energy and muscle suffer. Honestly, this looks like an under-eating day, not a win.` };
    }
    return { tone: "good", title: "This looks balanced and reasonable.", body: `Around ${mid} kcal sits sensibly against your resting burn of ~${ref}.${lowProtein ? " One thing: protein is a little low — adding a protein source at a meal would round it out." : " Protein is in a good place too."}` };
  }
  if (lowProtein) {
    return { tone: "note", title: "A protein boost would help.", body: "Protein is on the low side today. Adding beans, eggs, chicken or fish to a meal makes a day more filling and protects muscle. For a fuller picture, estimate your resting burn." };
  }
  return { tone: "neutral", title: "A decent-looking day.", body: "Protein is in a reasonable place. To see this against your own resting burn, estimate your BMR — then this read gets sharper." };
}

export default function MealsPage() {
  const [meal, setMeal] = useState<Record<Slot, Line[]>>(emptyDay());
  const [favs, setFavs] = useState<Food[]>([]);
  const [custom, setCustom] = useState<Food[]>([]);
  const [bmr, setBmr] = useState<BmrSaved | null>(null);
  const [streak, setStreak] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  const [cName, setCName] = useState("");
  const [cKcal, setCKcal] = useState("");
  const [cProt, setCProt] = useState("");

  const today = todayKey();

  useEffect(() => {
    setFavs(getFavorites()); setCustom(getCustomFoods()); setBmr(getBmr()); setStreak(getStreak().count);
    const saved = getDay(today);
    if (saved) setMeal({ Breakfast: saved.Breakfast || [], Lunch: saved.Lunch || [], Dinner: saved.Dinner || [], Snacks: saved.Snacks || [] });
    setLoaded(true);
  }, [today]);

  useEffect(() => { if (loaded) saveDay(today, meal as DayPlan); }, [meal, loaded, today]);

  const addFood = (slot: Slot, food: Food) => {
    if (getStreak().lastDate !== today) { const s = bumpStreak(); setStreak(s.count); }
    markIntent("plannedDay");
    setMeal((m) => {
      const lines = m[slot];
      const idx = lines.findIndex((l) => l.food.name === food.name);
      if (idx >= 0) { const copy = [...lines]; copy[idx] = { ...copy[idx], qty: copy[idx].qty + 1 }; return { ...m, [slot]: copy }; }
      return { ...m, [slot]: [...lines, { food, qty: 1 }] };
    });
  };
  const changeQty = (slot: Slot, name: string, delta: number) =>
    setMeal((m) => ({ ...m, [slot]: m[slot].map((l) => (l.food.name === name ? { ...l, qty: l.qty + delta } : l)).filter((l) => l.qty > 0) }));
  const clearDay = () => { if (confirm("Clear today's plan?")) setMeal(emptyDay()); };

  const addCustom = () => {
    const kcal = parseFloat(cKcal);
    if (!cName.trim() || !(kcal > 0)) return;
    const food: Food = { name: cName.trim(), emoji: "🍽️", cat: "custom", portion: "1 serving", lo: Math.round(kcal * 0.9), hi: Math.round(kcal * 1.1), p: parseFloat(cProt) || 0, c: 0, f: 0 };
    const next = [food, ...custom]; setCustom(next); saveCustomFoods(next);
    setCName(""); setCKcal(""); setCProt(""); setShowAdd(false);
  };

  const seen = new Set<string>();
  const allFoods: Food[] = [];
  [...favs, ...custom, ...BASE].forEach((f) => { if (!seen.has(f.name)) { seen.add(f.name); allFoods.push(f); } });

  const lines = SLOTS.flatMap((s) => meal[s]);
  const lo = lines.reduce((s, l) => s + l.food.lo * l.qty, 0);
  const hi = lines.reduce((s, l) => s + l.food.hi * l.qty, 0);
  const protein = lines.reduce((s, l) => s + l.food.p * l.qty, 0);
  const mid = Math.round((lo + hi) / 2);
  const ref = bmr ? Math.round((bmr.lo + bmr.hi) / 2) : null;
  const refPct = ref ? Math.min(100, (mid / ref) * 100) : 0;
  const leftLo = bmr ? Math.max(0, bmr.lo - mid) : 0;
  const leftHi = bmr ? Math.max(0, bmr.hi - mid) : 0;
  const verdict = buildVerdict(lines.length, mid, protein, bmr);

  const VERDICT_STYLE: Record<string, { bg: string; color: string; icon: string }> = {
    good: { bg: "#E8F3EC", color: "#2f6b46", icon: "✓" },
    note: { bg: "#FBF1E0", color: "#9a6a10", icon: "•" },
    neutral: { bg: "#E4EEF0", color: "#0B3A4A", icon: "•" },
  };

  const VerdictCard = () =>
    verdict ? (
      <div className="rounded-2xl p-4 mb-4" style={{ background: VERDICT_STYLE[verdict.tone].bg }}>
        <div className="font-bold mb-1 flex items-center gap-2" style={{ color: VERDICT_STYLE[verdict.tone].color }}>
          <span>{VERDICT_STYLE[verdict.tone].icon}</span> {verdict.title}
        </div>
        <p className="text-sm" style={{ color: VERDICT_STYLE[verdict.tone].color }} dangerouslySetInnerHTML={{ __html: verdict.body }} />
      </div>
    ) : null;

  const SummaryInner = () => (
    <>
      <div className="text-xs font-bold tracking-widest uppercase" style={{ color: "var(--teal)" }}>Day total</div>
      <div className="font-serif-display font-bold mb-4" style={{ color: "var(--ink)", fontSize: "1.8rem" }}>
        {lo === hi ? lo : `${lo}–${hi}`} <span className="text-sm font-sans font-normal" style={{ color: "var(--muted)" }}>kcal</span>
      </div>
      <VerdictCard />
      {bmr && ref ? (
        <div className="mb-4">
          <div className="flex justify-between text-sm mb-1.5"><span>vs your resting burn</span><span>{mid} / ~{ref}</span></div>
          <div className="h-3 rounded-full overflow-hidden" style={{ background: "#EDF3F4" }}>
            <div className="h-full rounded-full" style={{ width: `${refPct}%`, background: mid > ref ? "var(--amber)" : "var(--teal)", transition: "width 0.4s ease" }} />
          </div>
          <p className="text-xs mt-1.5" style={{ color: "var(--muted)" }}>
            {mid <= bmr.hi ? `Roughly ${leftLo}–${leftHi} kcal below your resting burn so far.` : `Above your resting burn — with daily activity that can still be fine.`}
          </p>
        </div>
      ) : (
        <div className="mb-4 p-3 rounded-xl text-sm" style={{ background: "var(--paper)", color: "var(--muted)" }}>
          See this against your resting burn? <Link href="/bmr" className="font-semibold" style={{ color: "var(--teal)" }}>Estimate your BMR →</Link>
        </div>
      )}
      <div className="mb-4">
        <div className="flex justify-between text-sm mb-1.5"><span>Protein</span><span>{protein} g / ~100 g</span></div>
        <div className="h-3 rounded-full overflow-hidden" style={{ background: "#EDF3F4" }}>
          <div className="h-full rounded-full" style={{ width: `${Math.min(100, (protein / 100) * 100)}%`, background: "var(--green)", transition: "width 0.4s ease" }} />
        </div>
      </div>
      <p className="text-xs" style={{ color: "var(--muted)" }}>General reference guides, not a personal target. Your real plan comes after a quick health check.</p>
      <Link href="/start" className="block text-center mt-4 py-3 rounded-xl font-semibold text-white" style={{ background: "var(--teal)" }}>Start the program →</Link>
    </>
  );

  return (
    <main className="min-h-screen pb-44 lg:pb-12">
      <header style={{ background: "var(--ink)" }} className="px-5 py-4">
        <div className="max-w-5xl mx-auto flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg flex items-center justify-center text-white font-serif-display text-xl font-bold" style={{ background: "var(--teal)" }}>+</div>
            <div className="text-white">
              <div className="font-bold leading-tight text-sm sm:text-base">The Weight-Loss System</div>
              <div className="text-[10px] sm:text-xs tracking-widest uppercase" style={{ color: "var(--mint)" }}>Open tools</div>
            </div>
          </Link>
          <nav className="ml-auto flex gap-1.5">
            <Link href="/tools" className="px-3 py-1.5 rounded-lg text-sm font-semibold" style={{ color: "#9FC4C8" }}>Food</Link>
            <Link href="/bmr" className="px-3 py-1.5 rounded-lg text-sm font-semibold" style={{ color: "#9FC4C8" }}>BMR</Link>
            <Link href="/meals" className="px-3 py-1.5 rounded-lg text-sm font-semibold text-white" style={{ background: "rgba(255,255,255,0.12)" }}>Meals</Link>
            <Link href="/learn" className="px-3 py-1.5 rounded-lg text-sm font-semibold" style={{ color: "#9FC4C8" }}>Learn</Link>
          </nav>
        </div>
      </header>

      <section className="max-w-5xl mx-auto px-5 py-8 sm:py-12 rise">
        <div className="flex items-center justify-between flex-wrap gap-2 mb-3">
          <div className="text-sm font-bold tracking-widest uppercase" style={{ color: "var(--teal)" }}>My Day · {prettyDate(today)}</div>
          {streak > 0 && <div className="text-sm font-semibold px-3 py-1 rounded-full" style={{ background: "#FBF1E0", color: "#9a6a10" }}>🔥 {streak}-day streak</div>}
        </div>
        <h1 className="font-serif-display font-bold mb-3" style={{ color: "var(--ink)", fontSize: "clamp(1.7rem, 6vw, 2.6rem)" }}>Plan today&apos;s meals.</h1>
        <p className="text-base sm:text-lg max-w-2xl mb-4" style={{ color: "var(--muted)" }}>
          Tap a food to add it. Your plan saves automatically — come back anytime and it&apos;ll be here.
        </p>
        <div className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 mb-6 text-xs" style={{ background: "#E8F3EC", color: "#2f6b46" }}>
          🔒 Your plan stays on your device — we don&apos;t store or see it unless you choose to message us.
        </div>

        <div className="mb-6 p-4 rounded-2xl border bg-white" style={{ borderColor: "var(--hair)" }}>
          {!showAdd ? (
            <div className="flex flex-wrap gap-3 items-center">
              <button onClick={() => setShowAdd(true)} className="px-4 py-2.5 rounded-lg font-semibold text-white" style={{ background: "var(--teal)" }}>+ Add your own food</button>
              <a href={claudeLink} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold" style={{ color: "var(--teal)" }}>Don&apos;t know the calories? Ask Claude →</a>
              {lines.length > 0 && <button onClick={clearDay} className="text-sm ml-auto" style={{ color: "var(--muted)" }}>Clear day</button>}
            </div>
          ) : (
            <div className="flex flex-wrap gap-3 items-end">
              <div className="flex-1 min-w-[140px]"><label className="block text-xs mb-1" style={{ color: "var(--muted)" }}>Food name</label><input value={cName} onChange={(e) => setCName(e.target.value)} className="w-full px-3 py-2.5 rounded-lg border" style={{ borderColor: "var(--hair)" }} placeholder="e.g. Kachumbari" /></div>
              <div><label className="block text-xs mb-1" style={{ color: "var(--muted)" }}>Calories</label><input value={cKcal} onChange={(e) => setCKcal(e.target.value)} type="number" inputMode="numeric" className="w-24 px-3 py-2.5 rounded-lg border" style={{ borderColor: "var(--hair)" }} placeholder="kcal" /></div>
              <div><label className="block text-xs mb-1" style={{ color: "var(--muted)" }}>Protein</label><input value={cProt} onChange={(e) => setCProt(e.target.value)} type="number" inputMode="numeric" className="w-20 px-3 py-2.5 rounded-lg border" style={{ borderColor: "var(--hair)" }} placeholder="g" /></div>
              <button onClick={addCustom} className="px-4 py-2.5 rounded-lg font-semibold text-white" style={{ background: "var(--green)" }}>Add</button>
              <button onClick={() => setShowAdd(false)} className="px-3 py-2.5 text-sm" style={{ color: "var(--muted)" }}>Cancel</button>
            </div>
          )}
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
          <div className="flex flex-col gap-4">
            {SLOTS.map((slot) => {
              const usedNames = new Set(meal[slot].map((l) => l.food.name));
              const available = allFoods.filter((f) => !usedNames.has(f.name));
              return (
                <div key={slot} className="bg-white rounded-2xl p-4 border" style={{ borderColor: "var(--hair)" }}>
                  <h3 className="font-serif-display font-bold mb-2" style={{ color: "var(--ink)" }}>{slot}</h3>
                  <div className="flex flex-col gap-1.5 mb-3">
                    {meal[slot].length === 0 && <span className="text-sm" style={{ color: "var(--muted)" }}>tap foods below to add</span>}
                    {meal[slot].map((l) => (
                      <div key={l.food.name} className="flex justify-between items-center text-sm rounded-lg px-3 py-2.5" style={{ background: "var(--paper)" }}>
                        <span className="font-medium">{l.food.emoji} {l.food.name}</span>
                        <span className="flex items-center gap-2.5">
                          <span style={{ color: "var(--muted)" }}>{l.food.lo * l.qty}–{l.food.hi * l.qty}</span>
                          <span className="flex items-center gap-2">
                            <button onClick={() => changeQty(slot, l.food.name, -1)} className="w-8 h-8 rounded-full border font-bold text-lg leading-none flex items-center justify-center" style={{ borderColor: "var(--hair)", color: "var(--coral)" }} aria-label="Less">−</button>
                            <span className="w-5 text-center font-semibold">{l.qty}</span>
                            <button onClick={() => changeQty(slot, l.food.name, 1)} className="w-8 h-8 rounded-full border font-bold text-lg leading-none flex items-center justify-center" style={{ borderColor: "var(--hair)", color: "var(--green)" }} aria-label="More">+</button>
                          </span>
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {available.map((f) => {
                      const isFavorite = favs.some((x) => x.name === f.name);
                      return (
                        <button key={f.name} onClick={() => addFood(slot, f)} className="rounded-full border px-3 py-1.5 text-sm" style={{ borderColor: isFavorite ? "var(--coral)" : "var(--hair)", background: "white" }}>
                          {isFavorite ? "♥ " : ""}{f.emoji} {f.name}
                        </button>
                      );
                    })}
                    {available.length === 0 && <span className="text-xs" style={{ color: "var(--muted)" }}>all foods added to this meal</span>}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="hidden lg:block bg-white rounded-2xl p-6 border h-fit sticky top-4" style={{ borderColor: "var(--hair)" }}>
            <SummaryInner />
          </div>
        </div>

        <div className="lg:hidden mt-6 bg-white rounded-2xl p-6 border" style={{ borderColor: "var(--hair)" }}>
          <SummaryInner />
        </div>

        <JourneyNudge nextHref="/learn" nextLabel="Learn the honest truth about food" nextDesc="Short, myth-busting reads to understand what you just planned." />

        <div className="mt-8"><Link href="/tools" className="font-semibold" style={{ color: "var(--teal)" }}>← Back to tools</Link></div>
      </section>

      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t px-5 py-3" style={{ borderColor: "var(--hair)", boxShadow: "0 -4px 20px rgba(11,58,74,0.08)" }}>
        <div className="flex items-center justify-between">
          <div>
            <div className="text-[10px] font-bold tracking-widest uppercase" style={{ color: "var(--teal)" }}>So far today</div>
            <div className="font-serif-display font-bold" style={{ color: "var(--ink)", fontSize: "1.4rem" }}>{lo === hi ? lo : `${lo}–${hi}`} <span className="text-xs font-sans font-normal" style={{ color: "var(--muted)" }}>kcal</span></div>
          </div>
          <div className="flex-1 mx-4">
            {bmr && ref ? (
              <div className="h-2.5 rounded-full overflow-hidden" style={{ background: "#EDF3F4" }}>
                <div className="h-full rounded-full" style={{ width: `${refPct}%`, background: mid > ref ? "var(--amber)" : "var(--teal)", transition: "width 0.4s ease" }} />
              </div>
            ) : (<div className="text-xs text-center" style={{ color: "var(--muted)" }}>{protein}g protein</div>)}
          </div>
          <Link href="/start" className="px-4 py-2.5 rounded-xl font-semibold text-white text-sm whitespace-nowrap" style={{ background: "var(--teal)" }}>Start →</Link>
        </div>
      </div>
    </main>
  );
}