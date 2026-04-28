import type React from "react";
import type { ChapterCover as ChapterCoverType } from "@/ebook-engine/types/ebook";

interface Props {
  id: string;
  title: string;
  chapterCover: ChapterCoverType;
  pageNumber?: number;
}

export default function ChapterCover({ id, title, chapterCover, pageNumber }: Props) {
  const backgroundStyle: React.CSSProperties = chapterCover.backgroundImage
    ? {
        backgroundImage: `url(${chapterCover.backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }
    : {
        backgroundColor: chapterCover.backgroundColor ?? "var(--ebook-secondary)",
      };

  const textColor = chapterCover.textColor ?? "#ffffff";
  const imageSrc = chapterCover.image == null ? null : typeof chapterCover.image.src === "string" ? chapterCover.image.src : chapterCover.image.src.src;

  return (
    <section
      id={id}
      className="ebook-chapter-cover"
      style={{ ...backgroundStyle, color: textColor }}
    >
      <div className="ebook-chapter-cover-content">
        <span className="ebook-chapter-cover-number">Capítulo {chapterCover.chapterNumber}</span>

        <h2 className="ebook-chapter-cover-title">{title}</h2>

        {chapterCover.description && <p className="ebook-chapter-cover-description">{chapterCover.description}</p>}
      </div>

      {imageSrc && (
        <div className="ebook-chapter-cover-image-side">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={imageSrc}
            alt={chapterCover.image?.alt ?? ""}
            className="ebook-chapter-cover-image"
          />
        </div>
      )}

      {pageNumber !== undefined && <div className="ebook-page-number ebook-chapter-cover-page-number">{pageNumber}</div>}
    </section>
  );
}
