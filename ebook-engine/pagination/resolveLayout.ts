import type { EbookTheme, PageSize, PredefinedPageSize } from "@/ebook-engine/types/theme";

// ISO/US paper sizes in millimeters. Source of truth for all page dimension calculations.
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

export interface PageLayout {
  pageWidthMm: number;
  pageHeightMm: number;
  marginTopMm: number;
  marginRightMm: number;
  marginBottomMm: number;
  marginLeftMm: number;
  footerHeightMm: number;
  contentWidthMm: number;
  contentHeightMm: number;
}

const DEFAULT_MARGIN_MM = 20;
// Footer is reserved at the bottom of every page for the page number.
// It is subtracted from contentHeightMm so blocks never overlap the footer.
const FOOTER_HEIGHT_MM = 8;

// Derives all page metrics from a theme. The resulting PageLayout is used by
// both the React renderer (CSS sizes) and the JS paginator (pixel height budget).
export function resolveLayout(theme: EbookTheme): PageLayout {
  const { width: pageWidthMm, height: pageHeightMm } = resolvePageSize(theme.pageSize);

  const marginTopMm = theme.margins?.top ?? DEFAULT_MARGIN_MM;
  const marginRightMm = theme.margins?.right ?? DEFAULT_MARGIN_MM;
  const marginBottomMm = theme.margins?.bottom ?? DEFAULT_MARGIN_MM;
  const marginLeftMm = theme.margins?.left ?? DEFAULT_MARGIN_MM;

  const contentWidthMm = pageWidthMm - marginLeftMm - marginRightMm;
  const contentHeightMm = pageHeightMm - marginTopMm - marginBottomMm - FOOTER_HEIGHT_MM;

  return {
    pageWidthMm,
    pageHeightMm,
    marginTopMm,
    marginRightMm,
    marginBottomMm,
    marginLeftMm,
    footerHeightMm: FOOTER_HEIGHT_MM,
    contentWidthMm,
    contentHeightMm,
  };
}
