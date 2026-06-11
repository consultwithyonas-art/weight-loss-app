export type Food = {
  name: string; emoji: string; cat: string; portion: string;
  lo: number; hi: number; p: number; c: number; f: number;
};

const FAV_KEY = "wls_favorites";
const CUSTOM_KEY = "wls_custom_foods";

function read(key: string): Food[] {
  if (typeof window === "undefined") return [];
  try { return JSON.parse(localStorage.getItem(key) || "[]"); }
  catch { return []; }
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