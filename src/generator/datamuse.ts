const ENDPOINT = "https://api.datamuse.com/words";

const cache = new Map<string, string[]>();

export async function fetchThemeWords(theme: string, max = 30): Promise<string[]> {
  const trimmed = theme.trim().toLowerCase();
  if (!trimmed) return [];
  if (cache.has(trimmed)) return cache.get(trimmed)!;

  const params = new URLSearchParams({ ml: trimmed, max: String(max) });
  const res = await fetch(`${ENDPOINT}?${params.toString()}`);
  if (!res.ok) throw new Error(`Datamuse request failed: ${res.status}`);

  const data: Array<{ word: string }> = await res.json();
  const words = data
    .map((d) => d.word.toLowerCase())
    .filter((w) => /^[a-z]+$/.test(w) && w.length >= 3 && w.length <= 12);

  cache.set(trimmed, words);
  return words;
}
