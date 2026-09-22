import type { PhoneticStyleId } from "../types";

export interface SyllableShape {
  onset: boolean;
  coda: boolean;
  weight: number;
}

export interface PhoneticStyle {
  id: PhoneticStyleId;
  label: string;
  blurb: string;
  vowels: string[];
  diphthongs: string[];
  onsets: string[];
  codas: string[];
  shapes: SyllableShape[];
  endings: string[];
  endingChance: number;
  maxSyllablesHint: number;
}

export const PHONETIC_STYLES: Record<PhoneticStyleId, PhoneticStyle> = {
  universal: {
    id: "universal",
    label: "Universal",
    blurb: "Balanced, friendly, startup-ready — the 'Surdic' school of naming.",
    vowels: ["a", "e", "i", "o", "u"],
    diphthongs: ["ai", "io", "ea"],
    onsets: [
      "b", "c", "d", "f", "g", "h", "j", "k", "l", "m", "n", "p", "r", "s", "t", "v", "w", "z",
      "br", "cr", "dr", "fr", "gr", "pr", "tr", "bl", "cl", "fl", "gl", "pl", "sl",
      "sc", "sk", "sm", "sn", "sp", "st", "sw", "ch", "sh", "th",
    ],
    codas: [
      "b", "d", "f", "g", "k", "l", "m", "n", "p", "r", "s", "t", "v", "x", "z",
      "ct", "ft", "lt", "mp", "nd", "nk", "nt", "rk", "rn", "rt", "st",
    ],
    shapes: [
      { onset: true, coda: false, weight: 4 },
      { onset: true, coda: true, weight: 5 },
      { onset: false, coda: true, weight: 1 },
      { onset: true, coda: false, weight: 2 },
    ],
    endings: ["ix", "ly", "on", "ex", "io", "us", "ara"],
    endingChance: 0.22,
    maxSyllablesHint: 3,
  },
  minimal: {
    id: "minimal",
    label: "Minimal",
    blurb: "Ultra-short, clean, no clusters — think two crisp syllables.",
    vowels: ["a", "e", "i", "o", "u"],
    diphthongs: [],
    onsets: ["b", "c", "d", "f", "g", "h", "j", "k", "l", "m", "n", "p", "r", "s", "t", "v", "z"],
    codas: ["b", "d", "f", "g", "k", "l", "m", "n", "p", "r", "s", "t", "z"],
    shapes: [
      { onset: true, coda: false, weight: 5 },
      { onset: true, coda: true, weight: 5 },
    ],
    endings: [],
    endingChance: 0,
    maxSyllablesHint: 2,
  },
  nordic: {
    id: "nordic",
    label: "Nordic",
    blurb: "Crisp consonants and open vowels, evoking Scandinavian sounds.",
    vowels: ["a", "e", "i", "o", "u", "y"],
    diphthongs: ["ei", "au", "oy"],
    onsets: [
      "b", "d", "f", "g", "h", "j", "k", "l", "m", "n", "r", "s", "t", "v",
      "bj", "bl", "br", "dr", "fj", "fl", "fr", "gl", "gr", "kj", "kl", "kn", "kr",
      "sj", "sk", "skj", "sl", "sm", "sn", "sp", "st", "sv", "tr", "vr",
    ],
    codas: ["g", "k", "l", "m", "n", "r", "s", "t", "d", "gn", "ld", "lm", "lv", "nd", "ng", "nk", "nn", "rk", "rn", "rs", "rt", "st", "sk"],
    shapes: [
      { onset: true, coda: true, weight: 5 },
      { onset: true, coda: false, weight: 3 },
      { onset: false, coda: true, weight: 1 },
    ],
    endings: ["sen", "strand", "vik", "ar", "ir", "ur", "il", "en", "fjord"],
    endingChance: 0.3,
    maxSyllablesHint: 3,
  },
  japanese: {
    id: "japanese",
    label: "Kana-inspired",
    blurb: "Strict open syllables and pure vowels, inspired by Japanese phonotactics.",
    vowels: ["a", "i", "u", "e", "o"],
    diphthongs: [],
    onsets: [
      "", "k", "s", "t", "n", "h", "m", "y", "r", "w", "g", "z", "d", "b", "p",
      "ky", "sh", "ch", "ny", "hy", "my", "ry", "gy", "j",
    ],
    codas: ["n"],
    shapes: [
      { onset: true, coda: false, weight: 8 },
      { onset: true, coda: true, weight: 1 },
    ],
    endings: ["ko", "to", "mi", "ka", "ra", "na", "shi", "ru", "ki"],
    endingChance: 0.3,
    maxSyllablesHint: 3,
  },
  germanic: {
    id: "germanic",
    label: "Germanic",
    blurb: "Sturdy consonant clusters with a structured, engineered feel.",
    vowels: ["a", "e", "i", "o", "u"],
    diphthongs: ["au", "ei", "eu"],
    onsets: [
      "b", "d", "f", "g", "h", "k", "l", "m", "n", "p", "r", "s", "t", "v", "w", "z",
      "br", "dr", "fr", "gr", "kr", "pr", "tr", "bl", "fl", "gl", "kl", "pl",
      "sch", "sp", "st", "schw", "schr", "pf", "zw", "kn", "gn",
    ],
    codas: ["b", "d", "f", "g", "k", "l", "m", "n", "p", "r", "s", "t", "x", "z", "ch", "ck", "ft", "nd", "ng", "nk", "nz", "rz", "st", "tz", "pf"],
    shapes: [
      { onset: true, coda: true, weight: 5 },
      { onset: true, coda: false, weight: 3 },
    ],
    endings: ["burg", "stein", "holt", "rich", "hard", "witz"],
    endingChance: 0.2,
    maxSyllablesHint: 3,
  },
  romance: {
    id: "romance",
    label: "Romance",
    blurb: "Flowing, vowel-forward words in an Italian or Spanish spirit.",
    vowels: ["a", "e", "i", "o", "u"],
    diphthongs: ["ia", "io", "ua", "ie"],
    onsets: [
      "b", "c", "d", "f", "g", "l", "m", "n", "p", "r", "s", "t", "v",
      "br", "cr", "dr", "fr", "gr", "pr", "tr", "bl", "cl", "fl", "gl", "pl",
      "ch", "gn", "gl", "sc", "sp", "st",
    ],
    codas: ["l", "n", "r", "s"],
    shapes: [
      { onset: true, coda: false, weight: 7 },
      { onset: true, coda: true, weight: 2 },
      { onset: false, coda: false, weight: 1 },
    ],
    endings: ["a", "o", "ia", "io", "etto", "ello", "ino", "ita"],
    endingChance: 0.45,
    maxSyllablesHint: 3,
  },
  slavic: {
    id: "slavic",
    label: "Slavic",
    blurb: "Bold consonant pairs and grounded endings.",
    vowels: ["a", "e", "i", "o", "u", "y"],
    diphthongs: [],
    onsets: [
      "b", "v", "g", "d", "z", "k", "l", "m", "n", "p", "r", "s", "t", "f", "h", "ch", "sh", "zh",
      "bl", "br", "vl", "vr", "gl", "gr", "dr", "kl", "kr", "pl", "pr", "sl", "sm", "sn", "sp", "st", "sv", "tr", "zv", "dv", "tv",
    ],
    codas: ["b", "v", "g", "d", "z", "k", "l", "m", "n", "p", "r", "s", "t", "f", "ch", "sh", "zh", "ts", "nk", "rk", "sk", "st", "zd"],
    shapes: [
      { onset: true, coda: true, weight: 5 },
      { onset: true, coda: false, weight: 3 },
    ],
    endings: ["ov", "ova", "in", "insk", "ik", "ko", "ek", "an"],
    endingChance: 0.28,
    maxSyllablesHint: 3,
  },
  fantasy: {
    id: "fantasy",
    label: "Fantasy",
    blurb: "Unusual but pronounceable — built for worlds, games, and stories.",
    vowels: ["a", "e", "i", "o", "u", "y"],
    diphthongs: ["ae", "ia", "eo", "ua"],
    onsets: [
      "b", "c", "d", "f", "g", "h", "j", "k", "l", "m", "n", "p", "r", "s", "t", "v", "w", "x", "z",
      "br", "dr", "fr", "gr", "kr", "pr", "tr", "vr", "zr", "bl", "cl", "fl", "gl", "pl", "sl",
      "th", "dh", "kh", "zh", "sh", "vh",
    ],
    codas: ["b", "d", "g", "k", "l", "m", "n", "r", "s", "t", "x", "z", "th", "rn", "ld", "nd", "rk", "st"],
    shapes: [
      { onset: true, coda: true, weight: 4 },
      { onset: true, coda: false, weight: 4 },
      { onset: false, coda: true, weight: 1 },
    ],
    endings: ["ion", "ara", "eth", "orin", "yth", "ael", "ira", "oth"],
    endingChance: 0.3,
    maxSyllablesHint: 4,
  },
};

export const PHONETIC_STYLE_LIST = Object.values(PHONETIC_STYLES);
