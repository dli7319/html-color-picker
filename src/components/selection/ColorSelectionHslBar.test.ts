import { describe, it, expect } from "vitest";
import { Color, ColorInputType } from "../../lib/Color";
import "./ColorSelectionHslBar";

function createElement(
  color?: Color,
): HTMLElement & { color: Color; updateComplete: Promise<void> } {
  const el = document.createElement("color-selection-hsl-bar") as any;
  if (color) {
    el.color = color;
  }
  document.body.appendChild(el);
  return el;
}

describe("ColorSelectionHslBar", () => {
  it("is registered as a custom element", () => {
    expect(customElements.get("color-selection-hsl-bar")).toBeDefined();
  });

  it("renders a .color-bar div with gradient background", async () => {
    const color = new Color({ type: ColorInputType.HSL, h: 180, s: 50, l: 50 });
    const el = createElement(color);
    await el.updateComplete;

    const colorBar = el.shadowRoot!.querySelector(".color-bar") as HTMLElement;
    expect(colorBar).not.toBeNull();

    const style = colorBar.getAttribute("style") || colorBar.style.cssText;
    expect(style).toContain("linear-gradient");
    expect(style).toContain("hsl(180deg, 50%");
    expect(style).toContain("0%) 0%");
    expect(style).toContain("100%) 100%");
  });

  it("contains a <color-bar-pointer> child", async () => {
    const el = createElement();
    await el.updateComplete;

    const pointer = el.shadowRoot!.querySelector("color-bar-pointer");
    expect(pointer).not.toBeNull();
  });

  it("sets pointer position to current lightness", async () => {
    const color = new Color({ type: ColorInputType.HSL, h: 0, s: 100, l: 75 });
    const el = createElement(color);
    await el.updateComplete;

    const pointer = el.shadowRoot!.querySelector("color-bar-pointer") as any;
    expect(pointer.position).toBe(75);
  });

  it("sets pointer color to current color hex", async () => {
    const color = new Color({ type: ColorInputType.HSL, h: 0, s: 100, l: 50 });
    const el = createElement(color);
    await el.updateComplete;

    const pointer = el.shadowRoot!.querySelector("color-bar-pointer") as any;
    expect(pointer.color).toBe("#" + color.getHex());
  });

  it("updates pointer when color changes", async () => {
    const el = createElement();
    await el.updateComplete;

    const color = new Color({ type: ColorInputType.HSL, h: 120, s: 50, l: 25 });
    el.color = color;
    await el.updateComplete;

    const pointer = el.shadowRoot!.querySelector("color-bar-pointer") as any;
    expect(pointer.position).toBe(25);
    expect(pointer.color).toBe("#" + color.getHex());
  });
});
