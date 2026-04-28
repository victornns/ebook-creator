import { chromium } from "playwright";
import path from "path";
import fs from "fs";

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

  const outputPath = path.join(outputDir, `${ebookId}.pdf`);
  await page.pdf({
    path: outputPath,
    format: "A4",
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
