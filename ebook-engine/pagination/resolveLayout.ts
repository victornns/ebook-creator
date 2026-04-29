import type { EbookTheme } from "@/ebook-engine/types/theme";
import { resolvePageSize } from "./resolvePageSize";

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
const FOOTER_HEIGHT_MM = 8;

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
