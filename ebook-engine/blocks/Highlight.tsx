import type { HighlightBlock } from "@/ebook-engine/types/ebook";

interface Props {
  block: HighlightBlock;
}

export default function Highlight({ block }: Props) {
  return <div className="ebook-highlight">{block.content}</div>;
}
