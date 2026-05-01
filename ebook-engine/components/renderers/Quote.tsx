import type { QuoteBlock } from "@/ebook-engine/types/ebook";

export default function Quote({ block }: { block: QuoteBlock }) {
  return <blockquote className="ebook-quote">{block.content}</blockquote>;
}
