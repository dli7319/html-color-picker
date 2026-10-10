/**
 * Reduced-motion guard for shadow-DOM components. The document-level guard in
 * dist/index.html cannot match shadow-tree content, so every component with
 * animations or transitions must include this block (round-2 review).
 */
import { css } from "lit";

export const reducedMotionStyles = css`
  /* Two-tone focus ring: guaranteed >=3:1 against any panel tint
     (round-2 review measured flat blue rings at 1.4-1.7:1). */
  *:focus-visible {
    outline: none;
    box-shadow:
      0 0 0 2px #fff,
      0 0 0 4px rgb(30, 41, 59);
    border-radius: 0.25rem;
  }

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
