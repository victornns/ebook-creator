import Md from "@/ebook-engine/components/Md";
import type { QuoteBlock } from "@/ebook-engine/types/ebook";

export default function Quote({ block }: { block: QuoteBlock }) {
  return (
    <blockquote className="ebook-quote">
      <Md>{block.content}</Md>
    </blockquote>
  );
}
