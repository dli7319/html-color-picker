import { describe, it, expect, vi } from "vitest";
import { Color, ColorInputType } from "../../lib/Color";
import "./ColorSelectionHslBar";
import type { ColorSelectionHslBar } from "./ColorSelectionHslBar";
import { ColorPickerSetColorEvent } from "../../events/ColorPickerSetColorEvent";
import { ColorPickerCommitColorEvent } from "../../events/ColorPickerCommitColorEvent";

function createElement(color?: Color): ColorSelectionHslBar {
  const el = document.createElement(
    "color-selection-hsl-bar",
  ) as ColorSelectionHslBar;
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

    const pointer = el.shadowRoot!.querySelector(
      "color-bar-pointer",
    ) as unknown as { position: number };
    expect(pointer.position).toBe(75);
  });

  it("sets pointer color to current color hex", async () => {
    const color = new Color({ type: ColorInputType.HSL, h: 0, s: 100, l: 50 });
    const el = createElement(color);
    await el.updateComplete;

    const pointer = el.shadowRoot!.querySelector(
      "color-bar-pointer",
    ) as unknown as { color: string };
    expect(pointer.color).toBe("#" + color.getHex());
  });

  it("updates pointer when color changes", async () => {
    const el = createElement();
    await el.updateComplete;

    const color = new Color({ type: ColorInputType.HSL, h: 120, s: 50, l: 25 });
    el.color = color;
    await el.updateComplete;

    const pointer = el.shadowRoot!.querySelector(
      "color-bar-pointer",
    ) as unknown as { position: number; color: string };
    expect(pointer.position).toBe(25);
    expect(pointer.color).toBe("#" + color.getHex());
  });

  it("dragging on the bar updates lightness while preserving hue/saturation", async () => {
    const color = new Color({
      type: ColorInputType.HSL,
      h: 180,
      s: 50,
      l: 50,
    });
    const el = createElement(color);
    await el.updateComplete;

    const colorBar = el.shadowRoot!.querySelector(".color-bar") as HTMLElement;
    const bcrSpy = vi
      .spyOn(colorBar, "getBoundingClientRect")
      .mockReturnValue(new DOMRect(0, 0, 200, 20));

    const setEvent = await new Promise<ColorPickerSetColorEvent>(
      (resolve) => {
        el.addEventListener(
          "set-color",
          (e: Event) => resolve(e as ColorPickerSetColorEvent),
          { once: true },
        );
        colorBar.dispatchEvent(
          new MouseEvent("mousedown", { bubbles: true, clientX: 100 }),
        );
        document.dispatchEvent(
          new MouseEvent("mousemove", { bubbles: true, clientX: 150 }),
        );
      },
    );

    const [hue, sat, light] = setEvent.color.getHSL();
    expect(light).toBeCloseTo(75);
    expect(hue).toBe(180);
    expect(sat).toBe(50);

    document.dispatchEvent(new MouseEvent("mouseup"));
    bcrSpy.mockRestore();
    el.parentNode?.removeChild(el);
  });

  it("drag end commits the color", async () => {
    const el = createElement();
    await el.updateComplete;

    const colorBar = el.shadowRoot!.querySelector(".color-bar") as HTMLElement;

    const commitEvent = await new Promise<Event>((resolve) => {
      el.addEventListener("commit-color", resolve, { once: true });
      colorBar.dispatchEvent(
        new MouseEvent("mousedown", { bubbles: true, clientX: 50 }),
      );
      document.dispatchEvent(new MouseEvent("mouseup"));
    });

    expect(commitEvent).toBeInstanceOf(ColorPickerCommitColorEvent);
    el.parentNode?.removeChild(el);
  });
});
