/**
 * EPUB3 generator for ebook-creator.
 *
 * Strategy:
 *   1. Fetch serialized ebook data from /api/export/{id} (Next.js server must be running).
 *   2. Download embedded images from the dev server.
 *   3. Convert each section's blocks to XHTML.
 *   4. Package everything into a valid EPUB3 ZIP using jszip.
 *
 * Usage:
 *   npx tsx export/generate-epub.ts <ebook-id> [base-url]
 *
 * Examples:
 *   npx tsx export/generate-epub.ts demo
 *   npx tsx export/generate-epub.ts demo http://localhost:3001
 */

import JSZip from "jszip";
import fs from "fs";
import path from "path";

// ── Types (mirrors app/api/export/[id]/route.ts) ──────────────────────────────

interface SerializedImage {
  src: string;
  width: number;
  height: number;
}

interface SerializedBlock {
  type: string;
  content?: string;
  level?: number;
  label?: string;
  items?: string[];
  headers?: string[];
  rows?: string[][];
  caption?: string;
  src?: SerializedImage;
  alt?: string;
}

interface SerializedSection {
  id: string;
  title: string;
  chapterNumber?: number;
  chapterDescription?: string;
  blocks: SerializedBlock[];
}

interface SerializedEbook {
  id: string;
  title: string;
  subtitle?: string;
  author: string;
  theme: {
    colors: { primary: string; secondary: string; text: string; accent: string; muted: string };
    fonts: { heading: string; body: string; mono?: string };
    labels?: { chapter?: string; toc?: string };
  };
  sections: SerializedSection[];
}

// ── Markdown → inline HTML (used by rich-paragraph, note, warning) ────────────

function markdownToHtml(raw: string): string {
  // Escape HTML entities before applying Markdown patterns.
  let s = raw.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

  // Order matters: longer tokens before shorter ones.
  s = s.replace(/\*\*\*([^*\n]+?)\*\*\*/g, "<strong><em>$1</em></strong>");
  s = s.replace(/___([^_\n]+?)___/g, "<strong><em>$1</em></strong>");
  s = s.replace(/\*\*([^*\n]+?)\*\*/g, "<strong>$1</strong>");
  s = s.replace(/__([^_\n]+?)__/g, "<strong>$1</strong>");
  s = s.replace(/\*([^*\n]+?)\*/g, "<em>$1</em>");
  s = s.replace(/_([^_\n]+?)_/g, "<em>$1</em>");
  s = s.replace(/~~([^~\n]+?)~~/g, "<del>$1</del>");
  s = s.replace(/`([^`\n]+?)`/g, "<code>$1</code>");
  s = s.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
  // Escape sequences: \* \_ etc. — remove the backslash
  s = s.replace(/\\([*_~`\[\]()\\])/g, "$1");
  return s;
}

