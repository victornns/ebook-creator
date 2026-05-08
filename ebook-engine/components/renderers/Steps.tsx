import MdInline from "@/ebook-engine/components/MdInline";
import type { StepsBlock } from "@/ebook-engine/types/ebook";

export default function Steps({ block }: { block: StepsBlock }) {
  return (
    <div className="ebook-steps">
      <p className="ebook-block-label">
        <MdInline>{block.label ?? "Steps"}</MdInline>
      </p>
      <ol className="ebook-steps-list">
        {block.items.map((item, i) => (
          <li key={i}>
            <MdInline>{item}</MdInline>
          </li>
        ))}
      </ol>
    </div>
  );
}
