import { pick, randInt } from "../utils/random";

const CONSONANTS = ["b", "c", "d", "f", "g", "h", "j", "k", "l", "m", "n", "p", "r", "s", "t", "v", "w", "x", "z"];
const VOWELS = ["a", "e", "i", "o", "u"];

function pickConsonant(prev?: string): string {
  let c = pick(CONSONANTS);
  let attempts = 0;
  while (c === prev && attempts < 4) {
    c = pick(CONSONANTS);
    attempts++;
  }
  return c;
}

/**
 * Random consonant skeleton with vowels filled into the gaps — e.g. picking
 * s-r-d-c and inserting u/i to land on "surdic".
 */
export function generateSkeletonWord(minConsonants: number, maxConsonants: number): string {
  const count = randInt(Math.max(2, minConsonants), Math.max(minConsonants, maxConsonants));

  const consonants: string[] = [];
  for (let i = 0; i < count; i++) {
    consonants.push(pickConsonant(consonants[i - 1]));
  }

  let word = Math.random() < 0.2 ? pick(VOWELS) : "";

  consonants.forEach((c, i) => {
    word += c;
    const isLast = i === consonants.length - 1;
    if (!isLast && Math.random() < 0.85) {
      word += pick(VOWELS);
    } else if (isLast && Math.random() < 0.45) {
      word += pick(VOWELS);
    }
  });

  return word;
}
