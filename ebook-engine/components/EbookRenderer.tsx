"use client";

import type React from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import type { Ebook } from "@/ebook-engine/types/ebook";
import type { EbookTheme } from "@/ebook-engine/types/theme";
import Cover from "./Cover";
import TableOfContents from "./TableOfContents";
import Section from "./Section";

interface Props {
  ebook: Ebook;
  theme: EbookTheme;
}

/**
 * Computes the page number of each section using cumulative element heights.
 *
 * Strategy:
 * - A hidden 1mm div calibrates the browser's px-per-mm ratio.
 * - Section padding is 20mm (matching @page margin: 20mm), so content dimensions
 *   in the browser are identical to the PDF (170mm × 257mm content area).
 * - For each section we calculate how many physical PDF pages it occupies:
 *     pages = ceil(contentHeight / 257mm)   where contentHeight = elementHeight - 2×20mm
 * - Chapter covers always occupy exactly 1 page (break-before + break-after: page).
 * - Page numbers are then accumulated: section[i].page = sum of pages before it + 3
 *   (page 1 = cover, page 2+ = TOC, then sections begin).
 * - A ResizeObserver re-runs the calculation whenever layout changes.
 */
function usePageMap(rootRef: React.RefObject<HTMLDivElement | null>, mmRef: React.RefObject<HTMLDivElement | null>, ids: string[], fallback: Record<string, number>) {
  const [pageMap, setPageMap] = useState<Record<string, number>>(fallback);

  useEffect(() => {
    const compute = () => {
      const root = rootRef.current;
      const mmEl = mmRef.current;
      if (!root || !mmEl) return;

      const pxPerMm = mmEl.getBoundingClientRect().height;
      if (pxPerMm < 0.1) return;

      // Content area per PDF page = 297mm - 2×20mm (@page margin) = 257mm
      const A4_CONTENT_PX = 257 * pxPerMm;
      // Total padding per section card = 2×20mm (top + bottom)
      const SECTION_PADDING_PX = 40 * pxPerMm;

      // Measure the TOC page to determine how many PDF pages it occupies.
      // Exclude the .ebook-page-number div height — it is hidden in print and
      // must not inflate the content-height estimate.
      const tocEl = root.querySelector<HTMLElement>(".ebook-page");
      const tocHeightPx = tocEl ? tocEl.getBoundingClientRect().height : 297 * pxPerMm;
      const tocPageNumEl = tocEl?.querySelector<HTMLElement>(".ebook-page-number") ?? null;
      const tocPageNumHeight = tocPageNumEl ? tocPageNumEl.getBoundingClientRect().height : 0;
      const tocContentPx = Math.max(0, tocHeightPx - SECTION_PADDING_PX - tocPageNumHeight);
      const tocPages = Math.max(1, Math.ceil(tocContentPx / A4_CONTENT_PX));

      // Cover = page 1, TOC = pages 2…(1+tocPages), first section = page 2+tocPages
      let currentPage = 2 + tocPages;

      const newMap: Record<string, number> = {};
      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;

        newMap[id] = currentPage;

        // Chapter covers always occupy exactly 1 PDF page (break-before + break-after: page)
        const isChapterCover = el.classList.contains("ebook-chapter-cover");
        if (isChapterCover) {
          currentPage += 1;
        } else {
          const sectionTotalPx = el.getBoundingClientRect().height;
          // Exclude the .ebook-page-number div: it has margin-top:auto + padding-top:2.5rem
          // which inflates the measured height beyond the actual PDF content height.
          const pageNumEl = el.querySelector<HTMLElement>(".ebook-page-number");
          const pageNumHeight = pageNumEl ? pageNumEl.getBoundingClientRect().height : 0;
          const contentPx = Math.max(0, sectionTotalPx - SECTION_PADDING_PX - pageNumHeight);
          const pagesForSection = Math.max(1, Math.ceil(contentPx / A4_CONTENT_PX));
          currentPage += pagesForSection;
        }
      }
      setPageMap(newMap);
    };

    compute();

    const ro = new ResizeObserver(compute);
    const root = rootRef.current;
    if (root) ro.observe(root);
    return () => ro.disconnect();
  }, [rootRef, mmRef, ids]);

  return pageMap;
}

export default function EbookRenderer({ ebook, theme }: Props) {
  const cssVars = {
    "--ebook-primary": theme.colors.primary,
    "--ebook-secondary": theme.colors.secondary,
    "--ebook-text": theme.colors.text,
    "--ebook-bg": theme.colors.background,
    "--ebook-accent": theme.colors.accent,
    "--ebook-muted": theme.colors.muted,
    "--ebook-font-heading": theme.fonts.heading,
    "--ebook-font-body": theme.fonts.body,
    "--ebook-font-mono": theme.fonts.mono ?? "monospace",
    "--ebook-spacing-section-gap": theme.spacing.sectionGap,
    "--ebook-spacing-block-gap": theme.spacing.blockGap,
    "--ebook-spacing-page-padding": theme.spacing.pagePadding,
  } as React.CSSProperties;

  const rootRef = useRef<HTMLDivElement>(null);
  const mmRef = useRef<HTMLDivElement>(null);

  // Stable list of all section IDs
  const allIds = useMemo(
    () => [...ebook.sections.map((s) => s.id), ...(ebook.acknowledgements ? [ebook.acknowledgements.id] : [])],
    // ebook data is static — deps won't change at runtime
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  // Fallback: index-based approximation used on the first render (SSR / before measurement)
  const fallback = useMemo<Record<string, number>>(() => {
    const m: Record<string, number> = {};
    ebook.sections.forEach((s, i) => {
      m[s.id] = i + 3;
    });
    if (ebook.acknowledgements) {
      m[ebook.acknowledgements.id] = ebook.sections.length + 3;
    }
    return m;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const pageMap = usePageMap(rootRef, mmRef, allIds, fallback);

  return (
    <div
      ref={rootRef}
      className="ebook-root"
      style={cssVars}
    >
      {/* 1 mm calibration element — measures the browser's px-per-mm ratio */}
      <div
        ref={mmRef}
        style={{
          position: "absolute",
          width: "1mm",
          height: "1mm",
          visibility: "hidden",
          pointerEvents: "none",
        }}
        aria-hidden="true"
      />

      {/* Page 1: Cover */}
      {ebook.cover ? (
        <Cover
          title={ebook.title}
          subtitle={ebook.subtitle}
          author={ebook.author}
          cover={ebook.cover}
        />
      ) : (
        <header className="ebook-header">
          <h1 className="ebook-title">{ebook.title}</h1>
          {ebook.subtitle && <p className="ebook-subtitle">{ebook.subtitle}</p>}
          <p className="ebook-author">por {ebook.author}</p>
        </header>
      )}

      {/* Page 2: Table of Contents */}
      <div className="ebook-page">
        <TableOfContents
          sections={ebook.sections}
          pageMap={pageMap}
        />
        <div className="ebook-page-number">2</div>
      </div>

      {/* Pages 3+: Content */}
      <main className="ebook-content">
        {ebook.sections.map((section) => (
          <Section
            key={section.id}
            section={section}
            pageNumber={pageMap[section.id]}
          />
        ))}
      </main>

      {/* Last page: Acknowledgements */}
      {ebook.acknowledgements && (
        <div className="ebook-acknowledgements">
          <Section
            section={ebook.acknowledgements}
            pageNumber={pageMap[ebook.acknowledgements.id]}
          />
        </div>
      )}
    </div>
  );
}
