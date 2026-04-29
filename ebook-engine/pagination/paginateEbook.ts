import type { Block, Ebook, EbookCover, ChapterCover, Section } from "@/ebook-engine/types/ebook";
import type { MeasuredBlock } from "./paginateSection";
import { paginateSection } from "./paginateSection";

export type EbookPageType = "cover" | "toc" | "chapter-cover" | "content";

export interface CoverPageData {
  title: string;
  subtitle?: string;
  author: string;
  cover: EbookCover;
}

export interface EbookPage {
  id: string;
  pageNumber: number;
  type: EbookPageType;
  /** Section this page belongs to. Used for TOC anchors (id attribute on first page). */
  sectionId?: string;
  isFirstPageOfSection?: boolean;
  blocks?: Block[];
  coverData?: CoverPageData;
  chapterCover?: ChapterCover;
  sectionTitle?: string;
  tocSections?: Section[];
  showPageNumber: boolean;
}

export interface PaginationResult {
  pages: EbookPage[];
  /** Maps section id → page number of the first page of that section. */
  sectionPageMap: Record<string, number>;
}

/**
 * Converts an ebook + measured block heights into a flat list of pages.
 *
 * Page order:
 *   1. Cover (if ebook.cover is set)
 *   2. TOC
 *   3. Sections (each starts on a new page; chapter covers = one page)
 *   4. Acknowledgements (if set)
 */
export function paginateEbook(ebook: Ebook, measuredBlocksMap: Map<string, MeasuredBlock[]>, contentHeightPx: number): PaginationResult {
  const pages: EbookPage[] = [];
  let pageNumber = 1;
  const sectionPageMap: Record<string, number> = {};

  // ── Cover ────────────────────────────────────────────────────────────────
  if (ebook.cover) {
    pages.push({
      id: "page-cover",
      pageNumber: pageNumber++,
      type: "cover",
      showPageNumber: false,
      coverData: {
        title: ebook.title,
        subtitle: ebook.subtitle,
        author: ebook.author,
        cover: ebook.cover,
      },
    });
  }

  // ── Table of Contents ────────────────────────────────────────────────────
  pages.push({
    id: "page-toc",
    pageNumber: pageNumber++,
    type: "toc",
    showPageNumber: true,
    tocSections: ebook.sections,
  });

  // ── Sections + Acknowledgements ──────────────────────────────────────────
  const allSections: Section[] = [...ebook.sections, ...(ebook.acknowledgements ? [ebook.acknowledgements] : [])];

  for (const section of allSections) {
    sectionPageMap[section.id] = pageNumber;

    if (section.chapterCover) {
      // Chapter cover always occupies exactly one page
      pages.push({
        id: `page-${section.id}`,
        pageNumber: pageNumber++,
        type: "chapter-cover",
        sectionId: section.id,
        isFirstPageOfSection: true,
        chapterCover: section.chapterCover,
        sectionTitle: section.title,
        showPageNumber: true,
      });
    } else {
      const measured = measuredBlocksMap.get(section.id) ?? [];
      const sectionPages = paginateSection(measured, contentHeightPx);

      for (let idx = 0; idx < sectionPages.length; idx++) {
        pages.push({
          id: `page-${section.id}-${idx}`,
          pageNumber: pageNumber++,
          type: "content",
          sectionId: section.id,
          isFirstPageOfSection: idx === 0,
          blocks: sectionPages[idx].blocks,
          sectionTitle: section.title,
          showPageNumber: true,
        });
      }
    }
  }

  return { pages, sectionPageMap };
}
