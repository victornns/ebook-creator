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
  let isFirstPage = true;
  let isFirstBlockOfPage = true;

  function flush() {
    pages.push({ blocks: currentBlocks, isFirstPage });
    currentBlocks = [];
    currentHeight = 0;
    isFirstPage = false;
    isFirstBlockOfPage = true;
  }

  for (const { block, heightPx, marginTopPx, marginBottomPx } of measuredBlocks) {
    // page-break block: flush and skip
    if (block.type === "page-break") {
      if (currentBlocks.length > 0) flush();
      continue;
    }

    // Effective height treats this block as if it were the last on the page:
    // CSS removes margin-bottom from the last child, so we subtract it before
    // checking overflow. This mirrors what the browser will actually render.
    const effectiveHeight = heightPx - marginBottomPx;
    const wouldOverflow = currentHeight + effectiveHeight > contentHeightPx;
    if (wouldOverflow && currentBlocks.length > 0) {
      flush();
    }

    currentBlocks.push(block);
    // Adjacent block margins collapse inside .ebook-page-blocks (CSS normal flow).
    // Each measured heightPx = content + marginTop + marginBottom (overflow:hidden wrapper
    // contains both margins). To match what the browser actually renders:
    //   - First block on page: CSS zeros margin-top; bottom margin is pending → subtract both.
    //   - Non-first block: top margin collapses with previous block's bottom margin (only
    //     one blockGap of space exists between them) → subtract marginTop only.
    const heightContribution = isFirstBlockOfPage ? heightPx - marginTopPx - marginBottomPx : heightPx - marginTopPx;
    currentHeight += heightContribution;
    isFirstBlockOfPage = false;
  }

  if (currentBlocks.length > 0) {
    flush();
  }

  // always return at least one page (even if empty) so sections are represented
  return pages.length > 0 ? pages : [{ blocks: [], isFirstPage: true }];
}
