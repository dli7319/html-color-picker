/**
 * Styles for pointer-draggable surfaces (selection gradients, hue bars,
 * sampling canvas, colormap strip, interpolation ramps): let pointer drags
 * manipulate the surface instead of scrolling the page or selecting text.
 */
import { css } from "lit";

export const dragSurfaceStyles = css`
  .drag-surface {
    touch-action: none;
    user-select: none;
    -webkit-user-select: none;
    cursor: crosshair;
  }
`;
