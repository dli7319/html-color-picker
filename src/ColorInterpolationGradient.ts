import { LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("color-interpolation-gradient")
export class ColorInterpolationGradient extends LitElement {
    @property()
    typeName: string = "";
    @property()
    type: string = "RGB";
}