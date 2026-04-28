import { chromium } from "playwright";
import path from "path";
import fs from "fs";
import type { PageSize, PredefinedPageSize } from "@/ebook-engine/types/theme";

const PREDEFINED_FORMATS = new Set<string>(["A2", "A3", "A4", "A5", "Letter", "Legal", "Tabloid"]);

async function resolvePageFormat(ebookId: string): Promise<{ format?: string; width?: string; height?: string }> {
  try {
    const themeModule = await import(`../ebooks/${ebookId}/theme`);
    const pageSize: PageSize | undefined = themeModule.theme?.pageSize;
    if (!pageSize) return { format: "A4" };
    if (typeof pageSize === "string") {
      if (PREDEFINED_FORMATS.has(pageSize)) return { format: pageSize as PredefinedPageSize };
      return { format: "A4" };
    }
    return { width: `${pageSize.width}mm`, height: `${pageSize.height}mm` };
  } catch {
    return { format: "A4" };
  }
}

async function generatePDF(ebookId: string, baseUrl: string): Promise<void> {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  const url = `${baseUrl}/preview/${ebookId}`;
  console.log(`Abrindo: ${url}`);
  await page.goto(url, { waitUntil: "networkidle" });

  const outputDir = path.join(process.cwd(), "output");
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const pdfFormat = await resolvePageFormat(ebookId);
  const outputPath = path.join(outputDir, `${ebookId}.pdf`);

  await page.pdf({
    path: outputPath,
    ...pdfFormat,
    printBackground: true,
    margin: {
      top: "20mm",
      right: "20mm",
      bottom: "20mm",
      left: "20mm",
    },
  });

  await browser.close();
  console.log(`✅ PDF gerado: ${outputPath}`);
}

const ebookId = process.argv[2];
const baseUrl = process.argv[3] ?? "http://localhost:3000";
generatePDF(ebookId, baseUrl).catch((err) => {
  console.error("❌ Erro ao gerar PDF:", err);
  process.exit(1);
});
