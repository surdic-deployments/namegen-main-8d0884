import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { GeneratedName, GeneratorSettings } from "../types";
import { generateCandidate, getPool } from "../generator/engine";
import { fetchThemeWords } from "../generator/datamuse";
import { DEFAULT_SETTINGS } from "../generator/defaults";
import { useLocalStorage } from "./useLocalStorage";

const BUFFER_SIZE = 6;
const SEEN_LIMIT = 400;
const THEME_DEBOUNCE_MS = 450;

export type ThemeStatus = "idle" | "loading" | "ready" | "error";

export function useNameGenerator(externalAvoid: Set<string>) {
  const [settings, setSettings] = useLocalStorage<GeneratorSettings>("namegen:settings", DEFAULT_SETTINGS);
  const [queue, setQueue] = useState<GeneratedName[]>([]);
  const [themeWords, setThemeWords] = useState<string[] | null>(null);
  const [themeStatus, setThemeStatus] = useState<ThemeStatus>("idle");

  const seenOrderRef = useRef<string[]>([]);
  const seenSetRef = useRef<Set<string>>(new Set());
  const externalAvoidRef = useRef(externalAvoid);

  useEffect(() => {
    externalAvoidRef.current = externalAvoid;
  }, [externalAvoid]);

  const updateSettings = useCallback(
    (patch: Partial<GeneratorSettings>) => {
      setSettings((prev) => ({ ...prev, ...patch }));
    },
    [setSettings],
  );

  useEffect(() => {
    const theme = settings.themeWord.trim();
    if (!theme) {
      setThemeWords(null);
      setThemeStatus("idle");
      return;
    }
    setThemeStatus("loading");
    const handle = setTimeout(() => {
      fetchThemeWords(theme)
        .then((words) => {
          setThemeWords(words);
          setThemeStatus(words.length >= 5 ? "ready" : "error");
        })
        .catch(() => {
          setThemeWords(null);
          setThemeStatus("error");
        });
    }, THEME_DEBOUNCE_MS);
    return () => clearTimeout(handle);
  }, [settings.themeWord]);

  const pool = useMemo(
    () => getPool(settings, themeStatus === "ready" ? themeWords : null),
    [settings, themeWords, themeStatus],
  );

  const rememberSeen = useCallback((text: string) => {
    const lower = text.toLowerCase();
    if (seenSetRef.current.has(lower)) return;
    seenSetRef.current.add(lower);
    seenOrderRef.current.push(lower);
    if (seenOrderRef.current.length > SEEN_LIMIT) {
      const removed = seenOrderRef.current.shift();
      if (removed) seenSetRef.current.delete(removed);
    }
  }, []);

  const fillQueue = useCallback(
    (base: GeneratedName[]): GeneratedName[] => {
      const next = [...base];
      while (next.length < BUFFER_SIZE) {
        const avoid = new Set<string>([
          ...externalAvoidRef.current,
          ...seenSetRef.current,
          ...next.map((n) => n.text.toLowerCase()),
        ]);
        const candidate = generateCandidate(settings, pool, avoid);
        rememberSeen(candidate.text);
        next.push(candidate);
      }
      return next;
    },
    [settings, pool, rememberSeen],
  );

  useEffect(() => {
    setQueue(fillQueue([]));
  }, [fillQueue]);

  useEffect(() => {
    if (queue.length < BUFFER_SIZE) {
      setQueue((prev) => fillQueue(prev));
    }
  }, [queue, fillQueue]);

  const advance = useCallback(() => {
    setQueue((prev) => prev.slice(1));
  }, []);

  const restoreToFront = useCallback((card: GeneratedName) => {
    setQueue((prev) => [card, ...prev]);
  }, []);

  const generateBatch = useCallback(
    (count: number): GeneratedName[] => {
      const batch: GeneratedName[] = [];
      while (batch.length < count) {
        const avoid = new Set<string>([
          ...externalAvoidRef.current,
          ...seenSetRef.current,
          ...batch.map((n) => n.text.toLowerCase()),
        ]);
        const candidate = generateCandidate(settings, pool, avoid);
        rememberSeen(candidate.text);
        batch.push(candidate);
      }
      return batch;
    },
    [settings, pool, rememberSeen],
  );

  return {
    settings,
    updateSettings,
    queue,
    current: queue[0],
    advance,
    restoreToFront,
    generateBatch,
    themeStatus,
    themeWordCount: themeWords?.length ?? 0,
  };
}
