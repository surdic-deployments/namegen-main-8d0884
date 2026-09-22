const BOUNDARY = "^";
const END = "$";
const ORDER = 2;

export interface MarkovModel {
  transitions: Map<string, Map<string, number>>;
  starts: string[];
  order: number;
}

const modelCache = new Map<string, MarkovModel>();

export function buildMarkovModel(words: string[], cacheKey?: string): MarkovModel {
  if (cacheKey && modelCache.has(cacheKey)) return modelCache.get(cacheKey)!;

  const transitions = new Map<string, Map<string, number>>();
  const starts: string[] = [];

  for (const raw of words) {
    const w = BOUNDARY.repeat(ORDER) + raw.toLowerCase() + END;
    starts.push(w.slice(0, ORDER));
    for (let i = 0; i <= w.length - ORDER; i++) {
      const key = w.slice(i, i + ORDER);
      const next = w[i + ORDER];
      if (next === undefined) continue;
      if (!transitions.has(key)) transitions.set(key, new Map());
      const bucket = transitions.get(key)!;
      bucket.set(next, (bucket.get(next) ?? 0) + 1);
    }
  }

  const model: MarkovModel = { transitions, starts, order: ORDER };
  if (cacheKey) modelCache.set(cacheKey, model);
  return model;
}

function weightedNext(options: Map<string, number>): string {
  const total = Array.from(options.values()).reduce((a, b) => a + b, 0);
  let roll = Math.random() * total;
  for (const [char, weight] of options) {
    roll -= weight;
    if (roll <= 0) return char;
  }
  return END;
}

export function generateMarkovWord(model: MarkovModel, maxLen = 12): string {
  let key = model.starts[Math.floor(Math.random() * model.starts.length)];
  let out = "";

  for (let i = 0; i < maxLen; i++) {
    const options = model.transitions.get(key);
    if (!options) break;
    const next = weightedNext(options);
    if (next === END) break;
    out += next;
    key = (key + next).slice(-model.order);
  }

  return out;
}
