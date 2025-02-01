declare module "*.module.css";
declare module "*.css";

declare module "lerp" {
  export default function lerp(a: number, b: number, t: number): number;
}

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