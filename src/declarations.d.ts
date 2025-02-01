declare namespace JSX {
  interface IntrinsicElements {
    "other-tools": any;
    "color-interpolation": any;
  }
}
declare module "*.css";

declare module "*?raw" {
  const content: string;
  export default content;
}