import { describe, it, expect, vi } from "vitest";
import {
  registerServiceWorker,
  type ServiceWorkerContainerLike,
  type ServiceWorkerLike,
  type RegistrationLike,
  type UpdateBanner,
} from "./serviceWorkerRegistration";

class FakeWorker implements ServiceWorkerLike {
  state = "installing";
  messages: unknown[] = [];
  private listeners = new Map<string, (() => void)[]>();

  addEventListener(type: string, listener: () => void): void {
    const list = this.listeners.get(type) ?? [];
    list.push(listener);
    this.listeners.set(type, list);
  }

  postMessage(message: unknown): void {
    this.messages.push(message);
  }

  fire(type: string): void {
    for (const listener of this.listeners.get(type) ?? []) listener();
  }
}

class FakeRegistration implements RegistrationLike {
  installing: FakeWorker | null = null;
  updateCalls = 0;
  private listeners = new Map<string, (() => void)[]>();

  update(): Promise<unknown> {
    this.updateCalls += 1;
    return Promise.resolve();
  }

  addEventListener(type: string, listener: () => void): void {
    const list = this.listeners.get(type) ?? [];
    list.push(listener);
    this.listeners.set(type, list);
  }

  fire(type: string): void {
    for (const listener of this.listeners.get(type) ?? []) listener();
  }
}

class FakeContainer implements ServiceWorkerContainerLike {
  controller: unknown = null;
  registeredUrls: string[] = [];
  registration = new FakeRegistration();
  private listeners = new Map<string, (() => void)[]>();

  register(scriptURL: string): Promise<RegistrationLike> {
    this.registeredUrls.push(scriptURL);
    return Promise.resolve(this.registration);
  }

  addEventListener(type: string, listener: () => void): void {
    const list = this.listeners.get(type) ?? [];
    list.push(listener);
    this.listeners.set(type, list);
  }

  fire(type: string): void {
    for (const listener of this.listeners.get(type) ?? []) listener();
  }
}

function fakeBanner() {
  const shown: { apply: () => void; dismiss: () => void }[] = [];
  const banner: UpdateBanner = {
    show(apply, dismiss) {
      shown.push({ apply, dismiss });
    },
  };
  return { banner, shown };
}

function flush(): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, 0));
}

/** Fire updatefound with a worker that reaches `installed`. */
function installWorker(
  container: FakeContainer,
  state = "installed",
): FakeWorker {
  const worker = new FakeWorker();
  worker.state = state;
  container.registration.installing = worker;
  container.registration.fire("updatefound");
  worker.fire("statechange");
  return worker;
}

