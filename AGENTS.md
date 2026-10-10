# AGENTS.md

## Build / Test / Lint

```bash
npm run setup            # install dependencies (uses npm ci)
npm run dev              # dev server with hot-reload at localhost:8080
npm run build            # production build → dist/ (main.js, sw.js, copied public/ assets)
npm test                 # run vitest test suite (~9s)
npm run test:coverage    # run tests with coverage report
npm run typecheck        # tsc --noEmit — strict type check, also runs in CI
npm run lint             # oxlint
npm run format           # prettier --write src/**/*.ts *.ts scripts/**/*.ts
uv run --with cairosvg python scripts/generate-icons.py   # dev-only: rebuild PWA icons (PNGs are committed)
```

## Build Pipeline

`npm run build` runs four steps in order:

1. `scripts/copy-static.ts` — copies `public/` (fonts, icons, manifest.json) into `dist/`.
2. `rolldown -c rolldown.config.ts` — bundles the app to `dist/main.js`.
3. `rolldown -c rolldown.sw.config.ts` — bundles `src/sw/sw.ts` to `dist/sw.js` (separate config AND separate invocation — a single-file IIFE build silently drops extra entries).
4. `scripts/build-sw.ts` — generates the precache manifest from the actual `dist/` bytes, derives the content-hash cache version, and substitutes the `SW_VERSION` / `PRECACHE_LIST` placeholders into `dist/sw.js`. Fails the build when a placeholder is missing or survives substitution.

## PWA

The app is installable and works fully offline (service worker at `dist/sw.js`).

- Fonts are self-hosted in `public/fonts/` (no third-party runtime requests). Keep it that way — a single render-blocking CDN request breaks offline.
- `manifest.json`, icons and font files are committed under `public/`; `dist/index.html` is the committed app shell.
- Service-worker rules live in `src/sw/rules.ts` (pure, unit-tested); wiring in `src/sw/sw.ts`; update flow in `src/pwa/serviceWorkerRegistration.ts` (unit-tested — the reload-on-controllerchange guard has a mutation check: if the guard is removed, `never reloads on controllerchange without a user-requested refresh` must fail).
- Icons come from `assets/icon.svg` / `assets/icon-maskable.svg`; regenerate PNGs with the dev-only script above (never in CI).

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
  sw/
    rules.ts                  # pure service-worker rules (cache naming, request filtering)
    sw.ts                     # service-worker wiring (precache, fetch, SKIP_WAITING)
  pwa/
    serviceWorkerRegistration.ts  # registration + passive update banner
scripts/
  copy-static.ts              # copies public/ → dist/ (build + dev)
  build-sw.ts                 # precache manifest + placeholder substitution
  generate-icons.py           # dev-only: assets/*.svg → public/icons/*.png
public/                       # committed static assets (copied into dist/)
  manifest.json               # web app manifest (all paths relative)
  fonts.css, fonts/           # self-hosted Google Sans Flex + Material Symbols subset
  icons/                      # PWA icons (192/512 any, 512 maskable, 180 apple-touch)
assets/
  icon.svg, icon-maskable.svg # icon sources (rasterised by scripts/generate-icons.py)
dist/
  index.html                  # static SPA shell (committed to repo)
  main.js                     # built output
  sw.js                       # built service worker (generated precache + version)
```

## Tech Stack

| Concern | Library |
|---------|---------|
| Web components | **Lit** (LitElement, customElement, decorators) |
| CSS | **Tailwind CSS v4** via `@tailwindcss/postcss` (processed through `rollup-plugin-lit-css` + PostCSS pipeline) |
| Bundler | **Rolldown** (config: `rolldown.config.ts`) |
| Language | **TypeScript 7.x** (strict, ES2020 target, ESNext modules) |
| Testing | **Vitest 5** (jsdom for components, node for pure logic; globals enabled; 500ms timeout) |
| Linting | **Oxlint** (config: `.oxlintrc.json`) |
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
npm run typecheck     # zero tsc errors
npm test              # all tests must pass
npm run lint          # zero oxlint errors
npm run format        # prettier formatting
```

**Always run all three before committing.** Commits must not introduce lint errors, formatting regressions, or test failures.

## CI/CD

- GitHub Actions workflow at `.github/workflows/webpack.yml` — deploys to GitHub Pages on push to `master`.
- Production site: https://davidl.me/apps/colors
