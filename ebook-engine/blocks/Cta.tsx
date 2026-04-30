import type { CtaBlock } from "@/ebook-engine/types/ebook";

interface Props {
  block: CtaBlock;
}

export default function Cta({ block }: Props) {
  return (
    <div className="ebook-cta">
      {block.label && <p className="ebook-cta-label">{block.label}</p>}
      <p className="ebook-cta-content">{block.content}</p>
    </div>
  );
}
