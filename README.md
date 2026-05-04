# ebook-creator

Create and export ebooks using Next.js and TypeScript. Define content, themes, and layout in code, preview in the browser, and export to PDF and EPUB3.

Live demo:
https://ebook-creator-demo.vercel.app/

---

## Usage

```bash
npm install
npm run dev
```

Open http://localhost:3000 to see all ebooks.  
Preview a specific ebook at http://localhost:3000/preview/{id}

---

## Export

Dev server must be running.

```bash
# Export a specific ebook
npm run export:pdf demo
npm run export:epub demo

# Export all ebooks
npm run export:pdf:all
npm run export:epub:all
```

A custom host can be passed as a second argument (default: `http://localhost:3000`):

```bash
npm run export:pdf demo http://localhost:4000
```

Output:
public/output/{id}.pdf  
public/output/{id}.epub

---

## Create a new ebook

Structure:

```
ebooks/
  my-ebook/
    ├── ebook.ts
    ├── theme.ts
```

Example:

```ts
export const myEbook = {
  id: "my-ebook",
  title: "Title",
  author: "Author",
  sections: [
    {
      id: "intro",
      title: "Introduction",
      blocks: [
        { type: "heading", level: 1, content: "Chapter title" },
        { type: "rich-paragraph", content: "Text content" },
      ],
    },
  ],
};
```

Register it:

```ts
export const ebookRegistry = {
  "my-ebook": { ebook: myEbook, theme },
};
```

---

## Theme presets

Predefined themes for common use cases, available in `ebook-engine/presets.ts`.

| Preset | Style |
|---|---|
| `minimal` | Clean, editorial |
| `corporate` | Formal, structured |
| `modern` | Expressive, balanced |
| `documentation` | Technical, high clarity |

Use a preset:

```ts
import { presets } from "@/ebook-engine/presets";

export const theme = presets.corporate;
```

Override fields:

```ts
import { presets, extendPreset } from "@/ebook-engine/presets";

export const theme = extendPreset(presets.corporate, {
  colors: { accent: "#e63946" },
});
```

---

## Content blocks

All text fields across all block types support Markdown formatting: **bold**, *italic*, `code`, [links](url), and ~~strikethrough~~. Block-level blocks (`rich-paragraph`, `quote`, `highlight`, `note`, `warning`, `action-box`) support full Markdown. Inline contexts (`heading`, list items, table cells, captions) render inline Markdown only.

| Type | Description |
|---|---|
| `rich-paragraph` | Body text with inline Markdown (**bold**, *italic*, `code`, links) |
| `heading` | Section title, levels 1–3 |
| `quote` | Styled pull quote |
| `highlight` | Short emphasized phrase or key takeaway |
| `note` | Tip or contextual explanation |
| `warning` | Critical or cautionary message |
| `action-box` | Highlighted call-to-action box |
| `list` | Bullet list |
| `item-list` | Labeled list with richer item styling |
| `steps` | Numbered step-by-step sequence |
| `table` | Tabular data with headers |
| `code` | Monospace code block |
| `image-with-caption` | Image with optional caption |
| `divider` | Visual separator |
| `page-break` | Forces a new page |

---

## Goal

Build structured ebooks with full control over content, layout, and export, without relying on visual editors.