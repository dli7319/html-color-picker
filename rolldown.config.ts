import { defineConfig } from "rolldown";
import litCss from "rollup-plugin-lit-css";
import serve from "rollup-plugin-serve";
import postcss from "postcss";
import tailwindcss from "@tailwindcss/postcss";

const isProduction = process.env.NODE_ENV === "production";

export default defineConfig({
  input: "src/index.ts",
  moduleTypes: {
    ".css": "js",
  },
  output: {
    file: "dist/main.js",
    format: "esm",
    sourcemap: !isProduction,
    minify: isProduction,
  },
  plugins: [
    litCss({
      transform: async (css, { filePath }) => {
        const result = await postcss([tailwindcss()]).process(css, {
          from: filePath,
        });
        return result.css;
      },
    }),
    !isProduction &&
      serve({
        contentBase: "dist",
        port: 8080,
      }),
  ],
});
