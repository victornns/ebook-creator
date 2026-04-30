import type { NoteBlock } from "@/ebook-engine/types/ebook";

interface Props {
  block: NoteBlock;
}

export default function Note({ block }: Props) {
  return (
    <div
      className="ebook-note"
      role="note"
    >
      {block.label && <p className="ebook-note-label">{block.label}</p>}
      <p className="ebook-note-content">{block.content}</p>
    </div>
  );
}
