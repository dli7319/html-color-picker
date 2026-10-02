// Polyfill / fallback for environments where global localStorage is not initialized (e.g. Node 26+)
if (
  typeof globalThis.localStorage === "undefined" ||
  !globalThis.localStorage
) {
  const store: Record<string, string> = {};
  const mockStorage: Storage = {
    getItem: (key: string) => store[key] ?? null,
    setItem: (key: string, val: string) => {
      store[key] = String(val);
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      for (const key of Object.keys(store)) {
        delete store[key];
      }
    },
    get length() {
      return Object.keys(store).length;
    },
    key: (i: number) => Object.keys(store)[i] ?? null,
  };

  try {
    Object.defineProperty(globalThis, "localStorage", {
      value: mockStorage,
      configurable: true,
      writable: true,
    });
    if (typeof window !== "undefined") {
      Object.defineProperty(window, "localStorage", {
        value: mockStorage,
        configurable: true,
        writable: true,
      });
    }
  } catch {
    // Ignore fallback errors
  }
}
