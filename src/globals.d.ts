declare module "*.module.css";
declare module "*.css";

declare namespace JSX {
  interface IntrinsicElements {
    "other-tools": any;
    "color-interpolation": any;
  }
}

declare module "*?raw" {
  const content: string;
  export default content;
}