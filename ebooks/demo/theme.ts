import type { EbookTheme } from "@/ebook-engine/types/theme";

export const theme: EbookTheme = {
  colors: {
    primary: "#1a3a2a",
    secondary: "#2d5a3d",
    text: "#1c2a1e",
    background: "#fafaf8",
    accent: "#4a9e6b",
    muted: "#7a8c7d",
  },
  fonts: {
    heading: '"Red Hat Display", system-ui, sans-serif',
    body: '"Red Hat Display", system-ui, sans-serif',
    mono: '"Courier New", Courier, monospace',
    googleFonts: ["Red Hat Display"],
  },
  spacing: {
    sectionGap: "4rem",
    blockGap: "1.5rem",
    pagePadding: "3rem",
  },
};
