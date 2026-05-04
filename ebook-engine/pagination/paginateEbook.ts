import type { Block, Ebook, EbookCover, ChapterCover, Section } from "@/ebook-engine/types/ebook";
import type { MeasuredBlock } from "./paginateSection";
import { paginateSection } from "./paginateSection";

interface TocGroup {
  chapter: Section;
  items: Section[];
}

function groupTocSections(sections: Section[]): TocGroup[] {
  const groups: TocGroup[] = [];
  let current: TocGroup | null = null;
  for (const section of sections) {
    if (section.chapterCover) {
      current = { chapter: section, items: [] };
      groups.push(current);
    } else if (current) {
      current.items.push(section);
    } else {
      groups.push({ chapter: section, items: [] });
    }
  }
  return groups;
}

export type EbookPageType = "cover" | "toc" | "chapter-cover" | "content";

export interface CoverPageData {
  title: string;
  subtitle?: string;
  author: string;
  cover: EbookCover;
}

export interface TocMeasurement {
  titleHeightPx: number;
  groupHeightsPx: number[];
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
  /** 0 = first TOC page (shows title), >0 = continuation pages (no title). */
  tocPageIndex?: number;
  showPageNumber: boolean;
}

// PaginationResult is produced once during the measure phase and then passed
// to the renderer to produce the final list of EbookPage shells.
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
export function paginateEbook(ebook: Ebook, measuredBlocksMap: Map<string, MeasuredBlock[]>, contentHeightPx: number, tocMeasurement?: TocMeasurement): PaginationResult {
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
  const allTocGroups = groupTocSections(ebook.sections);

  if (!tocMeasurement || allTocGroups.length === 0) {
    // Fallback: single TOC page (no measurement data available yet)
    pages.push({
      id: "page-toc",
      pageNumber: pageNumber++,
      type: "toc",
      showPageNumber: true,
      tocSections: ebook.sections,
      tocPageIndex: 0,
    });
  } else {
    const { titleHeightPx, groupHeightsPx } = tocMeasurement;
    const tocPages: TocGroup[][] = [];
    let currentPageGroups: TocGroup[] = [];
    let currentHeight = titleHeightPx; // page 1 starts with title

    for (let i = 0; i < allTocGroups.length; i++) {
      const group = allTocGroups[i];
      const groupH = groupHeightsPx[i] ?? 0;

      if (currentHeight + groupH > contentHeightPx && currentPageGroups.length > 0) {
        tocPages.push(currentPageGroups);
        currentPageGroups = [];
        currentHeight = 0; // continuation pages have no title
      }

      currentPageGroups.push(group);
      currentHeight += groupH;
    }

    if (currentPageGroups.length > 0) {
      tocPages.push(currentPageGroups);
    }

    if (tocPages.length === 0) {
      tocPages.push([]);
    }

    for (let i = 0; i < tocPages.length; i++) {
      const pageGroups = tocPages[i];
      const pageSections = pageGroups.flatMap((g) => [g.chapter, ...g.items]);
      pages.push({
        id: i === 0 ? "page-toc" : `page-toc-${i}`,
        pageNumber: pageNumber++,
        type: "toc",
        showPageNumber: true,
        tocSections: pageSections,
        tocPageIndex: i,
      });
    }
  }

  // ── Sections ──────────────────────────────────────────────────────────────
  const allSections: Section[] = [...ebook.sections];

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
