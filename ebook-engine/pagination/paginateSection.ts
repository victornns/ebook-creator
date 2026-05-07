import type { Block } from "@/ebook-engine/types/ebook";

export interface MeasuredBlock {
  block: Block;
  heightPx: number;
  marginTopPx: number;
  marginBottomPx: number;
}

export interface ContentPage {
  blocks: Block[];
  isFirstPage: boolean;
}

/**
 * Distributes measured blocks across pages based on available content height.
 *
 * Rules:
 * - `type: "page-break"` forces a new page (block is consumed, not rendered).
 * - If a block doesn't fit on the current page, it moves to the next page.
 * - If a single block exceeds the full content height, it renders alone.
 */
export function paginateSection(measuredBlocks: MeasuredBlock[], contentHeightPx: number): ContentPage[] {
  const pages: ContentPage[] = [];
  let currentBlocks: Block[] = [];
  let currentHeight = 0;
  // Bottom margin of the last placed block. Adjacent margins collapse in CSS normal
  // flow, so the actual gap between two blocks is max(prevBottom, nextTop), not their sum.
  let pendingBottomMargin = 0;
  let isFirstPage = true;
  let isFirstBlockOfPage = true;

  function flush() {
    pages.push({ blocks: currentBlocks, isFirstPage });
    currentBlocks = [];
    currentHeight = 0;
    pendingBottomMargin = 0;
    isFirstPage = false;
    isFirstBlockOfPage = true;
  }

  for (const { block, heightPx, marginTopPx, marginBottomPx } of measuredBlocks) {
    // page-break block: flush and skip
    if (block.type === "page-break") {
      if (currentBlocks.length > 0) flush();
      continue;
    }

    const contentH = heightPx - marginTopPx - marginBottomPx;

    // Gap before this block: CSS normal-flow margin collapsing between the previous
    // block's bottom margin and this block's top margin. The first block on a page
    // has its top margin zeroed by `.ebook-page-blocks > *:first-child { margin-top: 0 }`,
    // so its gap is always 0.
    const gap = isFirstBlockOfPage ? 0 : Math.max(pendingBottomMargin, marginTopPx);

    // Overflow check: space this block would consume if it were the last on the page
    // (trailing bottom margin is clipped by overflow:hidden, so we exclude it).
    const effectiveHeight = gap + contentH;
    const wouldOverflow = currentHeight + effectiveHeight > contentHeightPx;
    if (wouldOverflow && currentBlocks.length > 0) {
      flush();
    }

    currentBlocks.push(block);
    // After a flush isFirstBlockOfPage is true, so actualGap is 0 (block is now first).
    const actualGap = isFirstBlockOfPage ? 0 : Math.max(pendingBottomMargin, marginTopPx);
    currentHeight += actualGap + contentH;
    pendingBottomMargin = marginBottomPx;
    isFirstBlockOfPage = false;
  }

  if (currentBlocks.length > 0) {
    flush();
  }

  // always return at least one page (even if empty) so sections are represented
  return pages.length > 0 ? pages : [{ blocks: [], isFirstPage: true }];
}
