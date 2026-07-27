import { html, LitElement } from "lit";
import { customElement, property, state } from "lit/decorators.js";

import { Color, ColorInputType } from "../../lib/Color";
import { generatePalette, PaletteMode } from "../../lib/PaletteGenerator";
import { ColorPickerSetColorEvent } from "../../events/ColorPickerSetColorEvent";
import { ColorPickerSetPaletteActiveEvent } from "../../events/ColorPickerSetPaletteActiveEvent";
import { styles } from "../../styles/ColorPalette.css";
import { tailwindStyles } from "../../styles/Tailwind";

const STORAGE_KEY = "color-palette-store";
const PALETTE_COUNT = 5;
const NARROW_BREAKPOINT = 448;

interface StoredPalette {
  colors: { hex: string }[];
  locked: boolean[];
  mode: string;
}

@customElement("color-palette")
export class ColorPalette extends LitElement {
  static styles = [tailwindStyles, styles];

  @property({ attribute: false })
  activeEditingColor: Color = new Color();

  @state()
  private colors: Color[] = [];

  @state()
  private locked: boolean[] = Array(PALETTE_COUNT).fill(false);

  @state()
  private activeIndex: number = -1;

  @state()
  private paletteMode: PaletteMode = PaletteMode.ANY;

  @state()
  private narrow: boolean = false;

  private prevEditingColor: Color | null = null;
  private resizeObserver: ResizeObserver | null = null;

  constructor() {
    super();
    const stored = this.loadFromStorage();
    if (stored) {
      this.colors = stored.colors;
      this.locked = stored.locked;
      this.paletteMode = stored.mode;
    } else {
      this.colors = generatePalette({ count: PALETTE_COUNT });
    }
  }

  connectedCallback() {
    super.connectedCallback();
    window.addEventListener("keydown", this.handleSpacebar);
    this.resizeObserver = new ResizeObserver((entries) => {
      const width = entries[0]?.contentRect.width ?? 0;
      this.narrow = width < NARROW_BREAKPOINT;
    });
    this.resizeObserver.observe(this);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener("keydown", this.handleSpacebar);
    this.resizeObserver?.disconnect();
  }

  updated() {
    if (
      this.activeIndex >= 0 &&
      this.activeEditingColor !== this.prevEditingColor &&
      this.colors[this.activeIndex] !== this.activeEditingColor
    ) {
      this.colors[this.activeIndex] = this.activeEditingColor;
      this.colors = [...this.colors];
      this.saveToStorage();
    }
    this.prevEditingColor = this.activeEditingColor;
  }

  private handleSpacebar = (e: KeyboardEvent) => {
    const tag = (e.target as HTMLElement).tagName;
    if (e.code === "Space" && tag !== "INPUT" && tag !== "TEXTAREA") {
      e.preventDefault();
      this.regenerate();
    }
  };

  private regenerate() {
    this.colors = generatePalette(
      { count: PALETTE_COUNT, mode: this.paletteMode },
      this.locked,
      this.colors,
    );
    this.saveToStorage();
    if (this.activeIndex >= 0) {
      this.dispatchEvent(
        new ColorPickerSetColorEvent(this.colors[this.activeIndex]),
      );
    }
  }

  private selectSwatch(index: number) {
    this.activeIndex = index;
    this.dispatchEvent(new ColorPickerSetColorEvent(this.colors[index]));
    this.dispatchEvent(new ColorPickerSetPaletteActiveEvent(index));
  }

  private setMode(mode: PaletteMode) {
    this.paletteMode = mode;
    this.saveToStorage();
    this.regenerate();
  }

  private toggleLock(index: number, e: Event) {
    e.stopPropagation();
    this.locked[index] = !this.locked[index];
    this.locked = [...this.locked];
    this.saveToStorage();
  }

  private saveToStorage() {
    try {
      const data: StoredPalette = {
        colors: this.colors.map((c) => ({ hex: c.getHex() })),
        locked: this.locked,
        mode: this.paletteMode,
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch {
      // localStorage unavailable — silently ignore
    }
  }

  private loadFromStorage(): {
    colors: Color[];
    locked: boolean[];
    mode: PaletteMode;
  } | null {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return null;
      const data = JSON.parse(raw) as StoredPalette;
      if (!data.colors || data.colors.length !== PALETTE_COUNT) return null;
      return {
        colors: data.colors.map(
          (c) => new Color({ type: ColorInputType.HEX, hex: c.hex }),
        ),
        locked: data.locked ?? Array(PALETTE_COUNT).fill(false),
        mode: (data.mode as PaletteMode) ?? PaletteMode.ANY,
      };
    } catch {
      return null;
    }
  }

  render() {
    return html`
      <div class="palette-root ${this.narrow ? "narrow" : ""}">
      <h5 class="text-lg font-semibold text-gray-800 mb-2">Color Palette</h5>
      <div class="palette-actions mb-2">
        <button
          class="palette-btn"
          @click=${this.regenerate}
          title="Generate new palette (Space)"
        >
          <span class="material-symbols-outlined palette-btn-icon"
            >refresh</span
          >
        </button>
      </div>
      <div class="palette-contrast mb-2">
        <span class="palette-contrast-label">Mode</span>
        <div class="palette-contrast-group">
          <button
            class="palette-contrast-btn ${this.paletteMode === PaletteMode.ANY
              ? "active"
              : ""}"
            @click=${() => this.setMode(PaletteMode.ANY)}
          >
            Any
          </button>
          <button
            class="palette-contrast-btn ${this.paletteMode === PaletteMode.TONAL
              ? "active"
              : ""}"
            @click=${() => this.setMode(PaletteMode.TONAL)}
          >
            Tonal
          </button>
          <button
            class="palette-contrast-btn ${this.paletteMode ===
            PaletteMode.ANALOGOUS
              ? "active"
              : ""}"
            @click=${() => this.setMode(PaletteMode.ANALOGOUS)}
          >
            Analogous
          </button>
          <button
            class="palette-contrast-btn ${this.paletteMode === PaletteMode.VIVID
              ? "active"
              : ""}"
            @click=${() => this.setMode(PaletteMode.VIVID)}
          >
            Vivid
          </button>
        </div>
      </div>
      <div class="palette-swatches">
        ${this.colors.map(
          (color, i) => html`
            <div
              class="palette-swatch ${this.activeIndex === i ? "active" : ""}"
              style="background: ${color.toCSS()}"
              @click=${() => this.selectSwatch(i)}
            >
              <button
                class="palette-swatch-lock ${this.locked[i] ? "locked" : ""}"
                @click=${(e: Event) => this.toggleLock(i, e)}
                title=${this.locked[i] ? "Unlock color" : "Lock color"}
              >
                <span class="material-symbols-outlined palette-lock-icon"
                  >${this.locked[i] ? "lock" : "lock_open"}</span
                >
              </button>
              <div class="palette-swatch-hex">
                #${color.getHex().toUpperCase()}
              </div>
              ${this.activeIndex === i
                ? html`<sl-copy-button
                    class="palette-swatch-copy"
                    value="#${color.getHex()}"
                  ></sl-copy-button>`
                : ""}
            </div>
          `,
        )}
      </div>
      </div>
    `;
  }
}
