export function randInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function pick<T>(arr: readonly T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function pickTwoDistinct<T>(arr: readonly T[]): [T, T] {
  const a = pick(arr);
  let b = pick(arr);
  for (let i = 0; i < 10 && b === a && arr.length > 1; i++) b = pick(arr);
  return [a, b];
}

export function weightedPick<T extends { weight: number }>(items: readonly T[]): T {
  const total = items.reduce((sum, item) => sum + item.weight, 0);
  let roll = Math.random() * total;
  for (const item of items) {
    roll -= item.weight;
    if (roll <= 0) return item;
  }
  return items[items.length - 1];
}

export function uid(): string {
  return `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 9)}`;
}
