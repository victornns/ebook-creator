import type { EbookTheme } from "@/ebook-engine/types/theme";

export const theme: EbookTheme = {
  colors: {
    primary: "#1e293b",
    secondary: "#334155",
    text: "#0f172a",
    accent: "#6366f1",
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
    blockGap: "1.5rem",
    pagePadding: "3rem",
  },
  pageSize: "A4",
};
