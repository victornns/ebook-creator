import Image from "next/image";
import type { ImageWithCaptionBlock } from "@/ebook-engine/types/ebook";
import { resolveNextImageProps } from "@/ebook-engine/types/image";

interface Props {
  block: ImageWithCaptionBlock;
}

export default function ImageWithCaption({ block }: Props) {
  return (
    <figure className="ebook-image-with-caption">
      <Image
        {...resolveNextImageProps(block.src)}
        alt={block.alt}
        className="ebook-image"
      />
      {block.caption && <figcaption className="ebook-image-caption">{block.caption}</figcaption>}
    </figure>
  );
}
