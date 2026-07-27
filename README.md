# html-color-picker

A small website to convert between color coordinates. Try it at [dli7319.github.io/html-color-picker](https://dli7319.github.io/html-color-picker).

## Features

- **Color picker** — HSV square and HSL wheel
- **Color converter** — HEX, RGB 0-255, RGB 0-1, HSV, HSL. Uses [color-convert](https://github.com/Qix-/color-convert).
- **Image sampling** — upload an image and click to sample colors
- **Color interpolation** — blend two colors across RGB, HSL, HSL\*, and LCH
- **Palette generator** — generate palettes (tonal, analogous, complementary, triadic, etc.), lock swatches, drag to reorder
- **Color maps** — sample from colormaps like Turbo
- **Color history** — last 50 colors saved to localStorage

## Setup

```bash
git clone https://github.com/dli7319/html-color-picker.git
cd html-color-picker

npm run setup    # install dependencies
npm run dev      # start dev server at localhost:8080 with hot reload
```

## Scripts

| Command          | Description                 |
| ---------------- | --------------------------- |
| `npm run setup`  | Install dependencies        |
| `npm run dev`    | Dev server with live reload |
| `npm run build`  | Production build to `dist/` |
| `npm test`       | Run tests                   |
| `npm run lint`   | Lint                        |
| `npm run format` | Format with Prettier        |

## Deployment

Pushes to `master` are auto-deployed to GitHub Pages. For manual deployment, run `npm run build` and serve `dist/`.
