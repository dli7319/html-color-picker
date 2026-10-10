/**
 * PWA install / offline affordance (round-2 onboarding review): the app is
 * installable and works fully offline, but nothing in the UI said so.
 *
 * Renders a small fixed chip (bottom-right, clear of the SW update banner
 * which sits bottom-center): "Install app — works offline" when the browser
 * offers an install prompt, otherwise an informational "Works offline".
 */
interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: string }>;
}

const CHIP_ID = "pwa-install-chip";

let deferredPrompt: BeforeInstallPromptEvent | null = null;
let chip: HTMLElement | null = null;

function styleButton(el: HTMLButtonElement) {
  el.type = "button";
  el.style.cssText =
    "border:none;border-radius:0.5rem;padding:0.25rem 0.625rem;" +
    "font-size:0.75rem;font-weight:600;cursor:pointer;" +
    "background:rgb(51,65,85);color:#fff;";
}

function renderChip() {
  if (chip) return;
  const el = document.createElement("div");
  el.id = CHIP_ID;
  el.setAttribute("role", "status");
  el.style.cssText =
    "position:fixed;right:1rem;bottom:1rem;z-index:2147483000;" +
    "display:flex;align-items:center;gap:0.5rem;" +
    "padding:0.5rem 0.75rem;border-radius:0.75rem;" +
    "background:rgba(255,255,255,0.92);border:1px solid rgba(30,41,59,0.25);" +
    "color:rgb(30,41,59);font-size:0.8rem;box-shadow:0 2px 8px rgba(0,0,0,0.18);";

  const label = document.createElement("span");
  label.textContent = deferredPrompt
    ? "Install app — works offline"
    : "Works offline";

  const install = document.createElement("button");
  styleButton(install);
  install.textContent = "Install";
  install.hidden = deferredPrompt == null;
  install.addEventListener("click", () => {
    void installApp();
  });

  const dismiss = document.createElement("button");
  dismiss.type = "button";
  dismiss.textContent = "×";
  dismiss.setAttribute("aria-label", "Dismiss");
  dismiss.style.cssText =
    "border:none;background:transparent;cursor:pointer;" +
    "color:rgb(75,85,99);font-size:1rem;line-height:1;padding:0 0.125rem;";
  dismiss.addEventListener("click", () => {
    el.remove();
    chip = null;
  });

  el.append(label, install, dismiss);
  document.body.appendChild(el);
  chip = el;
}

function updateChip() {
  if (!chip) return;
  const label = chip.querySelector("span");
  const install = chip.querySelector("button");
  if (label) {
    label.textContent = deferredPrompt
      ? "Install app — works offline"
      : "Works offline";
  }
  if (install) install.hidden = deferredPrompt == null;
}

async function installApp() {
  if (!deferredPrompt) return;
  await deferredPrompt.prompt();
  await deferredPrompt.userChoice;
  deferredPrompt = null;
  updateChip();
}

export function initInstallChip(): void {
  window.addEventListener("beforeinstallprompt", (e) => {
    e.preventDefault();
    deferredPrompt = e as BeforeInstallPromptEvent;
    renderChip();
    updateChip();
  });
  window.addEventListener("appinstalled", () => {
    deferredPrompt = null;
    chip?.remove();
    chip = null;
  });
  // Only advertise offline capability once a service worker is actually
  // controlling the page (or about to). Environments without service
  // workers (jsdom) render the informational chip immediately.
  if ("serviceWorker" in navigator) {
    void navigator.serviceWorker.ready.then(() => renderChip());
  } else {
    renderChip();
  }
}
