"use client";

import type React from "react";
import type { PageLayout } from "@/ebook-engine/pagination/resolveLayout";

interface Props {
  layout: PageLayout;
  /** id attribute placed on the page div — used by TOC anchor links. */
  sectionId?: string;
  pageNumber: number;
  showPageNumber: boolean;
  /**
   * When true, children fill the entire page area (no inner margin box).
   * Used for cover and chapter-cover pages so backgrounds span the full page.
   */
  fullPage?: boolean;
  /** Background style applied to the full page div (covers margins, footer, everything). */
  backgroundStyle?: React.CSSProperties;
  children: React.ReactNode;
}

/**
 * Renders a single fixed-size page.
 *
 * - `fullPage=false` (default): children are placed in the content area (inside margins).
 * - `fullPage=true`: children fill the whole page; use for covers / chapter covers.
 *
 * The page-number footer is always absolutely positioned at the bottom of the page.
 */
export default function EbookPage({ layout, sectionId, pageNumber, showPageNumber, fullPage = false, backgroundStyle, children }: Props) {
  const pageStyle: React.CSSProperties = {
    position: "relative",
    width: `${layout.pageWidthMm}mm`,
    height: `${layout.pageHeightMm}mm`,
    flexShrink: 0,
    overflow: "hidden",
    backgroundColor: "var(--ebook-bg, #fff)",
    boxShadow: "0 4px 24px rgba(0,0,0,0.18)",
    ...backgroundStyle,
  };

  const footerStyle: React.CSSProperties = {
    position: "absolute",
    bottom: `${layout.marginBottomMm}mm`,
    left: `${layout.marginLeftMm}mm`,
    right: `${layout.marginRightMm}mm`,
    height: `${layout.footerHeightMm}mm`,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  if (fullPage) {
    return (
      <div
        className="ebook-page ebook-page--full"
        id={sectionId}
        style={pageStyle}
      >
        <div style={{ width: "100%", height: "100%" }}>{children}</div>
        {showPageNumber && (
          <div
            className="ebook-page-footer"
            style={footerStyle}
          >
            <span className="ebook-page-number">{pageNumber}</span>
          </div>
        )}
      </div>
    );
  }

  return (
    <div
      className="ebook-page"
      id={sectionId}
      style={pageStyle}
    >
      <div
        className="ebook-page-blocks"
        style={{
          position: "absolute",
          top: `${layout.marginTopMm}mm`,
          left: `${layout.marginLeftMm}mm`,
          right: `${layout.marginRightMm}mm`,
          bottom: `${layout.marginBottomMm + layout.footerHeightMm}mm`,
          overflow: "hidden",
        }}
      >
        {children}
      </div>
      {showPageNumber && (
        <div
          className="ebook-page-footer"
          style={footerStyle}
        >
          <span className="ebook-page-number">{pageNumber}</span>
        </div>
      )}
    </div>
  );
}
