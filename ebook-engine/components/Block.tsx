import type { Block as BlockType } from "@/ebook-engine/types/ebook";

interface Props {
  block: BlockType;
}

export default function Block({ block }: Props) {
  switch (block.type) {
    case "heading": {
      const level = block.level ?? 1;
      const Tag = `h${level}` as "h1" | "h2" | "h3";
      return <Tag className={`ebook-heading ebook-heading-${level}`}>{block.content}</Tag>;
    }
    case "paragraph":
      return <p className="ebook-paragraph">{block.content}</p>;
    case "image":
      return (
        <figure className="ebook-figure">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={block.src}
            alt={block.alt ?? ""}
            className="ebook-image"
          />
        </figure>
      );
    case "quote":
      return <blockquote className="ebook-quote">{block.content}</blockquote>;
    case "list":
      return (
        <ul className="ebook-list">
          {block.items?.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      );
    case "divider":
      return <hr className="ebook-divider" />;
    case "callout":
      return <div className="ebook-callout">{block.content}</div>;
    case "code":
      return (
        <pre className="ebook-code">
          <code>{block.content}</code>
        </pre>
      );
    case "ingredients":
      return (
        <div className="ebook-ingredients">
          <p className="ebook-recipe-label">{block.label ?? "Ingredientes"}</p>
          <ul className="ebook-ingredients-list">
            {block.items?.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>
      );
    case "steps":
      return (
        <div className="ebook-steps">
          <p className="ebook-recipe-label">{block.label ?? "Modo de preparo"}</p>
          <ol className="ebook-steps-list">
            {block.items?.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ol>
        </div>
      );
    default:
      return null;
  }
}