describe("registerServiceWorker", () => {
  it("registers ./sw.js relatively and checks for updates on load", async () => {
    const container = new FakeContainer();
    registerServiceWorker({
      container,
      reload: vi.fn(),
      banner: fakeBanner().banner,
    });
    await flush();
    expect(container.registeredUrls).toEqual(["./sw.js"]);
    expect(container.registration.updateCalls).toBe(1);
  });

  it("returns null when service workers are unsupported", () => {
    expect(registerServiceWorker()).toBeNull();
  });

  it("does not offer an update on a first visit (controller null at install)", async () => {
    const container = new FakeContainer();
    const { banner, shown } = fakeBanner();
    registerServiceWorker({ container, reload: vi.fn(), banner });
    await flush();
    installWorker(container);
    expect(shown).toHaveLength(0);
  });

  it("decides 'is update' at install time, not at registration time", async () => {
    const container = new FakeContainer();
    const { banner, shown } = fakeBanner();
    registerServiceWorker({ container, reload: vi.fn(), banner });
    await flush();
    // First visit at registration time — but the page gets claimed before the
    // new worker finishes installing (e.g. this is an update after all).
    container.controller = {};
    installWorker(container);
    expect(shown).toHaveLength(1);
  });

  it("offers the update when a worker installs while controlled", async () => {
    const container = new FakeContainer();
    container.controller = {};
    const { banner, shown } = fakeBanner();
    registerServiceWorker({ container, reload: vi.fn(), banner });
    await flush();
    installWorker(container);
    expect(shown).toHaveLength(1);
  });

  it("Refresh posts SKIP_WAITING and reloads exactly once on controllerchange", async () => {
    const container = new FakeContainer();
    container.controller = {};
    const reload = vi.fn();
    const { banner, shown } = fakeBanner();
    registerServiceWorker({ container, reload, banner });
    await flush();
    const worker = installWorker(container);

    shown[0].apply();
    expect(worker.messages).toEqual([{ type: "SKIP_WAITING" }]);

    container.fire("controllerchange");
    container.fire("controllerchange");
    expect(reload).toHaveBeenCalledTimes(1);
  });

  it("never reloads on controllerchange without a user-requested refresh", async () => {
    const container = new FakeContainer();
    container.controller = {};
    const reload = vi.fn();
    const { banner } = fakeBanner();
    registerServiceWorker({ container, reload, banner });
    await flush();
    installWorker(container);

    // The very first worker claims the page and fires controllerchange; the
    // page must not reload behind the user's back.
    container.fire("controllerchange");
    expect(reload).not.toHaveBeenCalled();
  });

  it("'Later' defers without discarding — the update stays pending and applicable", async () => {
    const container = new FakeContainer();
    container.controller = {};
    const reload = vi.fn();
    const { banner, shown } = fakeBanner();
    const controller = registerServiceWorker({ container, reload, banner });
    await flush();
    const worker = installWorker(container);

    shown[0].dismiss();
    expect(reload).not.toHaveBeenCalled();
    expect(controller!.hasPendingUpdate()).toBe(true);

    container.fire("controllerchange");
    expect(reload).not.toHaveBeenCalled();

    // User comes back later and refreshes: must still work.
    controller!.applyPendingUpdate();
    expect(worker.messages).toEqual([{ type: "SKIP_WAITING" }]);
    container.fire("controllerchange");
    expect(reload).toHaveBeenCalledTimes(1);
    expect(controller!.hasPendingUpdate()).toBe(false);
  });

  it("showPendingUpdate re-surfaces the banner after 'Later'", async () => {
    const container = new FakeContainer();
    container.controller = {};
    const { banner, shown } = fakeBanner();
    const controller = registerServiceWorker({
      container,
      reload: vi.fn(),
      banner,
    });
    await flush();
    installWorker(container);
    expect(shown).toHaveLength(1);

    shown[0].dismiss();
    controller!.showPendingUpdate();
    expect(shown).toHaveLength(2);
  });

  it("ignores a worker that never reaches installed", async () => {
    const container = new FakeContainer();
    container.controller = {};
    const { banner, shown } = fakeBanner();
    registerServiceWorker({ container, reload: vi.fn(), banner });
    await flush();
    installWorker(container, "installing");
    expect(shown).toHaveLength(0);
  });

  it("default DOM banner: Later swaps to a chip, and the update stays applicable", async () => {
    const container = new FakeContainer();
    container.controller = {};
    const reload = vi.fn();
    // No banner injected — use the real DOM banner.
    registerServiceWorker({ container, reload });
    await flush();
    const worker = installWorker(container);

    const findButton = (label: string) =>
      [...document.querySelectorAll("button")].find(
        (b) => b.textContent === label,
      );
    expect(findButton("Refresh")).toBeTruthy();
    expect(findButton("Later")).toBeTruthy();

    findButton("Later")!.click();
    expect(findButton("Refresh")).toBeFalsy();
    expect(findButton("⬆ Update ready")).toBeTruthy();
    expect(reload).not.toHaveBeenCalled();
    expect(worker.messages).toHaveLength(0);

    // Deferred, not discarded: the chip reopens the banner and Refresh works.
    findButton("⬆ Update ready")!.click();
    expect(findButton("Refresh")).toBeTruthy();
    findButton("Refresh")!.click();
    expect(worker.messages).toEqual([{ type: "SKIP_WAITING" }]);
    container.fire("controllerchange");
    expect(reload).toHaveBeenCalledTimes(1);

    document.body.innerHTML = "";
  });
});
