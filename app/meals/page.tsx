"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Food, getFavorites, getCustomFoods, saveCustomFoods, getBmr, BmrSaved } from "../favorites";

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

export default function MealsPage() {
  const [meal, setMeal] = useState<Record<Slot, Food[]>>({ Breakfast: [], Lunch: [], Dinner: [], Snacks: [] });
  const [favs, setFavs] = useState<Food[]>([]);
  const [custom, setCustom] = useState<Food[]>([]);
  const [bmr, setBmr] = useState<BmrSaved | null>(null);
  const [showAdd, setShowAdd] = useState(false);
  const [cName, setCName] = useState("");
  const [cKcal, setCKcal] = useState("");
  const [cProt, setCProt] = useState("");

  useEffect(() => { setFavs(getFavorites()); setCustom(getCustomFoods()); setBmr(getBmr()); }, []);

  const add = (slot: Slot, food: Food) => setMeal((m) => ({ ...m, [slot]: [...m[slot], food] }));
  const remove = (slot: Slot, idx: number) => setMeal((m) => ({ ...m, [slot]: m[slot].filter((_, i) => i !== idx) }));

  const addCustom = () => {
    const kcal = parseFloat(cKcal);
    if (!cName.trim() || !(kcal > 0)) return;
    const food: Food = { name: cName.trim(), emoji: "🍽️", cat: "custom", portion: "1 serving", lo: Math.round(kcal * 0.9), hi: Math.round(kcal * 1.1), p: parseFloat(cProt) || 0, c: 0, f: 0 };
    const next = [food, ...custom];
    setCustom(next); saveCustomFoods(next);
    setCName(""); setCKcal(""); setCProt(""); setShowAdd(false);
  };

  const seen = new Set<string>();
  const picker: Food[] = [];
  [...favs, ...custom, ...BASE].forEach((f) => { if (!seen.has(f.name)) { seen.add(f.name); picker.push(f); } });

  const all = SLOTS.flatMap((s) => meal[s]);
  const lo = all.reduce((s, f) => s + f.lo, 0);
  const hi = all.reduce((s, f) => s + f.hi, 0);
  const protein = all.reduce((s, f) => s + f.p, 0);
  const mid = Math.round((lo + hi) / 2);

  // BMR reference: midpoint of the saved range
  const ref = bmr ? Math.round((bmr.lo + bmr.hi) / 2) : null;
  const refPct = ref ? Math.min(100, (mid / ref) * 100) : 0;
  const leftLo = bmr ? bmr.lo - mid : null;
  const leftHi = bmr ? bmr.hi - mid : null;

  return (
    <main className="min-h-screen">
      <header style={{ background: "var(--ink)" }} className="px-6 py-4">
        <div className="max-w-5xl mx-auto flex items-center gap-3">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg flex items-center justify-center text-white font-serif-display text-xl font-bold" style={{ background: "var(--teal)" }}>+</div>
            <div className="text-white">
              <div className="font-bold leading-tight">The Weight-Loss System</div>
              <div className="text-xs tracking-widest uppercase" style={{ color: "var(--mint)" }}>Open tools · free to explore</div>
            </div>
          </Link>
          <nav className="ml-auto flex gap-2">
            <Link href="/tools" className="px-3 py-1.5 rounded-lg text-sm font-semibold" style={{ color: "#9FC4C8" }}>Food</Link>
            <Link href="/bmr" className="px-3 py-1.5 rounded-lg text-sm font-semibold" style={{ color: "#9FC4C8" }}>BMR</Link>
            <Link href="/meals" className="px-3 py-1.5 rounded-lg text-sm font-semibold text-white" style={{ background: "rgba(255,255,255,0.12)" }}>Meals</Link>
          </nav>
        </div>
      </header>

      <section className="max-w-5xl mx-auto px-6 py-12">
        <div className="text-sm font-bold tracking-widest uppercase mb-3" style={{ color: "var(--teal)" }}>Play · educational</div>
        <h1 className="font-serif-display font-bold mb-3" style={{ color: "var(--ink)", fontSize: "clamp(1.8rem, 4vw, 2.6rem)" }}>Build a day, see how it stacks up.</h1>
        <p className="text-lg max-w-2xl mb-6" style={{ color: "var(--muted)" }}>
          Your saved foods appear first. Add anything else, or create your own.
        </p>

        <div className="mb-6 p-4 rounded-2xl border bg-white" style={{ borderColor: "var(--hair)" }}>
          {!showAdd ? (
            <div className="flex flex-wrap gap-3 items-center">
              <button onClick={() => setShowAdd(true)} className="px-4 py-2 rounded-lg font-semibold text-white" style={{ background: "var(--teal)" }}>+ Add your own food</button>
              <a href={claudeLink} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold" style={{ color: "var(--teal)" }}>Don&apos;t know the calories? Ask Claude →</a>
            </div>
          ) : (
            <div className="flex flex-wrap gap-3 items-end">
              <div><label className="block text-xs mb-1" style={{ color: "var(--muted)" }}>Food name</label><input value={cName} onChange={(e) => setCName(e.target.value)} className="px-3 py-2 rounded-lg border" style={{ borderColor: "var(--hair)" }} placeholder="e.g. Kachumbari" /></div>
              <div><label className="block text-xs mb-1" style={{ color: "var(--muted)" }}>Calories</label><input value={cKcal} onChange={(e) => setCKcal(e.target.value)} type="number" className="w-24 px-3 py-2 rounded-lg border" style={{ borderColor: "var(--hair)" }} placeholder="kcal" /></div>
              <div><label className="block text-xs mb-1" style={{ color: "var(--muted)" }}>Protein (g)</label><input value={cProt} onChange={(e) => setCProt(e.target.value)} type="number" className="w-24 px-3 py-2 rounded-lg border" style={{ borderColor: "var(--hair)" }} placeholder="opt." /></div>
              <button onClick={addCustom} className="px-4 py-2 rounded-lg font-semibold text-white" style={{ background: "var(--green)" }}>Add</button>
              <button onClick={() => setShowAdd(false)} className="px-3 py-2 text-sm" style={{ color: "var(--muted)" }}>Cancel</button>
            </div>
          )}
        </div>

        <div className="grid gap-6" style={{ gridTemplateColumns: "1fr minmax(260px, 320px)" }}>
          <div className="flex flex-col gap-4">
            {SLOTS.map((slot) => (
              <div key={slot} className="bg-white rounded-2xl p-4 border" style={{ borderColor: "var(--hair)" }}>
                <h3 className="font-serif-display font-bold mb-2" style={{ color: "var(--ink)" }}>{slot}</h3>
                <div className="flex flex-col gap-1.5 mb-3">
                  {meal[slot].length === 0 && <span className="text-sm" style={{ color: "var(--muted)" }}>tap foods below to add</span>}
                  {meal[slot].map((f, i) => (
                    <div key={i} className="flex justify-between items-center text-sm rounded-lg px-3 py-2" style={{ background: "var(--paper)" }}>
                      <span>{f.emoji} {f.name}</span>
                      <span className="flex items-center gap-2">{f.lo}–{f.hi} kcal<button onClick={() => remove(slot, i)} style={{ color: "var(--coral)" }} aria-label="Remove">✕</button></span>
                    </div>
                  ))}
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {picker.map((f) => {
                    const isFavorite = favs.some((x) => x.name === f.name);
                    return (
                      <button key={f.name} onClick={() => add(slot, f)} className="rounded-full border px-2.5 py-1 text-xs" style={{ borderColor: isFavorite ? "var(--coral)" : "var(--hair)", background: "white" }}>
                        {isFavorite ? "♥ " : ""}{f.emoji} {f.name}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-2xl p-6 border h-fit sticky top-4" style={{ borderColor: "var(--hair)" }}>
            <div className="text-xs font-bold tracking-widest uppercase" style={{ color: "var(--teal)" }}>Day total</div>
            <div className="font-serif-display font-bold mb-4" style={{ color: "var(--ink)", fontSize: "1.8rem" }}>
              {lo === hi ? lo : `${lo}–${hi}`} <span className="text-sm font-sans font-normal" style={{ color: "var(--muted)" }}>kcal</span>
            </div>

            {/* BMR reference bar */}
            {bmr && ref ? (
              <div className="mb-4">
                <div className="flex justify-between text-sm mb-1.5"><span>vs your resting burn</span><span>{mid} / ~{ref}</span></div>
                <div className="h-3 rounded-full overflow-hidden" style={{ background: "#EDF3F4" }}>
                  <div className="h-full rounded-full" style={{ width: `${refPct}%`, background: mid > ref ? "var(--amber)" : "var(--teal)" }} />
                </div>
                <p className="text-xs mt-1.5" style={{ color: "var(--muted)" }}>
                  {mid <= (bmr.hi)
                    ? `Roughly ${Math.max(0, leftLo ?? 0)}–${Math.max(0, leftHi ?? 0)} kcal below your resting burn so far.`
                    : `Above your resting burn — with daily activity that can still be fine.`}
                </p>
              </div>
            ) : (
              <div className="mb-4 p-3 rounded-xl text-sm" style={{ background: "var(--paper)", color: "var(--muted)" }}>
                Want to see this against your resting burn? <Link href="/bmr" className="font-semibold" style={{ color: "var(--teal)" }}>Estimate your BMR →</Link>
              </div>
            )}

            <div className="mb-4">
              <div className="flex justify-between text-sm mb-1.5"><span>Protein</span><span>{protein} g / ~100 g</span></div>
              <div className="h-3 rounded-full overflow-hidden" style={{ background: "#EDF3F4" }}><div className="h-full rounded-full" style={{ width: `${Math.min(100, (protein / 100) * 100)}%`, background: "var(--green)" }} /></div>
            </div>

            <p className="text-xs" style={{ color: "var(--muted)" }}>
              These are general reference guides, not a personal target. Your real plan comes after a quick health check.
            </p>
            <Link href="/" className="block text-center mt-4 py-2.5 rounded-xl font-semibold text-white" style={{ background: "var(--teal)" }}>Start the program →</Link>
          </div>
        </div>

        <div className="mt-10"><Link href="/tools" className="font-semibold" style={{ color: "var(--teal)" }}>← Back to tools</Link></div>
      </section>
    </main>
  );
}