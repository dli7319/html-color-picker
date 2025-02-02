import { css } from "lit";
export const styles = css`
  :host {
    gap: 0.25rem;
  }

  .image-preview-canvas-wrapper {
    position: relative;
    width: fit-content;
    height: fit-content;
  }

  .image-preview-canvas {
    max-width: 100%;
    max-height: 100%;
  }

  .image-preview-overlay {
    --circle-diameter: 1.5rem;
    z-index: 2;
    position: absolute;
    width: var(--circle-diameter);
    height: var(--circle-diameter);
    border-radius: 99rem;
    border-style: solid;
    border-color: black;
    border-width: 0.1rem;
    pointer-events: none;
  }
`;
