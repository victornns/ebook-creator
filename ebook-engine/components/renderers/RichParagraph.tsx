import Md from "@/ebook-engine/components/Md";
import type { RichParagraphBlock } from "@/ebook-engine/types/ebook";

interface Props {
  block: RichParagraphBlock;
}

export default function RichParagraph({ block }: Props) {
  return <Md paragraphClass="ebook-rich-paragraph">{block.content}</Md>;
}
