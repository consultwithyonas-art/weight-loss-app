"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Food, getFavorites, saveFavorites, isFav, getCustomFoods, saveCustomFoods, markIntent } from "../favorites";
import JourneyNudge from "../JourneyNudge";

const FOODS: Food[] = [
  { name: "Chapati", emoji: "🫓", cat: "staple", portion: "1 piece", lo: 240, hi: 300, p: 6, c: 40, f: 9 },
  { name: "Ugali", emoji: "🍚", cat: "staple", portion: "1 cup", lo: 180, hi: 220, p: 4, c: 42, f: 1 },
  { name: "Rice (cooked)", emoji: "🍚", cat: "staple", portion: "1 cup", lo: 200, hi: 240, p: 4, c: 45, f: 0 },
  { name: "Fried plantain", emoji: "🍌", cat: "staple", portion: "1 cup", lo: 300, hi: 360, p: 2, c: 50, f: 12 },
  { name: "Matoke", emoji: "🍌", cat: "staple", portion: "1 cup", lo: 200, hi: 240, p: 2, c: 48, f: 1 },
  { name: "Sweet potato", emoji: "🍠", cat: "staple", portion: "1 medium", lo: 110, hi: 140, p: 2, c: 27, f: 0 },
  { name: "Beans (stewed)", emoji: "🫘", cat: "protein", portion: "1 cup", lo: 220, hi: 260, p: 15, c: 40, f: 1 },
  { name: "Chicken breast", emoji: "🍗", cat: "protein", portion: "100 g", lo: 160, hi: 185, p: 31, c: 0, f: 4 },
  { name: "Egg", emoji: "🥚", cat: "protein", portion: "1 large", lo: 70, hi: 85, p: 6, c: 1, f: 5 },
  { name: "Tilapia", emoji: "🐟", cat: "protein", portion: "100 g", lo: 120, hi: 145, p: 26, c: 0, f: 3 },
  { name: "Lentils", emoji: "🫘", cat: "protein", portion: "1 cup", lo: 210, hi: 250, p: 18, c: 36, f: 1 },
  { name: "Greek yogurt", emoji: "🥛", cat: "protein", portion: "1 cup", lo: 120, hi: 150, p: 17, c: 9, f: 4 },
  { name: "Sukuma wiki", emoji: "🥬", cat: "veg", portion: "1 cup", lo: 30, hi: 55, p: 3, c: 6, f: 1 },
  { name: "Avocado", emoji: "🥑", cat: "veg", portion: "½ fruit", lo: 110, hi: 140, p: 1, c: 6, f: 11 },
  { name: "Tomato", emoji: "🍅", cat: "veg", portion: "1 medium", lo: 20, hi: 30, p: 1, c: 5, f: 0 },
  { name: "Cabbage", emoji: "🥬", cat: "veg", portion: "1 cup", lo: 20, hi: 35, p: 1, c: 5, f: 0 },
  { name: "Banana", emoji: "🍌", cat: "fruit", portion: "1 medium", lo: 90, hi: 115, p: 1, c: 27, f: 0 },
  { name: "Mango", emoji: "🥭", cat: "fruit", portion: "1 fruit", lo: 130, hi: 160, p: 1, c: 35, f: 1 },
  { name: "Pineapple", emoji: "🍍", cat: "fruit", portion: "1 cup", lo: 75, hi: 90, p: 1, c: 22, f: 0 },
  { name: "Orange", emoji: "🍊", cat: "fruit", portion: "1 medium", lo: 60, hi: 75, p: 1, c: 15, f: 0 },
  { name: "Mandazi", emoji: "🍩", cat: "snack", portion: "1 piece", lo: 200, hi: 260, p: 4, c: 30, f: 9 },
  { name: "Groundnuts", emoji: "🥜", cat: "snack", portion: "small handful", lo: 160, hi: 200, p: 7, c: 6, f: 14 },
  { name: "Dark chocolate", emoji: "🍫", cat: "snack", portion: "2 squares", lo: 90, hi: 120, p: 1, c: 10, f: 7 },
  { name: "Soda", emoji: "🥤", cat: "drink", portion: "1 can", lo: 130, hi: 155, p: 0, c: 39, f: 0 },
  { name: "Chai (milk + sugar)", emoji: "🍵", cat: "drink", portion: "1 cup", lo: 90, hi: 120, p: 3, c: 18, f: 3 },
  { name: "Water", emoji: "💧", cat: "drink", portion: "1 glass", lo: 0, hi: 0, p: 0, c: 0, f: 0 },
];

