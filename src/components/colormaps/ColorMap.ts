import { html, LitElement } from "lit";
import { customElement, property, query } from "lit/decorators.js";

import { tailwindStyles } from "../../styles/Tailwind";
import { Color, ColorInputType } from "../../lib/Color";
import { ColorPickerSetColorEvent } from "../../events/ColorPickerSetColorEvent";
import { clamp } from "../../lib/utils/math";
import { lerpColor } from "../../lib/ColorLerp";
import { DragController } from "../../controllers/DragController";
import "../selection/ColorBarPointer";

@customElement("color-map")
export class ColorMap extends LitElement {
  static styles = [tailwindStyles];

  @property({ attribute: false })
  color: Color = new Color();

  @property({ attribute: false })
  data: number[][] = [[0, 0, 0]];

  @property()
  name: string = "Color Map";

  @query("#colormap-div")
  private colorMapDiv!: HTMLDivElement;

  setColor(color: Color) {
    this.dispatchEvent(new ColorPickerSetColorEvent(color));
  }

  toCss() {
    const colormapData = this.data;
    const rgba_strings = [];
    for (let i = 0; i < 256; i++) {
      rgba_strings.push(
        `rgba(${Math.round(colormapData[i][0] * 255)}, ${Math.round(
          colormapData[i][1] * 255
        )}, ${Math.round(colormapData[i][2] * 255)}, 255) ${(100 * i) / 255}%`
      );
    }
    return `linear-gradient(to right, ${rgba_strings.join(", ")})`;
  }

  getColorAt(x: number) {
    const colormapData = this.data;
    const indexFloor = Math.floor(
      clamp(x * colormapData.length, 0, colormapData.length - 1)
    );
    const indexCeil = Math.ceil(
      clamp(x * colormapData.length, 0, colormapData.length - 1)
    );
    const ratio = x * colormapData.length - indexFloor;
    const colorFloor = new Color({
      type: ColorInputType.RGB01,
      r: colormapData[indexFloor][0],
      g: colormapData[indexFloor][1],
      b: colormapData[indexFloor][2],
    });
    const colorCeil = new Color({
      type: ColorInputType.RGB01,
      r: colormapData[indexCeil][0],
      g: colormapData[indexCeil][1],
      b: colormapData[indexCeil][2],
    });
    return lerpColor(colorFloor, colorCeil, ratio);
  }

  findClosestColormapPoint(targetColor: Color) {
    const targetRgb = targetColor.getRGB255();
    const data = this.data;
    let minDistance = Infinity;
    let closestIndex = 0;

    for (let i = 0; i < data.length; i++) {
      const r = Math.round(data[i][0] * 255);
      const g = Math.round(data[i][1] * 255);
      const b = Math.round(data[i][2] * 255);

      const dr = targetRgb[0] - r;
      const dg = targetRgb[1] - g;
      const db = targetRgb[2] - b;
      const dist = Math.sqrt(dr * dr + dg * dg + db * db);

      if (dist < minDistance) {
        minDistance = dist;
        closestIndex = i;
      }
    }

    return {
      index: closestIndex,
      distance: minDistance,
      ratio: data.length > 1 ? closestIndex / (data.length - 1) : 0,
    };
  }

  private processColorAt = (e: MouseEvent) => {
    const rect = this.colorMapDiv.getBoundingClientRect();
    const x = clamp((e.clientX - rect.left) / rect.width, 0, 1);
    const newColor = this.getColorAt(x);
    this.setColor(newColor);
  };

  private drag = new DragController(this, {
    onDragStart: this.processColorAt,
    onDrag: this.processColorAt,
  });

  render() {
    const match = this.findClosestColormapPoint(this.color);
    const isVeryClose = match.distance <= 30; // Threshold for close color match in 0-255 RGB space

    return html`
      <div class="flex flex-col gap-1">
        <span class="text-xs font-semibold text-gray-700 text-center">${this.name}</span>
        <div
          style="background: ${this.toCss()}"
          class="w-full h-8 rounded relative cursor-crosshair"
          @mousedown=${this.drag.handleMouseDown}
          id="colormap-div"
        >
          ${isVeryClose
            ? html`<color-bar-pointer
                .position=${match.ratio * 100}
                .color=${"#" + this.color.getHex()}
              ></color-bar-pointer>`
            : ""}
        </div>
      </div>
    `;
  }
}
