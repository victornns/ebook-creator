import type { EbookImage } from "./image";
import type { BackgroundConfig } from "./background";

/**
 * Controls how text and image are arranged on the main cover page.
 * - `"horizontal"` — image left, text right (default)
 * - `"centered"` — image thumbnail + text stacked, all horizontally centered
 * - `"vertical"` — image fills top half, text fills bottom half
 * - `"right"` — text column pinned to the right; no image column (relies on SVG background)
 */
export type CoverLayout = "horizontal" | "centered" | "vertical" | "right";

/**
 * Controls how chapter number, title and image are arranged on chapter-cover pages.
 * - `"horizontal"` — text left, image right (default)
 * - `"centered"` — all stacked and horizontally centered; image above text
 * - `"vertical"` — image fills top half, text fills bottom half
 * - `"minimal"` — no image; large semi-transparent chapter numeral as watermark
 */
export type ChapterCoverLayout = "horizontal" | "centered" | "vertical" | "minimal";

export type { EbookImage, LocalImage, RemoteImage } from "./image";
export { cdnImage, isRemoteImage, resolveNextImageProps } from "./image";

// ── Block base ───────────────────────────────────────────────────────────────

interface BlockBase {
  /** Force a page break before this block. */
  breakBefore?: boolean;
  /** Force a page break after this block. */
  breakAfter?: boolean;
}

// ── Content blocks (visual / presentational) ─────────────────────────────────

/** Body text with inline Markdown support: **bold**, *italic*, `code`, [text](url). */
export interface RichParagraphBlock extends BlockBase {
  type: "rich-paragraph";
  content: string;
}

/** Image with an optional caption. Rendered as an atomic unit (avoids page splits). */
export interface ImageWithCaptionBlock extends BlockBase {
  type: "image-with-caption";
  src: EbookImage;
  alt: string;
  caption?: string;
}

/** Short, visually emphasized text. Used for key phrases or important takeaways. */
export interface HighlightBlock extends BlockBase {
  type: "highlight";
  content: string;
}

/** Informational block for tips, observations, or contextual explanations. */
export interface NoteBlock extends BlockBase {
  type: "note";
  label?: string;
  content: string;
}

/** Critical or cautionary message. Styled to stand out more than a note. */
export interface WarningBlock extends BlockBase {
  type: "warning";
  label?: string;
  content: string;
}

/** Call-to-action block for engagement (e.g. "try this", "share", "continue reading"). */
export interface CtaBlock extends BlockBase {
  type: "cta";
  content: string;
  label?: string;
}

/** Structured tabular data. */
export interface TableBlock extends BlockBase {
  type: "table";
  headers: string[];
  rows: string[][];
  caption?: string;
}

// ── Structural / utility blocks ──────────────────────────────────────────────

export interface HeadingBlock extends BlockBase {
  type: "heading";
  content: string;
  level?: 1 | 2 | 3;
}

export interface QuoteBlock extends BlockBase {
  type: "quote";
  content: string;
}

export interface ListBlock extends BlockBase {
  type: "list";
  items: string[];
}

export interface DividerBlock extends BlockBase {
  type: "divider";
}

export interface CodeBlock extends BlockBase {
  type: "code";
  content: string;
}

export interface ItemListBlock extends BlockBase {
  type: "item-list";
  label?: string;
  items: string[];
}

export interface StepsBlock extends BlockBase {
  type: "steps";
  label?: string;
  items: string[];
}

export interface PageBreakBlock extends BlockBase {
  type: "page-break";
}

// ── Block union ──────────────────────────────────────────────────────────────

export type Block =
  // Content (visual) blocks
  | RichParagraphBlock
  | ImageWithCaptionBlock
  | HighlightBlock
  | NoteBlock
  | WarningBlock
  | CtaBlock
  | TableBlock
  // Structural / utility blocks
  | HeadingBlock
  | QuoteBlock
  | ListBlock
  | DividerBlock
  | CodeBlock
  | ItemListBlock
  | StepsBlock
  | PageBreakBlock;

export type BlockType = Block["type"];

export interface ChapterCover {
  chapterNumber: number;
  description?: string;
  image?: {
    src: EbookImage;
    alt: string;
  };
  /** Layout disposition of text and image on the chapter-cover page. Defaults to `"horizontal"`. */
  layout?: ChapterCoverLayout;
  /**
   * Solid color fallback. Used only when `background` (SVG variant) is not set.
   * Defaults to `var(--ebook-secondary)` from the theme.
   */
  backgroundColor?: string;
  /**
   * Image URL used as full-bleed background. Used only when `background` (SVG variant) is not set.
   * Takes precedence over `backgroundColor`.
   */
  backgroundImage?: string;
  /** Text color for chapter number, title and description. Defaults to white. */
  textColor?: string;
  /**
   * SVG decorative background variant.
   * When set, takes full precedence — `backgroundColor` and `backgroundImage` are ignored.
   * Colors are inherited from the theme. Override per-page via `colors`.
   */
  background?: BackgroundConfig;
}

export interface Section {
  id: string;
  title: string;
  blocks: Block[];
  /** When set, the section is rendered as a full-page chapter transition. */
  chapterCover?: ChapterCover;
}

export interface EbookCover {
  /** Layout disposition of text and image on the cover page. Defaults to `"horizontal"`. */
  layout?: CoverLayout;
  /**
   * Image URL used as full-bleed background. Used only when `background` (SVG variant) is not set.
   * Takes precedence over `backgroundColor`.
   */
  backgroundImage?: string;
  /**
   * Solid color fallback. Used only when `background` (SVG variant) is not set.
   * Defaults to `var(--ebook-primary)` from the theme.
   */
  backgroundColor?: string;
  /** Optional image displayed inside the cover layout (not the page background). */
  image?: {
    src: EbookImage;
    alt: string;
  };
  /** Text color for title, subtitle and author. Defaults to white. */
  textColor?: string;
  /**
   * SVG decorative background variant.
   * When set, takes full precedence — `backgroundColor` and `backgroundImage` are ignored.
   * Colors are inherited from the theme. Override per-page via `colors`.
   */
  background?: BackgroundConfig;
}

export interface Ebook {
  id: string;
  title: string;
  subtitle?: string;
  author: string;
  /** Optional cover page rendered as the very first page. */
  cover?: EbookCover;
  sections: Section[];
}
