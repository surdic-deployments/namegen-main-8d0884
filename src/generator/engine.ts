import type { CaseStyle, GeneratedName, GeneratorSettings } from "../types";
import { PHONETIC_STYLES } from "../data/phoneticStyles";
import { wordsForCategories } from "../data/wordlists";
import { generatePhoneticWord } from "./phonetic";
import { generateSkeletonWord } from "./skeleton";
import { buildMarkovModel, generateMarkovWord } from "./markov";
import { blendWords } from "./blend";
import { affixWord } from "./affix";
import { clipWord } from "./clip";
import { scoreReadability } from "./readability";
import { pick, pickTwoDistinct, uid } from "../utils/random";

const MAX_ATTEMPTS = 40;

function cleanup(text: string): string {
  return text.replace(/(.)\1{2,}/g, "$1$1").slice(0, 20);
}

function applyCase(text: string, caseStyle: CaseStyle): string {
  if (!text) return text;
  switch (caseStyle) {
    case "lower":
      return text.toLowerCase();
    case "upper":
      return text.toUpperCase();
    case "title":
    default:
      return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
  }
}

interface RawCandidate {
  text: string;
  sources?: string[];
}

function poolCacheKey(settings: GeneratorSettings): string {
  return `${settings.themeWord.trim().toLowerCase()}::${[...settings.categories].sort().join(",")}`;
}

function generateRaw(settings: GeneratorSettings, pool: string[]): RawCandidate | null {
  const style = PHONETIC_STYLES[settings.style];

  switch (settings.mode) {
    case "phonetic":
      return { text: generatePhoneticWord(style, settings.minSyllables, settings.maxSyllables) };
    case "skeleton":
      return { text: generateSkeletonWord(settings.minConsonants, settings.maxConsonants) };
    case "markov": {
      if (pool.length < 3) return null;
      const model = buildMarkovModel(pool, poolCacheKey(settings));
      const text = generateMarkovWord(model);
      return text.length >= 2 ? { text } : null;
    }
    case "blend": {
      if (pool.length < 2) return null;
      const [a, b] = pickTwoDistinct(pool);
      return blendWords(a, b);
    }
    case "affix": {
      if (pool.length < 1) return null;
      return affixWord(pick(pool));
    }
    case "real": {
      if (pool.length < 1) return null;
      return { text: pick(pool) };
    }
    case "clip": {
      if (pool.length < 1) return null;
      return clipWord(pick(pool));
    }
    default:
      return null;
  }
}

export function getPool(settings: GeneratorSettings, themeWords: string[] | null): string[] {
  if (themeWords && themeWords.length >= 5) return themeWords;
  return wordsForCategories(settings.categories);
}

export function generateCandidate(
  settings: GeneratorSettings,
  pool: string[],
  avoid: Set<string>,
): GeneratedName {
  let best: { text: string; score: number; sources?: string[] } | null = null;

  for (let attempt = 0; attempt < MAX_ATTEMPTS; attempt++) {
    const raw = generateRaw(settings, pool);
    if (!raw || !raw.text) continue;

    const cleaned = cleanup(raw.text);
    if (cleaned.length < 2) continue;

    const cased = applyCase(cleaned, settings.caseStyle);
    if (avoid.has(cased.toLowerCase())) continue;

    if (settings.startsWith) {
      const prefix = settings.startsWith.toLowerCase();
      if (!cleaned.toLowerCase().startsWith(prefix)) continue;
    }

    const score = scoreReadability(cleaned);
    if (!best || score > best.score) best = { text: cased, score, sources: raw.sources };
    if (score >= settings.strictness) break;
  }

  if (!best) {
    const raw = generateRaw(settings, pool) ?? { text: "nova" };
    const cleaned = cleanup(raw.text) || "nova";
    best = {
      text: applyCase(cleaned, settings.caseStyle),
      score: scoreReadability(cleaned),
      sources: raw.sources,
    };
  }

  return {
    id: uid(),
    text: best.text,
    mode: settings.mode,
    style: settings.style,
    sources: best.sources,
    readability: best.score,
    createdAt: Date.now(),
  };
}
