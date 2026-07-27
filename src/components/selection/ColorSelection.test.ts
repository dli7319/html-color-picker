import { vi, describe, it, expect } from "vitest";
import { Color, ColorInputType } from "../../lib/Color";

// ---------------------------------------------------------------------------
// Mock CSS imports — these are hoisted before all import statements
// ---------------------------------------------------------------------------

vi.mock("../../styles/tailwind.css", async () => {
  const { css } = await import("lit");
  const sheet = css``;
  return { default: sheet };
});

vi.mock("../../styles/ColorSelectionTypeA.css", async () => {
  const { css } = await import("lit");
  const sheet = css``;
  return { default: sheet, styles: sheet };
});

// ---------------------------------------------------------------------------
// Import the component under test (mocks are already registered)
// ---------------------------------------------------------------------------

import "./ColorSelection";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function rgb(r: number, g: number, b: number): Color {
  return new Color({ type: ColorInputType.RGB255, r, g, b });
}

// ---------------------------------------------------------------------------
// ColorSelection (<color-selection>)
// ---------------------------------------------------------------------------

describe("ColorSelection", () => {
  // -----------------------------------------------------------------------
  // 1. Custom element registration
  // -----------------------------------------------------------------------
  describe("custom element", () => {
    it('is defined as "color-selection"', () => {
      const el = document.createElement("color-selection");
      expect(el).toBeInstanceOf(HTMLElement);
    });

    it("is registered in the custom elements registry", () => {
      expect(customElements.get("color-selection")).toBeDefined();
    });
  });

  // -----------------------------------------------------------------------
  // 2. Default state — HSV mode
  // -----------------------------------------------------------------------
  describe("default state", () => {
    it("default colorSelectionType is HSV", async () => {
      const el = document.createElement("color-selection") as any;
      document.body.appendChild(el);
      await el.updateComplete;
      expect(el.colorSelectionType).toBe("HSV");
      document.body.removeChild(el);
    });

    it("renders <color-selection-hsv> by default", async () => {
      const el = document.createElement("color-selection") as any;
      document.body.appendChild(el);
      await el.updateComplete;
      const hsv = el.shadowRoot!.querySelector("color-selection-hsv");
      expect(hsv).not.toBeNull();
      document.body.removeChild(el);
    });

    it("does not render <color-selection-hsl> by default", async () => {
      const el = document.createElement("color-selection") as any;
      document.body.appendChild(el);
      await el.updateComplete;
      const hsl = el.shadowRoot!.querySelector("color-selection-hsl");
      expect(hsl).toBeNull();
      document.body.removeChild(el);
    });
  });

  // -----------------------------------------------------------------------
  // 3. Tab buttons — "HSV" and "HSL Wheel"
  // -----------------------------------------------------------------------
  describe("tab buttons", () => {
    it('renders an "HSV" button', async () => {
      const el = document.createElement("color-selection") as any;
      document.body.appendChild(el);
      await el.updateComplete;
      const buttons = el.shadowRoot!.querySelectorAll("button");
      const texts = Array.from(buttons).map((b: HTMLElement) =>
        b.textContent!.trim(),
      );
      expect(texts).toContain("HSV");
      document.body.removeChild(el);
    });

    it('renders an "HSL Wheel" button', async () => {
      const el = document.createElement("color-selection") as any;
      document.body.appendChild(el);
      await el.updateComplete;
      const buttons = el.shadowRoot!.querySelectorAll("button");
      const texts = Array.from(buttons).map((b: HTMLElement) =>
        b.textContent!.trim(),
      );
      expect(texts).toContain("HSL Wheel");
      document.body.removeChild(el);
    });

    it("renders exactly two buttons", async () => {
      const el = document.createElement("color-selection") as any;
      document.body.appendChild(el);
      await el.updateComplete;
      const buttons = el.shadowRoot!.querySelectorAll("button");
      expect(buttons.length).toBe(2);
      document.body.removeChild(el);
    });
  });

  // -----------------------------------------------------------------------
  // 4. Tab switching — clicking "HSL Wheel" enters HSL mode
  // -----------------------------------------------------------------------
  describe('clicking "HSL Wheel"', () => {
    it("switches colorSelectionType to HSL_WHEEL", async () => {
      const el = document.createElement("color-selection") as any;
      document.body.appendChild(el);
      await el.updateComplete;

      const buttons = el.shadowRoot!.querySelectorAll("button");
      const hslBtn = Array.from(buttons).find(
        (b: HTMLElement) => b.textContent!.trim() === "HSL Wheel",
      ) as HTMLElement;
      hslBtn.click();
      await el.updateComplete;

      expect(el.colorSelectionType).toBe("HSL_WHEEL");
      document.body.removeChild(el);
    });

    it("renders <color-selection-hsl> and removes <color-selection-hsv>", async () => {
      const el = document.createElement("color-selection") as any;
      document.body.appendChild(el);
      await el.updateComplete;

      const buttons = el.shadowRoot!.querySelectorAll("button");
      const hslBtn = Array.from(buttons).find(
        (b: HTMLElement) => b.textContent!.trim() === "HSL Wheel",
      ) as HTMLElement;
      hslBtn.click();
      await el.updateComplete;

      expect(
        el.shadowRoot!.querySelector("color-selection-hsl"),
      ).not.toBeNull();
      expect(el.shadowRoot!.querySelector("color-selection-hsv")).toBeNull();
      document.body.removeChild(el);
    });
  });

  // -----------------------------------------------------------------------
  // 5. Tab switching — clicking "HSV" returns to HSV mode
  // -----------------------------------------------------------------------
  describe('clicking "HSV" after switching to HSL', () => {
    it("switches colorSelectionType back to HSV", async () => {
      const el = document.createElement("color-selection") as any;
      document.body.appendChild(el);
      await el.updateComplete;

      // Switch to HSL first
      const buttons = el.shadowRoot!.querySelectorAll("button");
      const hslBtn = Array.from(buttons).find(
        (b: HTMLElement) => b.textContent!.trim() === "HSL Wheel",
      ) as HTMLElement;
      hslBtn.click();
      await el.updateComplete;

      // Switch back to HSV
      const hsvBtn = Array.from(buttons).find(
        (b: HTMLElement) => b.textContent!.trim() === "HSV",
      ) as HTMLElement;
      hsvBtn.click();
      await el.updateComplete;

      expect(el.colorSelectionType).toBe("HSV");
      document.body.removeChild(el);
    });

    it("renders <color-selection-hsv> and removes <color-selection-hsl>", async () => {
      const el = document.createElement("color-selection") as any;
      document.body.appendChild(el);
      await el.updateComplete;

      // Switch to HSL first
      const buttons = el.shadowRoot!.querySelectorAll("button");
      const hslBtn = Array.from(buttons).find(
        (b: HTMLElement) => b.textContent!.trim() === "HSL Wheel",
      ) as HTMLElement;
      hslBtn.click();
      await el.updateComplete;

      // Switch back to HSV
      const hsvBtn = Array.from(buttons).find(
        (b: HTMLElement) => b.textContent!.trim() === "HSV",
      ) as HTMLElement;
      hsvBtn.click();
      await el.updateComplete;

      expect(
        el.shadowRoot!.querySelector("color-selection-hsv"),
      ).not.toBeNull();
      expect(el.shadowRoot!.querySelector("color-selection-hsl")).toBeNull();
      document.body.removeChild(el);
    });
  });

  // -----------------------------------------------------------------------
  // 6. Active / inactive button visual state
  // -----------------------------------------------------------------------
  describe("button classes", () => {
    it("HSV button has white background class when active (default)", async () => {
      const el = document.createElement("color-selection") as any;
      document.body.appendChild(el);
      await el.updateComplete;

      const buttons = el.shadowRoot!.querySelectorAll("button");
      const hsvBtn = Array.from(buttons).find(
        (b: HTMLElement) => b.textContent!.trim() === "HSV",
      ) as HTMLElement;
      expect(hsvBtn.classList.contains("bg-white")).toBe(true);
      document.body.removeChild(el);
    });

    it("HSV button has slate-300 text class when inactive (HSL active)", async () => {
      const el = document.createElement("color-selection") as any;
      document.body.appendChild(el);
      await el.updateComplete;

      const buttons = el.shadowRoot!.querySelectorAll("button");
      const hslBtn = Array.from(buttons).find(
        (b: HTMLElement) => b.textContent!.trim() === "HSL Wheel",
      ) as HTMLElement;
      hslBtn.click();
      await el.updateComplete;

      const hsvBtn = Array.from(buttons).find(
        (b: HTMLElement) => b.textContent!.trim() === "HSV",
      ) as HTMLElement;
      expect(hsvBtn.classList.contains("text-slate-300")).toBe(true);
      document.body.removeChild(el);
    });

    it("HSL Wheel button has slate-300 text class when inactive (HSV active)", async () => {
      const el = document.createElement("color-selection") as any;
      document.body.appendChild(el);
      await el.updateComplete;

      const buttons = el.shadowRoot!.querySelectorAll("button");
      const hslBtn = Array.from(buttons).find(
        (b: HTMLElement) => b.textContent!.trim() === "HSL Wheel",
      ) as HTMLElement;
      expect(hslBtn.classList.contains("text-slate-300")).toBe(true);
      document.body.removeChild(el);
    });

    it("HSL Wheel button has white background class when active", async () => {
      const el = document.createElement("color-selection") as any;
      document.body.appendChild(el);
      await el.updateComplete;

      const buttons = el.shadowRoot!.querySelectorAll("button");
      const hslBtn = Array.from(buttons).find(
        (b: HTMLElement) => b.textContent!.trim() === "HSL Wheel",
      ) as HTMLElement;
      hslBtn.click();
      await el.updateComplete;

      expect(hslBtn.classList.contains("bg-white")).toBe(true);
      document.body.removeChild(el);
    });
  });

  // -----------------------------------------------------------------------
  // 7. Color property propagation to active child component
  // -----------------------------------------------------------------------
  describe("color property propagation", () => {
    it("passes the default color to <color-selection-hsv>", async () => {
      const el = document.createElement("color-selection") as any;
      document.body.appendChild(el);
      await el.updateComplete;

      const hsv = el.shadowRoot!.querySelector("color-selection-hsv") as any;
      expect(hsv.color).toBe(el.color);
      expect(hsv.color).toEqual(new Color());
      document.body.removeChild(el);
    });

    it("forwards an updated color to <color-selection-hsv>", async () => {
      const el = document.createElement("color-selection") as any;
      document.body.appendChild(el);
      await el.updateComplete;

      const red = rgb(255, 0, 0);
      el.color = red;
      await el.updateComplete;

      const hsv = el.shadowRoot!.querySelector("color-selection-hsv") as any;
      expect(hsv.color).toBe(red);
      document.body.removeChild(el);
    });

    it("forwards an updated color to <color-selection-hsl> when switching modes", async () => {
      const el = document.createElement("color-selection") as any;
      document.body.appendChild(el);
      await el.updateComplete;

      const blue = rgb(0, 0, 255);
      el.color = blue;
      await el.updateComplete;

      // Switch to HSL mode
      const buttons = el.shadowRoot!.querySelectorAll("button");
      const hslBtn = Array.from(buttons).find(
        (b: HTMLElement) => b.textContent!.trim() === "HSL Wheel",
      ) as HTMLElement;
      hslBtn.click();
      await el.updateComplete;

      const hsl = el.shadowRoot!.querySelector("color-selection-hsl") as any;
      expect(hsl.color).toBe(blue);
      document.body.removeChild(el);
    });
  });
});
