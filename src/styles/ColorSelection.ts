import { css } from "lit";
export const styles = css`
  .color-grad-container {
    width: 100%;
    position: relative;
    min-height: 10rem;
    min-width: 10rem;
    flex-grow: 1;
  }

  .color-grad {
    position: absolute;
    width: 100%;
    height: 100%;
    margin-left: auto;
    margin-right: auto;
    left: 0;
    right: 0;
  }

  .color-grad-1 {
    z-index: 0;
    background: linear-gradient(to right, #ffffff 0%, #f00 100%);
  }

  .color-grad-2 {
    z-index: 1;
    background: linear-gradient(to bottom, #ffffff00 0%, #000 100%);
  }

  .color-grad-circle {
    z-index: 2;
    position: absolute;
    width: 1rem;
    height: 1rem;
    border-radius: 99rem;
    border-style: solid;
    border-color: black;
    border-width: 0.1rem;
    pointer-events: none;
  }

  .color-bar {
    width: 100%;
    height: 1.5rem;
    margin-top: 0.5rem;
    border-radius: 0.25rem;
    background: linear-gradient(
      to right,
      #f00 0%,
      #ff0 17%,
      #0f0 33%,
      #0ff 50%,
      #00f 66%,
      #f0f 83%,
      #f00 100%
    );
  }

  .color-bar-pointer {
    height: 0;
    width: 0;
    border-left: 0.4em solid transparent;
    border-right: 0.4em solid transparent;
    border-bottom: 0.5em solid black;
    position: relative;
    transform: translateX(-50%);
    top: 60%;
  }

  .color-bar-pointer-2 {
    height: 0;
    width: 0;
    border-left: 0.4em solid black;
    border-right: 0.4em solid black;
    border-bottom: 0.4em solid black;
    position: absolute;
    transform: translateX(-50%);
    top: 0.5em;
  }

  .color-bar-pointer-3 {
    height: 0;
    width: 0;
    border-left: 0.3em solid transparent;
    border-right: 0.3em solid transparent;
    border-bottom: 0.375em solid;
    border-bottom-color: white;
    position: absolute;
    transform: translateX(-50%);
    top: 0.125em;
  }

  .color-bar-pointer-4 {
    height: 0;
    width: 0;
    border-left: 0.3em solid white;
    border-right: 0.3em solid white;
    border-bottom: 0.3em solid white;
    position: absolute;
    transform: translateX(-50%);
    top: 0.5em;
  }
`;
