// @vitest-environment jsdom
import { describe, it, expect, beforeEach } from "vitest";

import { initInstallChip } from "./installPrompt";

describe("PWA install chip (round-2 onboarding review)", () => {
  beforeEach(() => {
    document.body.innerHTML = "";
    // Reset the module's chip state through the public path first (it also
    // removes any leftover node from the previous test).
    window.dispatchEvent(new Event("appinstalled"));
    document.getElementById("pwa-install-chip")?.remove();
  });

  it("renders an offline chip once the service worker is ready", async () => {
    initInstallChip();
    // jsdom has no service worker: the fallback path renders immediately.
    await new Promise((resolve) => setTimeout(resolve, 0));
    const chip = document.getElementById("pwa-install-chip");
    expect(chip).not.toBeNull();
    expect(chip!.textContent).toContain("Works offline");
  });

  it("offers Install when the browser fires beforeinstallprompt", async () => {
    initInstallChip();
    await new Promise((resolve) => setTimeout(resolve, 0));
    window.dispatchEvent(new Event("beforeinstallprompt"));
    const chip = document.getElementById("pwa-install-chip")!;
    expect(chip.textContent).toContain("Install app — works offline");
    const install = [...chip.querySelectorAll("button")].find(
      (b) => b.textContent === "Install",
    );
    expect(install).toBeDefined();
    expect(install!.hidden).toBe(false);
  });

  it("dismiss removes the chip", async () => {
    initInstallChip();
    await new Promise((resolve) => setTimeout(resolve, 0));
    const chip = document.getElementById("pwa-install-chip")!;
    const dismiss = chip.querySelector('button[aria-label="Dismiss"]')!;
    (dismiss as HTMLElement).click();
    expect(document.getElementById("pwa-install-chip")).toBeNull();
  });
});
