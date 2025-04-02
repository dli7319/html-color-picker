import { html, css, LitElement } from "lit";
import { query } from "lit/decorators.js";

import { Color, ColorInputType } from "./lib/Color";
import { ColorPickerSetColorEvent } from "./events/ColorPickerSetColorEvent";
import { clamp } from "./lib/utils/math";

export class ColorMap extends LitElement {
  static styles = [
    css`
      tr {
        display: flex;
        width: 100%;
      }

      td {
        flex: 1;
      }

      .gradient {
        width: 100%;
        height: 30px;
      }
    `,
  ];

  @query("#colormap-div")
  private colorMapDiv!: HTMLDivElement;

  private onMouseMoveBound = this.onMouseMove.bind(this);
  private onMouseUpBound = this.onMouseUp.bind(this);

  getColorMapData(): number[][] {
    // This method should be overridden by subclasses to provide the actual color map data.
    return [[0, 0, 0]];
  }

  getColorMapName() {
    // This method should be overridden by subclasses to provide the actual color map name.
    return "Color Map";
  }

  setColor(color: Color) {
    this.dispatchEvent(new ColorPickerSetColorEvent(color));
  }

  toCss() {
    const colormapData = this.getColorMapData();
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
    const colormapData = this.getColorMapData();
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
    return Color.lerp(colorFloor, colorCeil, ratio);
  }

  onMouseMove(event: MouseEvent) {
    if (event.buttons == 1) {
      const rect = this.colorMapDiv.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width;
      const newColor = this.getColorAt(x);
      this.setColor(newColor);
    }
  }

  onMouseDown() {
    document.addEventListener("mousemove", this.onMouseMoveBound);
    document.addEventListener("mouseup", this.onMouseUpBound);
  }

  onMouseUp() {
    document.removeEventListener("mousemove", this.onMouseMoveBound);
    document.removeEventListener("mouseup", this.onMouseUpBound);
  }

  render() {
    return html` <div>
      <th>${this.getColorMapName()}</th>
      <td>
        <div
          style="background: ${this.toCss()}"
          class="gradient"
          @mousedown=${this.onMouseDown.bind(this)}
          id="colormap-div"
        ></div>
      </td>
    </div>`;
  }
}
