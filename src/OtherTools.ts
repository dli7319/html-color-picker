import { html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";
import { bootstrap } from "./styles/Bootstrap";

import "./OtherToolsEntry";
import { OtherToolsEntry } from "./OtherToolsEntry";

@customElement("other-tools")
export class OtherTools extends LitElement {
  render() {
    return html` ${bootstrap}
      <h5>Other Tools</h5>
      <ul>
        ${Array.prototype.map.call(this.children, (child) => {
          if (child instanceof OtherToolsEntry) {
            return html`<li>
              <a href="${child.href}" target="_blank">${child.name}</a>
            </li>`;
          }
        })}
      </ul>`;
  }
}
