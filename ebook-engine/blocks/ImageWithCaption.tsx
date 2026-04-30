import type { ImageWithCaptionBlock } from "@/ebook-engine/types/ebook";

interface Props {
  block: ImageWithCaptionBlock;
}

export default function ImageWithCaption({ block }: Props) {
  const src = typeof block.src === "string" ? block.src : block.src.src;

  return (
    <figure className="ebook-image-with-caption">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={block.alt}
        className="ebook-image"
      />
      {block.caption && <figcaption className="ebook-image-caption">{block.caption}</figcaption>}
    </figure>
  );
}