function esc(str: string): string {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

// ── Block → XHTML string ──────────────────────────────────────────────────────

function blockToXhtml(block: SerializedBlock, imageMap: Map<string, string>): string {
  switch (block.type) {
    case "heading": {
      const tag = `h${block.level ?? 1}`;
      return `<${tag}>${esc(block.content ?? "")}</${tag}>`;
    }

    case "rich-paragraph":
      return `<p>${markdownToHtml(block.content ?? "")}</p>`;

    case "highlight":
      return `<blockquote class="highlight"><p>${esc(block.content ?? "")}</p></blockquote>`;

    case "quote":
      return `<blockquote><p>${esc(block.content ?? "")}</p></blockquote>`;

    case "note": {
      const label = block.label ? `<p class="callout-label">${esc(block.label)}</p>` : "";
      return `<div class="note">${label}<p>${markdownToHtml(block.content ?? "")}</p></div>`;
    }

    case "warning": {
      const label = block.label ? `<p class="callout-label">${esc(block.label)}</p>` : "";
      return `<div class="warning">${label}<p>${markdownToHtml(block.content ?? "")}</p></div>`;
    }

    case "action-box": {
      const label = block.label ? `<p class="callout-label">${esc(block.label)}</p>` : "";
      return `<div class="action-box">${label}<p>${esc(block.content ?? "")}</p></div>`;
    }

    case "list":
      return `<ul>${(block.items ?? []).map((i) => `<li>${esc(i)}</li>`).join("")}</ul>`;

    case "item-list": {
      const label = block.label ? `<p class="list-label">${esc(block.label)}</p>` : "";
      return `${label}<ul class="item-list">${(block.items ?? []).map((i) => `<li>${esc(i)}</li>`).join("")}</ul>`;
    }

    case "steps": {
      const label = block.label ? `<p class="list-label">${esc(block.label)}</p>` : "";
      return `${label}<ol>${(block.items ?? []).map((i) => `<li>${esc(i)}</li>`).join("")}</ol>`;
    }

    case "code":
      return `<pre><code>${esc(block.content ?? "")}</code></pre>`;

    case "table": {
      const caption = block.caption ? `<caption>${esc(block.caption)}</caption>` : "";
      const header = `<thead><tr>${(block.headers ?? []).map((h) => `<th>${esc(h)}</th>`).join("")}</tr></thead>`;
      const body = `<tbody>${(block.rows ?? []).map((row) => `<tr>${row.map((cell) => `<td>${esc(cell)}</td>`).join("")}</tr>`).join("")}</tbody>`;
      return `<table>${caption}${header}${body}</table>`;
    }

    case "divider":
      return `<hr/>`;

    case "page-break":
      return `<div class="page-break"/>`;

    case "image-with-caption": {
      if (!block.src) return "";
      const imgRef = imageMap.get(block.src.src);
      const imgSrc = imgRef ?? block.src.src;
      const widthAttr = block.src.width ? ` width="${block.src.width}"` : "";
      const heightAttr = block.src.height ? ` height="${block.src.height}"` : "";
      const caption = block.caption ? `<figcaption>${esc(block.caption)}</figcaption>` : "";
      return `<figure><img src="${imgSrc}" alt="${esc(block.alt ?? "")}"${widthAttr}${heightAttr}/>${caption}</figure>`;
    }

    default:
      return "";
  }
}

// ── Section → XHTML document ──────────────────────────────────────────────────

function sectionToXhtml(section: SerializedSection, imageMap: Map<string, string>, cssPath: string, chapterLabel = "Chapter"): string {
  const chapterHeader = section.chapterNumber
    ? `<div class="chapter-header"><span class="chapter-number">${chapterLabel} ${section.chapterNumber}</span><h1 class="chapter-title">${esc(section.title)}</h1>${section.chapterDescription ? `<p class="chapter-description">${esc(section.chapterDescription)}</p>` : ""}</div>`
    : "";

  const blocksHtml = section.blocks.map((b) => blockToXhtml(b, imageMap)).join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">
  <head>
    <meta charset="UTF-8"/>
    <title>${esc(section.title)}</title>
    <link rel="stylesheet" type="text/css" href="${cssPath}"/>
  </head>
  <body>
    ${chapterHeader}
    <div class="section-body">
      ${blocksHtml}
    </div>
  </body>
</html>`;
}

// ── EPUB building blocks ──────────────────────────────────────────────────────

function buildContentOpf(ebook: SerializedEbook, chapterIds: string[], imageEntries: { id: string; filename: string; mediaType: string }[]): string {
  const uid = `urn:uuid:${ebook.id}`;
  const date = new Date().toISOString().split("T")[0];

  const manifestItems = [
    `<item id="nav" href="nav.xhtml" media-type="application/xhtml+xml" properties="nav"/>`,
    `<item id="css" href="styles/ebook.css" media-type="text/css"/>`,
    ...chapterIds.map((id) => `<item id="chapter-${id}" href="content/${id}.xhtml" media-type="application/xhtml+xml"/>`),
    ...imageEntries.map((img) => `<item id="${img.id}" href="images/${img.filename}" media-type="${img.mediaType}"/>`),
  ];

  const spineItems = chapterIds.map((id) => `<itemref idref="chapter-${id}"/>`);

  return `<?xml version="1.0" encoding="UTF-8"?>
<package xmlns="http://www.idpf.org/2007/opf" version="3.0" unique-identifier="uid">
  <metadata xmlns:dc="http://purl.org/dc/elements/1.1/">
    <dc:identifier id="uid">${uid}</dc:identifier>
    <dc:title>${esc(ebook.title)}</dc:title>
    ${ebook.subtitle ? `<dc:description>${esc(ebook.subtitle)}</dc:description>` : ""}
    <dc:creator>${esc(ebook.author)}</dc:creator>
    <dc:language>en</dc:language>
    <meta property="dcterms:modified">${date}T00:00:00Z</meta>
  </metadata>
  <manifest>
    ${manifestItems.join("\n    ")}
  </manifest>
  <spine>
    ${spineItems.join("\n    ")}
  </spine>
</package>`;
}

function buildNav(ebook: SerializedEbook, sections: SerializedSection[], cssPath: string, tocTitle = "Table of Contents"): string {
  const items = sections.map((s) => `<li><a href="content/${s.id}.xhtml">${esc(s.title)}</a></li>`).join("\n      ");

  return `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:epub="http://www.idpf.org/2007/ops" xml:lang="en" lang="en">
  <head>
    <meta charset="UTF-8"/>
    <title>${esc(ebook.title)}</title>
    <link rel="stylesheet" type="text/css" href="${cssPath}"/>
  </head>
  <body>
    <nav epub:type="toc">
      <h1>${tocTitle}</h1>
      <ol>
      ${items}
      </ol>
    </nav>
  </body>
</html>`;
}

function buildEpubCss(ebook: SerializedEbook): string {
  const { colors, fonts } = ebook.theme;
  return `
/* ── Typography ── */
body {
  font-family: ${fonts.body}, Georgia, serif;
  font-size: 1em;
  line-height: 1.7;
  color: ${colors.text};
  margin: 1.5em;
}

h1, h2, h3 { font-family: ${fonts.heading}, serif; color: ${colors.primary}; line-height: 1.3; }
h1 { font-size: 2em; margin-top: 1.5em; }
h2 { font-size: 1.5em; margin-top: 1.2em; }
h3 { font-size: 1.2em; margin-top: 1em; }

p { margin: 0.8em 0; }
a { color: ${colors.accent}; }
code { font-family: ${fonts.mono ?? "monospace"}; background: #f4f4f4; padding: 0.1em 0.3em; border-radius: 3px; font-size: 0.88em; }
pre { background: #f4f4f4; padding: 1em; border-radius: 4px; overflow-x: auto; }
pre code { background: none; padding: 0; }

/* ── Chapter header ── */
.chapter-header { margin-bottom: 2em; padding-bottom: 1em; border-bottom: 2px solid ${colors.primary}; }
.chapter-number { font-size: 0.75em; font-weight: 700; text-transform: uppercase; letter-spacing: 0.15em; color: ${colors.accent}; }
.chapter-title { margin: 0.3em 0 0; }
.chapter-description { color: ${colors.muted}; font-style: italic; margin-top: 0.5em; }

/* ── Blocks ── */
blockquote {
  border-left: 4px solid ${colors.accent};
  margin: 1.2em 0;
  padding: 0.6em 1em;
  color: ${colors.muted};
  font-style: italic;
}
blockquote.highlight {
  background: ${colors.primary}10;
  border-color: ${colors.primary};
  font-size: 1.15em;
  font-style: normal;
  font-weight: 600;
  color: ${colors.primary};
}

.note, .warning {
  border-radius: 4px;
  padding: 0.8em 1em;
  margin: 1em 0;
}
.note   { background: ${colors.accent}18; border-left: 4px solid ${colors.accent}; }
.warning { background: #ff000018; border-left: 4px solid #cc3300; }

.action-box {
  background: ${colors.primary};
  color: #fff;
  border-radius: 6px;
  padding: 1em 1.2em;
  margin: 1.2em 0;
  text-align: center;
}
.action-box p { color: #fff; margin: 0; }

.callout-label {
  font-size: 0.72em;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  margin: 0 0 0.4em;
  opacity: 0.7;
}
.list-label {
  font-size: 0.78em;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: 0.4em;
  color: ${colors.muted};
}

ul, ol { padding-left: 1.5em; }
li { margin: 0.3em 0; }
.item-list { list-style: disc; }

table { width: 100%; border-collapse: collapse; margin: 1em 0; font-size: 0.9em; }
th { background: ${colors.primary}; color: #fff; padding: 0.5em 0.75em; text-align: left; }
td { padding: 0.45em 0.75em; border-bottom: 1px solid ${colors.secondary}40; }
tr:nth-child(even) td { background: ${colors.secondary}18; }
caption { caption-side: bottom; font-size: 0.8em; color: ${colors.muted}; font-style: italic; margin-top: 0.4em; }

figure { margin: 1.2em 0; }
figure img { max-width: 100%; height: auto; display: block; }
figcaption { font-size: 0.82em; color: ${colors.muted}; font-style: italic; margin-top: 0.4em; }

hr { border: none; border-top: 1px solid ${colors.secondary}50; margin: 1.5em 0; }
.page-break { page-break-after: always; }
`;
}

// ── Image downloading ─────────────────────────────────────────────────────────

async function downloadImage(src: string, baseUrl: string): Promise<{ buffer: Buffer; mediaType: string } | null> {
  const url = src.startsWith("http") ? src : `${baseUrl}${src}`;
  try {
    const res = await fetch(url);
    if (!res.ok) return null;
    const contentType = res.headers.get("content-type") ?? "image/png";
    const buffer = Buffer.from(await res.arrayBuffer());
    return { buffer, mediaType: contentType.split(";")[0].trim() };
  } catch {
    return null;
  }
}

function mediaTypeToExt(mediaType: string): string {
  const map: Record<string, string> = {
    "image/png": "png",
    "image/jpeg": "jpg",
    "image/gif": "gif",
    "image/webp": "webp",
    "image/svg+xml": "svg",
  };
  return map[mediaType] ?? "bin";
}

// ── Main export function ──────────────────────────────────────────────────────

export async function generateEpub(ebookId: string, baseUrl: string): Promise<void> {
  const apiUrl = `${baseUrl}/api/export/${ebookId}`;
  console.log(`Fetching: ${apiUrl}`);

  const res = await fetch(apiUrl);
  if (!res.ok) throw new Error(`API returned ${res.status} for ${ebookId}`);

  const ebook = (await res.json()) as SerializedEbook;

  const zip = new JSZip();

  // 1. mimetype — must be first and uncompressed
  zip.file("mimetype", "application/epub+zip", { compression: "STORE" });

  // 2. META-INF/container.xml
  zip.file(
    "META-INF/container.xml",
    `<?xml version="1.0" encoding="UTF-8"?>
<container version="1.0" xmlns="urn:oasis:names:tc:opendocument:xmlns:container">
  <rootfiles>
    <rootfile full-path="OEBPS/content.opf" media-type="application/oebps-package+xml"/>
  </rootfiles>
</container>`,
  );

  // 3. Collect all sections
  const allSections: SerializedSection[] = [...ebook.sections];

  // 4. Download and embed images
  const imageMap = new Map<string, string>(); // original src → OEBPS path (e.g. "../images/img-0.png")
  const imageEntries: { id: string; filename: string; mediaType: string }[] = [];

  const imageSrcs = new Set<string>();
  for (const section of allSections) {
    for (const block of section.blocks) {
      if (block.type === "image-with-caption" && block.src) {
        imageSrcs.add(block.src.src);
      }
    }
  }

  let imgIndex = 0;
  for (const src of imageSrcs) {
    const downloaded = await downloadImage(src, baseUrl);
    if (downloaded) {
      const ext = mediaTypeToExt(downloaded.mediaType);
      const filename = `img-${imgIndex}.${ext}`;
      const id = `img-${imgIndex}`;
      zip.file(`OEBPS/images/${filename}`, downloaded.buffer);
      imageMap.set(src, `../images/${filename}`);
      imageEntries.push({ id, filename, mediaType: downloaded.mediaType });
      imgIndex++;
    }
  }

  // 5. Stylesheet
  zip.file("OEBPS/styles/ebook.css", buildEpubCss(ebook));

  // 6. Content chapters
  for (const section of allSections) {
    const xhtml = sectionToXhtml(section, imageMap, "../styles/ebook.css", ebook.theme.labels?.chapter);
    zip.file(`OEBPS/content/${section.id}.xhtml`, xhtml);
  }

  // 7. Navigation document
  zip.file("OEBPS/nav.xhtml", buildNav(ebook, allSections, "styles/ebook.css", ebook.theme.labels?.toc));

  // 8. content.opf manifest
  zip.file(
    "OEBPS/content.opf",
    buildContentOpf(
      ebook,
      allSections.map((s) => s.id),
      imageEntries,
    ),
  );

  // 9. Write output
  const outputDir = path.join(process.cwd(), "public", "output");
  if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

  const outputPath = path.join(outputDir, `${ebookId}.epub`);
  const buffer = await zip.generateAsync({ type: "nodebuffer", mimeType: "application/epub+zip" });
  fs.writeFileSync(outputPath, buffer);

  console.log(`✅ EPUB gerado: ${outputPath}`);
}

// ── CLI entry point ───────────────────────────────────────────────────────────

if (process.argv[1]?.endsWith("generate-epub.ts")) {
  const ebookId = process.argv[2];
  const baseUrl = process.argv[3] ?? "http://localhost:3000";

  if (!ebookId) {
    console.error("Usage: tsx export/generate-epub.ts <ebook-id> [base-url]");
    process.exit(1);
  }

  generateEpub(ebookId, baseUrl).catch((err) => {
    console.error("❌ Erro ao gerar EPUB:", err);
    process.exit(1);
  });
}
