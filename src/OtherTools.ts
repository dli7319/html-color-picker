import { html, css, LitElement, unsafeCSS } from "lit";
import { customElement } from "lit/decorators.js";
import bootstrapcss from 'bootstrap/dist/css/bootstrap.min.css?raw';

import other_tools from "./other_tools.json";
import { componentStyle } from "./styles/Common";

@customElement("other-tools")
export class OtherTools extends LitElement {
  static styles = [componentStyle, css`${unsafeCSS(bootstrapcss)}`];

  render() {
    return html`
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
