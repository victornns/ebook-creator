import type { ItemListBlock } from "@/ebook-engine/types/ebook";

export default function ItemList({ block }: { block: ItemListBlock }) {
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
}
