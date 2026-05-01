import type { StepsBlock } from "@/ebook-engine/types/ebook";

export default function Steps({ block }: { block: StepsBlock }) {
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
}
