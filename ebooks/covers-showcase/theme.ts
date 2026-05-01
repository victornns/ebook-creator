import type { EbookTheme } from "@/ebook-engine/types/theme";

export const theme: EbookTheme = {
  colors: {
    primary: "#1a1a2e",
    secondary: "#16213e",
    text: "#0f3460",
    accent: "#e94560",
    muted: "#a8a8b3",
  },
  fonts: {
    heading: '"Inter", system-ui, sans-serif',
    body: '"Inter", system-ui, sans-serif',
    mono: '"Fira Code", monospace',
    googleFonts: ["Inter", "Fira Code"],
  },
  spacing: {
    sectionGap: "4rem",
    blockGap: "1.5rem",
    pagePadding: "3rem",
  },
  pageSize: "A4",
};
