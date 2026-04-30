import type { Block as BlockType } from "@/ebook-engine/types/ebook";
import RichParagraph from "@/ebook-engine/blocks/RichParagraph";
import ImageWithCaption from "@/ebook-engine/blocks/ImageWithCaption";
import Highlight from "@/ebook-engine/blocks/Highlight";
import Note from "@/ebook-engine/blocks/Note";
import Warning from "@/ebook-engine/blocks/Warning";
import Cta from "@/ebook-engine/blocks/Cta";
import Table from "@/ebook-engine/blocks/Table";

interface Props {
  block: BlockType;
}

/**
 * Engine dispatcher — maps a block type to its presentational component.
 *
 * Content blocks (visual / reusable) are delegated to dedicated components
 * under ebook-engine/blocks/. Structural/utility blocks are rendered inline
 * here as they require no separate abstraction.
 */
export default function Block({ block }: Props) {
  switch (block.type) {
    // ── Content blocks ─────────────────────────────────────────────────────
    case "rich-paragraph":
      return <RichParagraph block={block} />;
    case "image-with-caption":
      return <ImageWithCaption block={block} />;
    case "highlight":
      return <Highlight block={block} />;
    case "note":
      return <Note block={block} />;
    case "warning":
      return <Warning block={block} />;
    case "cta":
      return <Cta block={block} />;
    case "table":
      return <Table block={block} />;

    // ── Structural / utility blocks ────────────────────────────────────────
    case "heading": {
      const level = block.level ?? 1;
      const Tag = `h${level}` as "h1" | "h2" | "h3";
      return <Tag className={`ebook-heading ebook-heading-${level}`}>{block.content}</Tag>;
    }
    case "quote":
      return <blockquote className="ebook-quote">{block.content}</blockquote>;
    case "list":
      return (
        <ul className="ebook-list">
          {block.items.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      );
    case "divider":
      return <hr className="ebook-divider" />;
    case "code":
      return (
        <pre className="ebook-code">
          <code>{block.content}</code>
        </pre>
      );
    case "item-list":
      return (
        <div className="ebook-item-list">
          {block.label && <p className="ebook-recipe-label">{block.label}</p>}
          <ul className="ebook-item-list-items">
            {block.items.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>
      );
    case "steps":
      return (
        <div className="ebook-steps">
          <p className="ebook-recipe-label">{block.label ?? "Steps"}</p>
          <ol className="ebook-steps-list">
            {block.items.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ol>
        </div>
      );
    case "page-break":
      return null;
    default:
      return null;
  }
}
