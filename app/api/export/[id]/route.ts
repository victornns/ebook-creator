import { NextResponse } from "next/server";
import type { StaticImageData } from "next/image";
import { ebookRegistry } from "@/ebooks";
import type { Block, EbookImage, Section } from "@/ebook-engine/types/ebook";
import { isRemoteImage } from "@/ebook-engine/types/ebook";
import type { EbookTheme } from "@/ebook-engine/types/theme";

// ── Serializable types (no binary blobs, images resolved to URL strings) ──────

export interface SerializedImage {
  src: string;
  width: number;
  height: number;
}

export type SerializedBlock = Omit<Block, "src"> & { src?: SerializedImage };

export interface SerializedSection {
  id: string;
  title: string;
  chapterNumber?: number;
  chapterDescription?: string;
  blocks: SerializedBlock[];
}

export interface SerializedEbook {
  id: string;
  title: string;
  subtitle?: string;
  author: string;
  theme: Pick<EbookTheme, "colors" | "fonts">;
  sections: SerializedSection[];
  acknowledgements?: SerializedSection;
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function resolveImageSrc(img: EbookImage): SerializedImage {
  if (isRemoteImage(img)) {
    return { src: img.url, width: img.width, height: img.height };
  }
  const local = img as StaticImageData;
  return { src: local.src, width: local.width, height: local.height };
}

function serializeBlock(block: Block): SerializedBlock {
  if (block.type === "image-with-caption") {
    return { ...block, src: resolveImageSrc(block.src) };
  }
  return block as SerializedBlock;
}

function serializeSection(section: Section): SerializedSection {
  return {
    id: section.id,
    title: section.title,
    chapterNumber: section.chapterCover?.chapterNumber,
    chapterDescription: section.chapterCover?.description,
    blocks: section.blocks.map(serializeBlock),
  };
}

// ── Route handler ─────────────────────────────────────────────────────────────

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const entry = ebookRegistry[id];

  if (!entry) {
    return NextResponse.json({ error: "Ebook not found" }, { status: 404 });
  }

  const { ebook, theme } = entry;

  const serialized: SerializedEbook = {
    id: ebook.id,
    title: ebook.title,
    subtitle: ebook.subtitle,
    author: ebook.author,
    theme: { colors: theme.colors, fonts: theme.fonts },
    sections: ebook.sections.map(serializeSection),
    acknowledgements: ebook.acknowledgements ? serializeSection(ebook.acknowledgements) : undefined,
  };

  return NextResponse.json(serialized);
}
