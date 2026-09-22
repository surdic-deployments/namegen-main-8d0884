import type { GeneratorSettings } from "../types";

export const DEFAULT_SETTINGS: GeneratorSettings = {
  mode: "phonetic",
  style: "universal",
  categories: ["nature", "cosmic", "abstract", "tech", "mythology"],
  minSyllables: 2,
  maxSyllables: 3,
  minConsonants: 3,
  maxConsonants: 5,
  strictness: 45,
  startsWith: "",
  themeWord: "",
  caseStyle: "title",
};
