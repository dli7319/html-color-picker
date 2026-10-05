/**
 * Pure service-worker rules: cache naming, staleness, request filtering,
 * precache-list normalisation. No top-level side effects so the unit tests
 * can import this module without a worker environment.
 */

export const SW_CACHE_PREFIX = "html-color-picker";

/** Cache name carrying a content hash of the shipped bytes. */
export function cacheNameFor(version: string): string {
  return `${SW_CACHE_PREFIX}-${version}`;
}

/** True when `name` belongs to us but is not the cache for `currentVersion`. */
export function isStaleCache(name: string, currentVersion: string): boolean {
  return (
    name.startsWith(`${SW_CACHE_PREFIX}-`) &&
    name !== cacheNameFor(currentVersion)
  );
}

export interface RequestLike {
  url: string;
  method: string;
  mode?: string;
}

/**
 * Only same-origin GET requests are ours. Cross-origin traffic (none today,
 * but a future CDN asset or font host must not be silently intercepted) is
 * forwarded untouched, as are non-GET verbs and the worker's own file.
 */
export function shouldHandleRequest(
  request: RequestLike,
  origin: string,
): boolean {
  if (request.method !== "GET") return false;
  let url: URL;
  try {
    url = new URL(request.url);
  } catch {
    return false;
  }
  if (url.origin !== origin) return false;
  if (url.pathname.endsWith("/sw.js")) return false;
  return true;
}

/** Navigation requests get the cached app shell. */
export function isNavigation(request: RequestLike): boolean {
  return request.mode === "navigate";
}

/**
 * Normalise the build-time precache list: relative URLs, no duplicates,
 * sorted so the cache name hash is stable across builds of identical bytes.
 */
export function normalizePrecacheList(files: string[]): string[] {
  const unique = new Set(
    files.map((f) => (f.startsWith("./") ? f : `./${f.replace(/^\/+/, "")}`)),
  );
  return [...unique].sort();
}
