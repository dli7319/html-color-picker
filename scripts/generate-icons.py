#!/usr/bin/env python3
"""Dev-only PWA icon generator. NOT run in CI — the PNGs it produces are
committed. Run with:

    uv run --with cairosvg python scripts/generate-icons.py

Produces two SVG sources in assets/ (the two masking contracts need
different geometry — see progressive-web-apps skill):

  assets/icon.svg          "any" purpose: transparent corners, wheel nearly
                           fills the canvas.
  assets/icon-maskable.svg "maskable" purpose + apple-touch-icon: fully
                           opaque square, art inside the centre 80% safe zone.

Rasterises to public/icons/:
  icon-192.png, icon-512.png          (purpose: any)
  icon-512-maskable.png               (purpose: maskable)
  apple-touch-icon.png (180)          (opaque; iOS renders transparency black)
  icon.svg                            (copy of assets/icon.svg for favicon use)

Asserts the produced PNGs' IHDR dimensions match what the manifest claims.
"""

import math
import os
import struct
import subprocess
import sys

REPO = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
ASSETS = os.path.join(REPO, "assets")
OUT = os.path.join(REPO, "public", "icons")

HUES = [0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330]


def hsl_hex(h: float, s: float, l: float) -> str:
    """Minimal HSL->hex; s/l in [0,1]."""
    c = (1 - abs(2 * l - 1)) * s
    x = c * (1 - abs((h / 60) % 2 - 1))
    m = l - c / 2
    if h < 60:
        r, g, b = c, x, 0
    elif h < 120:
        r, g, b = x, c, 0
    elif h < 180:
        r, g, b = 0, c, x
    elif h < 240:
        r, g, b = 0, x, c
    elif h < 300:
        r, g, b = x, 0, c
    else:
        r, g, b = c, 0, x
    return "#{:02x}{:02x}{:02x}".format(
        round((r + m) * 255), round((g + m) * 255), round((b + m) * 255)
    )


def pt(cx: float, cy: float, r: float, deg: float) -> str:
    a = math.radians(deg)
    return f"{cx + r * math.cos(a):.2f},{cy + r * math.sin(a):.2f}"


def ring_segments(cx: float, cy: float, r_out: float, r_in: float) -> str:
    """Annular sectors, one per hue. 0deg = +x axis, clockwise (y down)."""
    paths = []
    for i, hue in enumerate(HUES):
        a0 = i * 30 - 90 + 0.6  # small gap between segments
        a1 = (i + 1) * 30 - 90 - 0.6
        p = (
            f"M {pt(cx, cy, r_out, a0)} "
            f"A {r_out} {r_out} 0 0 1 {pt(cx, cy, r_out, a1)} "
            f"L {pt(cx, cy, r_in, a1)} "
            f"A {r_in} {r_in} 0 0 0 {pt(cx, cy, r_in, a0)} Z"
        )
        paths.append(f'  <path d="{p}" fill="{hsl_hex(hue, 0.78, 0.52)}"/>')
    return "\n".join(paths)


def marker(cx: float, cy: float, radius: float) -> str:
    """Selection marker on the ring at 30deg (upper-right), white with ring."""
    mx, my = pt(cx, cy, radius, -55).split(",")
    return (
        f'  <circle cx="{mx}" cy="{my}" r="{radius * 0.16:.2f}" fill="#ffffff" '
        f'stroke="#1f2937" stroke-width="{radius * 0.055:.2f}"/>'
    )


def icon_svg(size: int, r_out: float, r_in: float, bg: str | None) -> str:
    c = size / 2
    parts = [f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {size} {size}" width="{size}" height="{size}">']
    if bg:
        parts.append(f'  <rect width="{size}" height="{size}" fill="{bg}"/>')
    parts.append(ring_segments(c, c, r_out, r_in))
    parts.append(f'  <circle cx="{c}" cy="{c}" r="{r_in * 0.94:.2f}" fill="#ffffff"/>')
    parts.append(f'  <circle cx="{c}" cy="{c}" r="{r_in * 0.42:.2f}" fill="#475569"/>')
    parts.append(marker(c, c, (r_out + r_in) / 2))
    parts.append("</svg>")
    return "\n".join(parts) + "\n"


def png_size(path: str) -> tuple[int, int]:
    with open(path, "rb") as f:
        head = f.read(24)
    assert head[:8] == b"\x89PNG\r\n\x1a\n", f"{path} is not a PNG"
    w, h = struct.unpack(">II", head[16:24])
    return w, h


def main() -> int:
    os.makedirs(ASSETS, exist_ok=True)
    os.makedirs(OUT, exist_ok=True)

    # "any": transparent corners, wheel nearly fills the canvas
    any_svg = icon_svg(512, 246, 152, bg=None)
    with open(os.path.join(ASSETS, "icon.svg"), "w") as f:
        f.write(any_svg)

    # maskable + apple-touch: opaque, art inside centre 80% (r <= 204.8 at 512)
    maskable_svg = icon_svg(512, 198, 122, bg="#475569")
    with open(os.path.join(ASSETS, "icon-maskable.svg"), "w") as f:
        f.write(maskable_svg)

    import cairosvg  # dev-only dependency

    jobs = [
        ("icon.svg", "icon-192.png", 192),
        ("icon.svg", "icon-512.png", 512),
        ("icon-maskable.svg", "icon-512-maskable.png", 512),
        ("icon-maskable.svg", "apple-touch-icon.png", 180),
    ]
    for src, dst, size in jobs:
        cairosvg.svg2png(
            url=os.path.join(ASSETS, src),
            write_to=os.path.join(OUT, dst),
            output_width=size,
            output_height=size,
        )
        w, h = png_size(os.path.join(OUT, dst))
        assert (w, h) == (size, size), f"{dst}: expected {size}x{size}, got {w}x{h}"
        print(f"  {dst}: {w}x{h} OK")

    # favicon copy of the transparent SVG
    with open(os.path.join(ASSETS, "icon.svg")) as f:
        svg = f.read()
    with open(os.path.join(OUT, "icon.svg"), "w") as f:
        f.write(svg)

    print("generate-icons: done")
    return 0


if __name__ == "__main__":
    sys.exit(main())
