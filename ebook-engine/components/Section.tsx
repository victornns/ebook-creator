import type { Section as SectionType } from "@/ebook-engine/types/ebook";
import ChapterCover from "./ChapterCover";
import Block from "./Block";

interface Props {
  section: SectionType;
  pageNumber?: number;
}

export default function Section({ section, pageNumber }: Props) {
  if (section.chapterCover) {
    return (
      <ChapterCover
        id={section.id}
        title={section.title}
        chapterCover={section.chapterCover}
        pageNumber={pageNumber}
      />
    );
  }

  return (
    <section
      id={section.id}
      className="ebook-section"
    >
      {section.blocks.map((block, i) => (
        <Block
          key={i}
          block={block}
        />
      ))}
      {pageNumber !== undefined && <div className="ebook-page-number">{pageNumber}</div>}
    </section>
  );
}
