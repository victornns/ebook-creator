import type { WarningBlock } from "@/ebook-engine/types/ebook";

interface Props {
  block: WarningBlock;
}

export default function Warning({ block }: Props) {
  return (
    <div
      className="ebook-warning"
      role="alert"
    >
      {block.label && <p className="ebook-warning-label">{block.label}</p>}
      <p className="ebook-warning-content">{block.content}</p>
    </div>
  );
}
