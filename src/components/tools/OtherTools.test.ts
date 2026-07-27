import { describe, it, expect } from "vitest";
import "./OtherTools";
import { OtherTools } from "./OtherTools";

// ---------------------------------------------------------------------------
// OtherTools (<other-tools>)
// ---------------------------------------------------------------------------

describe("OtherTools", () => {
  // -----------------------------------------------------------------------
  // 1. Custom element registration
  // -----------------------------------------------------------------------
  describe("custom element", () => {
    it('is defined as "other-tools"', () => {
      const el = document.createElement("other-tools");
      expect(el).toBeInstanceOf(HTMLElement);
    });

    it("is registered in the custom elements registry", () => {
      expect(customElements.get("other-tools")).toBeDefined();
    });
  });

  // -----------------------------------------------------------------------
  // 2. Rendered template
  // -----------------------------------------------------------------------
  describe("rendered template", () => {
    it("renders an h5 heading", async () => {
      const el = document.createElement("other-tools");
      document.body.appendChild(el);
      await (el as OtherTools).updateComplete;

      const heading = el.shadowRoot!.querySelector("h5");
      expect(heading).not.toBeNull();
      expect(heading!.textContent).toBe("Other Tools");

      document.body.removeChild(el);
    });

    it("renders a list container (ul)", async () => {
      const el = document.createElement("other-tools");
      document.body.appendChild(el);
      await (el as OtherTools).updateComplete;

      const list = el.shadowRoot!.querySelector("ul");
      expect(list).not.toBeNull();
      expect(list!.classList.contains("list-disc")).toBe(true);

      document.body.removeChild(el);
    });
  });

  // -----------------------------------------------------------------------
  // 3. Children passed via DOM
  // -----------------------------------------------------------------------
  describe("children rendering", () => {
    it("renders anchor children as list items", async () => {
      const el = document.createElement("other-tools");
      document.body.appendChild(el);

      // Add anchor elements as light DOM children
      const link1 = document.createElement("a");
      link1.href = "https://example.com";
      link1.textContent = "Example";
      el.appendChild(link1);

      const link2 = document.createElement("a");
      link2.href = "https://test.com";
      link2.textContent = "Test Site";
      link2.target = "_self";
      el.appendChild(link2);

      await (el as OtherTools).updateComplete;

      const items = el.shadowRoot!.querySelectorAll("li");
      // Two anchor children → two list items
      expect(items.length).toBe(2);

      // First item's anchor
      const renderedLinks = el.shadowRoot!.querySelectorAll("a");
      expect(renderedLinks.length).toBe(2);
      expect(renderedLinks[0].textContent!.trim()).toBe("Example");
      expect(renderedLinks[0].getAttribute("href")).toBe(
        "https://example.com/",
      );
      // Default target should be _blank
      expect(renderedLinks[0].getAttribute("target")).toBe("_blank");

      // Second item's anchor
      expect(renderedLinks[1].textContent!.trim()).toBe("Test Site");
      expect(renderedLinks[1].getAttribute("href")).toBe("https://test.com/");
      // Explicit target should be preserved
      expect(renderedLinks[1].getAttribute("target")).toBe("_self");

      document.body.removeChild(el);
    });

    it("ignores non-anchor children", async () => {
      const el = document.createElement("other-tools");
      document.body.appendChild(el);

      // Add a mix of anchor and non-anchor children
      const link = document.createElement("a");
      link.href = "https://example.com";
      link.textContent = "Example";
      el.appendChild(link);

      const div = document.createElement("div");
      div.textContent = "Not a link";
      el.appendChild(div);

      const span = document.createElement("span");
      span.textContent = "Also not a link";
      el.appendChild(span);

      await (el as OtherTools).updateComplete;

      // Only the anchor should produce a list item
      const items = el.shadowRoot!.querySelectorAll("li");
      expect(items.length).toBe(1);
      expect(items[0].textContent!.trim()).toBe("Example");

      document.body.removeChild(el);
    });

    it("renders nothing when there are no anchor children", async () => {
      const el = document.createElement("other-tools");
      document.body.appendChild(el);

      await (el as OtherTools).updateComplete;

      const items = el.shadowRoot!.querySelectorAll("li");
      expect(items.length).toBe(0);

      document.body.removeChild(el);
    });
  });
});
