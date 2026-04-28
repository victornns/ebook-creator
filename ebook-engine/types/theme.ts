export type PredefinedPageSize = "A2" | "A3" | "A4" | "A5" | "Letter" | "Legal" | "Tabloid";

/** Custom page size in millimeters. */
export interface CustomPageSize {
  width: number;
  height: number;
}

/** Paper size used in the preview and for PDF export. Defaults to A4 if omitted. */
export type PageSize = PredefinedPageSize | CustomPageSize;

export interface EbookTheme {
  colors: {
    primary: string;
    secondary: string;
    text: string;
    accent: string;
    muted: string;
  };
  fonts: {
    heading: string;
    body: string;
    mono?: string;
    /**
     * Google Font family names to load automatically.
     * Use the exact name as shown on fonts.google.com.
     * Weights 300–700 (regular + italic) are loaded by default.
     * Example: ["Playfair Display", "Inter"]
     */
    googleFonts?: string[];
  };
  spacing: {
    sectionGap: string;
    blockGap: string;
    pagePadding: string;
  };
  /** Paper size for preview and PDF export. Defaults to A4. */
  pageSize?: PageSize;
}
