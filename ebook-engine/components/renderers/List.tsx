import type { ListBlock } from "@/ebook-engine/types/ebook";

export default function List({ block }: { block: ListBlock }) {
  return (
    <ul className="ebook-list">
      {block.items.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ul>
  );
}
