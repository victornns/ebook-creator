import type { Block } from "@/ebook-engine/types/ebook";

export interface MeasuredBlock {
  block: Block;
  heightPx: number;
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

  function flush() {
    pages.push({ blocks: currentBlocks, isFirstPage });
    currentBlocks = [];
    currentHeight = 0;
    isFirstPage = false;
  }

  for (const { block, heightPx } of measuredBlocks) {
    // page-break block: flush and skip
    if (block.type === "page-break") {
      if (currentBlocks.length > 0) flush();
      continue;
    }

    // block doesn't fit on current page — move it to the next
    const wouldOverflow = currentHeight + heightPx > contentHeightPx;
    if (wouldOverflow && currentBlocks.length > 0) {
      flush();
    }

    currentBlocks.push(block);
    currentHeight += heightPx;
  }

  if (currentBlocks.length > 0) {
    flush();
  }

  // always return at least one page (even if empty) so sections are represented
  return pages.length > 0 ? pages : [{ blocks: [], isFirstPage: true }];
}
