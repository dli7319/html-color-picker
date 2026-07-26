# AGENTS.md

## Build / Test / Lint

```bash
npm run setup          # install dependencies (uses npm ci)
npm run dev            # dev server with hot-reload at localhost:8080
npm run build          # production build → dist/main.js (ESM, tree-shaken, minified)
npm test               # run vitest test suite

# Lint (no npm script — run directly)
npx eslint .
npx prettier --check .   # format check (.prettierrc: tabWidth=2)
npx prettier --write .   # format fix
```

## Repository Structure

```
src/
  index.ts                    # entry point — bootstraps <color-picker>
  globals.d.ts                # ambient type declarations
  lib/
    Color.ts                  # color model: RGB255, RGB01, HEX, HSV, HSL, LCH
    ColorLerp.ts              # interpolation across color spaces (RGB, HSV, HSL, LCH)
    ColorLerp.test.ts         # unit tests for interpolation
    ColorGradient.ts          # gradient rendering utilities
    ColorStringParsing.ts     # parse CSS color strings (hex, rgb(), etc.)
    Coordinates.ts            # x/y coordinate helpers
    utils/math.ts             # lerp, clamp
  components/
    ColorPicker.ts            # root Lit element <color-picker> — orchestrates state
    converter/                # ColorConverter, ColorConverterInput
    selection/                # color selection surfaces (HSL wheel, HSL bar, HSV grad, HSV bar)
    interpolation/            # ColorInterpolation component
    colormaps/                # ColorMap, ColorMaps (turbo colormap viewer)
    tools/                    # ImageSampling, OtherTools
  controllers/
    DragController.ts         # reusable pointer-drag controller (pointerdown→move→up)
  events/
    ColorPickerSetColorEvent.ts
    ColorPickerSetCoordinatesEvent.ts
    ColorPickerSetInterpolationActiveEvent.ts
  styles/                     # CSS files (lit-css) + Tailwind entry point
  colormap-data/
    turbo.ts                  # turbo colormap sampled points
dist/
  index.html                  # static SPA shell (committed to repo)
  main.js                     # built output
```

## Tech Stack

| Concern | Library |
|---------|---------|
| Web components | **Lit** (LitElement, customElement, decorators) |
| CSS | **Tailwind CSS v4** via `@tailwindcss/postcss` (processed through `rollup-plugin-lit-css` + PostCSS pipeline) |
| Bundler | **Rollup** (config: `rollup.config.ts`) |
| Language | **TypeScript 5.9** (strict, ES2020 target, ESNext modules) |
| Testing | **Vitest 4** (jsdom environment, globals enabled) |
| Linting | **ESLint 9** (flat config: `@eslint/js` + `typescript-eslint`) |
| Formatting | **Prettier** (tabWidth: 2) |
| Color math | **color-convert** |

## Code Conventions

- **ES modules only** (`"type": "module"` in package.json) — use `import`/`export`, never `require`.
- **Web components** follow the Lit decorator pattern: `@customElement('tag-name')`, `@state()`, `@property()`.
- **Component CSS** lives in co-located `.css` files in `src/styles/`, imported via `rollup-plugin-lit-css` (enables Tailwind in shadow DOM).
- **Event communication** between components uses custom events (see `src/events/`).
- **Color model** is a discriminated union on `ColorInputType` (see `ColorInput` in `Color.ts`).
- **No unused locals/parameters** — `tsconfig.json` enforces `noUnusedLocals` and `noUnusedParameters`.
- **Strict TypeScript** — `strict: true` with `noFallthroughCasesInSwitch` and `forceConsistentCasingInFileNames`.

## CI/CD

- GitHub Actions workflow at `.github/workflows/webpack.yml` — deploys to GitHub Pages on push to `master`.
- Production site: https://davidl.me/apps/colors
