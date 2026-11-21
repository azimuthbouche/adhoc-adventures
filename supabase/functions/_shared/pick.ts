export interface Activity {
  id: string;
  title: string;
  summary: string;
  steps: string[];
}

export function pick<T extends Activity>(
  catalog: readonly T[],
  seed: string,
): T | null {
  if (catalog.length === 0) return null;

  let hash = 2166136261;
  for (let index = 0; index < seed.length; index += 1) {
    hash = Math.imul(hash ^ seed.charCodeAt(index), 16777619);
  }
  return catalog[(hash >>> 0) % catalog.length];
}
