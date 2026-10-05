/**
 * Service-worker registration and update flow.
 *
 * Rules this encodes (all covered by serviceWorkerRegistration.test.ts):
 * - "is this an update?" is a PREDICATE evaluated at install time —
 *   navigator.serviceWorker.controller is null on a first visit and a value
 *   captured at registration time would silently discard every future update.
 * - Activation is requested by the page (SKIP_WAITING) and the worker only
 *   answers it; nothing reloads behind the user's back.
 * - "Later" defers, it does not discard: the pending apply stays live so
 *   Refresh works whenever the user picks the moment.
 */

export interface ServiceWorkerLike {
  state: string;
  addEventListener(type: string, listener: () => void): void;
  postMessage(message: unknown): void;
}

export interface RegistrationLike {
  update(): Promise<unknown>;
  installing: ServiceWorkerLike | null;
  addEventListener(type: string, listener: () => void): void;
}

export interface ServiceWorkerContainerLike {
  controller: unknown;
  register(scriptURL: string): Promise<RegistrationLike>;
  addEventListener(type: string, listener: () => void): void;
}

export interface UpdateBanner {
  /** Show a passive banner; `apply` refreshes now, `dismiss` only defers. */
  show(apply: () => void, dismiss: () => void): void;
}

export interface RegisterServiceWorkerOptions {
  /** Defaults to navigator.serviceWorker. */
  container?: ServiceWorkerContainerLike;
  /** Defaults to location.reload. */
  reload?: () => void;
  /** Defaults to a small passive DOM banner. */
  banner?: UpdateBanner;
  /** Defaults to "./sw.js" — relative so subpath hosting works. */
  swUrl?: string;
}

interface GlobalLike {
  navigator?: { serviceWorker?: ServiceWorkerContainerLike };
  location?: { reload: () => void };
}

export interface ServiceWorkerController {
  /** True when an update is installed and not yet applied. */
  hasPendingUpdate(): boolean;
  /** Re-show the banner for the pending update (e.g. after "Later"). */
  showPendingUpdate(): void;
  /** Apply the pending update now, if any. */
  applyPendingUpdate(): void;
}

export function registerServiceWorker(
  options: RegisterServiceWorkerOptions = {},
): ServiceWorkerController | null {
  const globalObj = globalThis as unknown as GlobalLike;
  const container =
    options.container ??
    (globalObj.navigator && globalObj.navigator.serviceWorker
      ? globalObj.navigator.serviceWorker
      : undefined);
  if (!container) return null;

  const reload =
    options.reload ??
    (() => {
      if (globalObj.location) globalObj.location.reload();
    });
  const banner = options.banner ?? createDomBanner();
  const swUrl = options.swUrl ?? "./sw.js";

  let refreshRequested = false;
  let reloaded = false;
  let pendingApply: (() => void) | null = null;
  let pendingDismiss: (() => void) | null = null;

  // Reload ONLY on a user-requested refresh — controllerchange also fires
  // when the very first worker claims the page, and reloading there would
  // yank the page out from under the user for no reason.
  container.addEventListener("controllerchange", () => {
    if (refreshRequested && !reloaded) {
      reloaded = true;
      reload();
    }
  });

  const apply = (): void => {
    refreshRequested = true;
    pendingApply = null;
    pendingDismiss = null;
    // The waiting worker may have been superseded; post to the one that
    // installed while the banner was up.
    const waiting = currentInstallingWorker;
    if (waiting) waiting.postMessage({ type: "SKIP_WAITING" });
  };

  const dismiss = (): void => {
    // Deferring must not discard: keep pendingApply/pendingDismiss alive so
    // Refresh still works later, and the banner can return on the next deploy.
    refreshRequested = false;
  };

  let currentInstallingWorker: ServiceWorkerLike | null = null;

  container
    .register(swUrl)
    .then((registration) => {
      void registration.update().catch(() => undefined);

      registration.addEventListener("updatefound", () => {
        const worker = registration.installing;
        if (!worker) return;
        currentInstallingWorker = worker;
        worker.addEventListener("statechange", () => {
          if (worker.state !== "installed") return;
          // Predicate AT INSTALL TIME, never captured earlier.
          const isUpdate = container.controller !== null;
          if (!isUpdate) return;
          pendingApply = apply;
          pendingDismiss = dismiss;
          banner.show(apply, dismiss);
        });
      });
    })
    .catch(() => {
      // No service worker support or registration failed (e.g. dev server
      // without sw.js) — the app works, it just will not work offline.
    });

  return {
    hasPendingUpdate: () => pendingApply !== null,
    showPendingUpdate: () => {
      if (pendingApply && pendingDismiss)
        banner.show(pendingApply, pendingDismiss);
    },
    applyPendingUpdate: () => {
      if (pendingApply) pendingApply();
    },
  };
}

function createDomBanner(): UpdateBanner {
  return {
    show(apply, dismiss) {
      const doc = (globalThis as unknown as { document?: Document }).document;
      if (!doc || !doc.body) {
        apply();
        return;
      }
      const bar = doc.createElement("div");
      bar.setAttribute("role", "status");
      bar.style.cssText = [
        "position:fixed",
        "left:50%",
        "bottom:16px",
        "transform:translateX(-50%)",
        "display:flex",
        "gap:8px",
        "align-items:center",
        "padding:10px 14px",
        "border-radius:8px",
        "background:#1f2937",
        "color:#ffffff",
        "font:13px/1.4 sans-serif",
        "z-index:2147483647",
        "box-shadow:0 2px 8px rgba(0,0,0,0.35)",
      ].join(";");
      const label = doc.createElement("span");
      label.textContent = "A new version is ready.";

      const refresh = doc.createElement("button");
      refresh.textContent = "Refresh";
      styleButton(refresh);
      refresh.addEventListener("click", () => {
        bar.remove();
        chip.remove();
        apply();
      });

      // "Later" defers without discarding: the bar is replaced by a small
      // persistent chip so the update stays applicable whenever the user
      // picks the moment.
      const chip = doc.createElement("button");
      chip.setAttribute("role", "status");
      chip.textContent = "⬆ Update ready";
      styleButton(chip);
      chip.style.cssText +=
        ";position:fixed;right:16px;bottom:16px;z-index:2147483647";
      chip.addEventListener("click", () => {
        chip.remove();
        doc.body.appendChild(bar);
      });

      const later = doc.createElement("button");
      later.textContent = "Later";
      styleButton(later);
      later.addEventListener("click", () => {
        bar.remove();
        doc.body.appendChild(chip);
        dismiss();
      });

      bar.append(label, refresh, later);
      doc.body.appendChild(bar);
    },
  };
}

function styleButton(button: HTMLButtonElement): void {
  button.style.cssText = [
    "border:none",
    "border-radius:6px",
    "padding:5px 10px",
    "cursor:pointer",
    "font:inherit",
    "background:#475569",
    "color:#ffffff",
  ].join(";");
}
