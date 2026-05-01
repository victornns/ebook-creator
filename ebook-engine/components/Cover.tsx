import Image from "next/image";
import type React from "react";
import type { EbookCover } from "@/ebook-engine/types/ebook";
import { resolveNextImageProps } from "@/ebook-engine/types/image";

interface Props {
  title: string;
  subtitle?: string;
  author: string;
  cover: EbookCover;
}

export default function Cover({ title, subtitle, author, cover }: Props) {
  // When an SVG background is used, the Cover div must be transparent so the
  // background component (rendered beneath it) shows through.
  const backgroundStyle: React.CSSProperties = cover.background
    ? {}
    : cover.backgroundImage
      ? {
          backgroundImage: `url(${cover.backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }
      : { backgroundColor: cover.backgroundColor ?? "var(--ebook-primary)" };

  const textColor = cover.textColor ?? "#ffffff";
  const layout = cover.layout ?? "horizontal";

  return (
    <div
      className={`ebook-cover ebook-cover--${layout}`}
      style={backgroundStyle}
    >
      {cover.image && (
        <div className="ebook-cover-image-side">
          <Image
            {...resolveNextImageProps(cover.image.src)}
            alt={cover.image.alt}
            className="ebook-cover-image"
            loading="eager"
            priority
          />
        </div>
      )}

      <div
        className="ebook-cover-info-side"
        style={{ color: textColor }}
      >
        <h1 className="ebook-cover-title">{title}</h1>
        {subtitle && <p className="ebook-cover-subtitle">{subtitle}</p>}
        <p className="ebook-cover-author">Por {author}</p>
      </div>
    </div>
  );
}
