"use client";

import type React from "react";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import type { Ebook } from "@/ebook-engine/types/ebook";
import type { ChapterCover as ChapterCoverType } from "@/ebook-engine/types/ebook";
import type { EbookTheme } from "@/ebook-engine/types/theme";
import type { EbookPage, PaginationResult } from "@/ebook-engine/pagination/paginateEbook";
import type { MeasuredBlock } from "@/ebook-engine/pagination/paginateSection";
import type { PageLayout } from "@/ebook-engine/pagination/resolveLayout";
import { resolveLayout } from "@/ebook-engine/pagination/resolveLayout";
import { paginateEbook } from "@/ebook-engine/pagination/paginateEbook";
import { resolveNextImageProps } from "@/ebook-engine/types/image";
import EbookPageShell from "@/ebook-engine/components/EbookPage";
import Block from "@/ebook-engine/components/Block";
import Cover from "@/ebook-engine/components/Cover";
import TableOfContents from "@/ebook-engine/components/TableOfContents";

// ── Google Fonts loader ───────────────────────────────────────────────────────

function useGoogleFonts(families: string[] | undefined) {
  useEffect(() => {
    if (!families?.length) return;
    const params = families.map((f) => `family=${f.replace(/ /g, "+")}:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400`).join("&");
    const href = `https://fonts.googleapis.com/css2?${params}&display=swap`;
    const preconnect = document.createElement("link");
    preconnect.rel = "preconnect";
    preconnect.href = "https://fonts.googleapis.com";
    const preconnectOrigin = document.createElement("link");
    preconnectOrigin.rel = "preconnect";
    preconnectOrigin.href = "https://fonts.gstatic.com";
    preconnectOrigin.crossOrigin = "anonymous";
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = href;
    document.head.append(preconnect, preconnectOrigin, link);
    return () => {
      preconnect.remove();
      preconnectOrigin.remove();
      link.remove();
    };
  }, [families]);
}

// ── Page renderers ────────────────────────────────────────────────────────────

function renderChapterCoverContent(chapterCover: ChapterCoverType, sectionTitle: string) {
  const textColor = chapterCover.textColor ?? "#ffffff";

  return (
    <div
      className="ebook-chapter-cover-inner"
      style={{
        display: "flex",
        alignItems: "center",
        width: "100%",
        height: "100%",
        padding: "var(--ebook-spacing-page-padding)",
        gap: "2rem",
        color: textColor,
        boxSizing: "border-box",
      }}
    >
      <div className="ebook-chapter-cover-content">
        <span className="ebook-chapter-cover-number">Capítulo {chapterCover.chapterNumber}</span>
        <h2 className="ebook-chapter-cover-title">{sectionTitle}</h2>
        {chapterCover.description && <p className="ebook-chapter-cover-description">{chapterCover.description}</p>}
      </div>
      {chapterCover.image && (
        <div className="ebook-chapter-cover-image-side">
          <Image
            {...resolveNextImageProps(chapterCover.image.src)}
            alt={chapterCover.image.alt}
            className="ebook-chapter-cover-image"
          />
        </div>
      )}
    </div>
  );
}

