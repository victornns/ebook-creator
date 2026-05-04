import { chromium } from "playwright";
import path from "path";
import fs from "fs";
import type { PageSize, EbookTheme } from "@/ebook-engine/types/theme";
import { resolvePageSize } from "@/ebook-engine/pagination/resolveLayout";

/** Loads the theme for an ebook and returns its resolved page dimensions in mm. */
async function resolveEbookPageDimensions(ebookId: string): Promise<{ width: number; height: number }> {
  try {
    const themeModule = await import(`../ebooks/${ebookId}/theme`);
    const theme: EbookTheme | undefined = themeModule.theme;
    const pageSize: PageSize | undefined = theme?.pageSize;
    return resolvePageSize(pageSize);
  } catch {
    return resolvePageSize(); // defaults to A4
  }
}

export async function generatePDF(ebookId: string, baseUrl: string): Promise<void> {
  const browser = await chromium.launch();
  // deviceScaleFactor=1 matches headless default and avoids HiDPI font-metric
  // differences that cause text to break at different points than the web preview.
  const context = await browser.newContext({ deviceScaleFactor: 1 });
  const page = await context.newPage();

  const { width: pageWidthMm, height: pageHeightMm } = await resolveEbookPageDimensions(ebookId);

  // Set viewport to match the page width so the JS layout renders at the correct size
  const MM_TO_PX = 3.7795; // 1mm ≈ 3.7795px at 96 DPI
  await page.setViewportSize({
    width: Math.ceil(pageWidthMm * MM_TO_PX),
    height: Math.ceil(pageHeightMm * MM_TO_PX),
  });

  const url = `${baseUrl}/preview/${ebookId}`;
  console.log(`Abrindo: ${url}`);
  await page.goto(url, { waitUntil: "networkidle" });

  // Wait for the JS pagination engine to finish measuring and laying out pages
  await page.waitForSelector("[data-pagination-ready='true']", { timeout: 30_000 });

  const outputDir = path.join(process.cwd(), "public", "output");
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const outputPath = path.join(outputDir, `${ebookId}.pdf`);

  // Use zero margins — the JS layout already handles all margins internally.
  // printBackground preserves full-page backgrounds (covers, chapter covers, etc.).
  await page.pdf({
    path: outputPath,
    width: `${pageWidthMm}mm`,
    height: `${pageHeightMm}mm`,
    printBackground: true,
    margin: {
      top: "0mm",
      right: "0mm",
      bottom: "0mm",
      left: "0mm",
    },
  });

  await browser.close();
  console.log(`✅ PDF gerado: ${outputPath}`);
}

// Only run when invoked directly, not when imported by generate-all-pdfs.ts
if (process.argv[1]?.endsWith("generate-pdf.ts")) {
  const ebookId = process.argv[2];
  const baseUrl = process.argv[3] ?? "http://localhost:3000";
  generatePDF(ebookId, baseUrl).catch((err) => {
    console.error("❌ Erro ao gerar PDF:", err);
    process.exit(1);
  });
}
