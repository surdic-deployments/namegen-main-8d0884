import type { PhoneticStyle } from "../data/phoneticStyles";
import { pick, randInt, weightedPick } from "../utils/random";

function pickNucleus(style: PhoneticStyle): string {
  if (style.diphthongs.length && Math.random() < 0.15) {
    return pick(style.diphthongs);
  }
  return pick(style.vowels);
}

export function generatePhoneticWord(style: PhoneticStyle, minSyllables: number, maxSyllables: number): string {
  const total = randInt(Math.max(1, minSyllables), Math.max(minSyllables, maxSyllables));
  const useEnding = style.endings.length > 0 && Math.random() < style.endingChance;
  const bodyCount = useEnding ? Math.max(1, total - 1) : total;

  let word = "";
  for (let i = 0; i < bodyCount; i++) {
    const shape = weightedPick(style.shapes);
    const onset = shape.onset ? pick(style.onsets) : "";
    const nucleus = pickNucleus(style);
    const coda = shape.coda ? pick(style.codas) : "";
    word += onset + nucleus + coda;
  }

  if (useEnding) {
    word += pick(style.endings);
  }

  return word;
}
