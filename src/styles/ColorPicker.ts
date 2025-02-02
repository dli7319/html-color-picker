import { css } from "lit";
export const styles = css`
  :host {
    display: block;
    width: 100%;
    height: 100%;
  }

  .main-container {
    --gap: 1rem;
    gap: var(--gap);
    padding: var(--gap);
  }

  ::slotted(*) {
    border-radius: 1rem;
    background: #eee;
    padding: 1rem;
    text-align: center;
    flex: 1 1 30%;
    display: flex;
    flex-direction: column;
  }
`;
