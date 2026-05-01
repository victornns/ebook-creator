import type { ActionBoxBlock } from "@/ebook-engine/types/ebook";

export default function ActionBox({ block }: { block: ActionBoxBlock }) {
  return (
    <div className="ebook-action-box">
      {block.label && <p className="ebook-action-box-label">{block.label}</p>}
      <p className="ebook-action-box-content">{block.content}</p>
    </div>
  );
}
