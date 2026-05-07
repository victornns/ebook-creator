import Md from "@/ebook-engine/components/Md";
import MdInline from "@/ebook-engine/components/MdInline";
import type { ActionBoxBlock } from "@/ebook-engine/types/ebook";

export default function ActionBox({ block }: { block: ActionBoxBlock }) {
  return (
    <div className="ebook-action-box">
      {block.label && (
        <p className="ebook-action-box-label">
          <MdInline>{block.label}</MdInline>
        </p>
      )}
      <Md paragraphClass="ebook-action-box-content">{block.content}</Md>
    </div>
  );
}
