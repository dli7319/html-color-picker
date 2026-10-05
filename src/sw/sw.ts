/**
 * Service worker wiring: precache the app shell on install, answer
 * navigations from cache, delete stale caches on activate, and let the PAGE
 * decide when activation happens (SKIP_WAITING message — never skipWaiting()
 * on install).
 *
 * The SW_VERSION and PRECACHE_LIST placeholders (each a quoted string literal
 * in the source below) are build-time tokens substituted by
 * scripts/build-sw.ts, which fails the build when either is missing.
 */
import {
  cacheNameFor,
  isNavigation,
  isStaleCache,
  normalizePrecacheList,
  shouldHandleRequest,
} from "./rules";

const VERSION = "_SW_VERSION_" as unknown as string;
const PRECACHE = "_PRECACHE_LIST_" as unknown as string[];

const CACHE_NAME = cacheNameFor(VERSION);
const PRECACHE_URLS = normalizePrecacheList(PRECACHE);

interface ExtendableEventLike {
  waitUntil(promise: Promise<unknown>): void;
}

interface FetchEventLike {
  request: Request;
  respondWith(response: Promise<Response>): void;
}

interface MessageEventLike {
  data: { type?: string };
}

interface ServiceWorkerGlobalScopeLike {
  addEventListener(
    type: string,
    listener: (event: unknown) => void,
    options?: unknown,
  ): void;
  skipWaiting(): void;
  clients: { claim(): Promise<void> };
}

const swScope = self as unknown as ServiceWorkerGlobalScopeLike;

swScope.addEventListener("install", (event: unknown) => {
  const ev = event as ExtendableEventLike;
  ev.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => cache.addAll(PRECACHE_URLS))
      .then(() => {
        // Activation is requested by the page (SKIP_WAITING), never taken here.
      }),
  );
});

swScope.addEventListener("activate", (event: unknown) => {
  const ev = event as ExtendableEventLike;
  ev.waitUntil(
    caches
      .keys()
      .then((names) =>
        Promise.all(
          names
            .filter((name) => isStaleCache(name, VERSION))
            .map((name) => caches.delete(name)),
        ),
      )
      .then(() => swScope.clients.claim()),
  );
});

swScope.addEventListener("fetch", (event: unknown) => {
  const ev = event as FetchEventLike;
  const { request } = ev;
  if (!shouldHandleRequest(request, self.location.origin)) return;

  if (isNavigation(request)) {
    // The shell for every navigation keeps subpath installs working on
    // static hosts that cannot remap 404s to index.html.
    ev.respondWith(
      caches
        .open(CACHE_NAME)
        .then((cache) => cache.match("./index.html"))
        .then((cached) => cached ?? fetch(request)),
    );
    return;
  }

  ev.respondWith(
    caches
      .open(CACHE_NAME)
      .then((cache) => cache.match(request))
      .then(
        (cached) =>
          cached ??
          fetch(request).then((response) => {
            // Cache same-origin GETs that arrive while online so the next
            // offline reload has them; failures fall through to the network.
            if (response.ok) {
              const copy = response.clone();
              void cachePut(request, copy);
            }
            return response;
          }),
      ),
  );
});

swScope.addEventListener("message", (event: unknown) => {
  const ev = event as MessageEventLike;
  if (ev.data && ev.data.type === "SKIP_WAITING") {
    swScope.skipWaiting();
  }
});

function cachePut(request: Request, response: Response): Promise<void> {
  return caches
    .open(CACHE_NAME)
    .then((cache) => cache.put(request, response))
    .then(() => undefined);
}
