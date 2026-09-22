import { pick } from "../utils/random";

const PREFIXES = ["get", "go", "try", "my", "the", "meta", "hyper", "neo", "proto", "re", "co", "un"];

const SUFFIXES = [
  "ify", "io", "ly", "able", "ster", "hub", "kit", "lab", "base", "wise",
  "ary", "ex", "one", "fy", "loop", "stack", "wave", "forge", "craft", "ory",
];

export interface AffixResult {
  text: string;
  sources: string[];
}

export function affixWord(base: string): AffixResult {
  const roll = Math.random();
  const usePrefix = roll < 0.2 || roll >= 0.9;
  const useSuffix = roll < 0.9;

  const prefix = usePrefix ? pick(PREFIXES) : "";
  const suffix = useSuffix ? pick(SUFFIXES) : "";

  const text = `${prefix}${base}${suffix}`;
  const sources = [base, ...(prefix ? [`${prefix}-`] : []), ...(suffix ? [`-${suffix}`] : [])];

  return { text, sources };
}
