import fs from "fs";
import path from "path";
import { generatePDF } from "./generate-pdf";

const baseUrl = process.argv[2] ?? "http://localhost:3000";

const ebooksDir = path.join(process.cwd(), "ebooks");
const ids = fs.readdirSync(ebooksDir).filter((name) => {
  const stat = fs.statSync(path.join(ebooksDir, name));
  const hasEbook = fs.existsSync(path.join(ebooksDir, name, "ebook.ts"));
  return stat.isDirectory() && hasEbook;
});

console.log(`Exporting ${ids.length} ebook(s): ${ids.join(", ")}\n`);

(async () => {
  for (const id of ids) {
    await generatePDF(id, baseUrl);
  }
  console.log("\nDone.");
})().catch((err) => {
  console.error("❌ Error:", err);
  process.exit(1);
});
