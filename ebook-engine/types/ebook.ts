import type { StaticImageData } from "next/image";

export type BlockType = "heading" | "paragraph" | "image" | "quote" | "list" | "divider" | "callout" | "code" | "ingredients" | "steps";

export interface Block {
  type: BlockType;
  content?: string;
  items?: string[];
  src?: string;
  alt?: string;
  level?: 1 | 2 | 3;
  /** Optional label override for `ingredients` and `steps` blocks. */
  label?: string;
}

export interface ChapterCover {
  chapterNumber: number;
  description?: string;
  image?: {
    src: StaticImageData | string;
    alt: string;
  };
  backgroundColor?: string;
  backgroundImage?: string;
  textColor?: string;
}

export interface Section {
  id: string;
  title: string;
  blocks: Block[];
  /** When set, the section is rendered as a full-page chapter transition. */
  chapterCover?: ChapterCover;
}

export interface EbookCover {
  /** URL of a background image. If omitted, uses backgroundColor. */
  backgroundImage?: string;
  /** Solid color background. Defaults to the theme primary color (--ebook-primary). */
  backgroundColor?: string;
  /** Optional centered image on the left side of the cover.
   *  Accepts a static import (`import img from './assets/img.png'`) or a plain URL string. */
  image?: {
    src: StaticImageData | string;
    alt: string;
  };
  /** Text color for title, subtitle and author. Defaults to white. */
  textColor?: string;
}

export interface Ebook {
  id: string;
  title: string;
  subtitle?: string;
  author: string;
  /** Optional cover page rendered as the very first page. */
  cover?: EbookCover;
  /** Optional acknowledgements section rendered as the last page. */
  acknowledgements?: Section;
  sections: Section[];
}
