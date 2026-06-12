export type Food = {
  name: string; emoji: string; cat: string; portion: string;
  lo: number; hi: number; p: number; c: number; f: number;
};

const FAV_KEY = "wls_favorites";
const CUSTOM_KEY = "wls_custom_foods";
const BMR_KEY = "wls_bmr";
const DAY_PREFIX = "wls_day_";
const STREAK_KEY = "wls_streak";
const INTENT_KEY = "wls_intent";

function readList(key: string): Food[] {
  if (typeof window === "undefined") return [];
  try { return JSON.parse(localStorage.getItem(key) || "[]"); } catch { return []; }
}
function writeRaw(key: string, value: unknown) {
  if (typeof window === "undefined") return;
  localStorage.setItem(key, JSON.stringify(value));
}
function readRaw<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : fallback; } catch { return fallback; }
}

export function getFavorites(): Food[] { return readList(FAV_KEY); }
export function saveFavorites(list: Food[]) { writeRaw(FAV_KEY, list); }
export function isFav(list: Food[], name: string) { return list.some((f) => f.name === name); }

export function getCustomFoods(): Food[] { return readList(CUSTOM_KEY); }
export function saveCustomFoods(list: Food[]) { writeRaw(CUSTOM_KEY, list); }

export type BmrSaved = { lo: number; hi: number };
export function getBmr(): BmrSaved | null { return readRaw<BmrSaved | null>(BMR_KEY, null); }
export function saveBmr(v: BmrSaved) { writeRaw(BMR_KEY, v); }

// ---- "My Day" : remembered meal plan per date ----
export type Line = { food: Food; qty: number };
export type DayPlan = Record<string, Line[]>;

export function todayKey(): string { return new Date().toISOString().slice(0, 10); }
export function getDay(date: string): DayPlan | null { return readRaw<DayPlan | null>(DAY_PREFIX + date, null); }
export function saveDay(date: string, plan: DayPlan) { writeRaw(DAY_PREFIX + date, plan); }

// ---- streak ----
export type Streak = { count: number; lastDate: string };
export function getStreak(): Streak { return readRaw<Streak>(STREAK_KEY, { count: 0, lastDate: "" }); }

export function bumpStreak(): Streak {
  const today = todayKey();
  const s = getStreak();
  if (s.lastDate === today) return s;
  const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
  const next: Streak = { count: s.lastDate === yesterday ? s.count + 1 : 1, lastDate: today };
  writeRaw(STREAK_KEY, next);
  return next;
}

// ---- journey intent tracking ----
export type Intent = { usedBmr: boolean; plannedDay: boolean; checkedFood: boolean };

export function getIntent(): Intent {
  return readRaw<Intent>(INTENT_KEY, { usedBmr: false, plannedDay: false, checkedFood: false });
}
export function markIntent(key: keyof Intent) {
  if (typeof window === "undefined") return;
  const cur = getIntent();
  if (cur[key]) return;
  writeRaw(INTENT_KEY, { ...cur, [key]: true });
}
// "Starter" = has both estimated their burn AND planned a day → high intent
export function isStarter(): boolean {
  const i = getIntent();
  return i.usedBmr && i.plannedDay;
}