import MdInline from "@/ebook-engine/components/MdInline";
import type { ItemListBlock } from "@/ebook-engine/types/ebook"; // label and items both support inline Markdown

export default function ItemList({ block }: { block: ItemListBlock }) {
  return (
    <div className="ebook-item-list">
      {block.label && (
        <p className="ebook-recipe-label">
          <MdInline>{block.label}</MdInline>
        </p>
      )}
      <ul className="ebook-item-list-items">
        {block.items.map((item, i) => (
          <li key={i}>
            <MdInline>{item}</MdInline>
          </li>
        ))}
      </ul>
    </div>
  );
}
