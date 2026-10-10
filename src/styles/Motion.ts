/**
 * Reduced-motion guard for shadow-DOM components. The document-level guard in
 * dist/index.html cannot match shadow-tree content, so every component with
 * animations or transitions must include this block (round-2 review).
 */
import { css } from "lit";

export const reducedMotionStyles = css`
  @media (prefers-reduced-motion: reduce) {
    *,
    *::before,
    *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      animation-delay: 0.01ms !important;
      transition-duration: 0.01ms !important;
      transition-delay: 0.01ms !important;
    }
  }
`;
