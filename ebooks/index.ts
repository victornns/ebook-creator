import type { Ebook } from "@/ebook-engine/types/ebook";
import type { EbookTheme } from "@/ebook-engine/types/theme";
import { demoEbook as ebook } from "./demo/ebook";
import { theme } from "./demo/theme";

export interface EbookEntry {
  ebook: Ebook;
  theme: EbookTheme;
}

export const ebookRegistry: Record<string, EbookEntry> = {
  demo: { ebook, theme },
};
