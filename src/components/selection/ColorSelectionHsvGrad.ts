import { css, html, LitElement } from "lit";
import { customElement, property, query } from "lit/decorators.js";

import { clamp } from "../../lib/utils/math";
import { Color, ColorInputType } from "../../lib/Color";
import { styles } from "../../styles/ColorSelectionTypeA.css";
import { ColorPickerSetColorEvent } from "../../events/ColorPickerSetColorEvent";
import { ColorPickerCommitColorEvent } from "../../events/ColorPickerCommitColorEvent";
import { DragController } from "../../controllers/DragController";
import "./ColorSelectionHsvBar";

@customElement("color-selection-hsv-grad")
export class ColorSelectionHsvGrad extends LitElement {
  static styles = [
    styles,
    css`
      :host {
        display: flex;
        flex-direction: column;
        width: 100%;
        flex: 1;
      }
    `,
  ];

  @property({ attribute: false })
  color: Color = new Color();

  @query("#color-grad-container")
  colorGradContainer!: HTMLDivElement;

  private lastCommittedColor: Color = this.color;

  private drag = new DragController(this, {
    onDrag: (e: MouseEvent) => {
      const [hue] = this.color.getHSV();
      const rect = this.colorGradContainer.getBoundingClientRect();
      const x = clamp((e.clientX - rect.left) / rect.width, 0, 1);
      const y = clamp((e.clientY - rect.top) / rect.height, 0, 1);
      const newSaturation = x * 100;
      const newValue = (1 - y) * 100;
      this.setColor(
        new Color({
          type: ColorInputType.HSV,
          h: hue,
          s: newSaturation,
          v: newValue,
        }),
      );
    },
    onDragEnd: () => {
      this.commitColor();
    },
  });

  setColor(color: Color) {
    this.lastCommittedColor = color;
    this.dispatchEvent(new ColorPickerSetColorEvent(color));
  }

  commitColor() {
    this.dispatchEvent(new ColorPickerCommitColorEvent(this.lastCommittedColor));
  }

  render() {
    const [hue, saturation, value] = this.color.getHSV();
    const hueColorHex =
      "#" +
      new Color({
        type: ColorInputType.HSV,
        h: hue,
        s: 100,
        v: 100,
      }).getHex();
    const colorGradStyleBackground = `linear-gradient(to right, #FFF 0%, ${hueColorHex} 100%)`;
    const colorCircleStyle = `
      top: ${(1.0 - value / 100) * 100}%;
      left: ${(saturation / 100) * 100}%;
      background-color: #${this.color.getHex()};
      border-color: ${value < 50 ? "white" : "black"};
    `;
    return html`
      <div class="color-grad-container" id="color-grad-container">
        <div
          class="color-grad color-grad-1"
          style="background: ${colorGradStyleBackground};"
        ></div>
        <div
          class="color-grad color-grad-2"
          @mousedown=${this.drag.handleMouseDown}
        ></div>
        <div class="color-grad-circle" style=${colorCircleStyle}></div>
      </div>
    `;
  }
}

