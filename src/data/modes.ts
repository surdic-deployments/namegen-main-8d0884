import { Wand2, Bone, Shuffle, Blend, Puzzle, BookOpen, Scissors, type LucideIcon } from "lucide-react";
import type { GeneratorMode } from "../types";

export interface ModeInfo {
  id: GeneratorMode;
  label: string;
  blurb: string;
  icon: LucideIcon;
  usesStyle: boolean;
  usesSyllables: boolean;
  usesConsonantCount: boolean;
  usesPool: boolean;
}

export const MODES: ModeInfo[] = [
  {
    id: "phonetic",
    label: "Phonetic",
    blurb: "Grammar-built syllables",
    icon: Wand2,
    usesStyle: true,
    usesSyllables: true,
    usesConsonantCount: false,
    usesPool: false,
  },
  {
    id: "skeleton",
    label: "Skeleton",
    blurb: "Consonants first, vowels filled in",
    icon: Bone,
    usesStyle: false,
    usesSyllables: false,
    usesConsonantCount: true,
    usesPool: false,
  },
  {
    id: "markov",
    label: "Markov",
    blurb: "Learns letter patterns",
    icon: Shuffle,
    usesStyle: false,
    usesSyllables: false,
    usesConsonantCount: false,
    usesPool: true,
  },
  {
    id: "blend",
    label: "Blend",
    blurb: "Mixes two real words",
    icon: Blend,
    usesStyle: false,
    usesSyllables: false,
    usesConsonantCount: false,
    usesPool: true,
  },
  {
    id: "affix",
    label: "Affix",
    blurb: "Real word + prefix/suffix",
    icon: Puzzle,
    usesStyle: false,
    usesSyllables: false,
    usesConsonantCount: false,
    usesPool: true,
  },
  {
    id: "real",
    label: "Real Word",
    blurb: "An actual word, as-is",
    icon: BookOpen,
    usesStyle: false,
    usesSyllables: false,
    usesConsonantCount: false,
    usesPool: true,
  },
  {
    id: "clip",
    label: "Clipped",
    blurb: "Real word, vowels trimmed",
    icon: Scissors,
    usesStyle: false,
    usesSyllables: false,
    usesConsonantCount: false,
    usesPool: true,
  },
];

export const MODE_MAP = Object.fromEntries(MODES.map((m) => [m.id, m])) as Record<GeneratorMode, ModeInfo>;
