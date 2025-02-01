import { html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";
import { bootstrap } from "./styles/Bootstrap";

import other_tools from "./other_tools.json";
import { componentStyle } from "./styles/Common";

@customElement("other-tools")
export class OtherTools extends LitElement {
  static styles = [componentStyle];

  render() {
    return html` ${bootstrap}
      <h5>Other Tools</h5>
      <ul>
        ${Object.entries(other_tools).map(
          ([key, value]) =>
            html`<li key=${key}>
              <a href=${value} target="_blank">${key}</a>
            </li>`
        )}
      </ul>`;
  }
}
