export type Food = {
  name: string; emoji: string; cat: string; portion: string;
  lo: number; hi: number; p: number; c: number; f: number;
};

const FAV_KEY = "wls_favorites";
const CUSTOM_KEY = "wls_custom_foods";
const BMR_KEY = "wls_bmr";

function read(key: string): Food[] {
  if (typeof window === "undefined") return [];
  try { return JSON.parse(localStorage.getItem(key) || "[]"); } catch { return []; }
}
function write(key: string, list: Food[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(key, JSON.stringify(list));
}

export function getFavorites(): Food[] { return read(FAV_KEY); }
export function saveFavorites(list: Food[]) { write(FAV_KEY, list); }
export function isFav(list: Food[], name: string) { return list.some((f) => f.name === name); }

export function getCustomFoods(): Food[] { return read(CUSTOM_KEY); }
export function saveCustomFoods(list: Food[]) { write(CUSTOM_KEY, list); }

export type BmrSaved = { lo: number; hi: number };
export function getBmr(): BmrSaved | null {
  if (typeof window === "undefined") return null;
  try { return JSON.parse(localStorage.getItem(BMR_KEY) || "null"); } catch { return null; }
}
export function saveBmr(v: BmrSaved) {
  if (typeof window === "undefined") return;
  localStorage.setItem(BMR_KEY, JSON.stringify(v));
}