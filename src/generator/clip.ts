const VOWELS = new Set(["a", "e", "i", "o", "u"]);

export interface ClipResult {
  text: string;
  sources: string[];
}

/** Drops trailing vowels from a real word — the Flickr/Tumblr/Scribd trick. */
export function clipWord(word: string): ClipResult {
  const w = word.toLowerCase();
  const vowelIndexes: number[] = [];
  for (let i = 0; i < w.length; i++) {
    if (VOWELS.has(w[i])) vowelIndexes.push(i);
  }

  if (vowelIndexes.length <= 1) {
    return { text: w, sources: [word] };
  }

  const drop = new Set<number>([vowelIndexes[vowelIndexes.length - 1]]);
  if (vowelIndexes.length >= 3 && Math.random() < 0.35) {
    drop.add(vowelIndexes[vowelIndexes.length - 2]);
  }

  let text = "";
  for (let i = 0; i < w.length; i++) {
    if (!drop.has(i)) text += w[i];
  }

  return { text, sources: [word] };
}
