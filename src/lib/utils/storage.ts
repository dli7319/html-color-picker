/**
 * Reads and parses a JSON value from localStorage.
 * Returns `defaultValue` when the key is missing, parsing fails, or
 * localStorage is unavailable.
 */
export function storageGet<T>(key: string, defaultValue: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (raw === null) return defaultValue;
    return JSON.parse(raw) as T;
  } catch {
    return defaultValue;
  }
}

/**
 * Writes a JSON-serializable value to localStorage.
 * Silently ignores errors when localStorage is unavailable.
 */
export function storageSet(key: string, value: unknown): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // localStorage unavailable — silently ignore
  }
}
