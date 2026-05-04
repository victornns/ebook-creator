import type { Section } from "@/ebook-engine/types/ebook";

interface Props {
  sections: Section[];
  pageMap: Record<string, number>;
  showTitle?: boolean;
}

interface ChapterGroup {
  chapter: Section;
  items: Section[];
}

/** Groups sections: a section with chapterCover opens a new chapter group. */
function groupByChapter(sections: Section[]): ChapterGroup[] {
  const groups: ChapterGroup[] = [];
  let current: ChapterGroup | null = null;

  for (const section of sections) {
    if (section.chapterCover) {
      current = { chapter: section, items: [] };
      groups.push(current);
    } else if (current) {
      current.items.push(section);
    } else {
      // sections before the first chapter (ungrouped)
      groups.push({ chapter: section, items: [] });
    }
  }

  return groups;
}

export default function TableOfContents({ sections, pageMap, showTitle = true }: Props) {
  const groups = groupByChapter(sections);

  return (
    <nav
      className="ebook-toc"
      aria-label="Sumário"
    >
      {showTitle && (
        <h2
          className="ebook-toc-title"
          data-toc-title=""
        >
          Sumário
        </h2>
      )}
      <ol className="ebook-toc-list">
        {groups.map((group, groupIndex) =>
          group.chapter.chapterCover ? (
            <li
              key={group.chapter.id}
              className="ebook-toc-chapter-group"
              data-toc-group={groupIndex}
            >
              <a
                href={`#${group.chapter.id}`}
                className="ebook-toc-chapter-link"
              >
                <span className="ebook-toc-chapter-number">Capítulo {group.chapter.chapterCover.chapterNumber}</span>
                <span className="ebook-toc-chapter-title">{group.chapter.title.replace(/^Capítulo \d+ — /, "").replace(/^Capítulo \d+: /, "")}</span>
                {pageMap[group.chapter.id] !== undefined && <span className="ebook-toc-page-num">{pageMap[group.chapter.id]}</span>}
              </a>

              {group.items.length > 0 && (
                <ol className="ebook-toc-items">
                  {group.items.map((item) => (
                    <li
                      key={item.id}
                      className="ebook-toc-item"
                    >
                      <a
                        href={`#${item.id}`}
                        className="ebook-toc-link"
                      >
                        <span>{item.title}</span>
                        {pageMap[item.id] !== undefined && <span className="ebook-toc-page-num">{pageMap[item.id]}</span>}
                      </a>
                    </li>
                  ))}
                </ol>
              )}
            </li>
          ) : (
            <li
              key={group.chapter.id}
              className="ebook-toc-item"
              data-toc-group={groupIndex}
            >
              <a
                href={`#${group.chapter.id}`}
                className="ebook-toc-link"
              >
                <span>{group.chapter.title}</span>
                {pageMap[group.chapter.id] !== undefined && <span className="ebook-toc-page-num">{pageMap[group.chapter.id]}</span>}
              </a>
            </li>
          ),
        )}
      </ol>
    </nav>
  );
}
