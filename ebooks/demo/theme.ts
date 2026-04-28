import type { EbookTheme } from "@/ebook-engine/types/theme";

export const theme: EbookTheme = {
  colors: {
    primary: "#1b4332",
    secondary: "#2d6a4f",
    text: "#1c1c1c",
    background: "#ffffff",
    accent: "#52b788",
    muted: "#6b7280",
  },
  fonts: {
    heading: 'Georgia, "Times New Roman", serif',
    body: "system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
    mono: '"Courier New", Courier, monospace',
  },
  spacing: {
    sectionGap: "4rem",
    blockGap: "1.5rem",
    pagePadding: "3rem",
  },
};
