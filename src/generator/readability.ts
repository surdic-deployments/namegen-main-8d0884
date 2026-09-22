const VOWELS = new Set(["a", "e", "i", "o", "u", "y"]);

const AWKWARD_PAIRS = ["jq", "qx", "xz", "zq", "vq", "qv", "kq", "jx", "qk", "xq", "vx", "zx"];

export function scoreReadability(word: string): number {
  const w = word.toLowerCase().replace(/[^a-z]/g, "");
  if (!w) return 0;

  let score = 100;
  let maxConsonantRun = 0;
  let maxVowelRun = 0;
  let consonantRun = 0;
  let vowelRun = 0;
  let vowelCount = 0;

  for (const ch of w) {
    if (VOWELS.has(ch)) {
      vowelCount++;
      vowelRun++;
      consonantRun = 0;
    } else {
      consonantRun++;
      vowelRun = 0;
    }
    maxConsonantRun = Math.max(maxConsonantRun, consonantRun);
    maxVowelRun = Math.max(maxVowelRun, vowelRun);
  }

  const vowelRatio = vowelCount / w.length;

  if (maxConsonantRun >= 5) score -= 45;
  else if (maxConsonantRun === 4) score -= 25;
  else if (maxConsonantRun === 3) score -= 10;

  if (maxVowelRun >= 4) score -= 20;
  else if (maxVowelRun === 3) score -= 8;

  if (vowelRatio < 0.2) score -= 25;
  else if (vowelRatio < 0.28) score -= 10;
  else if (vowelRatio > 0.75) score -= 10;

  if (/(.)\1\1/.test(w)) score -= 30;

  if (w.length < 3) score -= 15;
  if (w.length > 16) score -= 15;

  for (const pair of AWKWARD_PAIRS) {
    if (w.includes(pair)) {
      score -= 12;
      break;
    }
  }

  return Math.max(0, Math.min(100, Math.round(score)));
}

export function readabilityLabel(score: number): string {
  if (score >= 80) return "Easy to say";
  if (score >= 55) return "Readable";
  if (score >= 30) return "Distinctive";
  return "Exotic";
}
