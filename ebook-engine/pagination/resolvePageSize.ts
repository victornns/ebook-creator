import type { PageSize, PredefinedPageSize } from "@/ebook-engine/types/theme";

export const PAGE_SIZES_MM: Record<PredefinedPageSize, { width: number; height: number }> = {
  A2: { width: 420, height: 594 },
  A3: { width: 297, height: 420 },
  A4: { width: 210, height: 297 },
  A5: { width: 148, height: 210 },
  Letter: { width: 215.9, height: 279.4 },
  Legal: { width: 215.9, height: 355.6 },
  Tabloid: { width: 279.4, height: 431.8 },
};

export function resolvePageSize(pageSize?: PageSize): { width: number; height: number } {
  if (!pageSize) return PAGE_SIZES_MM.A4;
  if (typeof pageSize === "string") return PAGE_SIZES_MM[pageSize];
  return pageSize;
}
