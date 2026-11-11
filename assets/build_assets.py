"""Derive theme-ready assets from the supplied Scuderia Ferrari artwork.

The source PNG is a red swoosh + shield + wordmark on a transparent field. The
red swoosh is not part of the emblem we want, so it is flood-filled away from
the crop border, leaving the shield and the `SCUDERIA FERRARI` lockup as clean
transparent cut-outs. A duotone photo mask is produced from the F1 car shot for
the canvas watermark.
"""

from __future__ import annotations

import base64
import io
from pathlib import Path

import numpy as np
from PIL import Image, ImageFilter

ROOT = Path(__file__).resolve().parent

# Ferrari red used by the source artwork, and the flood tolerance around it.
RED = np.array([236, 28, 36], dtype=np.int16)
TOLERANCE = 60


def red_background(rgb: np.ndarray) -> np.ndarray:
    """Mask of the red swoosh: the largest connected near-red region.

    The swoosh sits inside the canvas margin rather than against the crop
    border, so the biggest red island is the artwork backdrop; the small red
    blocks inside the wordmark and the tricolour stripe stay untouched.
    """
    near_red = np.abs(rgb.astype(np.int16) - RED).sum(axis=2) < TOLERANCE
    h, w = near_red.shape
    seen = np.zeros((h, w), dtype=bool)
    best = np.zeros((h, w), dtype=bool)
    best_area = 0
    for sy in range(h):
        for sx in range(w):
            if not near_red[sy, sx] or seen[sy, sx]:
                continue
            stack = [(sy, sx)]
            seen[sy, sx] = True
            region: list[tuple[int, int]] = []
            while stack:
                cy, cx = stack.pop()
                region.append((cy, cx))
                for dy, dx in ((1, 0), (-1, 0), (0, 1), (0, -1)):
                    ny, nx = cy + dy, cx + dx
                    if 0 <= ny < h and 0 <= nx < w and near_red[ny, nx] and not seen[ny, nx]:
                        seen[ny, nx] = True
                        stack.append((ny, nx))
            if len(region) > best_area:
                best_area = len(region)
                best = np.zeros((h, w), dtype=bool)
                for cy, cx in region:
                    best[cy, cx] = True
    print("swoosh pixels:", best_area)
    return best


def components(alpha: np.ndarray) -> list[tuple[int, int, int, int, int]]:
    """Connected opaque islands as (x0, y0, x1, y1, area)."""
    h, w = alpha.shape
    seen = np.zeros((h, w), dtype=bool)
    out: list[tuple[int, int, int, int, int]] = []
    for y in range(h):
        for x in range(w):
            if not alpha[y, x] or seen[y, x]:
                continue
            stack = [(y, x)]
            seen[y, x] = True
            x0 = x1 = x
            y0 = y1 = y
            area = 0
            while stack:
                cy, cx = stack.pop()
                area += 1
                x0, x1 = min(x0, cx), max(x1, cx)
                y0, y1 = min(y0, cy), max(y1, cy)
                for dy, dx in ((1, 0), (-1, 0), (0, 1), (0, -1)):
                    ny, nx = cy + dy, cx + dx
                    if 0 <= ny < h and 0 <= nx < w and alpha[ny, nx] and not seen[ny, nx]:
                        seen[ny, nx] = True
                        stack.append((ny, nx))
            if area > 60:
                out.append((x0, y0, x1, y1, area))
    out.sort(key=lambda c: -c[4])
    return out


def cut(
    img: Image.Image,
    box: tuple[int, int, int, int],
    scale: int,
    name: str,
    *,
    webp_quality: int | None = None,
) -> Path:
    crop = img.crop(box)
    crop = crop.resize((crop.width * scale, crop.height * scale), Image.LANCZOS)
    if webp_quality is None:
        crop = crop.filter(ImageFilter.UnsharpMask(radius=1.1, percent=70, threshold=2))
    dest = ROOT / name
    if webp_quality is None:
        crop.save(dest)
    else:
        crop.save(dest, quality=webp_quality, method=6)
    print(f"{name}: {crop.size} {dest.stat().st_size} bytes")
    return dest


