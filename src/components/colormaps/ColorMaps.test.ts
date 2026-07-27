import { describe, it, expect } from "vitest";
import { Color, ColorInputType } from "../../lib/Color";
import {
  turboColorMapData,
  turboColorMapName,
} from "../../colormap-data/turbo";
import "./ColorMaps";
import "./ColorMap";
import type { ColorMaps } from "./ColorMaps";
import type { ColorMap } from "./ColorMap";

// ---------------------------------------------------------------------------
// ColorMaps (<color-maps>)
// ---------------------------------------------------------------------------
describe("ColorMaps", () => {
  // -----------------------------------------------------------------------
  // 1. Custom element registration
  // -----------------------------------------------------------------------
  describe("custom element", () => {
    it('is defined as "color-maps"', () => {
      const el = document.createElement("color-maps");
      expect(el).toBeInstanceOf(HTMLElement);
    });

    it("is registered in the custom elements registry", () => {
      expect(customElements.get("color-maps")).toBeDefined();
    });
  });

  // -----------------------------------------------------------------------
  // 2. Renders heading
  // -----------------------------------------------------------------------
  describe("heading", () => {
    it('renders an h5 with text "Color Maps"', async () => {
      const el = document.createElement("color-maps");
      document.body.appendChild(el);
      await el.updateComplete;

      const heading = el.shadowRoot!.querySelector("h5");
      expect(heading).not.toBeNull();
      expect(heading!.textContent).toBe("Color Maps");

      document.body.removeChild(el);
    });
  });

  // -----------------------------------------------------------------------
  // 3. Renders a <color-map> child
  // -----------------------------------------------------------------------
  describe("color-map child", () => {
    it("renders a <color-map> element in its shadow DOM", async () => {
      const el = document.createElement("color-maps");
      document.body.appendChild(el);
      await el.updateComplete;

      const colorMap = el.shadowRoot!.querySelector("color-map");
      expect(colorMap).not.toBeNull();

      document.body.removeChild(el);
    });

    it("renders exactly one <color-map> child", async () => {
      const el = document.createElement("color-maps");
      document.body.appendChild(el);
      await el.updateComplete;

      const colorMaps = el.shadowRoot!.querySelectorAll("color-map");
      expect(colorMaps.length).toBe(1);

      document.body.removeChild(el);
    });
  });

  // -----------------------------------------------------------------------
  // 4. <color-map> receives turbo colormap data and name
  // -----------------------------------------------------------------------
  describe("colormap data propagation", () => {
    it("passes the turbo colormap name to <color-map>", async () => {
      const el = document.createElement("color-maps") as ColorMaps;
      document.body.appendChild(el);
      await el.updateComplete;

      const colorMap = el.shadowRoot!.querySelector("color-map") as ColorMap;
      expect(colorMap.name).toBe(turboColorMapName);

      document.body.removeChild(el);
    });

    it("passes the turbo colormap data to <color-map>", async () => {
      const el = document.createElement("color-maps") as ColorMaps;
      document.body.appendChild(el);
      await el.updateComplete;

      const colorMap = el.shadowRoot!.querySelector("color-map") as ColorMap;
      expect(colorMap.data).toBe(turboColorMapData);
      expect(colorMap.data).toEqual(turboColorMapData);

      document.body.removeChild(el);
    });
  });

  // -----------------------------------------------------------------------
  // 5. Color property propagates to <color-map> child
  // -----------------------------------------------------------------------
  describe("color property propagation", () => {
    it("passes the default color to <color-map>", async () => {
      const el = document.createElement("color-maps") as ColorMaps;
      document.body.appendChild(el);
      await el.updateComplete;

      const colorMap = el.shadowRoot!.querySelector("color-map") as ColorMap;
      expect(colorMap.color).toBe(el.color);
      expect(colorMap.color).toEqual(new Color());

      document.body.removeChild(el);
    });

    it("forwards an updated color to <color-map>", async () => {
      const el = document.createElement("color-maps") as ColorMaps;
      document.body.appendChild(el);
      await el.updateComplete;

      const blue = new Color({
        type: ColorInputType.RGB255,
        r: 0,
        g: 0,
        b: 255,
      });
      el.color = blue;
      await el.updateComplete;

      const colorMap = el.shadowRoot!.querySelector("color-map") as ColorMap;
      expect(colorMap.color).toBe(blue);

      document.body.removeChild(el);
    });

    it("the <color-map> shares the same color object reference as the host", async () => {
      const el = document.createElement("color-maps") as ColorMaps;
      document.body.appendChild(el);
      await el.updateComplete;

      const colorMap = el.shadowRoot!.querySelector("color-map") as ColorMap;
      expect(colorMap.color).toBe(el.color);

      document.body.removeChild(el);
    });
  });

  // -----------------------------------------------------------------------
  // 6. Default color property
  // -----------------------------------------------------------------------
  describe("default color", () => {
    it("has a default color of black (new Color())", async () => {
      const el = document.createElement("color-maps") as ColorMaps;
      document.body.appendChild(el);
      await el.updateComplete;
      expect(el.color).toEqual(new Color());
      document.body.removeChild(el);
    });
  });
});
