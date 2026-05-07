import type { Ebook } from "@/ebook-engine/types/ebook";
import imageCover from "./assets/cover-image.png";
import imageContent from "./assets/sample-image.jpg";

export const componentsReferenceEbook: Ebook = {
  id: "components-reference",
  title: "Components Reference",
  subtitle: "A complete visual reference of every content block available in the ebook engine",
  author: "Ebook Engine",

  cover: {
    layout: "centered",
    textColor: "#ffffff",
    background: { variant: "diagonal" },
    image: { src: imageCover, alt: "Components Reference" },
  },

  sections: [
    // ── 1. Typography & Rich Paragraph ────────────────────────────────────────
    {
      id: "typography",
      title: "Typography",
      blocks: [
        { type: "heading", level: 1, content: "Typography & Rich Text" },
        {
          type: "rich-paragraph",
          content: "The `rich-paragraph` block supports inline **Markdown**. Use it for body copy that needs emphasis without dedicated block styling.",
        },
        {
          type: "rich-paragraph",
          content: "**Bold text** draws attention to key terms. *Italic* adds nuance or introduces foreign words. ***Bold and italic together*** signal the highest inline emphasis.",
        },
        {
          type: "rich-paragraph",
          content: "~~Strikethrough~~ marks deprecated or removed content. `inline code` displays short snippets, commands, or variable names inside prose.",
        },
        {
          type: "rich-paragraph",
          content: "Links are written as [display text](https://example.com). They render as styled anchors — useful for referencing external resources or citations.",
        },
        {
          type: "rich-paragraph",
          content: "Alternative Markdown syntax also works: __bold with underscores__, _italic with underscores_. Both styles are equivalent to their asterisk counterparts (via remark-gfm).",
        },
        {
          type: "rich-paragraph",
          content: "Escape characters when you need a literal symbol: \\*not italic\\*, \\`not code\\`, \\[not a link\\]. The backslash prevents Markdown parsing.",
        },

        // ── Headings ──
        { type: "page-break" },
        { type: "heading", level: 1, content: "Heading Level 1" },
        { type: "rich-paragraph", content: "Level 1 is the main section title. Use it once per section, at the very top." },
        { type: "heading", level: 2, content: "Heading Level 2" },
        { type: "rich-paragraph", content: "Level 2 introduces a subsection within a section. It may appear multiple times per page." },
        { type: "heading", level: 3, content: "Heading Level 3" },
        { type: "rich-paragraph", content: "Level 3 is the finest subdivision — useful for named concepts, examples, or grouped items inside a subsection." },
      ],
    },

    // ── 2. Callout Blocks ─────────────────────────────────────────────────────
    {
      id: "callouts",
      title: "Callout Blocks",
      blocks: [
        { type: "heading", level: 1, content: "Callout Blocks" },
        {
          type: "rich-paragraph",
          content: "Callout blocks interrupt the reading flow to signal additional context (`note`) or risk (`warning`). Both accept an optional `label` that appears as an uppercase tag above the message.",
        },

        { type: "note", content: "A note without a label. Use it for supplementary information, tips, or observations that enrich the main text without being critical." },
        {
          type: "note",
          label: "Pro tip",
          content: "A note **with a label**. The label appears as a small uppercase tag above the body. It can contain *inline Markdown* just like a `rich-paragraph`.",
        },
        {
          type: "note",
          label: "Did you know?",
          content: 'Labels are optional but recommended when the note has a distinct role — e.g. `"Pro tip"`, `"Definition"`, `"Context"`, `"Good to know"`. Keep labels short: 1–3 words.',
        },

        { type: "warning", content: "A warning without a label. Use it for potential pitfalls, destructive actions, or anything the reader must not overlook." },
        {
          type: "warning",
          label: "Breaking change",
          content: "A warning **with a label**. Visually stronger than a note — reserved for genuinely critical information. Avoid overusing warnings or readers will start ignoring them.",
        },
      ],
    },

    // ── 3. Lists ──────────────────────────────────────────────────────────────
    {
      id: "lists",
      title: "Lists",
      blocks: [
        { type: "heading", level: 1, content: "Lists" },

        { type: "heading", level: 2, content: "Bullet List" },
        {
          type: "rich-paragraph",
          content: "The `list` block renders a classic bulleted list. Each item supports **inline Markdown** (bold, italic, code, links, strikethrough). Use this for unordered enumerations where sequence does not matter.",
        },
        {
          type: "list",
          items: ["First item in the list", "Second item — a bit longer to show line wrapping behaviour inside the bullet", "Third item", "Fourth item with **bold** and *italic* — inline Markdown works inside list items", "Fifth item — last in the set"],
        },

        { type: "heading", level: 2, content: "Item List (Grid)" },
        {
          type: "rich-paragraph",
          content: "The `item-list` block renders items in a two-column grid with a small accent dot. Both the label and each item support **inline Markdown**. Use it for dense, scannable sets of facts, features, or attributes where each item is short.",
        },
        {
          type: "item-list",
          label: "Key features",
          items: ["Two-column grid layout", "Accent dot per item", "Optional label above", "Best for short entries", "Handles odd counts gracefully", "Great for feature lists", "Works well for specs", "Clean visual rhythm"],
        },

        { type: "page-break" },
        { type: "heading", level: 2, content: "Numbered Steps" },
        {
          type: "rich-paragraph",
          content: "The `steps` block renders a numbered sequence with large, accent-coloured numerals. Both the label and each step support **inline Markdown**. Use it when order matters — installation instructions, workflows, recipes, or any sequential process.",
        },
        {
          type: "steps",
          label: "How to add a new ebook",
          items: [
            "Create a new folder under `ebooks/your-ebook-id/`.",
            "Add `ebook.ts` exporting your `Ebook` object and `theme.ts` exporting your `EbookTheme`.",
            "Register the entry in `ebooks/index.ts` inside `ebookRegistry`.",
            "Open `/preview/your-ebook-id` in the browser to see the result.",
            "Run `npm run export:pdf your-ebook-id` to export a PDF.",
          ],
        },
      ],
    },

    // ── 4. Visual Content ─────────────────────────────────────────────────────
    {
      id: "visual-content",
      title: "Visual Content",
      blocks: [
        { type: "heading", level: 1, content: "Visual Content Blocks" },

        { type: "heading", level: 2, content: "Highlight" },
        {
          type: "rich-paragraph",
          content: "The `highlight` block is a large pull-quote styled element — typically used for key takeaways, statistics, or short phrases that should stand out from the surrounding body text.",
        },
        { type: "highlight", content: "A single, compelling sentence that summarises the most important idea on this page." },
        { type: "highlight", content: "Highlights work best with 10–30 words. Longer content loses the visual impact that makes this block effective." },

        { type: "heading", level: 2, content: "Quote" },
        {
          type: "rich-paragraph",
          content: "The `quote` block renders a left-bordered, italicised block quote. Use it for attributable quotes from authors, researchers, or personas.",
        },
        { type: "quote", content: "Any sufficiently advanced technology is indistinguishable from magic. — Arthur C. Clarke" },
        { type: "quote", content: "First, solve the problem. Then, write the code. — John Johnson" },

        { type: "heading", level: 2, content: "Image with Caption" },
        {
          type: "rich-paragraph",
          content: "The `image-with-caption` block renders a full-width image with an optional italic caption below. The block is treated as an atomic unit — it will never be split across pages.",
        },
        { type: "image-with-caption", src: imageContent, alt: "A landscape photograph used as content illustration", caption: "Caption text appears below the image in a muted, italic style. It is optional." },
      ],
    },

    // ── 5. Code & Table ───────────────────────────────────────────────────────
    {
      id: "code-and-table",
      title: "Code & Table",
      blocks: [
        { type: "heading", level: 1, content: "Code & Table" },

        { type: "heading", level: 2, content: "Code Block" },
        {
          type: "rich-paragraph",
          content: "The `code` block renders a monospaced, pre-formatted block with a subtle background. Use it for multi-line code samples, configuration files, or shell commands.",
        },
        {
          type: "code",
          content: `// Minimal ebook definition
import type { Ebook } from "@/ebook-engine/types/ebook";

export const myEbook: Ebook = {
  id: "my-ebook",
  title: "My First Ebook",
  author: "Your Name",
  cover: {
    layout: "centered",
    background: { variant: "wave-cover" },
    textColor: "#ffffff",
  },
  sections: [
    {
      id: "intro",
      title: "Introduction",
      blocks: [
        { type: "heading", level: 1, content: "Hello, World!" },
        { type: "rich-paragraph", content: "Your content goes here." },
      ],
    },
  ],
};`,
        },

        { type: "page-break" },
        { type: "heading", level: 2, content: "Table" },
        {
          type: "rich-paragraph",
          content: "The `table` block renders structured tabular data with a styled header row, zebra-striped rows, and an optional caption. All values are plain strings.",
        },
        {
          type: "table",
          caption: "All block types available in the ebook engine, grouped by category.",
          headers: ["Block type", "Category", "Markdown support", "Notes"],
          rows: [
            ["rich-paragraph", "Content", "Yes (full)", "Main body text"],
            ["heading", "Structure", "Inline", "Levels 1–3"],
            ["highlight", "Content", "Yes (full)", "Pull-quote style"],
            ["quote", "Content", "Yes (full)", "Left-bordered blockquote"],
            ["note", "Callout", "Yes (full)", "Optional label (inline)"],
            ["warning", "Callout", "Yes (full)", "Optional label (inline)"],
            ["action-box", "Content", "Yes (full)", "Optional label (inline)"],
            ["list", "Structure", "Inline", "Bulleted list"],
            ["item-list", "Structure", "Inline", "2-col grid with dots"],
            ["steps", "Structure", "Inline", "Numbered sequence"],
            ["image-with-caption", "Media", "Inline", "Caption only"],
            ["code", "Structure", "No", "Monospaced pre"],
            ["table", "Structure", "Inline", "Headers and cells"],
            ["divider", "Utility", "—", "Horizontal rule"],
            ["page-break", "Utility", "—", "Forces a new page"],
          ],
        },
      ],
    },

    // ── 6. Action Box & Utility ───────────────────────────────────────────────
    {
      id: "action-box-and-utility",
      title: "Action Box & Utility",
      blocks: [
        { type: "heading", level: 1, content: "Action Box & Utility Blocks" },

        { type: "heading", level: 2, content: "Action Box" },
        {
          type: "rich-paragraph",
          content: "The `action-box` block is a dark, centered message card used to highlight an action or suggestion — such as a next step, a share prompt, or a key takeaway. It supports an optional `label` above the main message.",
        },
        { type: "action-box", content: "Start building your first ebook today." },
        {
          type: "action-box",
          label: "Next step",
          content: "Copy the `components-reference` ebook as your starting template and replace the content.",
        },
        {
          type: "action-box",
          label: "Share this",
          content: "If this reference helped you, share it with someone who is building content tools.",
        },

        { type: "page-break" },
        { type: "heading", level: 2, content: "Divider" },
        { type: "rich-paragraph", content: "The `divider` block renders a subtle horizontal rule. Use it to visually separate unrelated groups of blocks within the same section." },
        { type: "divider" },
        { type: "rich-paragraph", content: "Content below the divider continues in the same section but signals a thematic break to the reader." },
        { type: "divider" },

        { type: "heading", level: 2, content: "Page Break" },
        {
          type: "rich-paragraph",
          content: "The `page-break` block forces the pagination engine to start a new page at that exact point, regardless of how much space remains. The content below continues on the next page.",
        },
        { type: "rich-paragraph", content: "This paragraph is on the current page. The next paragraph will appear on a new page because a `page-break` follows." },
      ],
    },
  ],
};
