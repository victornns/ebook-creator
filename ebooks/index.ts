import type { Ebook } from "@/ebook-engine/types/ebook";
import type { EbookTheme } from "@/ebook-engine/types/theme";
import { demoEbook as ebook } from "./demo/ebook";
import { theme } from "./demo/theme";
import { coversShowcaseEbook } from "./covers-showcase/ebook";
import { theme as coversShowcaseTheme } from "./covers-showcase/theme";
import { componentsReferenceEbook } from "./components-reference/ebook";
import { theme as componentsReferenceTheme } from "./components-reference/theme";

export interface EbookEntry {
  ebook: Ebook;
  theme: EbookTheme;
}

export const ebookRegistry: Record<string, EbookEntry> = {
  demo: { ebook, theme },
  "covers-showcase": { ebook: coversShowcaseEbook, theme: coversShowcaseTheme },
  "components-reference": { ebook: componentsReferenceEbook, theme: componentsReferenceTheme },
};
