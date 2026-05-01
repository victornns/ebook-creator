/**
 * SVG-based decorative background system for ebook pages.
 *
 * Backgrounds are fully vector, theme-driven, and PDF-compatible.
 * Colors are resolved from CSS custom properties (--ebook-bg-*) that
 * cascade from the theme defined in PaginatedEbookRenderer.
 */

export type BackgroundVariant =
  | "wave-cover" // Large sweeping wave — ideal for main covers
  | "split-wave" // Vertical organic split between two color regions
  | "organic" // Layered blob shapes for a dynamic, editorial feel
  | "diagonal" // Strong diagonal band — clean and geometric
  | "layered" // Multiple horizontal wave layers — rhythmic and calm
  | "corner-wave"; // Left accent column + wave rising from the bottom

export interface BackgroundConfig {
  variant: BackgroundVariant;
  /**
   * Optional per-page color overrides.
   * When set, these override the CSS variables inherited from the theme.
   * Useful when a specific page needs a different color palette.
   */
  colors?: {
    primary?: string;
    secondary?: string;
    accent?: string;
    neutral?: string;
  };
}
