import type { Ebook } from "@/ebook-engine/types/ebook";
import type { EbookTheme } from "@/ebook-engine/types/theme";
import { ebook, theme } from "./demo";

export interface EbookEntry {
  ebook: Ebook;
  theme: EbookTheme;
}

/**
 * Registry of all available ebooks.
 * To add a new ebook, import its ebook and theme and add an entry here.
 */
export const ebookRegistry: Record<string, EbookEntry> = {
  demo: { ebook, theme },
};
