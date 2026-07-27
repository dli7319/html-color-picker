# AGENTS.md

## Build / Test / Lint

```bash
npm run setup            # install dependencies (uses npm ci)
npm run dev              # dev server with hot-reload at localhost:8080
npm run build            # production build → dist/main.js (ESM, tree-shaken, minified)
npm test                 # run vitest test suite (607 tests, ~4s)
npm run test:coverage    # run tests with coverage report
npm run lint             # eslint src/
npm run format           # prettier --write src/**/*.ts *.ts
```

## Repository Structure

```
src/
  index.ts                    # entry point — bootstraps <color-picker>
  index.test.ts               # verifies custom element registration
  globals.d.ts                # ambient type declarations
  lib/
    Color.ts                  # color model: RGB255, RGB01, HEX, HSV, HSL, LCH
    Color.test.ts             # tests: construction, conversion, immutability
    ColorLerp.ts              # interpolation across color spaces (RGB, HSV, HSL, LCH)
    ColorLerp.test.ts         # tests: all 5 lerp modes, boundaries, HSL arc behavior
    ColorGradient.ts          # multi-stop gradient with lerp sampling
    ColorGradient.test.ts     # tests: stops, getColorAt, CSS generation
    ColorStringParsing.ts     # parse CSS color strings (hex, rgb(), etc.)
    ColorStringParsing.test.ts
    Coordinates.ts            # x/y coordinate helpers
    PaletteGenerator.ts       # algorithmic palette generation (7 rules, 4 modes)
    PaletteGenerator.test.ts  # tests: all modes, locking, Math.random mocking
    utils/math.ts             # lerp, clamp
    utils/math.test.ts
    utils/dom.ts              # forEachMatchingChild helper
    utils/dom.test.ts
  components/
    ColorPicker.ts            # root Lit element <color-picker> — orchestrates state
    ColorPicker.test.ts
    converter/                # ColorConverter, ColorConverterInput
    selection/                # color selection surfaces (HSL wheel, HSL bar, HSV grad, HSV bar)
    interpolation/            # ColorInterpolation component
    colormaps/                # ColorMap, ColorMaps (turbo colormap viewer)
    tools/                    # ColorHistory, OtherTools, ColorPalette, ImageSampling
  controllers/
    DragController.ts         # reusable pointer-drag controller (pointerdown→move→up)
    DragController.test.ts
  events/
    ColorPickerSetColorEvent.ts        ColorPickerSetColorEvent.test.ts
    ColorPickerCommitColorEvent.ts     ColorPickerCommitColorEvent.test.ts
    ColorPickerSetCoordinatesEvent.ts  ColorPickerSetCoordinatesEvent.test.ts
    ColorPickerSetInterpolationActiveEvent.ts  ColorPickerSetInterpolationActiveEvent.test.ts
    ColorPickerSetPaletteActiveEvent.ts       ColorPickerSetPaletteActiveEvent.test.ts
    ColorConverterInputEvent.ts               ColorConverterInputEvent.test.ts
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
| Language | **TypeScript 6.x** (strict, ES2020 target, ESNext modules) |
| Testing | **Vitest 4** (jsdom for components, node for pure logic; globals enabled; 500ms timeout) |
| Linting | **ESLint 10** (flat config: `@eslint/js` + `typescript-eslint`) |
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
- **Tests** use `// @vitest-environment node` for pure logic tests (no DOM needed) and default jsdom for component tests.

## Pre-Commit Checklist

Before making any git commit, run the full quality pipeline and verify it passes:

```bash
npm test              # all 607 tests must pass
npm run lint          # zero eslint errors
npm run format        # prettier formatting
```

**Always run all three before committing.** Commits must not introduce lint errors, formatting regressions, or test failures.

## CI/CD

- GitHub Actions workflow at `.github/workflows/webpack.yml` — deploys to GitHub Pages on push to `master`.
- Production site: https://davidl.me/apps/colors
