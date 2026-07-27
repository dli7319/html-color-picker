import { RollupOptions } from "rollup";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import litCss from "rollup-plugin-lit-css";
import terser from "@rollup/plugin-terser";
import serve from "rollup-plugin-serve";
import livereload from "rollup-plugin-livereload";
import postcss from "postcss";
import tailwindcss from "@tailwindcss/postcss";

const isProduction = process.env.NODE_ENV === "production";

const config: RollupOptions = {
  input: "src/index.ts",
  output: {
    file: "dist/main.js",
    format: "esm",
    sourcemap: !isProduction,
  },
  plugins: [
    resolve(),
    commonjs(),
    typescript({ tsconfig: "./tsconfig.json", outputToFilesystem: false }),
    litCss({
      transform: async (css, { filePath }) => {
        const result = await postcss([tailwindcss()]).process(css, {
          from: filePath,
        });
        return result.css;
      },
    }),
    isProduction && terser(),
    !isProduction &&
      serve({
        contentBase: "dist",
        port: 8080,
      }),
    !isProduction && livereload("dist"),
  ],
};

export default config;
