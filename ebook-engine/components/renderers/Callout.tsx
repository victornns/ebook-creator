import Md from "@/ebook-engine/components/Md";
import type { NoteBlock, WarningBlock } from "@/ebook-engine/types/ebook";

// Note and Warning share identical structure (optional label + content paragraph).
// The `type` field drives the CSS variant and ARIA role:
//   - "note"    → informational, role="note"
//   - "warning" → critical/cautionary, role="alert"
export default function Callout({ block }: { block: NoteBlock | WarningBlock }) {
  const v = block.type;
  return (
    <div
      className={`ebook-${v}`}
      role={v === "warning" ? "alert" : "note"}
    >
      {block.label && <p className={`ebook-${v}-label`}>{block.label}</p>}
      <Md paragraphClass={`ebook-${v}-content`}>{block.content}</Md>
    </div>
  );
}
