import { Loader2, Minus, Plus } from "lucide-react";
import type { GeneratorSettings, CaseStyle, WordCategoryId } from "../types";
import type { ThemeStatus } from "../hooks/useNameGenerator";
import { MODES, MODE_MAP } from "../data/modes";
import { PHONETIC_STYLE_LIST } from "../data/phoneticStyles";
import { WORD_CATEGORY_LIST } from "../data/wordlists";
import { DEFAULT_SETTINGS } from "../generator/defaults";

interface ControlsPanelProps {
  settings: GeneratorSettings;
  onChange: (patch: Partial<GeneratorSettings>) => void;
  themeStatus: ThemeStatus;
  themeWordCount: number;
}

const CASES: { id: CaseStyle; label: string }[] = [
  { id: "title", label: "Title" },
  { id: "lower", label: "lower" },
  { id: "upper", label: "UPPER" },
];

function Section({ title, children, hint }: { title: string; children: React.ReactNode; hint?: string }) {
  return (
    <div className="space-y-2">
      <div className="flex items-baseline justify-between">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400">{title}</h3>
        {hint && <span className="text-[11px] text-slate-500">{hint}</span>}
      </div>
      {children}
    </div>
  );
}

function CountStepper({
  label,
  value,
  min,
  max,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  onChange: (delta: number) => void;
}) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-[11px] text-slate-500">{label}</span>
      <button
        type="button"
        onClick={() => onChange(-1)}
        disabled={value <= min}
        className="rounded-full border border-white/10 p-1 text-slate-300 transition hover:bg-white/10 disabled:opacity-30 disabled:hover:bg-transparent"
      >
        <Minus size={12} />
      </button>
      <span className="w-4 text-center text-sm font-semibold text-white">{value}</span>
      <button
        type="button"
        onClick={() => onChange(1)}
        disabled={value >= max}
        className="rounded-full border border-white/10 p-1 text-slate-300 transition hover:bg-white/10 disabled:opacity-30 disabled:hover:bg-transparent"
      >
        <Plus size={12} />
      </button>
    </div>
  );
}

