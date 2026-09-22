const VOWELS = new Set(["a", "e", "i", "o", "u", "y"]);

function nearestVowelIndex(word: string, from: number): number {
  for (let i = from; i < word.length; i++) if (VOWELS.has(word[i])) return i;
  for (let i = from - 1; i >= 0; i--) if (VOWELS.has(word[i])) return i;
  return Math.floor(word.length / 2);
}

export interface BlendResult {
  text: string;
  sources: [string, string];
}

export function blendWords(a: string, b: string): BlendResult {
  const wa = a.toLowerCase();
  const wb = b.toLowerCase();

  const midA = Math.max(1, Math.floor(wa.length * (0.4 + Math.random() * 0.2)));
  const cutA = nearestVowelIndex(wa, midA);
  const head = wa.slice(0, cutA + 1);

  const midB = Math.max(0, Math.floor(wb.length * (0.3 + Math.random() * 0.2)));
  const cutB = nearestVowelIndex(wb, midB);
  const tail = wb.slice(cutB);

  const blended = (head + tail).replace(/(.)\1{2,}/g, "$1$1");

  return { text: blended, sources: [a, b] };
}
