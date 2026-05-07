# ebook-creator

**ebook-creator** is an open-source ebook generator built with Next.js, React, and TypeScript.

Create ebooks as code using structured content, reusable blocks, custom themes, browser preview, and automated export to PDF and EPUB3.

Live demo:  
https://ebook-creator-demo.vercel.app/

---

## Features

- Write ebooks as structured TypeScript objects
- Preview ebooks in the browser with Next.js
- Export to PDF and EPUB3
- Pixel-accurate JavaScript pagination engine — no CSS print engine dependency
- Auto-generated Table of Contents
- Chapter covers with configurable layouts and SVG backgrounds
- 15 reusable content blocks with Markdown support
- Custom themes or predefined presets (minimal, corporate, modern, documentation)
- Configurable page sizes: A2, A3, A4, A5, Letter, Legal, Tabloid, and custom dimensions
- Google Fonts auto-loading
- Build technical guides, documentation, reports, lead magnets, and self-publishing drafts

---

## Usage

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open the ebook list:

```txt
http://localhost:3000
```

Preview a specific ebook:

```txt
http://localhost:3000/preview/{id}
```

---

## Export

The development server must be running before exporting.

Export a specific ebook:

```bash
npm run export:pdf demo
npm run export:epub demo
```

Export all ebooks:

```bash
npm run export:pdf:all
npm run export:epub:all
```

A custom host can be passed as a second argument.  
The default host is `http://localhost:3000`.

```bash
npm run export:pdf demo http://localhost:4000
```

Generated files are saved to:

```txt
public/output/{id}.pdf
public/output/{id}.epub
```

---

## Create a new ebook

Each ebook lives inside the `ebooks` directory.

```txt
ebooks/
  my-ebook/
    ├── ebook.ts
    ├── theme.ts
```

Example ebook:

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
        {
          type: "heading",
          level: 1,
          content: "Chapter title",
        },
        {
          type: "rich-paragraph",
          content: "Text content with **Markdown** support.",
        },
      ],
    },
  ],
};
```

Register the ebook:

```ts
export const ebookRegistry = {
  "my-ebook": {
    ebook: myEbook,
    theme,
  },
};
```

After registering it, the ebook will be available in the browser preview and export commands.

---

## Theme presets

Predefined themes are available in `ebook-engine/presets.ts`.

| Preset | Style |
|---|---|
| `minimal` | Clean and editorial |
| `corporate` | Formal and structured |
| `modern` | Expressive and balanced |
| `documentation` | Technical and highly readable |

Use a preset:

```ts
import { presets } from "@/ebook-engine/presets";

export const theme = presets.corporate;
```

Override specific fields:

```ts
import { presets, extendPreset } from "@/ebook-engine/presets";

export const theme = extendPreset(presets.corporate, {
  colors: {
    accent: "#e63946",
  },
});
```

---

## Content blocks

Text fields support Markdown formatting such as **bold**, *italic*, `code`, [links](url), and ~~strikethrough~~.

Block-level components like `rich-paragraph`, `quote`, `highlight`, `note`, `warning`, and `action-box` support full Markdown.

Inline contexts such as headings, list items, table cells, and captions render inline Markdown only.

| Type | Description |
|---|---|
| `rich-paragraph` | Body text with Markdown support |
| `heading` | Section title, levels 1 to 3 |
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

## Project goal

The goal of **ebook-creator** is to make ebook production more structured and programmable.

Instead of using visual editors or manually adjusting pages, you define the content, theme, and layout in code. The engine handles preview and export, making it easier to keep ebooks consistent, reusable, and version-controlled.

---

## License

MIT