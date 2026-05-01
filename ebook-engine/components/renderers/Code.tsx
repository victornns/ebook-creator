import type { CodeBlock } from "@/ebook-engine/types/ebook";

export default function Code({ block }: { block: CodeBlock }) {
  return (
    <pre className="ebook-code">
      <code>{block.content}</code>
    </pre>
  );
}
