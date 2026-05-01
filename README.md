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
npm run export:pdf
npm run export:pdf:all
npm run export:epub
npm run export:epub:all
```

Or export directly:

```bash
npx tsx export/generate-pdf.ts demo
npx tsx export/generate-epub.ts demo
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

## Blocks

Available types:

rich-paragraph, heading, quote, highlight, note, warning, cta, list, steps, table, code, image-with-caption, divider, page-break

---

## Goal

Build structured ebooks with full control over content, layout, and export, without relying on visual editors.