"use client";

import type React from "react";
import type { PageLayout } from "@/ebook-engine/pagination/resolveLayout";

interface Props {
  layout: PageLayout;
  sectionId?: string;
  pageNumber: number;
  showPageNumber: boolean;
  fullPage?: boolean;
  backgroundStyle?: React.CSSProperties;
  children: React.ReactNode;
}

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

  const contentStyle: React.CSSProperties = fullPage
    ? { width: "100%", height: "100%" }
    : {
        position: "absolute",
        top: `${layout.marginTopMm}mm`,
        left: `${layout.marginLeftMm}mm`,
        right: `${layout.marginRightMm}mm`,
        bottom: `${layout.marginBottomMm + layout.footerHeightMm}mm`,
        overflow: "hidden",
      };

  return (
    <div
      className={`ebook-page${fullPage ? " ebook-page--full" : ""}`}
      id={sectionId}
      style={pageStyle}
    >
      <div
        className={fullPage ? undefined : "ebook-page-blocks"}
        style={contentStyle}
      >
        {children}
      </div>
      {showPageNumber && (
        <div
          className="ebook-page-footer"
          style={{
            position: "absolute",
            bottom: `${layout.marginBottomMm}mm`,
            left: `${layout.marginLeftMm}mm`,
            right: `${layout.marginRightMm}mm`,
            height: `${layout.footerHeightMm}mm`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span className="ebook-page-number">{pageNumber}</span>
        </div>
      )}
    </div>
  );
}
