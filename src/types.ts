export type GeneratorMode = "phonetic" | "skeleton" | "markov" | "blend" | "affix" | "real" | "clip";

export type PhoneticStyleId =
  | "universal"
  | "minimal"
  | "nordic"
  | "japanese"
  | "germanic"
  | "romance"
  | "slavic"
  | "fantasy";

export type WordCategoryId = "nature" | "cosmic" | "mythology" | "abstract" | "tech";

export type CaseStyle = "title" | "lower" | "upper";

export type ViewMode = "swipe" | "turbo";

export interface GeneratorSettings {
  mode: GeneratorMode;
  style: PhoneticStyleId;
  categories: WordCategoryId[];
  minSyllables: number;
  maxSyllables: number;
  minConsonants: number;
  maxConsonants: number;
  strictness: number;
  startsWith: string;
  themeWord: string;
  caseStyle: CaseStyle;
}

export interface GeneratedName {
  id: string;
  text: string;
  mode: GeneratorMode;
  style: PhoneticStyleId;
  sources?: string[];
  readability: number;
  createdAt: number;
}

export interface SavedName extends GeneratedName {
  savedAt: number;
}
