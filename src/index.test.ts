import { describe, it, expect } from "vitest";
import "./index";

describe("index module", () => {
  it("should not throw when importing", () => {
    // Static import above is the test — if it threw, the suite would fail to load.
    expect(true).toBe(true);
  });

  it("registers <color-picker> as a custom element after import", () => {
    const el = customElements.get("color-picker");
    expect(el).toBeDefined();
    expect(el?.name).toBe("ColorPicker");
  });
});
