import type { StaticImageData } from "next/image";

// ── Types ─────────────────────────────────────────────────────────────────────

/**
 * A local static import resolved at build time.
 * Pass the imported module directly — Next.js infers width, height,
 * and blurDataURL automatically.
 *
 * @example
 * import cover from "./assets/cover.png";
 * const img: EbookImage = cover;
 */
export type LocalImage = StaticImageData;

/**
 * A remote or CDN-hosted image.
 * Explicit `width` and `height` are required to prevent cumulative layout shift.
 *
 * @example
 * const img: EbookImage = cdnImage("https://cdn.example.com/photo.jpg", 1200, 800);
 */
export interface RemoteImage {
  url: string;
  width: number;
  height: number;
  blurDataURL?: string;
}

/**
 * Unified image source accepted by all ebook components.
 *
 * - Local asset: pass the static import directly.
 * - Remote / CDN: use the `cdnImage()` factory.
 *
 * @example
 * // Local
 * import cover from "./assets/cover.png";
 * const img: EbookImage = cover;
 *
 * // CDN
 * const img: EbookImage = cdnImage("https://cdn.example.com/photo.jpg", 1200, 800);
 */
export type EbookImage = LocalImage | RemoteImage;

// ── Factories ─────────────────────────────────────────────────────────────────

/**
 * Factory for CDN or remote images.
 * Provide explicit `width` and `height` to prevent layout shift.
 *
 * @example
 * cdnImage("https://cdn.example.com/photo.jpg", 1200, 800)
 * cdnImage("https://cdn.example.com/photo.jpg", 1200, 800, "data:image/...")
 */
export function cdnImage(url: string, width: number, height: number, blurDataURL?: string): RemoteImage {
  return { url, width, height, ...(blurDataURL !== undefined ? { blurDataURL } : {}) };
}

// ── Utilities ─────────────────────────────────────────────────────────────────

/** Returns `true` when the image is a `RemoteImage` (CDN/URL), not a static import. */
export function isRemoteImage(img: EbookImage): img is RemoteImage {
  return typeof img === "object" && "url" in (img as object);
}

/**
 * Resolves an `EbookImage` into the props expected by `next/image`'s `<Image>` component.
 *
 * - Static imports: returns `{ src }` — Next.js infers dimensions automatically.
 * - Remote images: returns `{ src: url, width, height }` — dimensions are passed explicitly.
 */
export function resolveNextImageProps(img: EbookImage): {
  src: string | StaticImageData;
  width?: number;
  height?: number;
  blurDataURL?: string;
} {
  if (isRemoteImage(img)) {
    return {
      src: img.url,
      width: img.width,
      height: img.height,
      ...(img.blurDataURL !== undefined ? { blurDataURL: img.blurDataURL } : {}),
    };
  }
  return { src: img };
}