export function ControlsPanel({ settings, onChange, themeStatus, themeWordCount }: ControlsPanelProps) {
  const modeInfo = MODE_MAP[settings.mode];

  function toggleCategory(id: WordCategoryId) {
    const has = settings.categories.includes(id);
    if (has && settings.categories.length === 1) return;
    const next = has ? settings.categories.filter((c) => c !== id) : [...settings.categories, id];
    onChange({ categories: next });
  }

  function setSyllables(which: "min" | "max", delta: number) {
    if (which === "min") {
      const next = Math.min(Math.max(1, settings.minSyllables + delta), settings.maxSyllables);
      onChange({ minSyllables: next });
    } else {
      const next = Math.max(Math.min(6, settings.maxSyllables + delta), settings.minSyllables);
      onChange({ maxSyllables: next });
    }
  }

  function setConsonants(which: "min" | "max", delta: number) {
    if (which === "min") {
      const next = Math.min(Math.max(2, settings.minConsonants + delta), settings.maxConsonants);
      onChange({ minConsonants: next });
    } else {
      const next = Math.max(Math.min(8, settings.maxConsonants + delta), settings.minConsonants);
      onChange({ maxConsonants: next });
    }
  }

  return (
    <div className="glass space-y-6 rounded-2xl p-5">
      <Section title="Mode">
        <div className="grid grid-cols-2 gap-2">
          {MODES.map((m) => {
            const Icon = m.icon;
            const active = settings.mode === m.id;
            return (
              <button
                key={m.id}
                type="button"
                onClick={() => onChange({ mode: m.id })}
                className={`flex flex-col items-start gap-1 rounded-xl border p-3 text-left transition ${
                  active
                    ? "border-pink-400/60 bg-pink-500/10 text-white"
                    : "border-white/10 bg-white/[0.02] text-slate-300 hover:bg-white/[0.06]"
                }`}
              >
                <Icon size={16} className={active ? "text-pink-400" : "text-slate-400"} />
                <span className="text-sm font-semibold">{m.label}</span>
                <span className="text-[11px] leading-tight text-slate-400">{m.blurb}</span>
              </button>
            );
          })}
        </div>
      </Section>

      {modeInfo.usesStyle && (
        <Section title="Phonetic style">
          <div className="grid grid-cols-1 gap-2">
            {PHONETIC_STYLE_LIST.map((style) => {
              const active = settings.style === style.id;
              return (
                <button
                  key={style.id}
                  type="button"
                  onClick={() => onChange({ style: style.id })}
                  className={`rounded-xl border px-3 py-2 text-left transition ${
                    active
                      ? "border-violet-400/60 bg-violet-500/10 text-white"
                      : "border-white/10 bg-white/[0.02] text-slate-300 hover:bg-white/[0.06]"
                  }`}
                >
                  <div className="text-sm font-semibold">{style.label}</div>
                  <div className="text-[11px] leading-tight text-slate-400">{style.blurb}</div>
                </button>
              );
            })}
          </div>
        </Section>
      )}

      {modeInfo.usesPool && (
        <>
          <Section title="Word categories" hint="used as seeds">
            <div className="flex flex-wrap gap-2">
              {WORD_CATEGORY_LIST.map((cat) => {
                const active = settings.categories.includes(cat.id);
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => toggleCategory(cat.id)}
                    title={cat.blurb}
                    className={`rounded-full border px-3 py-1.5 text-xs font-medium transition ${
                      active
                        ? "border-violet-400/60 bg-violet-500/10 text-white"
                        : "border-white/10 bg-white/[0.02] text-slate-400 hover:bg-white/[0.06]"
                    }`}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>
          </Section>

          <Section title="Theme word" hint="optional">
            <input
              type="text"
              value={settings.themeWord}
              onChange={(e) => onChange({ themeWord: e.target.value.slice(0, 24) })}
              placeholder="e.g. ocean, speed, calm"
              className="w-full rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2 text-sm text-white placeholder:text-slate-500 focus:border-violet-400/60 focus:outline-none"
            />
            <div className="flex h-4 items-center gap-1.5 text-[11px] text-slate-500">
              {themeStatus === "loading" && (
                <>
                  <Loader2 size={12} className="animate-spin" /> looking for related words…
                </>
              )}
              {themeStatus === "ready" && <span className="text-emerald-400">{themeWordCount} related words found</span>}
              {themeStatus === "error" && <span>no matches — using categories instead</span>}
            </div>
          </Section>
        </>
      )}

      {modeInfo.usesSyllables && (
        <Section title="Syllables">
          <div className="flex items-center gap-4">
            <CountStepper label="Min" value={settings.minSyllables} min={1} max={settings.maxSyllables} onChange={(d) => setSyllables("min", d)} />
            <CountStepper label="Max" value={settings.maxSyllables} min={settings.minSyllables} max={6} onChange={(d) => setSyllables("max", d)} />
          </div>
        </Section>
      )}

      {modeInfo.usesConsonantCount && (
        <Section title="Consonants">
          <div className="flex items-center gap-4">
            <CountStepper label="Min" value={settings.minConsonants} min={2} max={settings.maxConsonants} onChange={(d) => setConsonants("min", d)} />
            <CountStepper label="Max" value={settings.maxConsonants} min={settings.minConsonants} max={8} onChange={(d) => setConsonants("max", d)} />
          </div>
        </Section>
      )}

      <Section title="Readability">
        <input
          type="range"
          min={0}
          max={100}
          step={5}
          value={settings.strictness}
          onChange={(e) => onChange({ strictness: Number(e.target.value) })}
          className="w-full accent-pink-500"
        />
        <div className="flex justify-between text-[11px] text-slate-500">
          <span>Wild</span>
          <span>Easiest to say</span>
        </div>
      </Section>

      <Section title="Starts with" hint="optional">
        <input
          type="text"
          value={settings.startsWith}
          onChange={(e) => onChange({ startsWith: e.target.value.replace(/[^a-zA-Z]/g, "").slice(0, 3) })}
          placeholder="e.g. su"
          className="w-24 rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2 text-sm text-white placeholder:text-slate-500 focus:border-violet-400/60 focus:outline-none"
        />
      </Section>

      <Section title="Case">
        <div className="flex gap-2">
          {CASES.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => onChange({ caseStyle: c.id })}
              className={`flex-1 rounded-lg border px-3 py-1.5 text-xs font-medium transition ${
                settings.caseStyle === c.id
                  ? "border-violet-400/60 bg-violet-500/10 text-white"
                  : "border-white/10 bg-white/[0.02] text-slate-400 hover:bg-white/[0.06]"
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
      </Section>

      <button
        type="button"
        onClick={() => onChange(DEFAULT_SETTINGS)}
        className="w-full rounded-lg border border-white/10 py-2 text-xs font-medium text-slate-400 transition hover:bg-white/[0.06] hover:text-white"
      >
        Reset to defaults
      </button>
    </div>
  );
}
