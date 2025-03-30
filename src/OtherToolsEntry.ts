import { LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("other-tools-entry")
export class OtherToolsEntry extends LitElement {
  @property()
  name: string = "";
  @property()
  href: string = "";
}
