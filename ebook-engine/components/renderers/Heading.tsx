import type { HeadingBlock } from "@/ebook-engine/types/ebook";

export default function Heading({ block }: { block: HeadingBlock }) {
  const level = block.level ?? 1;
  const Tag = `h${level}` as "h1" | "h2" | "h3";
  return <Tag className={`ebook-heading ebook-heading-${level}`}>{block.content}</Tag>;
}
