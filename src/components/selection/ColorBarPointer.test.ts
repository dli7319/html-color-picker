import { describe, it, expect } from "vitest";
import type { CSSResult } from "lit";
import { ColorBarPointer } from "./ColorBarPointer";

function getCssText(): string {
  const styles = ColorBarPointer.styles;
  if (Array.isArray(styles)) {
    return styles.map((s) => (s as CSSResult).toString()).join(" ");
  }
  return (styles as CSSResult).toString();
}

// ---------------------------------------------------------------------------
// ColorBarPointer (<color-bar-pointer>)
// ---------------------------------------------------------------------------
describe("ColorBarPointer", () => {
  // -----------------------------------------------------------------------
  // 1. Custom element registration
  // -----------------------------------------------------------------------
  describe("custom element", () => {
    it('is defined as "color-bar-pointer"', () => {
      const el = document.createElement("color-bar-pointer");
      expect(el).toBeInstanceOf(HTMLElement);
    });

    it("is registered in the custom elements registry", () => {
      expect(customElements.get("color-bar-pointer")).toBeDefined();
    });
  });

  // -----------------------------------------------------------------------
  // 2. Default property values
  // -----------------------------------------------------------------------
  describe("default properties", () => {
    it("has a default position of 0", async () => {
      const el = document.createElement("color-bar-pointer") as ColorBarPointer;
      document.body.appendChild(el);
      await el.updateComplete;
      expect(el.position).toBe(0);
      document.body.removeChild(el);
    });

    it('has a default color of "#ffffff"', async () => {
      const el = document.createElement("color-bar-pointer") as ColorBarPointer;
      document.body.appendChild(el);
      await el.updateComplete;
      expect(el.color).toBe("#ffffff");
      document.body.removeChild(el);
    });
  });

  // -----------------------------------------------------------------------
  // 3. Setting position updates the host element's left style
  // -----------------------------------------------------------------------
  describe("position property", () => {
    it("updates the host left style when position is set", async () => {
      const el = document.createElement("color-bar-pointer") as ColorBarPointer;
      document.body.appendChild(el);
      await el.updateComplete;

      el.position = 42;
      await el.updateComplete;

      expect(el.style.left).toBe("42%");
      document.body.removeChild(el);
    });

    it("can be set to 0", async () => {
      const el = document.createElement("color-bar-pointer") as ColorBarPointer;
      el.position = 0;
      document.body.appendChild(el);
      await el.updateComplete;

      expect(el.style.left).toBe("0%");
      document.body.removeChild(el);
    });

    it("can be set to 100", async () => {
      const el = document.createElement("color-bar-pointer") as ColorBarPointer;
      el.position = 100;
      document.body.appendChild(el);
      await el.updateComplete;

      expect(el.style.left).toBe("100%");
      document.body.removeChild(el);
    });
  });

  // -----------------------------------------------------------------------
  // 4. Setting color updates the capsule's background-color
  // -----------------------------------------------------------------------
  describe("color property", () => {
    it("updates the capsule background-color when color is set", async () => {
      const el = document.createElement("color-bar-pointer") as ColorBarPointer;
      document.body.appendChild(el);
      await el.updateComplete;

      el.color = "#00FF00";
      await el.updateComplete;

      const capsule = el.shadowRoot!.querySelector(
        ".color-bar-pointer-capsule",
      ) as HTMLElement;
      expect(capsule.style.backgroundColor).toBe("rgb(0, 255, 0)");
      document.body.removeChild(el);
    });

    it("accepts different color values", async () => {
      const el = document.createElement("color-bar-pointer") as ColorBarPointer;
      document.body.appendChild(el);
      await el.updateComplete;

      el.color = "#0000FF";
      await el.updateComplete;

      const capsule = el.shadowRoot!.querySelector(
        ".color-bar-pointer-capsule",
      ) as HTMLElement;
      expect(capsule.style.backgroundColor).toBe("rgb(0, 0, 255)");
      document.body.removeChild(el);
    });
  });

  // -----------------------------------------------------------------------
  // 5. Renders the capsule in shadow DOM
  // -----------------------------------------------------------------------
  describe("rendering", () => {
    it("renders a div with class color-bar-pointer-capsule in shadow DOM", async () => {
      const el = document.createElement("color-bar-pointer") as ColorBarPointer;
      document.body.appendChild(el);
      await el.updateComplete;

      const capsule = el.shadowRoot!.querySelector(
        ".color-bar-pointer-capsule",
      );
      expect(capsule).not.toBeNull();
      expect(capsule!.tagName).toBe("DIV");
      document.body.removeChild(el);
    });

    it("renders exactly one capsule element", async () => {
      const el = document.createElement("color-bar-pointer") as ColorBarPointer;
      document.body.appendChild(el);
      await el.updateComplete;

      const capsules = el.shadowRoot!.querySelectorAll(
        ".color-bar-pointer-capsule",
      );
      expect(capsules.length).toBe(1);
      document.body.removeChild(el);
    });
  });

  // -----------------------------------------------------------------------
  // 6. Capsule has correct border and shadow styles
  // -----------------------------------------------------------------------
  describe("capsule styles", () => {
    it("has a 2px solid white border defined in static styles", () => {
      expect(getCssText()).toContain("2px solid #ffffff");
    });

    it("has a box-shadow defined in static styles", () => {
      expect(getCssText()).toContain("box-shadow");
    });

    it("has border-radius of 9999px defined in static styles", () => {
      expect(getCssText()).toContain("border-radius: 9999px");
    });
  });
});
