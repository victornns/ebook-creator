import type { HighlightBlock } from "@/ebook-engine/types/ebook";

export default function Highlight({ block }: { block: HighlightBlock }) {
  return <div className="ebook-highlight">{block.content}</div>;
}