def main() -> None:
    src = Image.open(ROOT / "source-logo.png").convert("RGBA")
    arr = np.array(src)
    bg = red_background(arr[:, :, :3])

    alpha = arr[:, :, 3].copy()
    alpha[bg] = 0
    # Erode one pixel: the swoosh's anti-aliased edge sits against the emblem,
    # and keeping that fringe would drag a red halo (and the wordmark crop's
    # bounding box) with it. The 3x upscale restores a smooth edge.
    alpha = np.array(Image.fromarray(alpha).filter(ImageFilter.MinFilter(3)))

    clean = arr.copy()
    clean[:, :, 3] = alpha
    for rgb, a in zip(clean.reshape(-1, 4), alpha.reshape(-1)):
        if a == 0:
            rgb[3] = 0
    emblem = Image.fromarray(clean)

    islands = components(alpha)
    print("islands:", islands[:6])
    pad = 2
    shield = islands[0]
    sx0, sy0, sx1, sy1, _ = shield
    cut(emblem, (sx0 - pad, sy0 - pad, sx1 + pad + 1, sy1 + pad + 1), 3, "shield.png")

    # Everything outside the shield is the SCUDERIA FERRARI wordmark lockup. The
    # shield is zeroed out of the source so the crop holds the wordmark alone.
    wordmark = emblem.copy()
    wordmark.paste((0, 0, 0, 0), (0, 0, sx1 + 3, sy1 + 3))
    outside = alpha.copy()
    outside[sy0 - 2 : sy1 + 3, sx0 - 2 : sx1 + 3] = 0
    ys, xs = np.where(outside > 0)
    box = (int(xs.min()) - pad, int(ys.min()) - pad, int(xs.max()) + pad + 1, int(ys.max()) + pad + 1)
    cut(wordmark, box, 3, "lockup.png")

    # Dark-scheme wordmark: the letters are near-black in the supplied artwork,
    # so they are repainted in warm white while the red blocks stay red.
    mark = Image.open(ROOT / "lockup.png").convert("RGBA")
    px = np.array(mark)
    rgb = px[:, :, :3].astype(np.int16)
    red = (rgb[:, :, 0] > 140) & (rgb[:, :, 1] < 110) & (rgb[:, :, 2] < 110)
    light = px.copy()
    light[:, :, 0] = np.where(red, px[:, :, 0], 246)
    light[:, :, 1] = np.where(red, px[:, :, 1], 241)
    light[:, :, 2] = np.where(red, px[:, :, 2], 233)
    Image.fromarray(light).save(ROOT / "lockup-dark.png")
    print("lockup-dark.png:", mark.size, (ROOT / "lockup-dark.png").stat().st_size)

    # Car photo: grayscale ghost art for the canvas. The CSS adds the theme
    # tint and the mask feather, so the bitmap only has to carry tone.
    car = Image.open(ROOT / "source-car.jpg").convert("L")
    car = car.resize((1400, round(car.height * 1400 / car.width)), Image.LANCZOS)
    lo, hi = np.percentile(np.array(car), 1), np.percentile(np.array(car), 99)
    stretched = ((np.array(car, dtype=np.float32) - lo) / max(hi - lo, 1) * 255).clip(0, 255)
    ghost = Image.fromarray(stretched.astype(np.uint8))
    ghost.save(ROOT / "car-ghost.webp", quality=72, method=6)
    print("car-ghost.webp:", ghost.size, (ROOT / "car-ghost.webp").stat().st_size)

    for name in ("shield.png", "lockup.png", "lockup-dark.png", "car-ghost.webp"):
        data = base64.b64encode((ROOT / name).read_bytes()).decode()
        print(f"DATA:{name}:{len(data)}")
        (ROOT / f"{name}.b64").write_text(data, encoding="ascii")


if __name__ == "__main__":
    main()
