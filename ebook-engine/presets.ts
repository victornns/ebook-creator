import type { EbookTheme } from "./types/theme";

// ---------------------------------------------------------------------------
// Preset definitions
// ---------------------------------------------------------------------------

/** Clean, neutral, content-focused. Ideal for essays, reports, and editorial work. */
export const minimalPreset: EbookTheme = {
  colors: {
    primary: "#1a1a1a",
    secondary: "#333333",
    text: "#111111",
    accent: "#555555",
    muted: "#999999",
  },
  fonts: {
    heading: '"Playfair Display", Georgia, serif',
    body: 'Georgia, "Times New Roman", serif',
    mono: '"Courier New", Courier, monospace',
    googleFonts: ["Playfair Display"],
  },
  spacing: {
    sectionGap: "5rem",
    blockGap: "1.75rem",
    pagePadding: "4rem",
  },
  pageSize: "A4",
};

/** Structured, formal, and professional. Suitable for business reports and white papers. */
export const corporatePreset: EbookTheme = {
  colors: {
    primary: "#1b2d4f",
    secondary: "#2c4a7c",
    text: "#1a2035",
    accent: "#0066cc",
    muted: "#8899aa",
  },
  fonts: {
    heading: '"Inter", system-ui, sans-serif',
    body: '"Inter", system-ui, sans-serif',
    mono: '"Courier New", Courier, monospace',
    googleFonts: ["Inter"],
  },
  spacing: {
    sectionGap: "4rem",
    blockGap: "1.5rem",
    pagePadding: "3rem",
  },
  pageSize: "A4",
};

/** Slightly expressive but highly readable. Works well for guides and tutorials. */
export const modernPreset: EbookTheme = {
  colors: {
    primary: "#18181b",
    secondary: "#27272a",
    text: "#09090b",
    accent: "#7c3aed",
    muted: "#a1a1aa",
  },
  fonts: {
    heading: '"Plus Jakarta Sans", system-ui, sans-serif',
    body: '"Plus Jakarta Sans", system-ui, sans-serif',
    mono: '"Fira Code", monospace',
    googleFonts: ["Plus Jakarta Sans", "Fira Code"],
  },
  spacing: {
    sectionGap: "4rem",
    blockGap: "1.5rem",
    pagePadding: "3rem",
  },
  background: "corner-wave",
  pageSize: "A4",
};

/** Developer-friendly with strong code formatting. Ideal for technical documentation. */
export const documentationPreset: EbookTheme = {
  colors: {
    primary: "#1e293b",
    secondary: "#334155",
    text: "#0f172a",
    accent: "#0ea5e9",
    muted: "#94a3b8",
  },
  fonts: {
    heading: '"Inter", system-ui, sans-serif',
    body: '"Inter", system-ui, sans-serif',
    mono: '"Fira Code", monospace',
    googleFonts: ["Inter", "Fira Code"],
  },
  spacing: {
    sectionGap: "4rem",
    blockGap: "1.25rem",
    pagePadding: "3rem",
  },
  pageSize: "A4",
};

// ---------------------------------------------------------------------------
// Preset map — convenient lookup by name
// ---------------------------------------------------------------------------

export const presets = {
  minimal: minimalPreset,
  corporate: corporatePreset,
  modern: modernPreset,
  documentation: documentationPreset,
} as const;

export type PresetName = keyof typeof presets;

// ---------------------------------------------------------------------------
// extendPreset — apply a preset and override specific fields
// ---------------------------------------------------------------------------

type EbookThemeOverrides = Omit<Partial<EbookTheme>, "colors" | "fonts" | "spacing"> & {
  colors?: Partial<EbookTheme["colors"]>;
  fonts?: Partial<EbookTheme["fonts"]>;
  spacing?: Partial<EbookTheme["spacing"]>;
};

/**
 * Start from a preset and override only the fields you need.
 * Nested objects (colors, fonts, spacing) are shallow-merged so you can
 * change a single key without repeating the rest.
 *
 * @example
 * const theme = extendPreset(presets.corporate, {
 *   colors: { accent: "#e63946" },
 *   pageSize: "Letter",
 * });
 */
export function extendPreset(preset: EbookTheme, overrides: EbookThemeOverrides): EbookTheme {
  return {
    ...preset,
    ...overrides,
    colors: overrides.colors ? { ...preset.colors, ...overrides.colors } : preset.colors,
    fonts: overrides.fonts ? { ...preset.fonts, ...overrides.fonts } : preset.fonts,
    spacing: overrides.spacing ? { ...preset.spacing, ...overrides.spacing } : preset.spacing,
  };
}
