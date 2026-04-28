export interface EbookTheme {
  colors: {
    primary: string;
    secondary: string;
    text: string;
    background: string;
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
}