function renderPage(page: EbookPage, layout: PageLayout, sectionPageMap: Record<string, number>): React.ReactNode {
  const anchorId = page.isFirstPageOfSection ? page.sectionId : undefined;

  switch (page.type) {
    case "cover": {
      const { coverData } = page;
      if (!coverData) return null;
      const bg: React.CSSProperties = coverData.cover.backgroundImage
        ? {
            backgroundImage: `url(${coverData.cover.backgroundImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }
        : { backgroundColor: coverData.cover.backgroundColor ?? "var(--ebook-primary)" };
      return (
        <EbookPageShell
          key={page.id}
          layout={layout}
          pageNumber={page.pageNumber}
          showPageNumber={false}
          fullPage
          backgroundStyle={bg}
        >
          <Cover
            title={coverData.title}
            subtitle={coverData.subtitle}
            author={coverData.author}
            cover={coverData.cover}
          />
        </EbookPageShell>
      );
    }

    case "toc":
      return (
        <EbookPageShell
          key={page.id}
          layout={layout}
          pageNumber={page.pageNumber}
          showPageNumber={page.showPageNumber}
        >
          <TableOfContents
            sections={page.tocSections ?? []}
            pageMap={sectionPageMap}
          />
        </EbookPageShell>
      );

    case "chapter-cover": {
      const { chapterCover, sectionTitle } = page;
      if (!chapterCover) return null;
      const bg: React.CSSProperties = chapterCover.backgroundImage
        ? {
            backgroundImage: `url(${chapterCover.backgroundImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }
        : { backgroundColor: chapterCover.backgroundColor ?? "var(--ebook-secondary)" };
      return (
        <EbookPageShell
          key={page.id}
          layout={layout}
          sectionId={anchorId}
          pageNumber={page.pageNumber}
          showPageNumber={page.showPageNumber}
          fullPage
          backgroundStyle={bg}
        >
          {renderChapterCoverContent(chapterCover, sectionTitle ?? "")}
        </EbookPageShell>
      );
    }

    case "content":
      return (
        <EbookPageShell
          key={page.id}
          layout={layout}
          sectionId={anchorId}
          pageNumber={page.pageNumber}
          showPageNumber={page.showPageNumber}
        >
          <div className="ebook-page-blocks">
            {(page.blocks ?? []).map((block, i) => (
              <Block
                key={i}
                block={block}
              />
            ))}
          </div>
        </EbookPageShell>
      );

    default:
      return null;
  }
}

// ── Main renderer ─────────────────────────────────────────────────────────────

interface Props {
  ebook: Ebook;
  theme: EbookTheme;
}

export default function PaginatedEbookRenderer({ ebook, theme }: Props) {
  useGoogleFonts(theme.fonts.googleFonts);

  const layout = useMemo(() => resolveLayout(theme), [theme]);

  const cssVars = {
    "--ebook-primary": theme.colors.primary,
    "--ebook-secondary": theme.colors.secondary,
    "--ebook-text": theme.colors.text,
    "--ebook-accent": theme.colors.accent,
    "--ebook-muted": theme.colors.muted,
    "--ebook-font-heading": theme.fonts.heading,
    "--ebook-font-body": theme.fonts.body,
    "--ebook-font-mono": theme.fonts.mono ?? "monospace",
    "--ebook-spacing-section-gap": theme.spacing.sectionGap,
    "--ebook-spacing-block-gap": theme.spacing.blockGap,
    "--ebook-spacing-page-padding": theme.spacing.pagePadding,
  } as React.CSSProperties;

  const [phase, setPhase] = useState<"measuring" | "ready">("measuring");
  const [result, setResult] = useState<PaginationResult>({ pages: [], sectionPageMap: {} });

  const measureRef = useRef<HTMLDivElement>(null);
  const mmRef = useRef<HTMLDivElement>(null);

  // All sections that have blocks to measure (chapter covers have no blocks)
  const measurableSections = useMemo(() => [...ebook.sections, ...(ebook.acknowledgements ? [ebook.acknowledgements] : [])].filter((s) => !s.chapterCover), [ebook]);

  useEffect(() => {
    const container = measureRef.current;
    const mmEl = mmRef.current;
    if (!container || !mmEl) return;

    async function measure() {
      // Wait for fonts so text heights are accurate
      await document.fonts.ready;

      // next/image reserves the correct space via known dimensions (static imports
      // or explicit width/height from cdnImage) even before pixels load, so waiting
      // for images is unnecessary and would hang for lazy-loaded off-screen images.

      const pxPerMm = mmEl!.getBoundingClientRect().height;
      if (pxPerMm < 0.1) return;

      const contentHeightPx = layout.contentHeightMm * pxPerMm;
      const measuredMap = new Map<string, MeasuredBlock[]>();

      for (const section of measurableSections) {
        const sectionEl = container!.querySelector<HTMLElement>(`[data-measure-section="${section.id}"]`);
        if (!sectionEl) continue;

        const measured: MeasuredBlock[] = [];
        for (let i = 0; i < section.blocks.length; i++) {
          const blockEl = sectionEl.querySelector<HTMLElement>(`[data-measure-block="${i}"]`);
          measured.push({
            block: section.blocks[i],
            heightPx: blockEl ? blockEl.getBoundingClientRect().height : 0,
          });
        }
        measuredMap.set(section.id, measured);
      }

      const paginationResult = paginateEbook(ebook, measuredMap, contentHeightPx);
      setResult(paginationResult);
      setPhase("ready");
    }

    measure();
    // Intentionally run once on mount — ebook data is static
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className="ebook-root"
      style={cssVars}
      data-pagination-ready={phase === "ready" ? "true" : undefined}
    >
      {/* 1 mm reference element — calibrates pxPerMm at runtime */}
      <div
        ref={mmRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "1mm",
          height: "1mm",
          visibility: "hidden",
          pointerEvents: "none",
        }}
        aria-hidden="true"
      />

      {/* Hidden block measuring container */}
      {phase === "measuring" && (
        <div
          ref={measureRef}
          style={{
            position: "fixed",
            top: "-9999px",
            left: "-9999px",
            width: `${layout.contentWidthMm}mm`,
            visibility: "hidden",
            pointerEvents: "none",
            zIndex: -1,
          }}
          aria-hidden="true"
        >
          {measurableSections.map((section) => (
            <div
              key={section.id}
              data-measure-section={section.id}
            >
              {section.blocks.map((block, idx) => (
                <div
                  key={idx}
                  data-measure-block={idx}
                  // overflow:hidden creates a block formatting context so the child's
                  // CSS margins are contained within this wrapper instead of collapsing
                  // out of it. Without this, getBoundingClientRect().height returns only
                  // the content height (margins are excluded), causing the paginator to
                  // undercount and assign more blocks to a page than actually fit,
                  // which results in content being clipped by the page's overflow:hidden.
                  style={{ overflow: "hidden" }}
                >
                  <Block block={block} />
                </div>
              ))}
            </div>
          ))}
        </div>
      )}

      {/* Rendered pages (visible after pagination is complete) */}
      {phase === "ready" && result.pages.map((page) => renderPage(page, layout, result.sectionPageMap))}
    </div>
  );
}
