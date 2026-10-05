import { defineConfig } from "rolldown";

const isProduction = process.env.NODE_ENV === "production";

// Separate config AND separate invocation from the app bundle: a single-file
// IIFE build silently drops extra entries, so the service worker is built on
// its own in the build script. scripts/build-sw.ts then substitutes the
// `_SW_VERSION_` / `_PRECACHE_LIST_` placeholders into this output.
export default defineConfig({
  input: "src/sw/sw.ts",
  output: {
    file: "dist/sw.js",
    format: "iife",
    name: "ColorPickerServiceWorker",
    minify: isProduction,
    sourcemap: false,
  },
});