const CATS = ["all", "staple", "protein", "veg", "fruit", "snack", "drink", "custom"];
const CAT_LABELS: Record<string, string> = { all: "All", staple: "Staples", protein: "Proteins", veg: "Veg", fruit: "Fruit", snack: "Snacks", drink: "Drinks", custom: "My foods" };
const CAT_TILE: Record<string, string> = { staple: "#E9F0E9", protein: "#E4EEF0", veg: "#E8F3EC", fruit: "#FBF1E0", snack: "#F3ECF5", drink: "#EAF2F3", custom: "#EDE9F3" };

const claudeLink = "https://claude.ai/new?q=" + encodeURIComponent("Estimate the calories and protein for this food and portion: ");

export default function ToolsPage() {
  const [cat, setCat] = useState("all");
  const [query, setQuery] = useState("");
  const [favs, setFavs] = useState<Food[]>([]);
  const [custom, setCustom] = useState<Food[]>([]);

  const [showAdd, setShowAdd] = useState(false);
  const [cName, setCName] = useState("");
  const [cPortion, setCPortion] = useState("");
  const [cKcal, setCKcal] = useState("");
  const [cProt, setCProt] = useState("");

  useEffect(() => { setFavs(getFavorites()); setCustom(getCustomFoods()); markIntent("checkedFood"); }, []);

  const toggleFav = (food: Food) => {
    setFavs((current) => {
      const next = isFav(current, food.name) ? current.filter((x) => x.name !== food.name) : [...current, food];
      saveFavorites(next);
      return next;
    });
  };

  const addCustom = () => {
    const kcal = parseFloat(cKcal);
    if (!cName.trim() || !(kcal > 0)) return;
    const food: Food = {
      name: cName.trim(), emoji: "🍽️", cat: "custom", portion: cPortion.trim() || "1 serving",
      lo: Math.round(kcal * 0.9), hi: Math.round(kcal * 1.1), p: parseFloat(cProt) || 0, c: 0, f: 0,
    };
    const next = [food, ...custom];
    setCustom(next); saveCustomFoods(next);
    setCName(""); setCPortion(""); setCKcal(""); setCProt(""); setShowAdd(false);
  };

  const ALL = [...custom, ...FOODS];
  const shown = ALL.filter((food) => {
    if (cat !== "all" && food.cat !== cat) return false;
    if (query && !food.name.toLowerCase().includes(query.toLowerCase())) return false;
    return true;
  });

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
            <Link href="/tools" className="px-3 py-1.5 rounded-lg text-sm font-semibold text-white" style={{ background: "rgba(255,255,255,0.12)" }}>Food</Link>
            <Link href="/bmr" className="px-3 py-1.5 rounded-lg text-sm font-semibold" style={{ color: "#9FC4C8" }}>BMR</Link>
            <Link href="/meals" className="px-3 py-1.5 rounded-lg text-sm font-semibold" style={{ color: "#9FC4C8" }}>Meals</Link>
            <Link href="/learn" className="px-3 py-1.5 rounded-lg text-sm font-semibold" style={{ color: "#9FC4C8" }}>Learn</Link>
          </nav>
        </div>
      </header>

      <section className="max-w-5xl mx-auto px-6 py-12">
        <div className="text-sm font-bold tracking-widest uppercase mb-3" style={{ color: "var(--teal)" }}>Browse · no sign-up</div>
        <h1 className="font-serif-display font-bold mb-3" style={{ color: "var(--ink)", fontSize: "clamp(1.8rem, 4vw, 2.6rem)" }}>What&apos;s in the food you love?</h1>
        <p className="text-lg max-w-2xl mb-3" style={{ color: "var(--muted)" }}>
          Tap the heart to add a food to your meals. Can&apos;t find something? Add it below.
        </p>
        {favs.length > 0 && (
          <p className="mb-6 text-sm font-semibold" style={{ color: "var(--green)" }}>♥ {favs.length} food{favs.length > 1 ? "s" : ""} saved — find them in the Meals tab.</p>
        )}

        <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search foods…" className="w-full mb-4 px-4 py-3 rounded-xl border bg-white" style={{ borderColor: "var(--hair)" }} />

        <div className="flex flex-wrap gap-2 mb-8">
          {CATS.map((c) => {
            const active = cat === c;
            return (
              <button key={c} onClick={() => setCat(c)} className="px-4 py-2 rounded-full text-sm font-medium border"
                style={{ background: active ? "var(--ink)" : "white", color: active ? "white" : "var(--text)", borderColor: active ? "var(--ink)" : "var(--hair)" }}>
                {CAT_LABELS[c]}
              </button>
            );
          })}
        </div>

        <div className="grid gap-4" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))" }}>
          {shown.map((food) => {
            const fav = isFav(favs, food.name);
            return (
              <div key={food.name} className="bg-white rounded-2xl p-4 border relative" style={{ borderColor: fav ? "var(--green)" : "var(--hair)" }}>
                <button onClick={() => toggleFav(food)} className="absolute top-3 right-3 text-xl leading-none" style={{ color: fav ? "var(--coral)" : "var(--hair)" }} aria-label="Favourite">♥</button>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl" style={{ background: CAT_TILE[food.cat] || "#EDE9F3" }}>{food.emoji}</div>
                  <div>
                    <div className="font-bold" style={{ color: "var(--ink)" }}>{food.name}{food.cat === "custom" && <span className="ml-1 text-xs font-normal" style={{ color: "var(--muted)" }}>(yours)</span>}</div>
                    <div className="text-sm" style={{ color: "var(--muted)" }}>{food.portion}</div>
                  </div>
                </div>
                <div className="font-serif-display text-xl font-bold" style={{ color: "var(--teal)" }}>
                  {food.lo === food.hi ? food.lo : `${food.lo}–${food.hi}`} <span className="text-sm font-sans font-normal" style={{ color: "var(--muted)" }}>kcal</span>
                </div>
                <div className="flex gap-3 mt-2 text-sm" style={{ color: "var(--muted)" }}>
                  <span>P <b style={{ color: "var(--text)" }}>{food.p}g</b></span>
                  <span>C <b style={{ color: "var(--text)" }}>{food.c}g</b></span>
                  <span>F <b style={{ color: "var(--text)" }}>{food.f}g</b></span>
                </div>
              </div>
            );
          })}

          <div className="rounded-2xl p-4 border-2 border-dashed flex flex-col" style={{ borderColor: "var(--mint)", background: "#F4FAF9" }}>
            {!showAdd ? (
              <button onClick={() => setShowAdd(true)} className="flex-1 flex flex-col items-center justify-center text-center" style={{ color: "var(--teal)", minHeight: "120px" }}>
                <span className="text-3xl leading-none mb-2">+</span>
                <span className="font-bold">Add a food</span>
                <span className="text-xs mt-1" style={{ color: "var(--muted)" }}>not in the list</span>
              </button>
            ) : (
              <div className="flex flex-col gap-2">
                <input value={cName} onChange={(e) => setCName(e.target.value)} placeholder="Food name" className="px-3 py-2 rounded-lg border text-sm" style={{ borderColor: "var(--hair)" }} />
                <input value={cPortion} onChange={(e) => setCPortion(e.target.value)} placeholder="Portion (e.g. 1 bowl)" className="px-3 py-2 rounded-lg border text-sm" style={{ borderColor: "var(--hair)" }} />
                <div className="flex gap-2">
                  <input value={cKcal} onChange={(e) => setCKcal(e.target.value)} type="number" placeholder="kcal" className="w-1/2 px-3 py-2 rounded-lg border text-sm" style={{ borderColor: "var(--hair)" }} />
                  <input value={cProt} onChange={(e) => setCProt(e.target.value)} type="number" placeholder="protein g" className="w-1/2 px-3 py-2 rounded-lg border text-sm" style={{ borderColor: "var(--hair)" }} />
                </div>
                <a href={claudeLink} target="_blank" rel="noopener noreferrer" className="text-xs font-semibold" style={{ color: "var(--teal)" }}>Don&apos;t know the calories? Ask Claude →</a>
                <div className="flex gap-2 mt-1">
                  <button onClick={addCustom} className="flex-1 py-2 rounded-lg text-sm font-semibold text-white" style={{ background: "var(--green)" }}>Add</button>
                  <button onClick={() => setShowAdd(false)} className="px-3 py-2 text-sm" style={{ color: "var(--muted)" }}>Cancel</button>
                </div>
              </div>
            )}
          </div>
        </div>

        <JourneyNudge nextHref="/meals" nextLabel="Plan a day with these foods" nextDesc="Add your favourites to a day and see how it all adds up." />

        <div className="mt-8"><Link href="/" className="font-semibold" style={{ color: "var(--teal)" }}>← Back home</Link></div>
      </section>
    </main>
  );
}