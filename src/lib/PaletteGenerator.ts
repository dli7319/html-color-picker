import { Color, ColorInputType } from "./Color";

export enum PaletteRule {
  RANDOM = "random",
  MONOCHROMATIC = "monochromatic",
  ANALOGOUS = "analogous",
  COMPLEMENTARY = "complementary",
  TRIADIC = "triadic",
  SPLIT_COMPLEMENTARY = "split-complementary",
  TETRADIC = "tetradic",
}

export enum PaletteMode {
  ANY = "any",
  TONAL = "tonal",
  ANALOGOUS = "analogous",
  VIVID = "vivid",
}

const ANALOGOUS_RULES: PaletteRule[] = [PaletteRule.ANALOGOUS];

const VIVID_RULES: PaletteRule[] = [
  PaletteRule.COMPLEMENTARY,
  PaletteRule.TRIADIC,
  PaletteRule.SPLIT_COMPLEMENTARY,
  PaletteRule.TETRADIC,
];

const ALL_RULES: PaletteRule[] = [
  PaletteRule.MONOCHROMATIC,
  ...ANALOGOUS_RULES,
  ...VIVID_RULES,
];

function pickRule(mode: PaletteMode): PaletteRule {
  let pool: PaletteRule[];
  switch (mode) {
    case PaletteMode.TONAL:
      return PaletteRule.MONOCHROMATIC;
    case PaletteMode.ANALOGOUS:
      pool = ANALOGOUS_RULES;
      break;
    case PaletteMode.VIVID:
      pool = VIVID_RULES;
      break;
    case PaletteMode.ANY:
    default:
      pool = ALL_RULES;
      break;
  }
  return pool[Math.floor(Math.random() * pool.length)];
}

function randomInRange(min: number, max: number): number {
  return min + Math.random() * (max - min);
}

function wrapHue(h: number): number {
  return ((h % 360) + 360) % 360;
}

function hueOffsetsForRule(rule: PaletteRule): number[] {
  switch (rule) {
    case PaletteRule.MONOCHROMATIC:
      return [0, 0, 0, 0, 0];
    case PaletteRule.ANALOGOUS:
      return [-60, -30, 0, 30, 60];
    case PaletteRule.COMPLEMENTARY:
      return [0, 10, -10, 180, 190];
    case PaletteRule.TRIADIC:
      return [0, 120, 240, 30, 150];
    case PaletteRule.SPLIT_COMPLEMENTARY:
      return [0, 150, 210, -20, 170];
    case PaletteRule.TETRADIC:
      return [0, 90, 180, 270, 45];
    default:
      return [0, 30, 60, -30, -60];
  }
}

export interface PaletteConfig {
  count: number;
  mode: PaletteMode;
  saturationRange: [number, number];
  lightnessRange: [number, number];
  jitter: number;
}

const DEFAULT_CONFIG: PaletteConfig = {
  count: 5,
  mode: PaletteMode.ANY,
  saturationRange: [50, 90],
  lightnessRange: [40, 80],
  jitter: 5,
};

function randomHSLColor(hue: number, config: PaletteConfig): Color {
  const s = randomInRange(config.saturationRange[0], config.saturationRange[1]);
  const l = randomInRange(config.lightnessRange[0], config.lightnessRange[1]);
  const h = wrapHue(hue + randomInRange(-config.jitter, config.jitter));
  return new Color({ type: ColorInputType.HSL, h, s, l });
}

function tonalColor(hue: number, saturation: number, index: number, count: number): Color {
  const lightness = 15 + ((count - 1 - index) / (count - 1)) * 70;
  return new Color({
    type: ColorInputType.HSL,
    h: wrapHue(hue + randomInRange(-3, 3)),
    s: saturation,
    l: lightness,
  });
}

function anchorFromLocked(
  locked: boolean[] | undefined,
  existingColors: Color[] | undefined,
): { index: number; hsl: number[] } | null {
  if (!locked || !existingColors) return null;
  const idx = locked.findIndex(Boolean);
  if (idx === -1 || !existingColors[idx]) return null;
  return { index: idx, hsl: existingColors[idx].getHSL() };
}

export function generatePalette(
  config?: Partial<PaletteConfig>,
  locked?: boolean[],
  existingColors?: Color[],
): Color[] {
  const cfg = { ...DEFAULT_CONFIG, ...config };
  const rule = pickRule(cfg.mode);
  const anchor = anchorFromLocked(locked, existingColors);
  const offsets = cfg.mode === PaletteMode.TONAL ? [0, 0, 0, 0, 0] : hueOffsetsForRule(rule);

  // Derive base hue from locked anchor so unlocked colors complement it
  const baseHue = anchor
    ? wrapHue(anchor.hsl[0] - offsets[anchor.index])
    : Math.random() * 360;

  const colors: Color[] = [];

  if (cfg.mode === PaletteMode.TONAL) {
    const saturation = anchor ? anchor.hsl[1] : randomInRange(30, 70);
    for (let i = 0; i < cfg.count; i++) {
      if (locked && locked[i] && existingColors && existingColors[i]) {
        colors.push(existingColors[i]);
      } else {
        colors.push(tonalColor(baseHue, saturation, i, cfg.count));
      }
    }
  } else {
    for (let i = 0; i < cfg.count; i++) {
      if (locked && locked[i] && existingColors && existingColors[i]) {
        colors.push(existingColors[i]);
      } else {
        const hue = wrapHue(baseHue + offsets[i % offsets.length]);
        colors.push(randomHSLColor(hue, cfg));
      }
    }
  }

  return colors;
}
