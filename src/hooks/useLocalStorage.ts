import { useEffect, useState } from "react";
import type { Dispatch, SetStateAction } from "react";

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export function useLocalStorage<T>(key: string, initial: T): [T, Dispatch<SetStateAction<T>>] {
  const [value, setValue] = useState<T>(() => {
    try {
      const raw = localStorage.getItem(key);
      if (!raw) return initial;
      const parsed = JSON.parse(raw) as T;
      // Shallow-merge onto the default so fields added after this was last
      // saved (e.g. a new setting) fall back to their default instead of
      // coming back `undefined`.
      if (isPlainObject(initial) && isPlainObject(parsed)) {
        return { ...initial, ...parsed };
      }
      return parsed;
    } catch {
      return initial;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // Storage unavailable (private mode, quota exceeded) — keep working in memory.
    }
  }, [key, value]);

  return [value, setValue];
}
